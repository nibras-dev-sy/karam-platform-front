import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getDeviceId(): Promise<string> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}