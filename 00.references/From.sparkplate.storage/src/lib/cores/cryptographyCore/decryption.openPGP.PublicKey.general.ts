import * as openpgp from 'openpgp';

/** Trim and strip wrapping ASCII quotes (aligned with `encryption.openPGP.PublicKey.general` key hygiene). */
function normalizeArmoredPrivateKeyInput(key: string): string {
  return key.trim().replace(/^"|"$/g, '');
}

export type DecryptArmoredMessageResult = {
  plaintext: string;
  /** Same basename logic as the app: strip first `.gpg` substring from the uploaded name. */
  suggestedDownloadName: string;
};

/**
 * Decrypts ciphertext produced as an **armored** OpenPGP message (e.g. `encryptBinaryWithArmoredPublicKey` / `.gpg`).
 * `ciphertextFileBytes` are decoded as UTF-8 armored text; binary OpenPGP packet blobs are not handled here.
 *
 * Caller is responsible for SPCK / native routing; this module only handles OpenPGP.
 */
export async function decryptArmoredMessageWithPrivateKey(
  armoredPrivateKey: string,
  ciphertextFileBytes: Uint8Array,
  originalFileName: string,
): Promise<DecryptArmoredMessageResult> {
  const armoredKey = normalizeArmoredPrivateKeyInput(armoredPrivateKey);
  const privateKeyObj = await openpgp.readPrivateKey({ armoredKey });
  const message = await openpgp.readMessage({
    armoredMessage: new TextDecoder().decode(ciphertextFileBytes),
  });
  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKeyObj,
  });
  return {
    plaintext: decrypted as string,
    suggestedDownloadName: originalFileName.replace('.gpg', ''),
  };
}
