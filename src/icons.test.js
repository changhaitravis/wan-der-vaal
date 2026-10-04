import { describe, expect, it } from 'vitest';
import { getIconFor } from './icons.js';
import systems from './data.json';

describe('getIconFor', () => {
  it('maps a system name to a bundled image', () => {
    expect(getIconFor({ Name: 'Infosphere', keywords: [] }).image).toBe('infosphere.jpg');
  });

  it('is case-insensitive on the system name', () => {
    expect(getIconFor({ Name: 'INFOSPHERE', keywords: [] }).image).toBe('infosphere.jpg');
  });

  it('falls back to a keyword icon when there is no image', () => {
    expect(getIconFor({ Name: 'The Vox', keywords: ['tv'] }).font).toContain('fa-tv');
  });

  it('falls back to front_end when no keyword matches', () => {
    expect(getIconFor({ Name: 'Nope', keywords: ['zzz'], front_end: 'global' }).font).toContain('fa-globe');
  });

  it('returns nulls for unknown systems and null input', () => {
    expect(getIconFor({ Name: 'Nope', keywords: ['zzz'] })).toEqual({ image: null, font: null });
    expect(getIconFor(null)).toEqual({ image: null, font: null });
  });
});

describe('data.json', () => {
  it('is a non-empty array with the required fields', () => {
    expect(Array.isArray(systems)).toBe(true);
    expect(systems.length).toBeGreaterThan(0);
    for (const sys of systems) {
      expect(typeof sys.Name).toBe('string');
    }
  });
});
