import { Purchases } from '@revenuecat/purchases-capacitor'
import { Capacitor } from '@capacitor/core'

const APPLE_API_KEY = 'appl_MxIJUWhMVLvqNMDJWYgIpRQWwov'
const ENTITLEMENT_ID = 'Hullbook Pro'

let configured = false

export function isNativePlatform(): boolean {
  try {
    return Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

export async function initRevenueCat(appUserId: string): Promise<void> {
  if (!isNativePlatform() || configured) return
  await Purchases.configure({ apiKey: APPLE_API_KEY, appUserID: appUserId })
  configured = true
}

export async function purchaseInterval(interval: 'monthly' | 'yearly'): Promise<boolean> {
  const offerings = await Purchases.getOfferings()
  const current = offerings.current
  if (!current) {
    throw new Error('No subscription plans are available right now.')
  }
  const pkg = interval === 'monthly' ? current.monthly : current.annual
  if (!pkg) {
    throw new Error('That plan is not available right now.')
  }
  const result = await Purchases.purchasePackage({ aPackage: pkg })
  return typeof result.customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
}
