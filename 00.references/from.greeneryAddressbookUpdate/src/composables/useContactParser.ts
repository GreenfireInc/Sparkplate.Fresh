
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
            const headers = headerMappings[field];
            if (!headers) continue;
            for (const header of headers) {
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
                const phoneNumbers: string[] = [];
                for(const line of lines) {
                    const trimmedLine = line.trim();
                    if(trimmedLine.startsWith('BEGIN:VCARD')) {
                        contact = {};
                        phoneNumbers.length = 0; // Reset phone numbers for new contact
                    } else if(trimmedLine.startsWith('END:VCARD')) {
                        // Combine all phone numbers before pushing contact
                        if (phoneNumbers.length > 0) {
                            contact.phone = phoneNumbers.join(', ');
                        }
                        contacts.value.push(contact);
                    } else if(trimmedLine.startsWith('FN:')) {
                        const nameParts = trimmedLine.substring(3).split(' ');
                        contact.firstname = nameParts[0] || '';
                        contact.lastname = nameParts.slice(1).join(' ') || '';
                    } else if(trimmedLine.startsWith('EMAIL') || trimmedLine.includes('EMAIL')) {
                        // Handle EMAIL: or EMAIL;TYPE=INTERNET: or EMAIL;TYPE=WORK:
                        const emailMatch = trimmedLine.match(/EMAIL[^:]*:(.+)/);
                        if (emailMatch && emailMatch[1]) {
                            contact.email = emailMatch[1].trim();
                        }
                    } else if(trimmedLine.startsWith('TEL') || trimmedLine.includes('TEL')) {
                        // Handle TEL:, TEL;TYPE=CELL:, TEL;TYPE=HOME:, etc.
                        const telMatch = trimmedLine.match(/TEL[^:]*:(.+)/);
                        if (telMatch && telMatch[1]) {
                            // Keep phone number formatting for better readability
                            const phoneNumber = telMatch[1].trim();
                            if (phoneNumber && !phoneNumbers.includes(phoneNumber)) {
                                phoneNumbers.push(phoneNumber);
                            }
                        }
                    } else if(trimmedLine.startsWith('ORG:')) {
                        contact.company = trimmedLine.substring(4).trim();
                    }
                }
            } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.ods')) {
              const workbook = XLSX.read(data, { type: 'binary' });
              const sheetName = workbook.SheetNames[0];
              if (!sheetName) {
                reject('No sheets found in the file');
                return;
              }
              const worksheet = workbook.Sheets[sheetName];
              if (!worksheet) {
                reject('Worksheet not found');
                return;
              }
              const json = XLSX.utils.sheet_to_json(worksheet);
              const processedContacts = json.map(getMappedContact).filter(c => c.firstname || c.lastname || c.email);
              contacts.value.push(...processedContacts);
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
