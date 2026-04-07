/**
 * Generates a Gravatar URL from an email address
 * 
 * Gravatar is a service that provides globally recognized avatars
 * based on email addresses. This function generates the URL for
 * a Gravatar image using the MD5 hash of the email.
 */

import md5 from 'md5';

/**
 * Generates a Gravatar URL from an email address
 * @param email - The email address to generate a Gravatar for
 * @param size - The size of the Gravatar image (default: 200)
 * @param defaultImage - The default image type if no Gravatar exists ('mp' for mystery person, 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash', or a URL)
 * @returns The Gravatar URL, or null if email is not provided
 */
export function generateGravatarUrl(
  email: string | null | undefined,
  size: number = 200,
  defaultImage: string = 'mp'
): string | null {
  if (!email || !email.trim()) {
    return null;
  }

  // Normalize email: trim and convert to lowercase (required by Gravatar)
  const normalizedEmail = email.trim().toLowerCase();

  // Generate MD5 hash of the normalized email
  const md5Hash = md5(normalizedEmail);

  // Construct Gravatar URL
  // Format: https://www.gravatar.com/avatar/{hash}?s={size}&d={default}
  return `https://www.gravatar.com/avatar/${md5Hash}?s=${size}&d=${defaultImage}`;
}
