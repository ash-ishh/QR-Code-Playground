export type DotStyle = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerStyle = 'square' | 'dot' | 'extra-rounded';
export type PositionPreset = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

export type QrDesign = {
  contentType: 'url' | 'text';
  contentValue: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  foregroundColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
  useGradient: boolean;
  gradientStart: string;
  gradientEnd: string;
  dotStyle: DotStyle;
  eyeStyle: CornerStyle;
  eyeInnerStyle: CornerStyle;
  eyeColor: string;
  quietZone: number;
  frameStyle: 'none' | 'soft' | 'bold' | 'pill';
  ctaText: string;
  framePadding: number;
  logoDataUrl?: string;
  logoSize: number;
  logoBackground: 'none' | 'circle' | 'rounded' | 'square';
  themeId: string;
  exportSize: number;
};

export type ScanabilityReport = {
  score: number;
  status: 'strong' | 'good' | 'warning' | 'risky';
  issues: string[];
  suggestions: string[];
};

export type ThemePreset = {
  id: string;
  name: string;
  description: string;
  patch: Partial<QrDesign>;
};

export type ProjectRecord = {
  id: string;
  name: string;
  design: QrDesign;
  updatedAt: string;
};

export type BrandKit = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoDataUrl?: string;
  defaultThemeId: string;
  defaultCtaText: string;
};

export type VideoOverlayDraft = {
  sourceType: 'upload' | 'url';
  sourceName?: string;
  sourceUrl?: string;
  startTime: number;
  endTime: number;
  position: PositionPreset;
  scale: number;
  opacity: number;
  includePlate: boolean;
  includeText: boolean;
  text: string;
};
