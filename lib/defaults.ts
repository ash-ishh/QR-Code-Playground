import { BrandKit, QrDesign, ThemePreset, VideoOverlayDraft } from './types';

export const defaultDesign: QrDesign = {
  contentType: 'url',
  contentValue: 'https://example.com',
  errorCorrectionLevel: 'H',
  foregroundColor: '#111827',
  backgroundColor: '#ffffff',
  transparentBackground: false,
  useGradient: false,
  gradientStart: '#8b5cf6',
  gradientEnd: '#06b6d4',
  dotStyle: 'rounded',
  eyeStyle: 'extra-rounded',
  eyeInnerStyle: 'dot',
  eyeColor: '#111827',
  quietZone: 20,
  frameStyle: 'soft',
  ctaText: 'Scan Me',
  framePadding: 24,
  logoSize: 0.22,
  logoBackground: 'rounded',
  themeId: 'minimal-monochrome',
  exportSize: 1024,
};

export const themePresets: ThemePreset[] = [
  {
    id: 'minimal-monochrome',
    name: 'Minimal Monochrome',
    description: 'Clean black on white with understated framing.',
    patch: { foregroundColor: '#111827', backgroundColor: '#ffffff', useGradient: false, dotStyle: 'rounded', eyeStyle: 'extra-rounded', eyeColor: '#111827', frameStyle: 'soft', ctaText: 'Scan Me' },
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Electric violet to cyan glow for creator links.',
    patch: { foregroundColor: '#67e8f9', backgroundColor: '#020617', useGradient: true, gradientStart: '#8b5cf6', gradientEnd: '#22d3ee', dotStyle: 'dots', eyeStyle: 'dot', eyeColor: '#f8fafc', frameStyle: 'bold', ctaText: 'Enter Now' },
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted soft contrast with airy framing.',
    patch: { foregroundColor: '#0f172a', backgroundColor: '#dbeafe', useGradient: true, gradientStart: '#ffffff', gradientEnd: '#93c5fd', dotStyle: 'rounded', frameStyle: 'pill', ctaText: 'Open Link' },
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    description: 'Warm pink-orange premium event vibe.',
    patch: { foregroundColor: '#7c2d12', backgroundColor: '#fff7ed', useGradient: true, gradientStart: '#f97316', gradientEnd: '#ec4899', dotStyle: 'classy-rounded', eyeColor: '#9a3412', frameStyle: 'bold', ctaText: 'RSVP' },
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Gold-on-charcoal upscale brand aesthetic.',
    patch: { foregroundColor: '#fde68a', backgroundColor: '#111827', useGradient: true, gradientStart: '#fde68a', gradientEnd: '#d97706', dotStyle: 'classy', eyeStyle: 'square', eyeColor: '#fef3c7', frameStyle: 'pill', ctaText: 'Exclusive Access' },
  },
  {
    id: 'retro-pixel',
    name: 'Retro Pixel',
    description: 'Sharp 8-bit styling for playful drops.',
    patch: { foregroundColor: '#1d4ed8', backgroundColor: '#fef08a', useGradient: false, dotStyle: 'square', eyeStyle: 'square', eyeInnerStyle: 'square', eyeColor: '#1e3a8a', frameStyle: 'bold', ctaText: 'Play' },
  },
  {
    id: 'corporate-clean',
    name: 'Corporate Clean',
    description: 'Professional and trustworthy for business assets.',
    patch: { foregroundColor: '#0f172a', backgroundColor: '#f8fafc', useGradient: false, dotStyle: 'rounded', eyeStyle: 'extra-rounded', eyeColor: '#2563eb', frameStyle: 'soft', ctaText: 'Visit Site' },
  },
  {
    id: 'pastel-cute',
    name: 'Pastel Cute',
    description: 'Soft candy colors with rounded forms.',
    patch: { foregroundColor: '#db2777', backgroundColor: '#fdf2f8', useGradient: true, gradientStart: '#f9a8d4', gradientEnd: '#c4b5fd', dotStyle: 'dots', eyeStyle: 'dot', eyeColor: '#ec4899', frameStyle: 'pill', ctaText: 'See More' },
  },
  {
    id: 'dark-tech',
    name: 'Dark Tech',
    description: 'Deep graphite with cool blue signal energy.',
    patch: { foregroundColor: '#e2e8f0', backgroundColor: '#020617', useGradient: true, gradientStart: '#334155', gradientEnd: '#38bdf8', dotStyle: 'rounded', eyeStyle: 'extra-rounded', eyeColor: '#f8fafc', frameStyle: 'soft', ctaText: 'Watch Now' },
  },
  {
    id: 'creator-pop',
    name: 'Creator Pop',
    description: 'High-energy contrast for social promos.',
    patch: { foregroundColor: '#ffffff', backgroundColor: '#18181b', useGradient: true, gradientStart: '#f43f5e', gradientEnd: '#8b5cf6', dotStyle: 'extra-rounded', eyeStyle: 'dot', eyeColor: '#facc15', frameStyle: 'bold', ctaText: 'Tap In' },
  },
];

export const defaultBrandKit: BrandKit = {
  id: 'default-brand-kit',
  name: 'Studio Brand Kit',
  primaryColor: '#8b5cf6',
  secondaryColor: '#22d3ee',
  fontFamily: 'Inter, sans-serif',
  defaultThemeId: 'minimal-monochrome',
  defaultCtaText: 'Scan Me',
};

export const defaultVideoOverlay: VideoOverlayDraft = {
  sourceType: 'upload',
  startTime: 5,
  endTime: 12,
  position: 'bottom-right',
  scale: 0.22,
  opacity: 0.96,
  includePlate: true,
  includeText: true,
  text: 'Scan to learn more',
};
