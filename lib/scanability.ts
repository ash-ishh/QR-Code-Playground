import { QrDesign, ScanabilityReport } from './types';

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized;
  const int = Number.parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getScanabilityReport(design: QrDesign): ScanabilityReport {
  let score = 100;
  const issues: string[] = [];
  const suggestions: string[] = [];

  const contrast = contrastRatio(design.foregroundColor, design.backgroundColor);
  if (contrast < 3.5) {
    score -= 28;
    issues.push('Foreground/background contrast is too low for reliable scanning.');
    suggestions.push('Increase contrast between QR dots and background.');
  } else if (contrast < 5) {
    score -= 12;
    issues.push('Contrast is borderline for some camera conditions.');
    suggestions.push('Aim for a stronger dark/light separation.');
  }

  if (design.logoDataUrl && design.logoSize > 0.28) {
    score -= 22;
    issues.push('Center logo may cover too many modules.');
    suggestions.push('Reduce logo size below 28% of QR width.');
  }

  if (design.quietZone < 16) {
    score -= 20;
    issues.push('Quiet zone is small; scanners may struggle to isolate the code.');
    suggestions.push('Use at least 16-20px quiet zone in most exports.');
  }

  if (design.useGradient && design.dotStyle === 'dots') {
    score -= 8;
    issues.push('Gradient with circular dots can reduce edge clarity.');
    suggestions.push('Use rounded or square dots if scan performance matters more than style.');
  }

  if (design.exportSize < 512) {
    score -= 10;
    issues.push('Export size is small for posters or dense content.');
    suggestions.push('Use 1024px+ for print or distance scanning.');
  }

  if (design.transparentBackground) {
    score -= 6;
    issues.push('Transparent backgrounds need strong placement contrast in final usage.');
    suggestions.push('Place transparent QR codes on clean, high-contrast surfaces only.');
  }

  if (design.contentValue.length > 120 && design.dotStyle !== 'square') {
    score -= 8;
    issues.push('Long content creates a dense QR matrix that is less tolerant of heavy styling.');
    suggestions.push('Shorten the URL or use simpler module shapes.');
  }

  const bounded = Math.max(0, Math.min(100, score));
  const status = bounded >= 85 ? 'strong' : bounded >= 70 ? 'good' : bounded >= 50 ? 'warning' : 'risky';

  if (issues.length === 0) {
    suggestions.push('Looks healthy. Test on at least one real phone camera before shipping.');
  }

  return { score: bounded, status, issues, suggestions };
}
