/**
 * High Score Screenshot Utility
 * 
 * Captures the game canvas and creates an annotated screenshot with high score information.
 * The screenshot includes:
 * - Game viewport screenshot
 * - High score
 * - Public wallet address
 * - Date/time
 * - Nickname
 * - Score
 * - Currency icon + ticker symbol + truncated wallet address
 * - Reward amount
 */

export interface ScreenshotData {
  score: number;
  rewardAmount: string;
  currency: string;
  address: string;
  nickname?: string;
  timestamp: number;
  previousHighScore?: number;
  scoreToBeat?: number;
  gameMode?: string;
  previousRecord?: {
    score: number;
    nickname?: string;
    currency: string;
    address: string;
    timestamp: number;
  };
}

/**
 * Truncate wallet address for display
 */
const truncateAddress = (address: string, startLength: number = 6, endLength: number = 4): string => {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

/**
 * Format date/time for display
 */
const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Load an image from a URL
 */
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Create an annotated screenshot canvas from the game canvas
 * @param gameCanvas The game canvas element to capture
 * @param screenshotData The high score data to annotate
 * @returns A Promise that resolves to a canvas element with the annotated screenshot
 */
export const createHighScoreScreenshot = async (
  gameCanvas: HTMLCanvasElement,
  screenshotData: ScreenshotData
): Promise<HTMLCanvasElement> => {
  const {
    score,
    rewardAmount,
    currency,
    address,
    nickname,
    timestamp,
    previousHighScore,
    scoreToBeat,
    gameMode,
    previousRecord,
  } = screenshotData;

  // Create a new canvas for the annotated screenshot
  const padding = 40;
  const logoHeight = 50; // Extra space for logo at top
  const annotationHeight = 200;
  const gameWidth = gameCanvas.width;
  const gameHeight = gameCanvas.height;
  const totalWidth = gameWidth + padding * 2;
  const totalHeight = gameHeight + annotationHeight + padding * 2 + logoHeight;

  const annotatedCanvas = document.createElement('canvas');
  annotatedCanvas.width = totalWidth;
  annotatedCanvas.height = totalHeight;
  const ctx = annotatedCanvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2d context for screenshot canvas');
  }

  // Fill background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // Draw dinoDash logo and title in upper left corner
  const logoSize = 32;
  const logoX = padding;
  const logoY = 10;
  
  try {
    const logo = await loadImage('/dinoDash.svg');
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
  } catch (error) {
    console.warn('Failed to load dinoDash logo:', error);
  }

  // Draw "dinoDash" text next to logo
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  const dinoDashTextY = logoY + logoSize / 2 - 12;
  ctx.fillText('dinoDash', logoX + logoSize + 8, dinoDashTextY);
  
  // Draw "HighScore:" below "dinoDash"
  ctx.font = 'bold 16px Arial, sans-serif';
  const highScoreTextY = dinoDashTextY + 28;
  const highScoreText = `HighScore: ${score.toLocaleString()}`;
  const highScoreX = logoX + logoSize + 8;
  ctx.fillText(highScoreText, highScoreX, highScoreTextY);
  
  // Draw "Score To Beat" to the right of "HighScore" if available
  if (scoreToBeat !== undefined) {
    const highScoreWidth = ctx.measureText(highScoreText).width;
    const scoreToBeatX = highScoreX + highScoreWidth + 20; // 20px spacing
    ctx.fillText(`Score To Beat: ${scoreToBeat.toLocaleString()}`, scoreToBeatX, highScoreTextY);
  }

  // Draw date/time in upper right corner
  ctx.textAlign = 'right';
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = '#666666';
  const dateTimeY = logoY + 10;
  ctx.fillText(formatDateTime(timestamp), totalWidth - padding, dateTimeY);
  
  // Draw previous high score below date/time if available
  if (previousHighScore !== undefined) {
    ctx.fillText(`Previous: ${previousHighScore.toLocaleString()}`, totalWidth - padding, dateTimeY + 20);
  }

  // Draw game screenshot (moved down to make room for logo and HighScore text)
  const gameYOffset = highScoreTextY + 40; // Extra space for logo + HighScore text + spacing
  ctx.drawImage(gameCanvas, padding, gameYOffset, gameWidth, gameHeight);

  // Draw border around game screenshot
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeRect(padding, gameYOffset, gameWidth, gameHeight);

  // Draw game mode and "HIGH SCORE ACHIEVEMENT" centered in the game viewport
  ctx.save();
  const centerX = padding + gameWidth / 2;
  const centerY = gameYOffset + gameHeight / 2;
  
  // Set font before measuring text
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Measure texts
  const achievementText = 'HIGH SCORE ACHIEVEMENT';
  const achievementTextWidth = ctx.measureText(achievementText).width;
  const gameModeText = gameMode || '';
  const gameModeTextWidth = gameMode ? ctx.measureText(gameModeText).width : 0;
  
  // Calculate combined width and height
  const maxTextWidth = Math.max(achievementTextWidth, gameModeTextWidth);
  const textHeight = 30;
  const lineSpacing = 10;
  const overlayHeight = gameMode ? textHeight * 2 + lineSpacing : textHeight;
  const bgPadding = 20;
  
  // Draw semi-transparent background for better visibility
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(
    centerX - maxTextWidth / 2 - bgPadding,
    centerY - overlayHeight / 2 - bgPadding / 2,
    maxTextWidth + bgPadding * 2,
    overlayHeight + bgPadding
  );
  
  // Draw game mode above if available
  if (gameMode) {
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(gameModeText, centerX, centerY - textHeight / 2 - lineSpacing / 2);
  }
  
  // Draw the achievement text
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillStyle = '#000000';
  ctx.fillText(achievementText, centerX, centerY + (gameMode ? textHeight / 2 + lineSpacing / 2 : 0));
  ctx.restore();

  // Load currency icon
  let currencyIcon: HTMLImageElement | null = null;
  try {
    const iconPath = `/assets/icons/crypto/${currency.toLowerCase()}.svg`;
    currencyIcon = await loadImage(iconPath);
  } catch (error) {
    console.warn(`Failed to load currency icon for ${currency}:`, error);
  }

  // Set up text styles
  const titleFont = 'bold 24px Arial, sans-serif';
  const labelFont = '14px Arial, sans-serif';
  const valueFont = 'bold 16px Arial, sans-serif';
  const smallFont = '12px Arial, sans-serif';

  const startY = gameHeight + gameYOffset + 20;
  let currentY = startY;

  // Draw score (removed "HIGH SCORE ACHIEVEMENT" title)
  ctx.fillStyle = '#000000';
  ctx.font = valueFont;
  ctx.textAlign = 'left';
  ctx.fillText(`Score: ${score.toLocaleString()}`, padding, currentY);
  currentY += 25;

  // Draw reward amount
  ctx.fillText(`Reward: ${rewardAmount} ${currency}`, padding, currentY);
  currentY += 30; // Extra spacing before currency line

  // Draw currency icon + ticker + truncated address (inline)
  const currencyText = `${currency}://${truncateAddress(address)}`;
  const iconSize = 20; // Slightly smaller to fit better inline
  const iconX = padding;
  const iconY = currentY - iconSize / 2; // Center icon with text baseline

  // Draw currency icon inline with text
  if (currencyIcon) {
    ctx.drawImage(currencyIcon, iconX, iconY, iconSize, iconSize);
  }

  ctx.font = valueFont;
  ctx.textBaseline = 'middle'; // Align text with icon center
  ctx.fillText(currencyText, iconX + iconSize + 8, currentY);
  ctx.textBaseline = 'alphabetic'; // Reset to default
  currentY += 25;

  // Draw wallet address (full)
  ctx.font = labelFont;
  ctx.fillStyle = '#666666';
  ctx.fillText(`Wallet: ${address}`, padding, currentY);
  currentY += 20;

  // Draw nickname if available
  if (nickname) {
    ctx.fillText(`Nickname: ${nickname}`, padding, currentY);
    currentY += 20;
  }

  // Draw previous high score section if available
  if (previousRecord) {
    currentY += 15; // Extra spacing before previous record section
    
    // Section label
    ctx.font = labelFont;
    ctx.fillStyle = '#666666';
    ctx.fillText('Previous High Score:', padding, currentY);
    currentY += 20;
    
    // Previous high score
    ctx.font = valueFont;
    ctx.fillStyle = '#000000';
    ctx.fillText(`Score: ${previousRecord.score.toLocaleString()}`, padding, currentY);
    currentY += 25;
    
    // Previous nickname if available
    if (previousRecord.nickname) {
      ctx.font = labelFont;
      ctx.fillStyle = '#666666';
      ctx.fillText(`Nickname: ${previousRecord.nickname}`, padding, currentY);
      currentY += 20;
    }
    
    // Load previous record currency icon
    let previousCurrencyIcon: HTMLImageElement | null = null;
    try {
      const previousIconPath = `/assets/icons/crypto/${previousRecord.currency.toLowerCase()}.svg`;
      previousCurrencyIcon = await loadImage(previousIconPath);
    } catch (error) {
      console.warn(`Failed to load previous currency icon for ${previousRecord.currency}:`, error);
    }
    
    // Draw previous currency icon + ticker + truncated address (inline)
    const previousCurrencyText = `${previousRecord.currency}://${truncateAddress(previousRecord.address)}`;
    const previousIconX = padding;
    const previousIconY = currentY - iconSize / 2; // Center icon with text baseline
    
    // Draw previous currency icon inline with text
    if (previousCurrencyIcon) {
      ctx.drawImage(previousCurrencyIcon, previousIconX, previousIconY, iconSize, iconSize);
    }
    
    ctx.font = valueFont;
    ctx.textBaseline = 'middle'; // Align text with icon center
    ctx.fillStyle = '#000000';
    ctx.fillText(previousCurrencyText, previousIconX + iconSize + 8, currentY);
    ctx.textBaseline = 'alphabetic'; // Reset to default
    currentY += 25;
    
    // Draw previous date/time
    ctx.font = labelFont;
    ctx.fillStyle = '#666666';
    ctx.fillText(`Date: ${formatDateTime(previousRecord.timestamp)}`, padding, currentY);
    currentY += 20;
  }

  // Draw Greenfire logo in bottom right corner
  // Maintain original aspect ratio: viewBox="0 0 139.69 191.94" (width:height ≈ 0.727:1)
  const greenfireLogoHeight = 40;
  const greenfireLogoWidth = greenfireLogoHeight * (139.69 / 191.94); // Maintain aspect ratio
  const greenfireLogoX = totalWidth - greenfireLogoWidth - padding;
  const greenfireLogoY = totalHeight - greenfireLogoHeight - 10;
  
  // Draw website URL to the left of the Greenfire logo
  const websiteUrl = 'https://greenfire.io';
  ctx.font = '12px Arial, sans-serif';
  ctx.fillStyle = '#666666';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const urlSpacing = 10; // Space between URL and logo
  const urlX = greenfireLogoX - urlSpacing;
  const urlY = greenfireLogoY + greenfireLogoHeight / 2; // Vertically center with logo
  ctx.fillText(websiteUrl, urlX, urlY);
  
  try {
    const greenfireLogo = await loadImage('/assets/icons/greenfire/proper/greenfire.svg');
    ctx.drawImage(greenfireLogo, greenfireLogoX, greenfireLogoY, greenfireLogoWidth, greenfireLogoHeight);
  } catch (error) {
    console.warn('Failed to load Greenfire logo:', error);
  }

  return annotatedCanvas;
};

/**
 * Convert canvas to blob (for saving/uploading)
 */
export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to convert canvas to blob'));
      }
    }, 'image/png');
  });
};

/**
 * Convert canvas to data URL (for preview/download)
 */
export const canvasToDataURL = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png');
};

/**
 * Download the screenshot as a PNG file
 */
export const downloadScreenshot = (canvas: HTMLCanvasElement, filename: string = 'high-score-screenshot.png'): void => {
  const dataURL = canvasToDataURL(canvas);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  link.click();
};

