"use client";

import { useEffect, useMemo, useRef } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { QrDesign } from '@/lib/types';

const qrInstances = new WeakMap<HTMLDivElement, QRCodeStyling>();

function getExtension(path: string) {
  if (path.startsWith('data:image/svg+xml')) return 'svg';
  if (path.startsWith('data:image/jpeg')) return 'jpeg';
  return 'png';
}

function escapeSvgText(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeSvgAttribute(value: string) {
  return escapeSvgText(value).replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function getSvgInnerContent(svgText: string) {
  const withoutXmlDeclaration = svgText.replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, '').trim();
  const match = withoutXmlDeclaration.match(/^<svg\b[^>]*>([\s\S]*)<\/svg>\s*$/i);

  if (match) return match[1];

  return withoutXmlDeclaration.replace(/<\/?svg\b[^>]*>/gi, '');
}

export function buildQrOptions(design: QrDesign, size = design.exportSize): Partial<Options> {
  const hasLogo = Boolean(design.logoDataUrl);
  const imageOptions = {
    hideBackgroundDots: hasLogo,
    imageSize: hasLogo ? design.logoSize : 0,
    margin: hasLogo ? 6 : 0,
  };

  return {
    width: size,
    height: size,
    type: 'svg' as const,
    data: design.contentValue,
    qrOptions: {
      errorCorrectionLevel: design.errorCorrectionLevel,
    },
    dotsOptions: {
      type: design.dotStyle,
      color: design.useGradient ? undefined : design.foregroundColor,
      gradient: design.useGradient
        ? {
            type: 'linear' as const,
            rotation: Math.PI / 4,
            colorStops: [
              { offset: 0, color: design.gradientStart },
              { offset: 1, color: design.gradientEnd },
            ],
          }
        : undefined,
    },
    cornersSquareOptions: {
      type: design.eyeStyle,
      color: design.eyeColor,
    },
    cornersDotOptions: {
      type: design.eyeInnerStyle,
      color: design.eyeColor,
    },
    backgroundOptions: {
      color: design.transparentBackground ? 'transparent' : design.backgroundColor,
    },
    ...(hasLogo ? { image: design.logoDataUrl } : {}),
    imageOptions,
    margin: design.quietZone,
  };
}

export function QrPreview({ design }: { design: QrDesign }) {
  const ref = useRef<HTMLDivElement>(null);
  const options = useMemo(() => buildQrOptions(design, 256), [design]);

  useEffect(() => {
    if (!ref.current) return;

    let instance = qrInstances.get(ref.current);
    if (!instance) {
      instance = new QRCodeStyling(options);
      qrInstances.set(ref.current, instance);
      ref.current.innerHTML = '';
      instance.append(ref.current);
      return;
    }

    instance.update(options);
  }, [options]);

  return <div ref={ref} className="mx-auto flex min-h-[256px] min-w-[256px] items-center justify-center" />;
}

export async function exportQrBlob(design: QrDesign, extension: 'png' | 'svg') {
  const qr = new QRCodeStyling(buildQrOptions(design));
  const raw = await qr.getRawData(extension);
  if (!raw) return null;
  return raw instanceof Blob
    ? raw
    : new Blob([raw instanceof ArrayBuffer ? raw : new Uint8Array(raw)], {
        type: extension === 'svg' ? 'image/svg+xml' : 'image/png',
      });
}

export async function exportCompositionBlob(design: QrDesign, extension: 'png' | 'svg') {
  const qrBlob = await exportQrBlob(design, extension);
  if (!qrBlob) return null;

  if (design.frameStyle === 'none' && !design.ctaText) return qrBlob;

  if (extension === 'svg') {
    const qrText = await qrBlob.text();
    const size = design.exportSize;
    const framePad = design.framePadding;
    const titleHeight = design.ctaText ? 84 : 24;
    const total = size + framePad * 2;
    const bg = design.transparentBackground ? 'transparent' : design.backgroundColor;
    const stroke = design.foregroundColor;
    const rx = design.frameStyle === 'pill' ? 40 : design.frameStyle === 'soft' ? 28 : 14;
    const logoBg = bg === 'transparent' ? '#ffffff' : bg;
    const safeStroke = escapeSvgAttribute(stroke);
    const safeLogoBg = escapeSvgAttribute(logoBg);
    const safeCtaText = escapeSvgText(design.ctaText);
    const qrInnerSvg = getSvgInnerContent(qrText);
    const svg = `<?xml version="1.0" standalone="no"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${total}" height="${total + titleHeight}" viewBox="0 0 ${total} ${total + titleHeight}">
        <rect width="100%" height="100%" fill="transparent" />
        <rect x="6" y="6" width="${total - 12}" height="${total + titleHeight - 12}" rx="${rx}" fill="${safeLogoBg}" stroke="${safeStroke}" stroke-width="4" opacity="0.98" />
        ${design.ctaText ? `<text x="50%" y="52" text-anchor="middle" font-size="36" font-family="Inter, Arial, sans-serif" font-weight="700" fill="${safeStroke}">${safeCtaText}</text>` : ''}
        <g transform="translate(${framePad}, ${titleHeight - 8})">${qrInnerSvg}</g>
      </svg>
    `;
    return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  }

  return qrBlob;
}

export async function fileToDataUrl(file: File) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function inferLogoExtension(dataUrl: string) {
  return getExtension(dataUrl);
}
