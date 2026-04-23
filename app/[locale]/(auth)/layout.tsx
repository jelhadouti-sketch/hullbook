import { LogoMark } from '@/components/marketing/LogoMark';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-[1280px] mx-auto w-full px-5 sm:px-10 py-6">
        <Link href="/" className="inline-flex items-center gap-3 font-serif font-medium text-[22px] tracking-tight text-sea">
          <LogoMark className="w-8 h-8" />
          HullBook
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>
    </div>
  );
}
