/**
 * Explain Linux network interface names (systemd predictable naming) for tooltips.
 * See: https://www.freedesktop.org/wiki/Software/systemd/PredictableNetworkInterfaceNames/
 */
export function explainInterfaceName(name: string): string {
  if (!name || name.length < 2) return ''
  const prefix = name.slice(0, 2)
  const rest = name.slice(2)
  const parts: string[] = []

  if (prefix === 'wl') {
    parts.push('w = wireless (Wi‑Fi)')
    parts.push('l = LAN')
    if (rest.startsWith('p') && /^p\d+s\d+$/.test(rest)) {
      const busMatch = rest.match(/^p(\d+)s(\d+)$/)
      if (busMatch) {
        parts.push(`p${busMatch[1]} = PCI bus ${busMatch[1]}`)
        parts.push(`s${busMatch[2]} = slot ${busMatch[2]}`)
        parts.push(`So this is the Wi‑Fi adapter in slot ${busMatch[2]} on PCI bus ${busMatch[1]} — usually a built‑in or PCIe Wi‑Fi card.`)
      }
    } else if (rest.startsWith('x') && /^x[0-9a-f]{12}$/i.test(rest)) {
      parts.push(`x + ${rest.slice(1)} = name derived from MAC address`)
      parts.push('So this is typically a USB Wi‑Fi adapter — names from MAC stay stable across reboots.')
    }
  } else if (prefix === 'en') {
    parts.push('e = Ethernet')
    parts.push('n = network')
    if (rest.startsWith('p') && /^p\d+s\d+$/.test(rest)) {
      const busMatch = rest.match(/^p(\d+)s(\d+)$/)
      if (busMatch) {
        parts.push(`p${busMatch[1]} = PCI bus ${busMatch[1]}`)
        parts.push(`s${busMatch[2]} = slot ${busMatch[2]}`)
        parts.push(`So this is the Ethernet adapter in slot ${busMatch[2]} on PCI bus ${busMatch[1]}.`)
      }
    } else if (rest.startsWith('o')) {
      parts.push('o = on-board (built‑in)')
      parts.push('So this is typically a built‑in Ethernet port.')
    } else if (rest.startsWith('x')) {
      parts.push('x = MAC-based name')
      parts.push('So this adapter is identified by its MAC address (often USB Ethernet).')
    }
  } else if (prefix === 'eth' || prefix === 'wlan') {
    parts.push('Legacy interface name (eth0, wlan0, etc.) — order depends on detection at boot.')
  }

  return parts.length ? parts.join('\n') : ''
}
