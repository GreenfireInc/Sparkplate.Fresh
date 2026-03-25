
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export function useContactParser() {
  const parseFile = async (file: File) => {
    const contacts = ref<any[]>([]);

    const getMappedContact = (rawContact: any) => {
        const headerMappings: { [key: string]: string[] } = {
            firstname: ['First Name', 'FirstName', 'firstname', 'Given Name'],
            lastname: ['Last Name', 'LastName', 'lastname', 'Family Name'],
            email: ['Email', 'email', 'E-mail', 'E-mail 1 - Value', 'E-mail 2 - Value', 'E-mail 3 - Value'],
            company: ['Company', 'company', 'Organization 1 - Name'],
            phone: ['Phone', 'phone', 'Phone 1 - Value', 'Phone 2 - Value'],
        };

        const newContact: { [key: string]: any } = {};

        for (const field in headerMappings) {
            let valueFound = false;
            for (const header of headerMappings[field]) {
                if (rawContact[header]) {
                    if (field === 'email' || field === 'phone') {
                        if (!newContact[field]) {
                            newContact[field] = [];
                        }
                        newContact[field].push(rawContact[header]);
                    } else if (!valueFound) {
                        newContact[field] = rawContact[header];
                        valueFound = true;
                    }
                }
            }
        }

        if (newContact.email) {
            newContact.email = newContact.email.join(', ');
        }
        if (newContact.phone) {
            newContact.phone = newContact.phone.join(', ');
        }

        return newContact;
    };

    return new Promise((resolve, reject) => {
      if (file.name.endsWith('.csv')) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const processedContacts = results.data.map(getMappedContact).filter(c => c.firstname || c.lastname || c.email);
            resolve(processedContacts);
          },
          error: (error: any) => {
            reject(error);
          },
        });
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
