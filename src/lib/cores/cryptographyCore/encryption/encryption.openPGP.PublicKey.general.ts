import * as openpgp from 'openpgp';

/** Trim and strip a single layer of wrapping ASCII quotes (matches `App.vue` key hygiene before OpenPGP parse). */
function normalizeArmoredPublicKeyInput(key: string): string {
  return key.trim().replace(/^"|"$/g, '');
}

/**
 * Encrypts binary plaintext with an armored OpenPGP **public** key (GPG-style recipient encryption).
 * Returns ASCII-armored ciphertext for a typical `.gpg` file download.
 *
 * Caller is responsible for SPCK / native-crypto routing; this module only handles OpenPGP.
 */
export async function encryptBinaryWithArmoredPublicKey(
  armoredPublicKey: string,
  plaintext: Uint8Array,
): Promise<string> {
  const armoredKey = normalizeArmoredPublicKeyInput(armoredPublicKey);
  const publicKeyObj = await openpgp.readKey({ armoredKey });
  const message = await openpgp.createMessage({ binary: plaintext });
  const encrypted = await openpgp.encrypt({
    message,
    encryptionKeys: publicKeyObj,
  });
  return encrypted as string;
}
