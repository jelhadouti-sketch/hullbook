'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toMinor } from '@/lib/currency';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';

type BoatType = 'sailboat' | 'powerboat' | 'trawler' | 'pontoon' | 'jetski' | 'other';

interface Props {
  locale: Locale;
  dict: TranslationShape;
  initial?: {
    id: string;
    name: string;
    type: BoatType;
    length_ft: number | null;
    year: number | null;
    make: string | null;
    model: string | null;
  };
}

export function BoatForm({ locale, dict, initial }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState<BoatType>(initial?.type ?? 'sailboat');
  const [lengthFt, setLengthFt] = useState(initial?.length_ft?.toString() ?? '');
  const [year, setYear] = useState(initial?.year?.toString() ?? '');
  const [make, setMake] = useState(initial?.make ?? '');
  const [model, setModel] = useState(initial?.model ?? '');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError(dict.common.errorGeneric);
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const payload = {
        user_id: user.id,
        name: name.trim(),
        type,
        length_ft: lengthFt ? Number(lengthFt) : null,
        year: year ? Number(year) : null,
        make: make.trim() || null,
        model: model.trim() || null,
      };

      if (initial) {
        const { error: err } = await supabase
          .from('boats')
          .update(payload)
          .eq('id', initial.id);
        if (err) {
          setError(dict.common.errorGeneric);
          return;
        }
        router.push(`/${locale}/boats/${initial.id}`);
      } else {
        const { data, error: err } = await supabase
          .from('boats')
          .insert(payload)
          .select('id')
          .single();
        if (err || !data) {
          setError(dict.common.errorGeneric);
          return;
        }
        router.push(`/${locale}/boats/${data.id}`);
      }
      router.refresh();
    });
  };

  const typeOptions: { value: BoatType; label: string }[] = [
    { value: 'sailboat', label: dict.boat.typeSailboat },
    { value: 'powerboat', label: dict.boat.typePowerboat },
    { value: 'trawler', label: dict.boat.typeTrawler },
    { value: 'pontoon', label: dict.boat.typePontoon },
    { value: 'jetski', label: dict.boat.typeJetski },
    { value: 'other', label: dict.boat.typeOther },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label={dict.boat.name}>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={dict.boat.namePlaceholder}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        />
      </Field>
      <Field label={dict.boat.type}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as BoatType)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label={dict.boat.length}>
          <input
            type="number"
            step="0.1"
            value={lengthFt}
            onChange={(e) => setLengthFt(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          />
        </Field>
        <Field label={dict.boat.year}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label={dict.boat.make}>
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          />
        </Field>
        <Field label={dict.boat.model}>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          />
        </Field>
      </div>
      {error && (
        <div role="alert" className="text-coral text-sm">
          {error}
        </div>
      )}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 bg-sea text-paper-cream font-medium hover:bg-coral transition-colors disabled:opacity-60"
        >
          {pending ? dict.common.loading : dict.common.save}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-black/15 hover:bg-paper-fog transition-colors"
        >
          {dict.common.cancel}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-soft mb-2">{label}</span>
      {children}
    </label>
  );
}
