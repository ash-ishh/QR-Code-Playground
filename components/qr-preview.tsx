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
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total + titleHeight}" viewBox="0 0 ${total} ${total + titleHeight}">
        <rect width="100%" height="100%" fill="transparent" />
        <rect x="6" y="6" width="${total - 12}" height="${total + titleHeight - 12}" rx="${rx}" fill="${logoBg}" stroke="${stroke}" stroke-width="4" opacity="0.98" />
        ${design.ctaText ? `<text x="50%" y="52" text-anchor="middle" font-size="36" font-family="Inter, Arial, sans-serif" font-weight="700" fill="${stroke}">${design.ctaText}</text>` : ''}
        <g transform="translate(${framePad}, ${titleHeight - 8})">${qrText.replace(/<\/?svg[^>]*>/g, '')}</g>
      </svg>
    `;
    return new Blob([svg], { type: 'image/svg+xml' });
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
