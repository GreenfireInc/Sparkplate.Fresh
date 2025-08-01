# App Tray Icons

This directory contains system tray icons generated from the Sparkplate SVG logo.

## Generated Files

### Windows
- `appbar.ico` - Multi-resolution ICO file for Windows system tray

### macOS/Linux (Template Images)
- `appbarTemplate.png` - 16x16px template icon
- `appbarTemplate@2x.png` - 32x32px high-DPI template icon
- `appbarTemplate@1.25x.png` - 20x20px template icon
- `appbarTemplate@1.5x.png` - 24x24px template icon

### macOS Template Variants
- `appbarTemplateTemplate.png` - Black template version (16x16)
- `appbarTemplate@2xTemplate.png` - Black template version (32x32)
- `appbarTemplate@1.25xTemplate.png` - Black template version (20x20)
- `appbarTemplate@1.5xTemplate.png` - Black template version (24x24)

## Usage

These icons are automatically used by the `appTray.js` utility:

```javascript
import appTray from './background/functions/utils/electron/appTray.js'

// Enable system tray
appTray.setAppTray({
  status: true,
  createWindow: createMainWindow,
  win: mainWindow
})
```

## Regenerating Icons

To regenerate these icons from the source SVG:

```bash
npm run generate-tray-icons
```

This will convert `public/assets/icons/greenfire/sparkplate.svg` to all required tray icon formats.

## macOS Template Images

Template images automatically adapt to light/dark menu bars on macOS. They should consist of:
- Black pixels for the icon shape
- Transparent pixels for empty areas
- No color information (macOS adds color based on system theme)

## File Requirements

- **Windows**: `.ico` format with multiple sizes embedded
- **macOS**: `.png` template images with `Template` suffix (optional)
- **Linux**: `.png` format icons

## Size Requirements

- **16x16**: Standard density
- **20x20**: 125% scaling (1.25x)
- **24x24**: 150% scaling (1.5x)  
- **32x32**: 200% scaling (2x)

The system will automatically choose the appropriate size based on display scaling.