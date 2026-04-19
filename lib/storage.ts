import { BrandKit, ProjectRecord, QrDesign } from './types';

const PROJECTS_KEY = 'cool-qr-projects';
const BRAND_KIT_KEY = 'cool-qr-brand-kit';
const ACTIVE_DESIGN_KEY = 'cool-qr-active-design';

export function loadProjects(): ProjectRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(PROJECTS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveProjects(projects: ProjectRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function loadBrandKit<T>(fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(BRAND_KIT_KEY) ?? JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export function saveBrandKit(kit: BrandKit) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(BRAND_KIT_KEY, JSON.stringify(kit));
}

export function loadActiveDesign(fallback: QrDesign): QrDesign {
  if (typeof window === 'undefined') return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(ACTIVE_DESIGN_KEY) ?? JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export function saveActiveDesign(design: QrDesign) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ACTIVE_DESIGN_KEY, JSON.stringify(design));
}
