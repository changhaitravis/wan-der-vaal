import { useMemo, useState } from 'react';
import systemsData from './data.json';
import { getIconFor } from './icons.js';
import './styles.css';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'application_source_owner', label: 'Owner' },
  { value: 'front_end', label: 'Type' }
];

function buildUrl(url) {
  if (!url) return null;
  if (typeof url === 'string') {
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }
  if (url.Prod) {
    const protocol = url.protocol || 'https';
    return `${protocol}://${url.Prod}`;
  }
  return null;
}

function openLink(url) {
  const href = buildUrl(url);
  if (!href) return;
  if (window.electronAPI && typeof window.electronAPI.openExternal === 'function') {
    window.electronAPI.openExternal(href);
  } else {
    window.open(href, '_blank', 'noopener');
  }
}

function uniqueValues(systems, pick) {
  const seen = new Set();
  const out = [];
  for (const sys of systems) {
    const values = pick(sys);
    const list = Array.isArray(values) ? values : [values];
    for (const v of list) {
      if (v && !seen.has(v)) {
        seen.add(v);
        out.push(v);
      }
    }
  }
  return out.sort((a, b) => String(a).localeCompare(String(b)));
}

function sortKeyFor(sys, key) {
  switch (key) {
    case 'application_source_owner':
      return (sys.OwnedBy && sys.OwnedBy.Name) || '';
    case 'front_end':
      return sys.front_end || '';
    case 'name':
    default:
      return sys.Name || '';
  }
}

function SystemCard({ sys }) {
  const icon = getIconFor(sys);
  const goUrl = buildUrl(sys.Url);
  const subSystems = Object.entries(sys.SubSystems || {}).filter(([, sub]) => buildUrl(sub.Url));

  return (
    <article className="card">
      <div className="card-main">
        <div className="card-icon">
          {icon.image ? (
            <img src={`images/${icon.image}`} alt="" />
          ) : (
            <i className={icon.font || 'fa fa-cube fa-2x'} aria-hidden="true" />
          )}
        </div>
        <div className="card-text">
          <h2>{sys.Name}</h2>
          {sys.Description && <p className="card-desc">{sys.Description}</p>}
          <div className="card-meta">
            {sys.front_end && <span className="chip">{sys.front_end}</span>}
            {sys.OwnedBy && sys.OwnedBy.Name && <span className="chip chip-quiet">{sys.OwnedBy.Name}</span>}
            {sys.defunct ? <span className="chip chip-warn">defunct</span> : null}
          </div>
        </div>
      </div>

      {subSystems.length > 0 && (
        <div className="card-subsystems">
          {subSystems.map(([name, sub]) => (
            <button
              key={name}
              type="button"
              className="btn btn-sub"
              title={sub.Description || name}
              onClick={() => openLink(sub.Url)}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <div className="card-actions">
        {goUrl && (
          <button type="button" className="btn btn-primary" onClick={() => openLink(sys.Url)}>
            Go!
          </button>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [userGroupFilter, setUserGroupFilter] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [showDefunct, setShowDefunct] = useState(false);

  const types = useMemo(() => uniqueValues(systemsData, (s) => s.front_end), []);
  const userGroups = useMemo(() => uniqueValues(systemsData, (s) => s.UserGroups), []);

  const visible = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    const filtered = systemsData.filter((sys) => {
      if (sys.defunct && !showDefunct) return false;
      if (typeFilter && sys.front_end !== typeFilter) return false;
      if (userGroupFilter) {
        const groups = Array.isArray(sys.UserGroups) ? sys.UserGroups : [sys.UserGroups];
        if (!groups.includes(userGroupFilter)) return false;
      }
      if (q) {
        const hay = [sys.Name, sys.Description, sys.front_end, ...(sys.keywords || [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return filtered.sort((a, b) =>
      String(sortKeyFor(a, sortKey)).localeCompare(String(sortKeyFor(b, sortKey)))
    );
  }, [searchText, typeFilter, userGroupFilter, sortKey, showDefunct]);

  const hasFilters = searchText || typeFilter || userGroupFilter;
  const clearFilters = () => {
    setSearchText('');
    setTypeFilter('');
    setUserGroupFilter('');
  };

  return (
    <div className="app">
      <header className="toolbar">
        <div className="toolbar-inner">
          <div className="brand">
            <h1>wan-der-vaal</h1>
            <p>Information systems &amp; resources launcher</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={showDefunct}
              onChange={(e) => setShowDefunct(e.target.checked)}
            />
            <span className="switch-track" aria-hidden="true" />
            <span className="switch-label">Show all information systems</span>
          </label>
        </div>
      </header>

      <main className="content">
        <section className="filters" aria-label="Search and filter">
          <div className="field field-search">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="search"
              placeholder="Name, keyword, type…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="type">Type</label>
            <select id="type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="usergroup">User groups</label>
            <select id="usergroup" value={userGroupFilter} onChange={(e) => setUserGroupFilter(e.target.value)}>
              <option value="">All groups</option>
              {userGroups.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="field field-clear">
            <button type="button" className="btn" disabled={!hasFilters} onClick={clearFilters}>
              Clear
            </button>
          </div>
        </section>

        {visible.length === 0 ? (
          <p className="empty">No information systems match your filters.</p>
        ) : (
          <section className="grid" aria-label="Information systems">
            {visible.map((sys) => (
              <SystemCard key={sys.Name} sys={sys} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
