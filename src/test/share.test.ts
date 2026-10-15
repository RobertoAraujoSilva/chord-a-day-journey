import { describe, it, expect, vi, afterEach } from 'vitest';
import { copyToClipboard, tunerShareUrl, whatsappShareUrl } from '@/lib/share';

describe('Tuner share helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds the tuner page address from the site origin', () => {
    expect(tunerShareUrl('https://chord-a-day-journey.lovable.app')).toBe(
      'https://chord-a-day-journey.lovable.app/afinador',
    );
  });

  it('does not double the slash when the origin ends with one', () => {
    expect(tunerShareUrl('http://localhost:8080/')).toBe(
      'http://localhost:8080/afinador',
    );
  });

  it('builds a WhatsApp link with the message and the address encoded', () => {
    const url = 'https://chord-a-day-journey.lovable.app/afinador';
    const href = whatsappShareUrl('Afine seu violão', url);

    expect(href.startsWith('https://wa.me/?text=')).toBe(true);
    expect(decodeURIComponent(href.replace('https://wa.me/?text=', ''))).toBe(
      `Afine seu violão\n${url}`,
    );
  });

  it('copies the address and reports success', async () => {
    const writeText = vi.fn(async () => undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });

    const copied = await copyToClipboard('https://chord-a-day-journey.lovable.app/afinador');

    expect(copied).toBe(true);
    expect(writeText).toHaveBeenCalledWith(
      'https://chord-a-day-journey.lovable.app/afinador',
    );
  });

  it('reports failure when nothing can copy the address', async () => {
    vi.stubGlobal('navigator', { ...navigator, clipboard: undefined });

    const copied = await copyToClipboard('https://chord-a-day-journey.lovable.app/afinador');

    expect(copied).toBe(false);
  });
});
