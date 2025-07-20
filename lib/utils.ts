import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getDeviceId(): Promise<string> {
  const tokenKey = 'device_token';
  let deviceToken = localStorage.getItem(tokenKey);

  if (!deviceToken) {
    deviceToken = crypto.randomUUID(); // Generates a secure UUID
    localStorage.setItem(tokenKey, deviceToken);
  }

  return deviceToken;
}