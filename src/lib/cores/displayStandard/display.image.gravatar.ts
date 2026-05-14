/*
 * Contributors: Corey
 *
 * Description: Gravatar URL generation with RFC 1321 MD5 hashing
 * Docs: https://docs.gravatar.com/general/hash/
 */

// RFC 1321 MD5 — required for Gravatar URL hashing
export function md5(str: string): string {
  function safeAdd(x: number, y: number) { const lsw = (x & 0xffff) + (y & 0xffff); const msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xffff) }
  function bitRotateLeft(num: number, cnt: number) { return (num << cnt) | (num >>> (32 - cnt)) }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b) }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn((b & c) | (~b & d), a, b, x, s, t) }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn((b & d) | (c & ~d), a, b, x, s, t) }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn(b ^ c ^ d, a, b, x, s, t) }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn(c ^ (b | ~d), a, b, x, s, t) }

  function strToUTF8Arr(str: string): number[] {
    const out: number[] = []
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i)
      if (c < 128) { out.push(c) }
      else if (c < 2048) { out.push((c >> 6) | 192, (c & 63) | 128) }
      else { out.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128) }
    }
    return out
  }

  function utf8ToWords(bytes: number[]): number[] {
    const words: number[] = []
    for (let i = 0; i < bytes.length; i++) words[i >> 2] = (words[i >> 2] ?? 0) | (bytes[i] << ((i % 4) * 8))
    return words
  }

  const bytes = strToUTF8Arr(str)
  const bitLen = bytes.length * 8
  bytes.push(0x80)
  while (bytes.length % 64 !== 56) bytes.push(0)
  bytes.push(bitLen & 0xff, (bitLen >> 8) & 0xff, (bitLen >> 16) & 0xff, (bitLen >> 24) & 0xff, 0, 0, 0, 0)

  const M = utf8ToWords(bytes)
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476

  for (let i = 0; i < M.length; i += 16) {
    const [A, B, C, D] = [a, b, c, d]
    a = md5ff(a,b,c,d,M[i+0]??0, 7,-680876936);  d=md5ff(d,a,b,c,M[i+1]??0,12,-389564586);  c=md5ff(c,d,a,b,M[i+2]??0,17, 606105819);  b=md5ff(b,c,d,a,M[i+3]??0,22,-1044525330)
    a = md5ff(a,b,c,d,M[i+4]??0, 7,-176418897);  d=md5ff(d,a,b,c,M[i+5]??0,12, 1200080426);  c=md5ff(c,d,a,b,M[i+6]??0,17,-1473231341); b=md5ff(b,c,d,a,M[i+7]??0,22,-45705983)
    a = md5ff(a,b,c,d,M[i+8]??0, 7, 1770035416); d=md5ff(d,a,b,c,M[i+9]??0,12,-1958414417);  c=md5ff(c,d,a,b,M[i+10]??0,17,-42063);     b=md5ff(b,c,d,a,M[i+11]??0,22,-1990404162)
    a = md5ff(a,b,c,d,M[i+12]??0,7, 1804603682); d=md5ff(d,a,b,c,M[i+13]??0,12,-40341101);   c=md5ff(c,d,a,b,M[i+14]??0,17,-1502002290);b=md5ff(b,c,d,a,M[i+15]??0,22, 1236535329)
    a = md5gg(a,b,c,d,M[i+1]??0, 5,-165796510);  d=md5gg(d,a,b,c,M[i+6]??0, 9,-1069501632);  c=md5gg(c,d,a,b,M[i+11]??0,14, 643717713);  b=md5gg(b,c,d,a,M[i+0]??0,20,-373897302)
    a = md5gg(a,b,c,d,M[i+5]??0, 5,-701558691);  d=md5gg(d,a,b,c,M[i+10]??0, 9, 38016083);   c=md5gg(c,d,a,b,M[i+15]??0,14,-660478335); b=md5gg(b,c,d,a,M[i+4]??0,20,-405537848)
    a = md5gg(a,b,c,d,M[i+9]??0, 5, 568446438);  d=md5gg(d,a,b,c,M[i+14]??0, 9,-1019803690); c=md5gg(c,d,a,b,M[i+3]??0,14,-187363961);  b=md5gg(b,c,d,a,M[i+8]??0,20, 1163531501)
    a = md5gg(a,b,c,d,M[i+13]??0,5,-1444681467); d=md5gg(d,a,b,c,M[i+2]??0, 9,-51403784);    c=md5gg(c,d,a,b,M[i+7]??0,14, 1735328473);  b=md5gg(b,c,d,a,M[i+12]??0,20,-1926607734)
    a = md5hh(a,b,c,d,M[i+5]??0, 4,-378558);     d=md5hh(d,a,b,c,M[i+8]??0,11,-2022574463);  c=md5hh(c,d,a,b,M[i+11]??0,16, 1839030562); b=md5hh(b,c,d,a,M[i+14]??0,23,-35309556)
    a = md5hh(a,b,c,d,M[i+1]??0, 4,-1530992060); d=md5hh(d,a,b,c,M[i+4]??0,11, 1272893353);  c=md5hh(c,d,a,b,M[i+7]??0,16,-155497632);  b=md5hh(b,c,d,a,M[i+10]??0,23,-1094730640)
    a = md5hh(a,b,c,d,M[i+13]??0,4, 681279174);  d=md5hh(d,a,b,c,M[i+0]??0,11,-358537222);   c=md5hh(c,d,a,b,M[i+3]??0,16,-722521979);  b=md5hh(b,c,d,a,M[i+6]??0,23, 76029189)
    a = md5hh(a,b,c,d,M[i+9]??0, 4,-640364487);  d=md5hh(d,a,b,c,M[i+12]??0,11,-421815835);  c=md5hh(c,d,a,b,M[i+15]??0,16, 530742520);  b=md5hh(b,c,d,a,M[i+2]??0,23,-995338651)
    a = md5ii(a,b,c,d,M[i+0]??0, 6,-198630844);  d=md5ii(d,a,b,c,M[i+7]??0,10, 1126891415);  c=md5ii(c,d,a,b,M[i+14]??0,15,-1416354905);b=md5ii(b,c,d,a,M[i+5]??0,21,-57434055)
    a = md5ii(a,b,c,d,M[i+12]??0,6, 1700485571); d=md5ii(d,a,b,c,M[i+3]??0,10,-1894986606);  c=md5ii(c,d,a,b,M[i+10]??0,15,-1051523);    b=md5ii(b,c,d,a,M[i+1]??0,21,-2054922799)
    a = md5ii(a,b,c,d,M[i+8]??0, 6, 1873313359); d=md5ii(d,a,b,c,M[i+15]??0,10,-30611744);   c=md5ii(c,d,a,b,M[i+6]??0,15,-1560198380);  b=md5ii(b,c,d,a,M[i+13]??0,21, 1309151649)
    a = md5ii(a,b,c,d,M[i+4]??0, 6,-145523070);  d=md5ii(d,a,b,c,M[i+11]??0,10,-1120210379); c=md5ii(c,d,a,b,M[i+2]??0,15, 718787259);   b=md5ii(b,c,d,a,M[i+9]??0,21,-343485551)
    a = safeAdd(a,A); b = safeAdd(b,B); c = safeAdd(c,C); d = safeAdd(d,D)
  }

  return [a, b, c, d].map(n => {
    let hex = ''
    for (let j = 0; j < 4; j++) hex += ('0' + ((n >> (j * 8)) & 0xff).toString(16)).slice(-2)
    return hex
  }).join('')
}

export interface GravatarOptions {
  /** Fallback image type. Defaults to 'identicon'. */
  defaultImg?: 'identicon' | 'mp' | 'retro' | 'robohash' | 'monsterid' | '404'
  /** Image size in pixels (1–2048). Defaults to 80. */
  size?: number
  /** Rating filter. Defaults to 'g'. */
  rating?: 'g' | 'pg' | 'r' | 'x'
}

/**
 * Returns a Gravatar URL for the given email address.
 * Returns null if the email is not a valid address.
 */
export function gravatarUrl(email: string, options: GravatarOptions = {}): string | null {
  const trimmed = email.trim().toLowerCase()
  if (!trimmed || !/.+@.+\..+/.test(trimmed)) return null

  const { defaultImg = 'identicon', size = 80, rating = 'g' } = options
  const hash = md5(trimmed)
  return `https://www.gravatar.com/avatar/${hash}?d=${defaultImg}&s=${size}&r=${rating}`
}
