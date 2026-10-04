// Port of the original AngularJS iconService.
// Maps an information-system entry to either a bundled image or a
// Font Awesome icon class, using the same keyword rules as before.

// Bundled images, keyed by lowercase system name.
const images = {
  infosphere: 'infosphere.jpg'
};

const fontIcons = {
  payment: 'fa credit-card',
  linode: 'fa fa-linode',
  'address book': 'fa fa-address-book',
  directory: 'fa fa-address-book',
  database: 'fa fa-database',
  table: 'fa fa-database',
  grid: 'fa fa-database',
  calendar: 'fa fa-calendar',
  git: 'fa fa-code-fork',
  vcard: 'fa fa-code-fork',
  authentication: 'fa fa-unlock',
  identity: 'fa fa-id-badge',
  trust: 'fa fa-handshake-o',
  booking: 'fa fa-plane',
  global: 'fa fa-globe',
  navigation: 'fa fa-compass',
  location: 'fa fa-map-marker',
  time: 'fa fa-clock-o',
  'time-tracking': 'fa fa-hourglass-2',
  logistic: 'fa fa-truck-o',
  code: 'fa fa-code',
  archive: 'fa fa-archive',
  'data visualization': 'fa fa-pie-chart',
  metrics: 'fa fa-area-chart',
  'social-media': 'fa fa-hashtag',
  laptop: 'fa fa-laptop',
  upload: 'fa fa-upload',
  university: 'fa fa-university',
  document: 'fa fa-file',
  currency: 'fa fa-dollar',
  hyperlink: 'fa fa-chain',
  windows: 'fa fa-windows',
  'internet explorer': 'fa fa-internet-explorer',
  drupal: 'fa fa-drupal',
  wordpress: 'fa fa-wordpress',
  slack: 'fa fa-slack',
  automation: 'fa fa-gears',
  dashboard: 'fa fa-dashboard',
  'data cube': 'fa fa-cube',
  'data warehouse': 'fa fa-cubes',
  inbox: 'fa fa-inbox',
  search: 'fa fa-search',
  support: 'fa fa-support',
  shopping: 'fa fa-shopping-cart',
  group: 'fa fa-group',
  'user management': 'fa fa-user-plus',
  mail: 'fa fa-envelope',
  'data entry': 'fa fa-keyboard-o',
  terminal: 'fa fa-terminal',
  tv: 'fa fa-tv'
};

function getImagePathFor(infoSys) {
  if (typeof infoSys.Name === 'string' && images[infoSys.Name.toLowerCase()]) {
    return images[infoSys.Name.toLowerCase()];
  }
  return null;
}

function getFontIconFor(infoSys) {
  // First check for a keyword match.
  if (Array.isArray(infoSys.keywords)) {
    for (const kw of infoSys.keywords) {
      const icon = fontIcons[String(kw).toLowerCase()];
      if (icon) return icon;
    }
  }
  // Then fall back to front-end / back-end / data store.
  for (const field of ['front_end', 'back_end', 'data_store']) {
    const value = infoSys[field];
    if (typeof value === 'string') {
      const icon = fontIcons[value.toLowerCase()];
      if (icon) return icon;
    }
  }
  return null;
}

/**
 * Returns { image: string|null, font: string|null } for a system entry.
 * `image` is a filename under images/; `font` is a Font Awesome class string.
 */
export function getIconFor(infoSys) {
  if (!infoSys) return { image: null, font: null };
  const image = getImagePathFor(infoSys);
  const font = getFontIconFor(infoSys);
  return { image, font: font ? `${font} fa-2x` : null };
}
