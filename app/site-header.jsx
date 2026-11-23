import MobileMenu from './mobile-menu';

function NavLinks({ items, current }) {
  return (
    <ul role="list">
      {items.map(({ id, label, href }) => (
        <li key={id}>
          <a href={href} aria-current={current === id ? 'page' : undefined}>{label}</a>
        </li>
      ))}
    </ul>
  );
}

export default function SiteHeader({ profile, sections, current }) {
  const home = current === 'cv' ? './' : '';
  const items = [
    { id: 'tentang', label: 'Tentang', href: home + '#tentang' },
    { id: 'cv', label: 'CV', href: './cv.html' },
    ...sections.map(({ id, title }) => ({
      id, label: id === 'proyek' ? 'Proyek' : title, href: home + '#' + id,
    })),
    ...(profile.contacts.length ? [{ id: 'kontak', label: 'Kontak', href: home + '#kontak' }] : []),
  ];

  return (
    <header className="topbar">
      <div className="frame topbar-inner">
        <a className="wordmark" href="./" aria-label={profile.name + ', beranda'}>{profile.nickname}</a>
        <nav className="desktop-menu" aria-label="Menu utama">
          <NavLinks items={items} current={current} />
        </nav>
        <MobileMenu>
          <NavLinks items={items} current={current} />
        </MobileMenu>
      </div>
    </header>
  );
}
