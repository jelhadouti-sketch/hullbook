#!/bin/bash
B="https://www.hullbook.com"
echo "=== HullBook SEO Audit ==="
echo ""
echo "[1] Critical endpoints:"
for p in robots.txt sitemap.xml manifest.webmanifest favicon.ico .well-known/security.txt; do
  c=$(curl -s -o /dev/null -w "%{http_code}" "$B/$p")
  echo "  /$p -> $c"
done
echo ""
echo "[2] Landing pages all locales:"
for l in en nl fr de es it; do
  c=$(curl -s -o /dev/null -w "%{http_code}" "$B/$l")
  echo "  /$l -> $c"
done
echo ""
echo "[3] Blog endpoints:"
for u in en/blog en/blog/how-much-does-it-cost-to-own-a-boat en/blog/boat-maintenance-checklist; do
  c=$(curl -s -o /dev/null -w "%{http_code}" "$B/$u")
  echo "  /$u -> $c"
done
echo ""
echo "[4] Meta validation on /en:"
h=$(curl -s "$B/en")
echo "  JSON-LD blocks: $(echo "$h" | grep -o 'application/ld+json' | wc -l | tr -d ' ')"
echo "  hreflang tags: $(echo "$h" | grep -oE 'hrefLang="[a-z]+"' | wc -l | tr -d ' ')"
echo "  og:image: $(echo "$h" | grep -o 'og:image' | wc -l | tr -d ' ')"
echo "  twitter:card: $(echo "$h" | grep -o 'twitter:card' | wc -l | tr -d ' ')"
echo "  canonical: $(echo "$h" | grep -o 'rel="canonical"' | wc -l | tr -d ' ')"
echo "  manifest: $(echo "$h" | grep -o 'rel="manifest"' | wc -l | tr -d ' ')"
echo ""
echo "Done."
