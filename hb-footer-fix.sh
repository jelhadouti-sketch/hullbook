#!/bin/bash
set -e
cd ~/Desktop/hullbook

python3 << 'PY'
from pathlib import Path
p = Path("app/[locale]/(marketing)/page.tsx")
src = p.read_text()
orig = src

src = src.replace(
    '<a href="#" className="hover:text-paper-cream transition">{dict.footer.privacy}</a>',
    '<a href={`/${locale}/privacy`} className="hover:text-paper-cream transition">{dict.footer.privacy}</a>'
)
src = src.replace(
    '<a href="#" className="hover:text-paper-cream transition">{dict.footer.terms}</a>',
    '<a href={`/${locale}/terms`} className="hover:text-paper-cream transition">{dict.footer.terms}</a>'
)

if src != orig:
    p.write_text(src)
    print("✓ footer links fixed")
else:
    print("⚠ no replacement made")
PY

# Verify the page has access to `locale`
grep -n "locale" "app/[locale]/(marketing)/page.tsx" | head -5

git add -A && git commit -m "Wire footer Privacy/Terms links to /privacy and /terms" && git push
