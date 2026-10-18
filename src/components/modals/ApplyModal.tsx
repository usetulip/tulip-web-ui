'use client';

import React, { createContext, useCallback, useContext, useEffect, useId, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Check, Loader2, X } from 'lucide-react';
import homeData from '@/data/home.json';
import { cn } from '@/lib/utils';

// "Apply for Private Access" application form. Any CTA rendered with <ApplyButton>
// opens it; pricing buttons pass their plan so "Preferred tier" starts preselected.

const { apply, pricing } = homeData;
const TIERS = pricing.plans.map((plan) => plan.name);

interface ApplyContextValue {
  openApply: (tier?: string) => void;
}

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function useApplyModal() {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error('useApplyModal must be used inside <ApplyModalProvider>');
  return ctx;
}

export function ApplyModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState<string | undefined>();

  const openApply = useCallback((nextTier?: string) => {
    setTier(nextTier);
    setOpen(true);
  }, []);

  // Pause smooth scrolling behind the modal so the page doesn't move while the form is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <ApplyContext.Provider value={{ openApply }}>
      {children}
      <ApplyModal open={open} onOpenChange={setOpen} initialTier={tier} />
    </ApplyContext.Provider>
  );
}

interface ApplyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  tier?: string;
}

export function ApplyButton({ tier, children, type = 'button', ...props }: ApplyButtonProps) {
  const { openApply } = useApplyModal();
  return (
    <button type={type} aria-haspopup='dialog' onClick={() => openApply(tier)} {...props}>
      {children}
    </button>
  );
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'company' | 'ide' | 'stage' | 'tier';
type FormValues = Record<FieldName, string>;

const EMPTY: FormValues = { name: '', email: '', company: '', ide: '', stage: '', tier: '' };

function validate(values: FormValues) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) errors.email = 'Enter your work email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email, like you@company.com.';
  if (!values.company.trim()) errors.company = 'Enter your company name.';
  if (!values.ide) errors.ide = 'Pick the AI IDE your team uses most.';
  if (!values.stage) errors.stage = 'Pick your project stage.';
  if (!values.tier) errors.tier = 'Pick a tier.';
  return errors;
}

const inputClass =
  'mt-1.5 block w-full rounded-xl border bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-ink/50 focus:ring-2 focus:ring-[#f97518]/25';

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className='text-sm font-medium text-ink'>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className='mt-1.5 text-[13px] text-[#b42318]'>
          {error}
        </p>
      )}
    </div>
  );
}

function ApplyModal({
  open,
  onOpenChange,
  initialTier,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTier?: string;
}) {
  const uid = useId();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  // Each time the modal opens, start from a clean form with the requested tier preselected
  useEffect(() => {
    if (!open) return;
    setValues({ ...EMPTY, tier: initialTier && TIERS.includes(initialTier) ? initialTier : '' });
    setErrors({});
    setStatus('idle');
    setSubmitted(null);
  }, [open, initialTier]);

  const set = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const fieldProps = (field: FieldName) => ({
    id: `${uid}-${field}`,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${uid}-${field}-error` : undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, cohort: apply.cohort }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSubmitted(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const successBody = submitted
    ? apply.success.body
        .replace('{name}', submitted.name.trim().split(/\s+/)[0])
        .replace('{cohort}', apply.cohort)
        .replace('{email}', submitted.email.trim())
    : '';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm data-[state=open]:animate-[apply-fade_0.2s_ease-out]' />
        <Dialog.Content
          data-lenis-prevent
          className='fixed left-1/2 top-1/2 z-[101] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[24px] bg-paper p-6 sm:p-8 shadow-[0_24px_80px_-20px_rgba(30,13,1,0.45)] outline-none data-[state=open]:animate-[apply-rise_0.25s_cubic-bezier(0.2,0.8,0.2,1)]'
        >
          <Dialog.Close
            className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink/70 hover:border-ink/30 hover:text-ink transition-colors'
            aria-label='Close'
          >
            <X className='h-4 w-4' />
          </Dialog.Close>

          {status === 'success' && submitted ? (
            <div className='py-6 text-center' role='status'>
              <span className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe7d2] text-ink'>
                <Check className='h-5 w-5' />
              </span>
              <Dialog.Title className='mt-6 font-serif font-light text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-ink'>
                {apply.success.title}
              </Dialog.Title>
              <Dialog.Description className='mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-ink/70'>
                {successBody}
              </Dialog.Description>
              <dl className='mx-auto mt-6 max-w-xs space-y-1.5 rounded-2xl bg-white p-4 text-left text-sm'>
                {[
                  ['Tier', submitted.tier],
                  ['AI IDE', submitted.ide],
                  ['Stage', submitted.stage],
                ].map(([k, v]) => (
                  <div key={k} className='flex justify-between gap-4'>
                    <dt className='text-ink/55'>{k}</dt>
                    <dd className='text-right font-medium text-ink'>{v}</dd>
                  </div>
                ))}
              </dl>
              <Dialog.Close className='mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-ink/85 transition-colors'>
                Done
              </Dialog.Close>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className='inline-flex items-center gap-2 rounded-full border border-rule bg-white py-1 pl-1 pr-3 text-[13px] text-ink/75'>
                <span className='rounded-full bg-[#ffe7d2] px-2 py-0.5 text-[12px] font-medium text-ink'>{apply.cohort}</span>
                <span className='flex items-center gap-1.5'>
                  <span className='h-1.5 w-1.5 rounded-full bg-[#f97518] animate-pulse motion-reduce:animate-none' aria-hidden='true' />
                  {apply.slots}
                </span>
              </p>
              <Dialog.Title className='mt-5 pr-8 font-serif font-light text-[2.25rem] sm:text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-ink'>
                Apply for <em className='italic'>{apply.accent}</em>
              </Dialog.Title>
              <Dialog.Description className='mt-3 text-[15px] leading-relaxed text-ink/70'>
                {apply.description}
              </Dialog.Description>

              <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4'>
                <Field id={`${uid}-name`} label='Name' error={errors.name}>
                  <input
                    {...fieldProps('name')}
                    type='text'
                    autoComplete='name'
                    value={values.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={cn(inputClass, errors.name ? 'border-[#b42318]/60' : 'border-rule')}
                    placeholder='Ada Lovelace'
                  />
                </Field>
                <Field id={`${uid}-email`} label='Work email' error={errors.email}>
                  <input
                    {...fieldProps('email')}
                    type='email'
                    autoComplete='email'
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={cn(inputClass, errors.email ? 'border-[#b42318]/60' : 'border-rule')}
                    placeholder='ada@company.com'
                  />
                </Field>
                <div className='sm:col-span-2'>
                  <Field id={`${uid}-company`} label='Company name' error={errors.company}>
                    <input
                      {...fieldProps('company')}
                      type='text'
                      autoComplete='organization'
                      value={values.company}
                      onChange={(e) => set('company', e.target.value)}
                      className={cn(inputClass, errors.company ? 'border-[#b42318]/60' : 'border-rule')}
                      placeholder='Analytical Engines Ltd'
                    />
                  </Field>
                </div>

                <fieldset className='sm:col-span-2' aria-describedby={errors.ide ? `${uid}-ide-error` : undefined}>
                  <legend className='text-sm font-medium text-ink'>Primary AI IDE</legend>
                  <div className='mt-1.5 grid grid-cols-3 gap-2'>
                    {apply.ides.map((ide, i) => {
                      const checked = values.ide === ide;
                      return (
                        <label
                          key={ide}
                          className={cn(
                            'flex cursor-pointer items-center justify-center rounded-xl border px-2 py-2.5 text-center text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#f97518]/40',
                            checked ? 'border-ink bg-ink text-paper' : 'border-rule bg-white text-ink hover:border-ink/30'
                          )}
                        >
                          <input
                            id={i === 0 ? `${uid}-ide` : undefined}
                            type='radio'
                            name={`${uid}-ide`}
                            value={ide}
                            checked={checked}
                            onChange={() => set('ide', ide)}
                            className='sr-only'
                          />
                          {ide}
                        </label>
                      );
                    })}
                  </div>
                  {errors.ide && (
                    <p id={`${uid}-ide-error`} className='mt-1.5 text-[13px] text-[#b42318]'>
                      {errors.ide}
                    </p>
                  )}
                </fieldset>

                <Field id={`${uid}-stage`} label='Project stage' error={errors.stage}>
                  <select
                    {...fieldProps('stage')}
                    value={values.stage}
                    onChange={(e) => set('stage', e.target.value)}
                    className={cn(inputClass, 'appearance-none bg-[length:16px] bg-[right_0.85rem_center] bg-no-repeat pr-9', errors.stage ? 'border-[#b42318]/60' : 'border-rule', !values.stage && 'text-ink/40')}
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e0d01' stroke-opacity='0.5' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
                  >
                    <option value='' disabled>
                      Select a stage
                    </option>
                    {apply.stages.map((stage) => (
                      <option key={stage} value={stage} className='text-ink'>
                        {stage}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id={`${uid}-tier`} label='Preferred tier' error={errors.tier}>
                  <select
                    {...fieldProps('tier')}
                    value={values.tier}
                    onChange={(e) => set('tier', e.target.value)}
                    className={cn(inputClass, 'appearance-none bg-[length:16px] bg-[right_0.85rem_center] bg-no-repeat pr-9', errors.tier ? 'border-[#b42318]/60' : 'border-rule', !values.tier && 'text-ink/40')}
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e0d01' stroke-opacity='0.5' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
                  >
                    <option value='' disabled>
                      Select a tier
                    </option>
                    {pricing.plans.map((plan) => (
                      <option key={plan.id} value={plan.name} className='text-ink'>
                        {plan.name} · {plan.price}
                        {plan.period.replace(/\s+/g, '')}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {status === 'error' && (
                <p role='alert' className='mt-5 rounded-xl bg-[#fde8e6] px-4 py-3 text-sm text-[#7a1d14]'>
                  Your application couldn&apos;t be sent. Check your connection and try again.
                </p>
              )}

              <button
                type='submit'
                disabled={status === 'submitting'}
                className='mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#f97518] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e65f00] disabled:cursor-wait disabled:opacity-80'
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
                    Submitting…
                  </>
                ) : (
                  <>
                    {apply.submitLabel}
                    <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                  </>
                )}
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
