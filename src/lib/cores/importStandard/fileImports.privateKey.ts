/**
 * Standard private-key file imports.
 *
 * Reads JSON files of the shape:
 *   { "privateKey": "<key string>" }
 * where the ticker symbol is encoded as the second dot-segment of the
 * filename, e.g.:
 *   - "CoreyFrancis.xtz.tz1MFiB...json"           -> XTZ
 *   - "CoreyStedman.doge.DHS4dKs...json.json"     -> DOGE
 *   - "CoreyStedman.lunc.terra...json.json"       -> LUNC
 *   - "CoreyStedman.sol.7ACnxSL...json.json"      -> SOL
 *
 * The parsed result is normalized into a `<TICKER>://<privateKey>` URI so
 * downstream consumers (e.g. the cryptocurrency engine) can ingest it
 * directly.
 */

export interface ParsedPrivateKeyFile {
  ticker: string;
  privateKey: string;
  cryptoUri: string;
  filename: string;
}

export type PrivateKeyImportResult =
  | { ok: true; value: ParsedPrivateKeyFile }
  | { ok: false; error: string };

interface PrivateKeyFileShape {
  privateKey?: unknown;
}

export const extractTickerFromFilename = (filename: string): string | null => {
  const segments = filename.split('.');
  if (segments.length < 3) return null;
  const ticker = segments[1]?.trim();
  return ticker ? ticker.toUpperCase() : null;
};

export const buildCryptoUri = (ticker: string, privateKey: string): string => {
  return `${ticker}://${privateKey}`;
};

export const parsePrivateKeyFile = async (
  file: File,
): Promise<PrivateKeyImportResult> => {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text) as PrivateKeyFileShape;

    if (typeof parsed.privateKey !== 'string' || !parsed.privateKey) {
      return {
        ok: false,
        error: 'Selected file has no "privateKey" field.',
      };
    }

    const ticker = extractTickerFromFilename(file.name);
    if (!ticker) {
      return {
        ok: false,
        error:
          'Could not infer ticker from filename. Expected "<owner>.<ticker>.<address>.json".',
      };
    }

    return {
      ok: true,
      value: {
        ticker,
        privateKey: parsed.privateKey,
        cryptoUri: buildCryptoUri(ticker, parsed.privateKey),
        filename: file.name,
      },
    };
  } catch (error) {
    return {
      ok: false,
      error: `Error importing key: ${(error as Error).message}`,
    };
  }
};

export const triggerFileInput = (input: HTMLInputElement | null): void => {
  input?.click();
};
