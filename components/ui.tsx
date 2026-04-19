"use client";

import { clsx } from 'clsx';
import { ReactNode } from 'react';

export function Panel({ title, subtitle, children, className }: { title: string; subtitle?: string; children: ReactNode; className?: string }) {
  return (
    <section className={clsx('surface rounded-[2rem] p-5 lg:p-6', className)}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight" style={{ color: 'var(--text)' }}>{title}</h2>
        {subtitle ? <p className="mt-1 max-w-[62ch] text-sm leading-6" style={{ color: 'var(--muted)' }}>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2.5">
      <div>
        <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{label}</div>
        {hint ? <div className="mt-1 text-xs leading-5" style={{ color: 'var(--muted)' }}>{hint}</div> : null}
      </div>
      {children}
    </label>
  );
}

const control = 'w-full rounded-2xl border px-3 py-3 text-sm transition';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={clsx(control, props.className)} style={{ borderColor: 'var(--line)', background: 'var(--panel-strong)', color: 'var(--text)' }} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={clsx(control, 'min-h-[120px]', props.className)} style={{ borderColor: 'var(--line)', background: 'var(--panel-strong)', color: 'var(--text)' }} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={clsx(control, props.className)} style={{ borderColor: 'var(--line)', background: 'var(--panel-strong)', color: 'var(--text)' }} />;
}

export function Button({ variant = 'primary', className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }) {
  const map = {
    primary: { background: 'var(--text)', color: 'var(--bg)' },
    secondary: { background: 'var(--accent-soft)', color: 'var(--text)' },
    ghost: { background: 'transparent', color: 'var(--text)', border: '1px solid var(--line)' },
    danger: { background: 'color-mix(in oklab, var(--danger) 16%, transparent)', color: 'var(--danger)', border: '1px solid color-mix(in oklab, var(--danger) 35%, var(--line))' },
  } as const;

  return <button {...props} className={clsx('inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-50', className)} style={map[variant]} />;
}

export function Badge({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'good' | 'warning' | 'danger' }) {
  const map = {
    default: { background: 'var(--bg-soft)', color: 'var(--text)' },
    good: { background: 'color-mix(in oklab, var(--success) 14%, transparent)', color: 'var(--success)' },
    warning: { background: 'color-mix(in oklab, var(--warning) 14%, transparent)', color: 'var(--warning)' },
    danger: { background: 'color-mix(in oklab, var(--danger) 14%, transparent)', color: 'var(--danger)' },
  } as const;

  return <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" style={map[tone]}>{children}</span>;
}
