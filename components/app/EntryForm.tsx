'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toMinor, type Currency } from '@/lib/currency';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';

type EntryKind = 'expense' | 'trip' | 'service';

interface Props {
  locale: Locale;
  dict: TranslationShape;
  currency: Currency;
  boats: { id: string; name: string }[];
  presetBoatId?: string;
}

export function EntryForm({ locale, dict, currency, boats, presetBoatId }: Props) {
  const router = useRouter();
  const [boatId, setBoatId] = useState(presetBoatId ?? boats[0]?.id ?? '');
  const [kind, setKind] = useState<EntryKind>('expense');
  const [occurredOn, setOccurredOn] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState('Fuel');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [hours, setHours] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const categories = [
    { value: 'Fuel', label: dict.entry.categoryFuel },
    { value: 'Maintenance', label: dict.entry.categoryMaintenance },
    { value: 'Marina', label: dict.entry.categoryMarina },
    { value: 'Insurance', label: dict.entry.categoryInsurance },
    { value: 'Parts', label: dict.entry.categoryParts },
    { value: 'Services', label: dict.entry.categoryServices },
    { value: 'Storage', label: dict.entry.categoryStorage },
    { value: 'Other', label: dict.entry.categoryOther },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!boatId) {
      setError(dict.common.errorGeneric);
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const parsedAmount = amount ? Number(amount) : 0;
      const parsedHours = hours ? Number(hours) : null;

      const { error: err } = await supabase.from('entries').insert({
        user_id: user.id,
        boat_id: boatId,
        kind,
        occurred_on: occurredOn,
        category,
        merchant: merchant.trim() || null,
        note: note.trim() || null,
        amount_minor: toMinor(parsedAmount),
        currency,
        engine_hours_delta: parsedHours,
      });
      if (err) {
        setError(dict.common.errorGeneric);
        return;
      }
      router.push(`/${locale}/boats/${boatId}`);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label={dict.entry.kind}>
        <div className="grid grid-cols-3 gap-2">
          {(['expense', 'trip', 'service'] as EntryKind[]).map((k) => (
            <button
              type="button"
              key={k}
              onClick={() => setKind(k)}
              className={`py-2.5 text-sm border transition-colors ${
                kind === k
                  ? 'bg-sea text-paper-cream border-sea'
                  : 'bg-paper-cream border-black/15 hover:border-sea'
              }`}
            >
              {dict.entry[`kind${k.charAt(0).toUpperCase() + k.slice(1)}` as 'kindExpense' | 'kindTrip' | 'kindService']}
            </button>
          ))}
        </div>
      </Field>

      {boats.length > 1 && (
        <Field label={dict.dashboard.boats}>
          <select
            value={boatId}
            onChange={(e) => setBoatId(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          >
            {boats.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field label={dict.entry.occurredOn}>
        <input
          type="date"
          required
          value={occurredOn}
          onChange={(e) => setOccurredOn(e.target.value)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        />
      </Field>

      <Field label={dict.entry.category}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={dict.entry.merchant}>
        <input
          type="text"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        />
      </Field>

      {kind !== 'trip' && (
        <Field label={`${dict.entry.amount} (${currency})`}>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          />
        </Field>
      )}

      {(kind === 'trip' || kind === 'service') && (
        <Field label={dict.entry.engineHoursDelta}>
          <input
            type="number"
            step="0.1"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          />
        </Field>
      )}

      <Field label={dict.entry.note}>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors resize-none"
        />
      </Field>

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
