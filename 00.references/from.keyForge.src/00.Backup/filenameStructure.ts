/**
 * Standard filename export structure
 * Format: %name%.%machineName%.%date%.%time%
 * - name: From package.json
 * - machineName: Machine/host identifier
 * - date: YYYYMMDD format
 * - time: 24-hour HHMMSS format
 */

// Package name from package.json (dynamically imported)
import packageJson from "../../package.json";

const PACKAGE_NAME = packageJson.name;

/**
 * Get machine name identifier
 * In browser environment, we use a fallback since hostname isn't directly accessible
 * for security reasons. This could be enhanced with user configuration or other identifiers.
 */
function getMachineName(): string {
  // Try to get hostname from window.location if available
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    // If it's localhost, try to use a more descriptive identifier
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "local";
    }
    // Otherwise use the hostname (sanitized for filename)
    return hostname.replace(/[^a-zA-Z0-9-]/g, "-");
  }
  // Fallback
  return "unknown";
}

/**
 * Format date as YYYYMMDD
 */
function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * Format time as 24-hour HHMMSS
 */
function formatTime(date: Date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
}

/**
 * Generate a standard filename with the structure:
 * %name%.%machineName%.%date%.%time%
 * 
 * @param extension - Optional file extension (e.g., "png", "pdf")
 * @param customDate - Optional custom date (defaults to current date/time)
 * @returns Formatted filename string
 */
export function generateStandardFilename(
  extension?: string,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const name = PACKAGE_NAME;
  const machineName = getMachineName();
  const dateStr = formatDate(date);
  const timeStr = formatTime(date);

  let filename = `${name}.${machineName}.${dateStr}.${timeStr}`;

  if (extension) {
    filename += `.${extension}`;
  }

  return filename;
}

/**
 * Generate a standard filename for a specific currency/type
 * Format: %name%.%machineName%.%date%.%time%.%currency%
 * 
 * @param currency - Currency or type identifier
 * @param extension - Optional file extension (e.g., "png", "pdf")
 * @param customDate - Optional custom date (defaults to current date/time)
 * @returns Formatted filename string
 */
export function generateStandardFilenameWithCurrency(
  currency: string,
  extension?: string,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const name = PACKAGE_NAME;
  const machineName = getMachineName();
  const dateStr = formatDate(date);
  const timeStr = formatTime(date);

  // Sanitize currency for filename (remove invalid characters)
  const sanitizedCurrency = currency.replace(/[^a-zA-Z0-9-]/g, "-").toUpperCase();

  let filename = `${name}.${machineName}.${dateStr}.${timeStr}.${sanitizedCurrency}`;

  if (extension) {
    filename += `.${extension}`;
  }

  return filename;
}


