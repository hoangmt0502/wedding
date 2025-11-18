import CONFIG from "../config";

export function generateCode(length = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomLength = Math.max(length, 4);
  const randomPart = Array.from({ length: randomLength }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');

  const timestampPart = Date.now().toString(36).toUpperCase();

  const combined = (randomPart + timestampPart).slice(0, length);
  return combined;
}

export function generateUrlImage(path: string): string {
  return `${CONFIG.DOMAIN_URL}/${path}`;
}
export function generateAddress(data: string[]): string {
  return data
    .filter((item) => item && item.trim() !== '')
    .join(', ');
}
