"use client";

import { ChevronDown, Download, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { defaultDesign, themePresets } from '@/lib/defaults';
import { getScanabilityReport } from '@/lib/scanability';
import { loadActiveDesign, saveActiveDesign } from '@/lib/storage';
import { QrDesign } from '@/lib/types';
import { exportCompositionBlob, fileToDataUrl, QrPreview } from './qr-preview';
import { Badge, Button, Field, Input, Panel, Select, TextArea } from './ui';

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function sanitizeDesign(design: QrDesign): QrDesign {
  if (design.contentType === 'url') {
    const trimmed = design.contentValue.trim();
    if (trimmed && !/^https?:\/\//i.test(trimmed)) {
      return { ...design, contentValue: `https://${trimmed}` };
    }
  }
  return design;
}

function toneForScore(status: ReturnType<typeof getScanabilityReport>['status']) {
  if (status === 'strong') return 'good';
  if (status === 'good') return 'default';
  if (status === 'warning') return 'warning';
  return 'danger';
}

export function StudioPage() {
  const [design, setDesign] = useState<QrDesign>(defaultDesign);
  const [lastExport, setLastExport] = useState('');

  useEffect(() => {
    setDesign(loadActiveDesign(defaultDesign));
  }, []);

  useEffect(() => {
    saveActiveDesign(design);
  }, [design]);

  const scanability = useMemo(() => getScanabilityReport(design), [design]);
  const theme = themePresets.find((entry) => entry.id === design.themeId) ?? themePresets[0];

  const patchDesign = (patch: Partial<QrDesign>) => setDesign((current) => sanitizeDesign({ ...current, ...patch }));

  const applyTheme = (themeId: string) => {
    const selected = themePresets.find((entry) => entry.id === themeId);
    if (!selected) return;
    setDesign((current) => sanitizeDesign({ ...current, ...selected.patch, themeId: selected.id }));
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    patchDesign({ logoDataUrl: dataUrl });
  };

  const handleExport = async (extension: 'png' | 'svg') => {
    const blob = await exportCompositionBlob(design, extension);
    if (!blob) return;
    downloadBlob(blob, `cool-qr.${extension}`);
    setLastExport(`${extension.toUpperCase()} exported`);
  };

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-6 lg:px-8 lg:py-10">
      <header className="mb-8 border-b pb-6" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-[56rem]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ background: 'var(--accent-soft)', color: 'var(--text)' }}>
            <Sparkles className="h-3.5 w-3.5" /> Cool QR Codes Studio
          </div>
          <h1 className="max-w-[11ch] text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.06em]">Make a QR and export it.</h1>
          <p className="mt-4 max-w-[46ch] text-base leading-7 muted">No login, no projects, no extra setup. Just enter a link or text, tweak the look, and download.</p>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <Panel title="Basics" subtitle="Only the controls most people need.">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Type">
                  <Select value={design.contentType} onChange={(event) => patchDesign({ contentType: event.target.value as QrDesign['contentType'] })}>
                    <option value="url">URL</option>
                    <option value="text">Text</option>
                  </Select>
                </Field>
                <Field label="Theme">
                  <Select value={design.themeId} onChange={(event) => applyTheme(event.target.value)}>
                    {themePresets.map((preset) => <option key={preset.id} value={preset.id}>{preset.name}</option>)}
                  </Select>
                </Field>
              </div>
              <Field label="Content">
                <TextArea rows={5} value={design.contentValue} onChange={(event) => patchDesign({ contentValue: event.target.value })} placeholder="https://your-link.com" />
              </Field>
              <Field label="Label">
                <Input value={design.ctaText} onChange={(event) => patchDesign({ ctaText: event.target.value })} placeholder="Scan Me" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Foreground"><Input type="color" value={design.foregroundColor} onChange={(event) => patchDesign({ foregroundColor: event.target.value })} /></Field>
                <Field label="Background"><Input type="color" value={design.backgroundColor} onChange={(event) => patchDesign({ backgroundColor: event.target.value })} /></Field>
              </div>
            </div>
          </Panel>

          <details className="surface rounded-[2rem] p-5 lg:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold" style={{ color: 'var(--text)' }}>
              <span>More options</span>
              <ChevronDown className="h-4 w-4" />
            </summary>
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Error correction">
                  <Select value={design.errorCorrectionLevel} onChange={(event) => patchDesign({ errorCorrectionLevel: event.target.value as QrDesign['errorCorrectionLevel'] })}>
                    <option value="L">Low</option>
                    <option value="M">Medium</option>
                    <option value="Q">Quartile</option>
                    <option value="H">High</option>
                  </Select>
                </Field>
                <Field label="Frame">
                  <Select value={design.frameStyle} onChange={(event) => patchDesign({ frameStyle: event.target.value as QrDesign['frameStyle'] })}>
                    <option value="none">None</option>
                    <option value="soft">Soft</option>
                    <option value="bold">Bold</option>
                    <option value="pill">Pill</option>
                  </Select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Modules">
                  <Select value={design.dotStyle} onChange={(event) => patchDesign({ dotStyle: event.target.value as QrDesign['dotStyle'] })}>
                    <option value="square">Square</option>
                    <option value="rounded">Rounded</option>
                    <option value="dots">Dots</option>
                    <option value="classy">Classy</option>
                    <option value="classy-rounded">Classy rounded</option>
                    <option value="extra-rounded">Extra rounded</option>
                  </Select>
                </Field>
                <Field label="Eyes">
                  <Select value={design.eyeStyle} onChange={(event) => patchDesign({ eyeStyle: event.target.value as QrDesign['eyeStyle'] })}>
                    <option value="square">Square</option>
                    <option value="dot">Rounded</option>
                    <option value="extra-rounded">Soft</option>
                  </Select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Eye color"><Input type="color" value={design.eyeColor} onChange={(event) => patchDesign({ eyeColor: event.target.value })} /></Field>
                <Field label="Quiet zone">
                  <div className="flex items-center gap-3">
                    <input type="range" min={8} max={40} value={design.quietZone} onChange={(event) => patchDesign({ quietZone: Number(event.target.value) })} className="w-full" />
                    <span className="w-10 text-right text-sm font-semibold">{design.quietZone}</span>
                  </div>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Gradient">
                  <Select value={String(design.useGradient)} onChange={(event) => patchDesign({ useGradient: event.target.value === 'true' })}>
                    <option value="false">Off</option>
                    <option value="true">On</option>
                  </Select>
                </Field>
                <Field label="Transparent background">
                  <Select value={String(design.transparentBackground)} onChange={(event) => patchDesign({ transparentBackground: event.target.value === 'true' })}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </Select>
                </Field>
              </div>
              {design.useGradient ? (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Gradient start"><Input type="color" value={design.gradientStart} onChange={(event) => patchDesign({ gradientStart: event.target.value })} /></Field>
                  <Field label="Gradient end"><Input type="color" value={design.gradientEnd} onChange={(event) => patchDesign({ gradientEnd: event.target.value })} /></Field>
                </div>
              ) : null}
              <Field label="Logo upload">
                <Input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleLogoUpload} />
              </Field>
            </div>
          </details>

          <Panel title="Export" subtitle="Download when it looks right.">
            <div className="space-y-4">
              <Field label="Export size">
                <Select value={String(design.exportSize)} onChange={(event) => patchDesign({ exportSize: Number(event.target.value) })}>
                  <option value="512">512px — web</option>
                  <option value="1024">1024px — social</option>
                  <option value="2048">2048px — print</option>
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => handleExport('png')}><Download className="mr-2 h-4 w-4" />PNG</Button>
                <Button variant="ghost" onClick={() => handleExport('svg')}><Download className="mr-2 h-4 w-4" />SVG</Button>
              </div>
              {lastExport ? <div className="rounded-[1.25rem] px-4 py-3 text-sm font-medium" style={{ background: 'color-mix(in oklab, var(--success) 14%, transparent)', color: 'var(--success)' }}>{lastExport}</div> : null}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Preview" subtitle="The QR is the main thing.">
            <div className="mx-auto max-w-[560px] rounded-[2.2rem] border p-4 md:p-6" style={{ borderColor: 'var(--line)', background: 'var(--bg-soft)' }}>
              <div className="rounded-[1.9rem] p-5 md:p-7" style={{ background: design.transparentBackground ? 'var(--panel)' : design.backgroundColor }}>
                {design.ctaText ? <div className="mb-5 text-center text-[clamp(1.35rem,2vw,1.7rem)] font-semibold tracking-[-0.04em]" style={{ color: design.transparentBackground ? 'var(--text)' : design.foregroundColor }}>{design.ctaText}</div> : null}
                <div className="flex justify-center">
                  <QrPreview design={design} />
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="default">{theme.name}</Badge>
              <Badge tone={toneForScore(scanability.status)}>{scanability.score}/100</Badge>
              <Badge tone="default">{design.exportSize}px</Badge>
            </div>
          </Panel>

          <Panel title="Scanability" subtitle="A quick check before you export.">
            <div className="grid gap-5 md:grid-cols-[120px_minmax(0,1fr)] md:items-start">
              <div>
                <div className="text-[2.5rem] font-semibold tracking-[-0.06em]">{scanability.score}</div>
                <Badge tone={toneForScore(scanability.status)}>{scanability.status.toUpperCase()}</Badge>
              </div>
              <div className="space-y-3 text-sm leading-6" style={{ color: 'var(--muted)' }}>
                {scanability.issues.length === 0 ? <div>No blocking issues detected.</div> : scanability.issues.map((issue) => <div key={issue}>• {issue}</div>)}
                <div className="rounded-[1.4rem] p-4" style={{ background: 'var(--bg-soft)' }}>
                  <div className="mb-1 font-semibold" style={{ color: 'var(--text)' }}>Suggestions</div>
                  {scanability.suggestions.map((suggestion) => <div key={suggestion}>• {suggestion}</div>)}
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </section>
    </main>
  );
}
