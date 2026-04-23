'use client';

import { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js';
import type { Locale } from '@/lib/i18n/config';
import { formatCurrency, toMajor, type Currency } from '@/lib/currency';

// Register once per module load
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
);

const CATEGORY_COLORS: Record<string, string> = {
  Fuel: '#0E3B5C',
  Maintenance: '#C14B3A',
  Marina: '#B8812E',
  Insurance: '#2C6E8F',
  Parts: '#4A5F7D',
  Services: '#6B8299',
  Storage: '#7AA3BC',
  Other: '#888780',
};

interface SpendingChartProps {
  monthlyData: Record<string, Record<string, number>>; // {'2026-01': {Fuel: 120, ...}}
  currency: Currency;
  locale: Locale;
}

export function SpendingByMonthChart({ monthlyData, currency, locale }: SpendingChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const months = Object.keys(monthlyData).sort();
    const categories = Array.from(
      new Set(months.flatMap((m) => Object.keys(monthlyData[m]))),
    );

    const datasets = categories.map((cat) => ({
      label: cat,
      data: months.map((m) => Math.round(toMajor(monthlyData[m][cat] ?? 0))),
      backgroundColor: CATEGORY_COLORS[cat] ?? '#888780',
      borderRadius: 3,
    }));

    const monthLabels = months.map((m) => {
      const [y, mo] = m.split('-');
      return new Date(Number(y), Number(mo) - 1).toLocaleDateString(locale, {
        month: 'short',
      });
    });

    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: { labels: monthLabels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) =>
                `${c.dataset.label}: ${formatCurrency(Number(c.parsed.y), currency, locale)}`,
            },
          },
        },
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              callback: (v) => formatCurrency(Number(v), currency, locale, { compact: true }),
              font: { size: 11, family: 'Inter' },
              color: '#4A5F7D',
            },
            grid: { color: 'rgba(10,22,40,0.06)' },
          },
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { size: 11, family: 'Inter' }, color: '#4A5F7D' },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [monthlyData, currency, locale]);

  return (
    <div className="relative w-full h-[280px]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Monthly spending breakdown by category"
      />
    </div>
  );
}

interface CategoryChartProps {
  byCategory: Record<string, number>; // {Fuel: 1200_00, ...} in minor units
  currency: Currency;
  locale: Locale;
}

export function CategoryPieChart({ byCategory, currency, locale }: CategoryChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const labels = Object.keys(byCategory);
    const data = labels.map((k) => Math.round(toMajor(byCategory[k])));
    const colors = labels.map((k) => CATEGORY_COLORS[k] ?? '#888780');

    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          { data, backgroundColor: colors, borderWidth: 2, borderColor: '#F5F1EA' },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              padding: 10,
              font: { size: 11, family: 'Inter' },
              color: '#2C2622',
              generateLabels: (chart) =>
                (chart.data.labels as string[]).map((label, i) => ({
                  text: `${label}  ${formatCurrency(
                    (chart.data.datasets[0].data as number[])[i],
                    currency,
                    locale,
                  )}`,
                  fillStyle: (chart.data.datasets[0].backgroundColor as string[])[i],
                  strokeStyle: (chart.data.datasets[0].backgroundColor as string[])[i],
                  index: i,
                })),
            },
          },
          tooltip: {
            callbacks: {
              label: (c) =>
                `${c.label}: ${formatCurrency(Number(c.parsed), currency, locale)}`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [byCategory, currency, locale]);

  return (
    <div className="relative w-full h-[280px]">
      <canvas ref={canvasRef} role="img" aria-label="Expense categories" />
    </div>
  );
}
