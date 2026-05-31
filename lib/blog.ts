export interface BlogPost {
  slug: string
  title: string
  description: string
  keywords: string[]
  publishedAt: string
  readMinutes: number
  // Body is markdown-lite — paragraphs separated by blank lines, ## for h2
  body: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-much-does-it-cost-to-own-a-boat',
    title: 'How Much Does It Really Cost to Own a Boat Per Year?',
    description: 'Real numbers from boat owners on the true annual cost of boat ownership — fuel, marina, insurance, maintenance, and the hidden expenses nobody tells you about.',
    keywords: ['boat ownership cost', 'cost of owning a boat', 'annual boat expenses', 'boat budget'],
    publishedAt: '2026-05-15',
    readMinutes: 8,
    body: `Most boat owners underestimate their annual costs by 30 to 50 percent. The brochure says one number. The bank statement tells another story. Here is what it actually costs to own a boat per year — by boat size, by use case, and by region.

## The 10 percent rule (and why it is wrong)

The classic advice is that you will spend 10 percent of your boat's value per year on operating costs. For a $50,000 boat that is $5,000 a year. In reality, our data from hundreds of owners shows the number is closer to 15 to 20 percent for active owners. The 10 percent figure assumes you barely use the boat.

## The five categories of cost

**Marina or storage** is usually the biggest single line item. A wet slip in a popular harbor runs $400 to $1,200 per month depending on length. Dry storage is cheaper but adds haul-and-launch fees.

**Fuel** scales with usage but also with engine type. A 30-foot powerboat with a single outboard burning premium fuel can easily spend $2,000 to $4,000 a season in fuel alone.

**Insurance** is roughly 1 to 2 percent of hull value annually. A $100,000 boat means $1,000 to $2,000 in premiums.

**Routine maintenance** — oil changes, impellers, zincs, bottom paint, winterization — typically costs $1,500 to $3,500 per year for a mid-sized boat.

**Major repairs** are the wild card. A blown impeller is $300. A blown transmission is $15,000. This is where most owners get blindsided. Tracking your maintenance history is the single best way to prevent the big surprises.

## Hidden costs nobody mentions

Surveys every two years for insurance ($600+). Annual safety equipment replacement ($200). Dinghy and outboard ($3,000+). Cleaning supplies, electronics updates, line replacement, transducer batteries. These add up to $1,000 to $2,000 a year.

## How to actually budget

The honest formula: take the 10 percent rule, then add 50 percent. Then track every dollar with an app like HullBook so next year you have a real number, not a guess.

## Save thousands by tracking properly

Owners who use HullBook report saving $1,500 to $3,500 per year. Not because they spend less — but because they catch preventable maintenance before it becomes a $15,000 repair, claim every tax-deductible expense, and walk into resale with the documentation that justifies a higher price.`,
  },
  {
    slug: 'boat-maintenance-checklist',
    title: 'The Complete Boat Maintenance Checklist (Daily, Monthly, Annually)',
    description: 'Every boat maintenance task you should be doing — broken down by daily, monthly, seasonal, and annual frequency. Print this list or track it digitally.',
    keywords: ['boat maintenance checklist', 'boat maintenance schedule', 'monthly boat maintenance', 'annual boat servicing'],
    publishedAt: '2026-05-08',
    readMinutes: 7,
    body: `Every dollar you spend on preventive maintenance saves you ten on emergency repairs. This is the complete checklist owners use to keep their boats running and hold their value.

## Before every trip (5 minutes)

Check oil level. Check coolant. Verify battery charge. Check bilge for water. Confirm safety equipment (life jackets, fire extinguisher, flares not expired). Test bilge pump. Verify drain plug installed.

## After every trip (10 minutes)

Flush engine with fresh water if used in salt. Wipe down vinyl and gelcoat. Empty trash. Check bilge again. Lock up and tarp if outside.

## Monthly

Check engine zincs and replace if more than 50 percent corroded. Inspect prop for damage or fishing line. Test all electronics. Lubricate steering. Wash hull thoroughly. Check all hose clamps. Inspect raw water pump impeller (especially in heavy use).

## Quarterly

Change engine oil and filter (or every 100 hours, whichever comes first). Replace fuel filter. Inspect belts for cracking. Check battery terminals and clean if corroded. Inspect through-hull fittings.

## Annually

Replace impeller (regardless of condition). Service the lower unit (drive lube change). Replace anodes throughout. Service the propeller (re-pitch if needed). Bottom paint touch-up or full repaint. Compression test on engine. Full battery test or replace if more than 3 years old.

## Every two years

Full hull survey if insurance requires it. Replace flare and safety equipment that expires. Inspect rigging on sailboats. Drop the engine for inspection and re-bedding if applicable.

## The cost of skipping maintenance

Skipping an impeller change ($200) can blow your engine ($15,000). Skipping bottom paint ($800) can sink hull resale value by $5,000. Skipping anodes ($150) can eat through your shaft and transducer ($3,000).

## How HullBook helps

HullBook builds your maintenance schedule automatically based on engine hours and calendar. You get a reminder when each task is due — and a full PDF record when you go to sell.`,
  },
  {
    slug: 'track-boat-expenses-taxes',
    title: 'How to Track Boat Expenses for Tax Deductions (US, EU, UK)',
    description: 'Boat expense tracking for tax season — what is deductible, what records to keep, and how to make tax time effortless whether your boat is a business or personal use.',
    keywords: ['boat tax deductions', 'boat expenses taxes', 'boat business deduction', 'charter boat tax'],
    publishedAt: '2026-05-01',
    readMinutes: 6,
    body: `If your boat is used for business, charter, fishing as a profession, or you take clients aboard, many expenses are deductible. Even for personal-use boats there are deductions available — interest on the loan in the US, for example, can qualify as a second home mortgage deduction.

## What you can deduct (United States)

If the boat is for business or charter use, you can typically deduct fuel, marina fees, insurance, repairs, depreciation, captain's wages, and provisioning. For personal boats with a head, galley, and berth, the loan interest can qualify under the second-home mortgage interest deduction (subject to limits).

## What you can deduct (UK and EU)

VAT on commercial vessels is recoverable. Charter and tour operators can deduct all operational costs. For private vessels, deductions are limited but maintenance and fuel for business use can be claimed proportionally.

## The records you need

The IRS, HMRC, and EU tax authorities all want the same thing: receipts and a logbook. Every receipt must show date, vendor, amount, and what was purchased. Your logbook must show date of each trip, business purpose, hours used, and who was aboard.

## Mileage and use logs

If you use the boat partially for business, the deduction is proportional. You need a log showing total hours and business hours separately. This is impossible to reconstruct at the end of the year — you have to track it as you go.

## The single biggest mistake

Mixing personal and business expenses on one card. Use a dedicated card or account for boat expenses. The audit risk drops dramatically and the records become trivial to compile.

## How HullBook makes this effortless

Every expense logged is automatically categorized. Every trip records hours and purpose. At tax time, export a full PDF report showing every business expense, every hour logged, with full backup receipts. Your accountant will thank you.`,
  },
  {
    slug: 'best-boat-ownership-apps-2026',
    title: 'Best Boat Ownership and Maintenance Apps Compared (2026)',
    description: 'Honest comparison of the top boat ownership apps — features, pricing, what each does well, and which is right for your boat and budget.',
    keywords: ['best boat apps', 'boat maintenance app', 'boat ownership software', 'boat management app'],
    publishedAt: '2026-04-20',
    readMinutes: 5,
    body: `There are now half a dozen serious apps for boat owners. We compared them on what actually matters: how much they save you in time and dollars, and how easy they are to actually use day to day.

## What to look for

Receipt capture (photo of paper or PDF). Automatic categorization. Engine hours tracking. Service schedule generator. Multi-boat support if you have more than one. Tax export. PDF ownership report for resale.

## The honest comparison

**HullBook** ($9 per boat per month). Strongest on cost tracking and tax exports. Built-in service schedule. Full PDF reports. 14-day trial.

**BoatCloud** ($15 per month). Strongest on commercial use cases — charter ops, fleet management. Overkill for individual owners.

**Wavve** ($7 per month). Lightweight. Strong on trip logging, weak on maintenance scheduling.

**Argo** (free). Trip planning only. Not actually an ownership tracker.

**Spreadsheets** (free). Works if you are disciplined. Most owners fall off within 3 months because manual entry is tedious.

## What matters most

The app you actually use is the one that pays for itself. The fanciest features mean nothing if entry takes more than 30 seconds. The boats that get tracked are the ones where logging an expense is one photo and one tap.

## Our recommendation

For most owners: HullBook at $9 a month pays for itself in the first quarter through better service timing alone. Try it free for 14 days, and the 30-day refund means there is zero risk.`,
  },
  {
    slug: 'increase-boat-resale-value',
    title: 'How to Increase Your Boat\'s Resale Value (Proven Strategies)',
    description: 'Boat resale value comes down to documentation, presentation, and timing. Here is exactly what surveyors and buyers look for — and how to maximize your sale price.',
    keywords: ['boat resale value', 'increase boat value', 'sell boat for more', 'boat survey preparation'],
    publishedAt: '2026-04-12',
    readMinutes: 6,
    body: `A boat with complete records sells for 10 to 20 percent more than an otherwise identical boat without records. The difference is not the boat — it is the buyer's confidence. Here is how to maximize that confidence and that price.

## The single highest-ROI thing you can do

Keep a complete maintenance log. Every service, every part, every dollar. When a buyer or surveyor sees a printed PDF of every transaction since you owned the boat, the entire negotiation changes. You are not negotiating from a position of uncertainty — you are showing receipts.

## Surveyor preparation

A pre-listing survey costs $500 to $1,000 and almost always pays for itself. You find the small issues before the buyer does. You fix what you choose to fix, disclose the rest, and remove the buyer's biggest fear — that there are hidden problems.

## Presentation matters more than you think

Clean every locker. Polish the gelcoat. Replace cracked vinyl. Update navigation electronics if more than 10 years old. Steam-clean upholstery. Detail the engine compartment. The buyer's first impression is worth thousands.

## Timing the sale

Boats sell for the most in spring (March to May), the least in late fall (October to November). If you can wait, list in early March. If you cannot, accept a 10 to 15 percent discount for off-season selling.

## Pricing strategy

Look at completed sales (not listings) on YachtWorld and Boat Trader for similar boats. Price 5 percent above your target. Buyers expect to negotiate down.

## The documentation that matters

Title and registration in your name and current. Insurance records. All service receipts, ideally in chronological order. Original owner's manuals. Recent survey if you have one. Engine hour log. Bottom paint history. Battery age. Sail age for sailboats.

## How HullBook helps at resale time

One click generates a full PDF of every expense, service, and trip from day one of your ownership. Hand it to your broker or to the buyer directly. The buyer sees confidence, transparency, and a well-cared-for boat. The negotiation starts higher and ends higher.`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
