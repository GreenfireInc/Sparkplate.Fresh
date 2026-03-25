import { ref } from 'vue';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import vcf from 'vcf';

interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  wallets: number;
}

// Maps various possible CSV header names to a standardized contact key
const mapCsvHeaderToKey = (header: string): keyof Contact | null => {
  const lowerHeader = header.toLowerCase().replace(/\s+/g, '');
  
  if (lowerHeader.includes('first') || lowerHeader.includes('given')) {
    return 'firstname';
  }
  if (lowerHeader.includes('last') || lowerHeader.includes('family') || lowerHeader.includes('surname')) {
    return 'lastname';
  }
  if (lowerHeader.includes('email') || lowerHeader.includes('e-mail')) {
    return 'email';
  }
  if (lowerHeader.includes('company') || lowerHeader.includes('organization')) {
    return 'company';
  }
  
  return null;
};

export function useContactParser() {
  const parseFile = (file: File): Promise<Partial<Contact>[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (!content) {
          return reject('File content is empty.');
        }

        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        try {
          if (fileExtension === 'vcf') {
            const cards = vcf.parse(content.toString());
            const contacts = cards.map((card) => {
              const name = card.get('n')?.valueOf().toString().split(';');
              const firstname = name ? name[1] || '' : card.get('fn')?.valueOf().toString() || '';
              const lastname = name ? name[0] || '' : '';

              return {
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                email: card.get('email')?.valueOf().toString() || '',
                company: card.get('org')?.valueOf().toString() || '',
                wallets: 0,
              };
            });
            resolve(contacts);
          } else if (fileExtension === 'csv') {
            Papa.parse(content.toString(), {
              header: true,
              skipEmptyLines: true,
              complete: (results) => {
                const contacts = results.data.map((row: any) => {
                  const contact: Partial<Contact> = {};
                  for (const header in row) {
                    const key = mapCsvHeaderToKey(header);
                    if (key && row[header]) {
                      contact[key] = row[header];
                    }
                  }
                  return contact;
                });
                // Filter out any empty objects that might have been created
                const validContacts = contacts.filter(c => Object.keys(c).length > 0);
                resolve(validContacts as Partial<Contact>[]);
              },
              error: (error) => reject(error),
            });
          } else {
            const workbook = XLSX.read(content, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const headerRow = jsonData[0] as string[];
            
            const contacts = jsonData.slice(1).map((row: any) => {
              const contact: Partial<Contact> = {};
              headerRow.forEach((header, index) => {
                const key = mapCsvHeaderToKey(header);
                 if (key && row[index]) {
                    contact[key] = row[index];
                  }
              });
              return contact;
            });
             const validContacts = contacts.filter(c => Object.keys(c).length > 0);
            resolve(validContacts);
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  return { parseFile };
}
