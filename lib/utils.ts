import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to safely parse URL parameters
export function parseQueryParam(param: string | null): string | null {
  if (!param) return null
  try {
    return decodeURIComponent(param)
  } catch (e) {
    console.error("Error parsing query parameter:", e)
    return null
  }
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date(date))
}

// Helper function to ensure consistent navigation with query parameters
export function buildUrl(path: string, params: Record<string, string | null>): string {
  const url = new URL(path, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, value)
    }
  })

  return url.pathname + url.search
}

/**
 * Truncates a string to a given length
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formats a phone number to standard format
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Basic formatting for Indian phone numbers
  if (phoneNumber.length === 10) {
    return `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`
  }
  return phoneNumber
}

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number (basic validation)
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Basic validation for Indian phone numbers
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone)
}

/**
 * Formats a price with currency symbol
 */
export function formatPrice(price: number, currency: string = '₹'): string {
  return `${currency}${price.toFixed(2)}`
}

