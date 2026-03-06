import path from 'node:path'
import fs from 'node:fs'

/** Linux: read interface type (PCI/USB), chipset, driver from sysfs */
export async function getLinuxAdapterHwInfo(iface: string): Promise<{
  interfaceType: string
  chipset: string
  driver: string
}> {
  const result = { interfaceType: '—', chipset: '—', driver: '—' }
  const basePath = path.join('/sys/class/net', iface, 'device')
  try {
    if (!fs.existsSync(basePath)) return result
    const devicePath = fs.realpathSync(basePath)
    if (devicePath.includes('/usb')) {
      result.interfaceType = 'USB'
    } else if (devicePath.includes('/pci') || devicePath.includes('pci0000')) {
      result.interfaceType = 'PCI'
    }
    const driverPath = path.join(devicePath, 'driver')
    if (fs.existsSync(driverPath)) {
      result.driver = path.basename(fs.realpathSync(driverPath))
    }
    if (result.driver && result.driver !== '—') {
      result.chipset = driverToChipset(result.driver)
    }
  } catch {
    /* ignore */
  }
  return result
}

const DRIVER_CHIPSET_MAP: Record<string, string> = {
  r8169: 'RTL8169',
  r8168: 'RTL8168',
  e1000: 'Intel 8254x',
  e1000e: 'Intel I219/I218',
  igb: 'Intel I350',
  igbvf: 'Intel I350 VF',
  ixgbe: 'Intel X540/X550',
  ixgbevf: 'Intel X540/X550 VF',
  iwlwifi: 'Intel Wireless',
  iwlmvm: 'Intel Wireless',
  ath9k: 'Atheros AR9xxx',
  ath10k: 'Qualcomm Atheros',
  b43: 'Broadcom B43',
  brcmfmac: 'Broadcom FullMAC',
  bnx2: 'Broadcom NetXtreme II',
  tg3: 'Broadcom Tigon3',
  mlx4_core: 'Mellanox ConnectX',
  mlx5_core: 'Mellanox ConnectX-5',
  rtl8192ce: 'Realtek RTL8192CE',
  rtl8192cu: 'Realtek RTL8192CU',
  rtl8821ce: 'Realtek RTL8821CE',
  rtl8822ce: 'Realtek RTL8822CE',
  rtw_8821cu: 'Realtek RTL8821CU',
}

function driverToChipset(driver: string): string {
  return DRIVER_CHIPSET_MAP[driver] || driver
}
