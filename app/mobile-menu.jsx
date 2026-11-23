'use client';

export default function MobileMenu({ children }) {
  function closeOnSelection(event) {
    if (event.target.closest('a')) {
      event.currentTarget.closest('details').open = false;
    }
  }

  function closeOnEscape(event) {
    if (event.key === 'Escape' && event.currentTarget.open) {
      event.currentTarget.open = false;
      event.currentTarget.querySelector('summary').focus();
    }
  }

  return (
    <details className="mobile-menu" onKeyDown={closeOnEscape}>
      <summary>Menu</summary>
      <nav aria-label="Menu utama" onClick={closeOnSelection}>{children}</nav>
    </details>
  );
}
