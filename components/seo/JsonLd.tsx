interface Props {
  locale: string;
}

export function LandingJsonLd({ locale }: Props) {
  const base = 'https://www.hullbook.com'
  const url = `${base}/${locale}`

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HullBook',
    url: base,
    logo: `${base}/icon-512.png`,
    description: 'Expense, maintenance, and cost tracker built for boat owners.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@hullbook.com',
      availableLanguage: ['English', 'Dutch', 'French', 'German', 'Spanish', 'Italian'],
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HullBook',
    url: base,
    inLanguage: locale,
  }

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'HullBook',
    operatingSystem: 'Web, iOS, Android',
    applicationCategory: 'BusinessApplication',
    description: 'Track every expense, service, and engine hour. Save thousands on maintenance and boost your boat\'s resale value.',
    offers: [
      {
        '@type': 'Offer',
        price: '9.00',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '9.00',
          priceCurrency: 'USD',
          billingDuration: 'P1M',
        },
      },
      {
        '@type': 'Offer',
        price: '86.00',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '86.00',
          priceCurrency: 'USD',
          billingDuration: 'P1Y',
        },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I cancel anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. One click cancels. No phone calls, no retention offers. Export all your data for 90 days after.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does it work offline at the marina?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Entries made offline sync automatically when you are back online. Designed for slow marina Wi-Fi.',
        },
      },
      {
        '@type': 'Question',
        name: 'What boats does HullBook support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Any boat. Sailboats, powerboats, trawlers, pontoons, jet skis, tenders. Not tied to any engine brand.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I import my existing records?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Import from spreadsheets, CSV exports, or enter manually.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my financial data safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Encrypted at rest and in transit. We never share or sell your data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is it $9 per month?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The average boat owner saves more than $9 in the first month — missed service reminders and tax-deductible expenses alone cover the cost.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}
