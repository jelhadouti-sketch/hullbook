'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';
import { formatCurrency, toMajor, type Currency } from '@/lib/currency';

interface Entry {
  id: string;
  kind: string;
  occurred_on: string;
  category: string;
  merchant: string | null;
  note: string | null;
  amount_minor: number;
  currency: string;
  engine_hours_delta: number | null;
}

interface Boat {
  id: string;
  name: string;
  type: string;
  length_ft: number | null;
  year: number | null;
  make: string | null;
  model: string | null;
}

interface Props {
  locale: Locale;
  dict: TranslationShape;
  currency: Currency;
  boat: Boat;
  entries: Entry[];
  ownerName: string;
}

export function OwnershipReport({
  locale,
  dict,
  currency,
  boat,
  entries,
  ownerName,
}: Props) {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);

  const expenses = entries.filter((e) => e.kind === 'expense' || e.kind === 'service');
  const trips = entries.filter((e) => e.kind === 'trip');
  const inCurrency = expenses.filter((e) => e.currency === currency);
  const totalSpent = inCurrency.reduce((acc, e) => acc + e.amount_minor, 0);
  const totalHours = entries.reduce((acc, e) => acc + (e.engine_hours_delta ?? 0), 0);

  // Group expenses by category
  const byCategory = new Map<string, { count: number; total: number }>();
  for (const e of inCurrency) {
    const prev = byCategory.get(e.category) ?? { count: 0, total: 0 };
    byCategory.set(e.category, {
      count: prev.count + 1,
      total: prev.total + e.amount_minor,
    });
  }
  const categoryRows = Array.from(byCategory.entries()).sort(
    (a, b) => b[1].total - a[1].total,
  );

  // Period covered
  const dates = entries.map((e) => e.occurred_on).sort();
  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];

  const typeLabel =
    (dict.boat[
      `type${boat.type.charAt(0).toUpperCase() + boat.type.slice(1)}` as keyof typeof dict.boat
    ] as string) ?? boat.type;

  const handleExport = async () => {
    setGenerating(true);
    try {
      // Dynamic imports to keep main bundle small
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = margin;

      // Header bar (brass accent line)
      doc.setFillColor(184, 129, 46); // brass
      doc.rect(margin + 80, margin - 20, pageWidth - 2 * margin - 160, 4, 'F');

      // Title
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(74, 95, 125);
      doc.text('HULLBOOK', margin, y);
      y += 30;

      doc.setFontSize(28);
      doc.setTextColor(8, 41, 68);
      doc.text(dict.report.title, margin, y);
      y += 22;

      doc.setFontSize(11);
      doc.setTextColor(74, 95, 125);
      doc.text(dict.report.subtitle, margin, y);
      y += 28;

      // Meta grid (prepared for, generated, period)
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 18;

      doc.setFontSize(9);
      doc.setTextColor(74, 95, 125);
      doc.text(`${dict.report.generatedOn}:`, margin, y);
      doc.text(`${dict.report.periodCovered}:`, margin + 200, y);
      doc.text('Prepared for:', pageWidth - margin - 150, y);
      y += 14;
      doc.setFontSize(11);
      doc.setTextColor(10, 22, 40);
      doc.text(new Date().toLocaleDateString(locale), margin, y);
      doc.text(
        firstDate && lastDate
          ? `${new Date(firstDate).toLocaleDateString(locale)} – ${new Date(lastDate).toLocaleDateString(locale)}`
          : '—',
        margin + 200,
        y,
      );
      doc.text(ownerName.slice(0, 30), pageWidth - margin - 150, y);
      y += 28;

      // Boat details box
      doc.setFontSize(9);
      doc.setTextColor(74, 95, 125);
      doc.text(dict.report.boatDetails.toUpperCase(), margin, y);
      y += 14;
      doc.setFontSize(14);
      doc.setTextColor(8, 41, 68);
      doc.text(boat.name, margin, y);
      y += 16;
      doc.setFontSize(10);
      doc.setTextColor(74, 95, 125);
      const boatMeta = [
        typeLabel,
        boat.length_ft ? `${boat.length_ft} ft` : null,
        boat.year ? String(boat.year) : null,
        boat.make,
        boat.model,
      ]
        .filter(Boolean)
        .join(' · ');
      doc.text(boatMeta, margin, y);
      y += 28;

      // Summary KPIs
      doc.setFontSize(9);
      doc.setTextColor(74, 95, 125);
      doc.text(dict.report.summary.toUpperCase(), margin, y);
      y += 14;

      const kpiWidth = (pageWidth - 2 * margin - 30) / 4;
      const kpis = [
        { label: dict.dashboard.totalSpent, value: formatCurrency(toMajor(totalSpent), currency, locale) },
        { label: dict.dashboard.engineHours, value: totalHours.toFixed(1) },
        { label: dict.dashboard.entryCount, value: String(entries.length) },
        { label: dict.dashboard.boats, value: typeLabel },
      ];
      kpis.forEach((k, i) => {
        const x = margin + i * (kpiWidth + 10);
        doc.setFillColor(245, 241, 234);
        doc.rect(x, y, kpiWidth, 56, 'F');
        doc.setFontSize(8);
        doc.setTextColor(74, 95, 125);
        doc.text(k.label, x + 10, y + 16);
        doc.setFontSize(14);
        doc.setTextColor(8, 41, 68);
        doc.text(k.value.slice(0, 20), x + 10, y + 38);
      });
      y += 76;

      // Category breakdown table
      doc.setFontSize(9);
      doc.setTextColor(74, 95, 125);
      doc.text(dict.report.incomeSection.toUpperCase(), margin, y);
      y += 10;

      autoTable(doc, {
        startY: y,
        head: [[dict.report.category, dict.report.count, dict.report.total]],
        body: [
          ...categoryRows.map(([cat, stats]) => [
            cat,
            String(stats.count),
            formatCurrency(toMajor(stats.total), currency, locale),
          ]),
          [
            { content: dict.report.total, styles: { fontStyle: 'bold' } },
            { content: String(inCurrency.length), styles: { fontStyle: 'bold' } },
            {
              content: formatCurrency(toMajor(totalSpent), currency, locale),
              styles: { fontStyle: 'bold' },
            },
          ],
        ],
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 8 },
        headStyles: { fillColor: [14, 59, 92], textColor: 250, fontStyle: 'bold' },
        columnStyles: { 1: { halign: 'right' }, 2: { halign: 'right' } },
        theme: 'grid',
      });

      // @ts-expect-error autoTable extends doc with lastAutoTable
      y = doc.lastAutoTable.finalY + 24;

      // Service history table (last 40 service entries)
      const services = entries
        .filter((e) => e.kind === 'service')
        .slice(-40)
        .reverse();
      if (services.length > 0) {
        if (y > 650) {
          doc.addPage();
          y = margin;
        }
        doc.setFontSize(9);
        doc.setTextColor(74, 95, 125);
        doc.text(dict.report.servicesSection.toUpperCase(), margin, y);
        y += 10;

        autoTable(doc, {
          startY: y,
          head: [[dict.entry.occurredOn, dict.entry.merchant, dict.entry.category, dict.report.total]],
          body: services.map((s) => [
            new Date(s.occurred_on).toLocaleDateString(locale),
            s.merchant ?? '',
            s.category,
            formatCurrency(toMajor(s.amount_minor), s.currency as Currency, locale),
          ]),
          styles: { font: 'helvetica', fontSize: 9, cellPadding: 6 },
          headStyles: { fillColor: [14, 59, 92], textColor: 250, fontStyle: 'bold' },
          columnStyles: { 3: { halign: 'right' } },
          theme: 'grid',
        });
      }

      // Footer disclaimer on last page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        const footerY = doc.internal.pageSize.getHeight() - 24;
        doc.text(
          `HullBook · ${boat.name} · ${i}/${pageCount}`,
          margin,
          footerY,
        );
        doc.text('hullbook.com', pageWidth - margin, footerY, { align: 'right' });
      }

      // Disclaimer on final page, above footer
      doc.setPage(pageCount);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      const disclaimerLines = doc.splitTextToSize(
        dict.report.disclaimer,
        pageWidth - 2 * margin,
      );
      doc.text(
        disclaimerLines,
        margin,
        doc.internal.pageSize.getHeight() - 48,
      );

      const filename = `HullBook-${boat.name.replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <button
            onClick={() => router.back()}
            className="text-sm text-ink-mute hover:text-sea mb-2"
          >
            ← {dict.common.back}
          </button>
          <h1 className="font-serif text-4xl font-normal text-sea-deep">
            {dict.report.title}
          </h1>
          <p className="text-ink-mute mt-1">{boat.name}</p>
        </div>
        <button
          onClick={handleExport}
          disabled={generating}
          className="px-5 py-3 bg-sea text-paper-cream font-medium hover:bg-coral transition-colors disabled:opacity-60"
        >
          {generating ? dict.report.exportButtonGenerating : dict.report.exportButton}
        </button>
      </div>

      {/* Report preview */}
      <div className="bg-paper-cream border border-black/15 p-8 md:p-14 relative">
        <div className="absolute top-0 left-[20%] right-[20%] h-2 bg-brass" />

        <div className="flex justify-between items-start pb-6 border-b border-black/15 mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-mute mb-4">
              {dict.report.title}
            </div>
            <div className="font-serif text-3xl text-sea-deep mb-2">{boat.name}</div>
            <div className="text-sm text-ink-mute">
              {typeLabel}
              {boat.length_ft ? ` · ${boat.length_ft} ft` : ''}
              {boat.year ? ` · ${boat.year}` : ''}
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-mute mb-2">
              Prepared for
            </div>
            <div className="font-medium">{ownerName}</div>
            <div className="text-ink-mute mt-2">
              {dict.report.generatedOn}: {new Date().toLocaleDateString(locale)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <ReportKpi label={dict.dashboard.totalSpent} value={formatCurrency(toMajor(totalSpent), currency, locale)} />
          <ReportKpi label={dict.dashboard.engineHours} value={totalHours.toFixed(1)} />
          <ReportKpi label={dict.dashboard.entryCount} value={String(entries.length)} />
          <ReportKpi
            label={dict.report.periodCovered}
            value={
              firstDate && lastDate
                ? `${new Date(firstDate).getFullYear()}–${new Date(lastDate).getFullYear()}`
                : '—'
            }
          />
        </div>

        <section className="mb-8">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-4">
            {dict.report.incomeSection}
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/15">
                <th className="text-left py-2 font-medium text-ink-mute text-xs">
                  {dict.report.category}
                </th>
                <th className="text-right py-2 font-medium text-ink-mute text-xs">
                  {dict.report.count}
                </th>
                <th className="text-right py-2 font-medium text-ink-mute text-xs">
                  {dict.report.total}
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryRows.map(([cat, stats]) => (
                <tr key={cat} className="border-b border-black/5">
                  <td className="py-3">{cat}</td>
                  <td className="py-3 text-right font-mono tabular-nums">{stats.count}</td>
                  <td className="py-3 text-right font-serif tabular-nums">
                    {formatCurrency(toMajor(stats.total), currency, locale)}
                  </td>
                </tr>
              ))}
              <tr className="font-medium">
                <td className="pt-4">{dict.report.total}</td>
                <td className="pt-4 text-right font-mono tabular-nums">{inCurrency.length}</td>
                <td className="pt-4 text-right font-serif tabular-nums text-lg">
                  {formatCurrency(toMajor(totalSpent), currency, locale)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <p className="text-xs text-ink-mute leading-relaxed pt-6 border-t border-black/15">
          {dict.report.disclaimer}
        </p>
      </div>
    </div>
  );
}

function ReportKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper-fog p-4">
      <div className="text-[11px] uppercase tracking-wider text-ink-mute mb-2">{label}</div>
      <div className="font-serif text-xl text-sea-deep tabular-nums">{value}</div>
    </div>
  );
}
