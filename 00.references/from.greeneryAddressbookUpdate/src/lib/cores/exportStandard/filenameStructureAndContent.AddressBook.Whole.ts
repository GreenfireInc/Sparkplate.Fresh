/**
 * Generates filename for Address Book exports
 * Format: %projectName%.%date%.%time%.%section%.%subSection%.%contactAmount%.%extension%
 * 
 * Example: greeneryaddressbook.20250104.143022.Contacts.5.csv
 */

// Project name from package.json: "greenery.addressbook" -> "greeneryaddressbook"
const PROJECT_NAME = 'greeneryaddressbook';

export interface FilenameParams {
  extension: string;
  section: string;
  contactAmount: number;
  subSection?: string;
  projectName?: string;
}

/**
 * Generates a filename according to the Address Book export schema
 * @param params - Filename parameters
 * @returns Formatted filename string
 */
export function generateAddressBookFilename(params: FilenameParams): string {
  const {
    extension,
    section,
    contactAmount,
    subSection = '',
    projectName = PROJECT_NAME
  } = params;

  const now = new Date();
  
  // Format date as YYYYMMDD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const date = `${year}${month}${day}`;
  
  // Format time as HHMMSS (24-hour format)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const time = `${hours}${minutes}${seconds}`;
  
  // Build filename: projectName.date.time.section.subSection.contactAmount.extension
  // Format: %projectName%.%date%.%time%.%section%.%subSection%.%contactAmount%.%extension%
  const parts = [projectName, date, time, section];
  if (subSection) {
    parts.push(subSection);
  }
  parts.push(contactAmount.toString());
  
  return `${parts.join('.')}.${extension}`;
}


