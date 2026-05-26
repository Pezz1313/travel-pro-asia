import { useEffect, useState } from 'react';

// Tiny client-side router for Travel Pro Asia. Just enough to switch between
// the landing page and the static legal pages without pulling in a full
// routing dependency. Works with Vite's SPA fallback in dev and the Vercel
// rewrite rule in production.

function getPath() {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.pathname || '/';
  // Normalise trailing slash so "/mentions-legales/" matches "/mentions-legales".
  const trimmed = raw.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function useRoute() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onChange = () => setPath(getPath());
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  return path;
}

// Programmatic navigation that updates the URL and re-triggers useRoute
// without a full page reload.
export function navigate(to) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname + window.location.hash === to) return;
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  // Reset scroll for a fresh "new page" feel.
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Anchor wrapper that opts into client-side navigation. Falls back to a
// regular link when the user uses a modifier key (cmd/ctrl/shift) so
// "open in new tab" still works.
export function RouteLink({ to, className, children, ...rest }) {
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
