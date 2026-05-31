export interface BlogPost {
  slug: string
  title: string
  description: string
  keywords: string[]
  publishedAt: string
  readMinutes: number
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
  {
    slug: 'winterize-boat-checklist',
    title: 'How to Winterize Your Boat: The Complete Step-by-Step Guide',
    description: 'Winterizing your boat properly prevents thousands in spring repairs. Step-by-step guide covering engine, plumbing, fuel system, and hull.',
    keywords: ['winterize boat', 'boat winterization', 'winterizing outboard', 'storing boat winter'],
    publishedAt: '2026-04-05',
    readMinutes: 9,
    body: `A frozen block. A split impeller. A cracked engine head. Every spring, marinas report the same disasters from boats that were not properly winterized. The work takes one weekend in October. Skipping it costs $5,000 to $20,000 in repairs.

## Why winterization matters

Water expands when it freezes — by about 9 percent. Trapped water inside an engine block expanding by 9 percent generates enough force to crack cast iron. The crack is not visible until you start the engine in spring and the cooling water leaks. By then the damage is done.

## Engine winterization

Drain the cooling system completely. Add antifreeze rated for marine use (pink RV antifreeze works for raw-water systems). Fog the engine — spray fogging oil into the carburetor or fuel injectors while the engine is running until it stalls. This coats internal parts and prevents corrosion.

For outboards: tilt the engine fully down to drain water. Replace lower unit gear oil — if water comes out, you have a seal problem to address now.

## Fuel system

Add fuel stabilizer to the tank. Fill the tank completely — full tanks have less air space, less condensation, less water in fuel come spring.

Run the engine for 10 minutes after adding stabilizer so it circulates through the entire fuel system.

## Fresh water and plumbing

Drain every freshwater tank. Drain the water heater (open the bypass valve if you have one). Run antifreeze through the system: open each faucet until pink fluid comes out.

Toilets and holding tanks: flush with antifreeze. Marine heads have flexible hoses that crack easily.

## Hull and exterior

Wash and wax. Even one coat of wax slows winter UV damage. Check the bottom paint and note where it needs touch-up for spring.

Cover the boat. Custom-fit covers cost more but prevent the snow-load disasters that flatten cheap tarps. Make sure water can drain off — pools cause structural damage.

## Battery

Disconnect and remove to indoor storage. Trickle-charge once a month. Cold batteries die fast.

## Document everything

Take photos. Note what you used (which antifreeze, which stabilizer, what gear oil). HullBook owners log every winterization step — when spring comes, you know exactly what was done and when.`,
  },
  {
    slug: 'boat-survey-guide',
    title: 'Marine Survey Guide: What Surveyors Look For (and How to Pass)',
    description: 'Understanding what a marine surveyor checks — the inspection process, common findings, costs, and how to prepare your boat to pass with flying colors.',
    keywords: ['marine survey', 'boat survey', 'marine surveyor', 'pre-purchase survey'],
    publishedAt: '2026-03-25',
    readMinutes: 7,
    body: `A marine survey is a thorough inspection of your boat by a certified surveyor. Insurance companies require them every 5 to 10 years. Lenders require them at purchase. Smart buyers request them before any major transaction. Here is what they check and how to prepare.

## Types of surveys

Pre-purchase survey: most thorough. Buyer pays. Covers structure, systems, safety, and value estimate.

Insurance survey: confirms hull integrity and current value for underwriting. Required periodically by most insurers.

Damage survey: assesses repair scope and cost after an incident.

## What surveyors check

Hull: tap test for delamination, moisture meter readings, blisters, gelcoat cracks, keel and rudder bolt integrity.

Engine: compression test, hours, oil analysis, exhaust system, mounts, alignment.

Electrical: AC and DC systems, grounding, battery condition, panel layout, wire gauge.

Plumbing: through-hulls, seacocks, hoses, holding tank, pumps.

Safety equipment: life jackets, flares, fire extinguishers, navigation lights.

Standing rigging (sailboats): age, condition, swage fittings.

## How long it takes

A typical survey on a 35-foot boat takes 4 to 6 hours. Add 2 to 4 hours for a sea trial if included.

## Costs

Roughly $20 to $30 per foot of boat length. A 40-foot boat survey runs $800 to $1,200. Plus haul-out fees ($300 to $600) if not already on the hard.

## How to prepare

Clean everything. Surveyors see clean boats and assume the rest is also maintained. Dirty boats invite scrutiny.

Have records ready. A binder of maintenance receipts, manuals, and prior surveys signals a serious owner. HullBook users print this in one click.

Open access panels. The surveyor will need to see bilge, engine, electrical panel, and behind storage areas.

Note known issues yourself. Surveyors respect honesty. Hiding a known problem destroys your credibility on every other point.

## Common findings

Loose hose clamps. Worn impeller. Outdated flares. Galvanic corrosion on shaft. Soft spots in deck. Battery terminals corroded. Out-of-date safety equipment.

Address these BEFORE the survey. They are cheap to fix and reduce the surveyor's list of negatives.

## After the survey

You get a written report. The valuation guides insurance and resale price. The defects list guides repair priorities.

If you are buying: every defect is leverage in negotiation. Use it.

If you are selling: fix what you can, disclose what you cannot, price accordingly.`,
  },
  {
    slug: 'boat-insurance-guide',
    title: 'Boat Insurance Explained: Coverage Types, Costs, and How to Save',
    description: 'Everything boat owners need to know about marine insurance — types of coverage, what affects premiums, and proven ways to reduce your insurance cost.',
    keywords: ['boat insurance', 'marine insurance', 'yacht insurance cost', 'boat insurance coverage'],
    publishedAt: '2026-03-12',
    readMinutes: 6,
    body: `Boat insurance is not legally required in most US states or many EU countries. Marinas and lenders usually require it. And not having it is the single highest financial risk most boat owners take.

## Types of coverage

Agreed value: insurer pays a pre-agreed amount if the boat is totaled. Best for older boats where market value is debatable.

Actual cash value: insurer pays current market value minus depreciation. Cheaper premiums but smaller payouts.

Liability: covers damage you cause to others — usually $300,000 to $1 million in coverage. Required by most marinas.

Personal property: covers gear, electronics, dinghies. Often a separate rider.

Salvage and wreck removal: critical for sailboats and larger powerboats. Removing a sunken boat can cost $20,000.

Medical payments: covers injuries on your boat regardless of fault.

Uninsured boater: covers your boat if hit by an uninsured operator. Surprisingly common in places like Florida.

## What affects premium

Boat value. Newer and larger boats cost more to insure.

Cruising area. Coastal Florida is most expensive. Great Lakes and inland are cheapest.

Hull material. Fiberglass is cheapest. Wooden hulls and ferro-cement are highest.

Operator experience. Sailing school certifications, captains licenses, and time on similar boats all reduce premiums.

Claims history. One claim does not break you. Three in five years and you become uninsurable.

## How to lower premiums

Take a Coast Guard Auxiliary or Power Squadron course. Most insurers give 5 to 10 percent off.

Install LoJack-style theft tracking. 10 to 15 percent discount.

Raise your deductible. Going from $500 to $1,000 deductible saves 10 to 20 percent.

Bundle with home and auto. 5 to 15 percent off all three.

Lay-up period. If your boat is out of the water 4 months a year, ask for a lay-up credit.

## Document everything

Take photos every spring. Keep a current inventory of gear and electronics. Save all maintenance receipts.

When a claim happens — and it will, eventually — you have proof of what was on the boat, in what condition, and when.

HullBook users have all this in one PDF. The claim resolution is faster, the settlement is fairer.`,
  },
  {
    slug: 'engine-hours-explained',
    title: 'Engine Hours: What They Mean and How to Track Them',
    description: 'Engine hours are the single most important number in boat ownership. Understanding what they tell you, how to read them, and why tracking them matters.',
    keywords: ['boat engine hours', 'marine engine hours', 'low hours boat', 'high hours engine'],
    publishedAt: '2026-02-28',
    readMinutes: 5,
    body: `When you see a boat listed for sale, the engine hour number gets more attention than the price. For good reason — engine hours are the closest thing to a true odometer that boats have.

## What is an engine hour

One engine hour equals one hour of the engine running. Most modern marine engines have a digital hour meter that counts whenever the engine is running, regardless of throttle position.

A boat that sits at the dock idling for an hour records the same one hour as a boat running at cruising speed for an hour. Both put wear on the engine.

## What is high vs low

Outboard engines: anything under 500 hours is low, 1000-2000 is moderate, over 3000 is high and approaching rebuild territory.

Diesel inboards: more durable. Low is under 1500 hours. Moderate is 1500 to 4000. High is over 4000. Well-maintained marine diesels can run 8000 hours or more.

Gasoline inboards: similar to outboards. Half the lifespan of diesels.

Sailboat auxiliaries: very low usage. A sailboat with a 1000-hour Yanmar diesel is essentially broken in.

## Hours per year

A typical recreational boat runs 50 to 100 hours per year. Charter boats run 300 to 600. Liveaboards run 200 to 400 (mostly running generators).

When a listing shows 200 hours on a 10-year-old boat, that is 20 hours per year — well below average. Either the boat was babied or something kept the owner away. Worth asking why.

## Why hours matter for maintenance

Oil changes are based on hours, not calendar. Every 50 to 100 hours for most marine engines.

Impeller replacements: every 200 to 300 hours.

Fuel filter: every 100 hours.

Major service intervals: 500, 1000, 2000 hour milestones often require specific services.

If you do not know the hours, you do not know what is due.

## How to track properly

Read the hour meter at every fill-up. Note the date and hours. Every service entry should record hours at that moment.

This is exactly what HullBook automates. Engine hours, service intervals, and reminders all calculated automatically.

## What hours mean for resale

A buyer sees 800 hours and a complete service log with every oil change recorded. They pay top dollar.

A buyer sees 800 hours and no records. They assume the worst, deduct $5,000.

The difference is documentation. The engine is identical.`,
  },
  {
    slug: 'choosing-first-boat',
    title: 'How to Choose Your First Boat: A No-Hype Guide',
    description: 'Buying your first boat? Avoid the common mistakes. Practical advice on size, type, budget, and what to actually look for as a first-time owner.',
    keywords: ['first boat', 'buying first boat', 'beginner boat', 'new boat owner'],
    publishedAt: '2026-02-15',
    readMinutes: 7,
    body: `The standard advice on buying a first boat is wrong. "Get the biggest boat you can afford" leads to expensive boats sitting unused. "Start with something small" leads to selling within two years and starting over. Here is what actually works.

## Match the boat to the actual usage

Day trips with family on a lake? A 19 to 22 foot bowrider is ideal.

Coastal cruising with overnights? A 25 to 30 foot trawler or motoryacht.

Fishing offshore? A 22 to 28 foot center console.

Learning to sail? A 22 to 27 foot keelboat for stability, a 14 to 16 foot dinghy for racing skills.

Long-distance cruising? Anything under 35 feet will frustrate you within 6 months.

The mistake is buying for the trip you imagine, not the trip you will actually take 90 percent of the time.

## Set the real budget

Purchase price is one third of first year cost. Add another third for setup (electronics, safety gear, trailer if applicable, initial slip fees, insurance, first service). Add a third for unexpected.

If you can afford $30,000 cash for the boat, your actual buying power is $20,000. Save the rest for the first year.

## New vs used

New boats lose 25 to 40 percent value in year one. A 3-year-old boat is the sweet spot — the previous owner ate the depreciation hit, you get a recent boat with established performance.

Buying new makes sense only if you specifically want the warranty, latest electronics, or a niche model not available used.

## Survey is non-negotiable

A $1,000 survey on a $40,000 used boat is the best money you will spend. Surveys typically find $2,000 to $10,000 in issues you can use to negotiate or walk away.

## What to test on a sea trial

Cold start: any reluctance is a red flag.

Full throttle: should reach manufacturer-rated RPM. If it tops out 200-400 RPM below spec, the prop is wrong or the engine is tired.

Cruise at planing speed for 20 minutes: watch coolant temperature, oil pressure, exhaust color.

Listen at idle: unusual noises mean expensive things.

## Hidden costs first-time owners forget

Slip fees: $200 to $1,500 per month depending on location.

Winter storage: $300 to $2,000 per season.

Bottom paint: $1,000 to $3,000 every 1 to 3 years.

Annual service: $500 to $2,500.

Insurance: $400 to $2,500 per year.

Registration and license fees: $50 to $500.

USCG safety equipment: $300 first year, $100 to renew.

## Track everything from day one

The owners who keep boats for 10 years and sell at top dollar all have one thing in common: they tracked every expense, every service, every modification from day one.

The owners who sell at a discount in three years all say the same thing: "I wish I had started tracking earlier."

Do not be the second group. Start the day you take delivery.`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
