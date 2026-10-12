
import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

function getProjectUrl(value?: string) {
  if (!value) {
    console.error('Supabase URL is missing.');
    return null;
  }

  try {
    const url = new URL(value);

    if (
      url.protocol !== 'https:' ||
      !url.hostname.endsWith('.supabase.co') ||
      url.pathname !== '/' ||
      url.search ||
      url.hash
    ) {
      console.error(
        'Supabase URL format is incorrect. Use the Project URL from Supabase Data API settings.'
      );
      return null;
    }

    console.info('Supabase URL format: OK');
    return url.origin;
  } catch {
    console.error('Supabase URL is not a valid URL.');
    return null;
  }
}

const projectUrl = getProjectUrl(rawUrl);

console.info(
  'Supabase public key:',
  rawKey ? 'Present' : 'Missing'
);

export const supabase =
  projectUrl && rawKey
    ? createClient(projectUrl, rawKey)
    : null;
