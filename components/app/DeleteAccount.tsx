'use client';
/* hullbook: DeleteAccount component (Apple Guideline 5.1.1(v)) */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle } from 'lucide-react';

export function DeleteAccount({ locale }: { locale: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/account/delete', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error((data && data.error) || 'delete_failed');
      }
      router.replace(`/${locale}`);
    } catch {
      setError('Something went wrong. Please try again or contact support.');
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 bg-white border border-red-200 rounded-2xl p-8 md:p-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h2 className="font-serif text-xl text-ink">Delete account</h2>
      </div>
      <p className="text-ink/60 text-sm mb-6">
        Permanently delete your HullBook account and all associated data. This action
        cannot be undone.
      </p>

      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex items-center gap-2 rounded-full border border-red-300 text-red-600 px-5 py-2.5 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete my account
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-ink/70">
            Type <span className="font-semibold">DELETE</span> to confirm.
          </p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="DELETE"
            className="w-full max-w-xs rounded-lg border border-black/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={text !== 'DELETE' || loading}
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {loading ? 'Deleting…' : 'Permanently delete'}
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirming(false);
                setText('');
                setError(null);
              }}
              className="text-sm text-ink/60 hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
