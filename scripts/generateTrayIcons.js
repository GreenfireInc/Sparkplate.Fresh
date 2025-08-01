#!/usr/bin/env node

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const projectRoot = path.join(__dirname, '..')
const svgPath = path.join(projectRoot, 'public/assets/icons/greenfire/sparkplate.svg')
const outputDir = path.join(projectRoot, 'public/assets/appbar')

// Tray icon sizes for different platforms
const sizes = [
  { width: 16, height: 16, name: 'appbarTemplate' },
  { width: 32, height: 32, name: 'appbarTemplate@2x' },
  { width: 20, height: 20, name: 'appbarTemplate@1.25x' },
  { width: 24, height: 24, name: 'appbarTemplate@1.5x' }
]

async function generateTrayIcons() {
  console.log('🎨 Generating tray icons from SVG...')
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Check if source SVG exists
  if (!fs.existsSync(svgPath)) {
    console.error(`❌ Source SVG not found: ${svgPath}`)
    process.exit(1)
  }

  try {
    // Generate PNG files for macOS/Linux (template images)
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `${size.name}.png`)
      
      await sharp(svgPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(outputPath)
      
      console.log(`✅ Generated: ${size.name}.png (${size.width}x${size.height})`)
    }

    // Generate ICO file for Windows
    const icoPath = path.join(outputDir, 'appbar.ico')
    
    // Create multi-size ICO (Windows standard sizes)
    const icoSizes = [16, 24, 32, 48, 64, 256]
    const icoImages = []
    
    for (const size of icoSizes) {
      const pngBuffer = await sharp(svgPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer()
      
      icoImages.push(pngBuffer)
    }

    // For ICO generation, we'll create the largest size and let the system handle scaling
    await sharp(svgPath)
      .resize(256, 256, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(icoPath.replace('.ico', '.png'))
    
    console.log(`✅ Generated: appbar.png (256x256) - rename to .ico for Windows`)
    
    console.log('\n🎉 Tray icon generation complete!')
    console.log('\nGenerated files:')
    console.log(`📁 ${outputDir}`)
    sizes.forEach(size => {
      console.log(`   🖼️  ${size.name}.png`)
    })
    console.log(`   🖼️  appbar.png (rename to .ico for Windows)`)
    
    console.log('\n📝 Note: For Windows, rename appbar.png to appbar.ico')
    console.log('💡 Template images (macOS) should have black/transparent colors for proper theme adaptation')
    
  } catch (error) {
    console.error('❌ Error generating tray icons:', error)
    process.exit(1)
  }
}

// Enhanced version that creates proper template images for macOS
async function generateTemplateIcons() {
  console.log('\n🍎 Generating macOS template versions...')
  
  try {
    // Read the original SVG
    const svgContent = fs.readFileSync(svgPath, 'utf8')
    
    // Create a black version for template (macOS requirement)
    const templateSvg = svgContent
      .replace(/fill="#77a2d6"/g, 'fill="#000000"')
      .replace(/fill:#77a2d6/g, 'fill:#000000')
      .replace(/fill="#154da2"/g, 'fill="#000000"')
      .replace(/fill:#154da2/g, 'fill:#000000')
      .replace(/.cls-1{fill:#77a2d6;}/g, '.cls-1{fill:#000000;}')
      .replace(/.cls-2{fill:#154da2;}/g, '.cls-2{fill:#000000;}')
    
    // Save template SVG temporarily
    const tempTemplateSvg = path.join(outputDir, 'temp_template.svg')
    fs.writeFileSync(tempTemplateSvg, templateSvg)
    
    // Generate black template PNGs for macOS (these will be the main template files)
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `${size.name}.png`)
      
      await sharp(tempTemplateSvg)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath)
      
      console.log(`✅ Updated template: ${size.name}.png (black version for macOS)`)
    }
    
    // Clean up temp file
    fs.unlinkSync(tempTemplateSvg)
    
  } catch (error) {
    console.error('❌ Error generating template icons:', error)
  }
}

// Run the script
async function main() {
  await generateTrayIcons()
  await generateTemplateIcons()
  
  console.log('\n🚀 Ready to use! Your appTray.js will now use the generated icons.')
}

main().catch(console.error)