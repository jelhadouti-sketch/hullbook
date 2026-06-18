import { Purchases } from '@revenuecat/purchases-capacitor'
import { Capacitor } from '@capacitor/core'

const APPLE_API_KEY = 'appl_MxIJUWhMVLvqNMDJWYgIpRQWwov'

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

function anyActiveEntitlement(info: any): boolean {
  try {
    const active = info && info.entitlements && info.entitlements.active
    return !!active && Object.keys(active).length > 0
  } catch {
    return false
  }
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

  try {
    const result = await Purchases.purchasePackage({ aPackage: pkg })
    if (anyActiveEntitlement(result.customerInfo)) return true
  } catch (e: any) {
    const cancelled = e && (e.userCancelled || e.code === '1' || (e.message && String(e.message).toLowerCase().indexOf('cancel') !== -1))
    if (cancelled) {
      throw e
    }
  }

  try {
    const restored = await Purchases.restorePurchases()
    if (anyActiveEntitlement(restored.customerInfo)) return true
  } catch {}

  try {
    const info = await Purchases.getCustomerInfo()
    if (anyActiveEntitlement(info.customerInfo)) return true
  } catch {}

  return false
}

export async function restorePurchases(): Promise<boolean> {
  try {
    const restored = await Purchases.restorePurchases()
    if (anyActiveEntitlement(restored.customerInfo)) return true
  } catch {}

  try {
    const info = await Purchases.getCustomerInfo()
    if (anyActiveEntitlement(info.customerInfo)) return true
  } catch {}

  return false
}
