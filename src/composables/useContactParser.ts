import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { parseContactsCsvFile } from '@/lib/cores/importStandard/contacts/fileImports.addressBook.contacts.csv'

export function useContactParser() {
  const parseFile = async (file: File) => {
    const contacts = ref<any[]>([])

    return new Promise((resolve, reject) => {
      if (file.name.endsWith('.csv')) {
        // CSV parsing lives in the dedicated importStandard module so the
        // Google-Contacts header variants and BOM/whitespace edge cases stay
        // in one place.
        parseContactsCsvFile(file).then(resolve).catch(reject)
        return
      } else {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target?.result;
            if (file.name.endsWith('.vcf')) {
                const lines = (data as string).split('\n');
                let contact: any = {};
                for(const line of lines) {
                    if(line.startsWith('BEGIN:VCARD')) {
                        contact = {};
                    } else if(line.startsWith('END:VCARD')) {
                        contacts.value.push(contact);
                    } else if(line.startsWith('FN:')) {
                        const nameParts = line.substring(3).split(' ');
                        contact.firstname = nameParts[0] || '';
                        contact.lastname = nameParts.slice(1).join(' ') || '';
                    } else if(line.startsWith('EMAIL:')) {
                        contact.email = line.substring(6);
                    } else if(line.startsWith('ORG:')) {
                        contact.company = line.substring(4);
                    }
                }
            } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.ods')) {
              const workbook = XLSX.read(data, { type: 'binary' });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = XLSX.utils.sheet_to_json(worksheet);
              contacts.value.push(...json);
            }
            resolve(contacts.value);
        };
        reader.onerror = (error) => {
            reject(error);
        };

        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.ods')) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsText(file);
        }
      }
    });
  };

  return { parseFile };
}
