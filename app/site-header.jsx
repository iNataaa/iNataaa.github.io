import data from '../data.json';
import MobileMenu from './mobile-menu';

const links = [
  { id: 'tentang', label: 'Tentang', href: '/tentang.html' },
  { id: 'cv', label: 'CV', href: '/cv.html' },
  ...(data.projects.length ? [{ id: 'proyek', label: 'Proyek', href: '/proyek.html' }] : []),
  ...(data.skills.length ? [{ id: 'keahlian', label: 'Keahlian', href: '/keahlian.html' }] : []),
  ...(data.certifications.length ? [{ id: 'sertifikasi', label: 'Sertifikasi', href: '/sertifikasi.html' }] : []),
  ...(data.profile.contacts.length ? [{ id: 'kontak', label: 'Kontak', href: '/kontak.html' }] : []),
];

function NavLinks({ current }) {
  return (
    <ul role="list">
      {links.map(({ id, label, href }) => (
        <li key={id}>
          <a href={href} aria-current={current === id ? 'page' : undefined}>{label}</a>
        </li>
      ))}
    </ul>
  );
}

export default function SiteHeader({ profile, current }) {
  const initials = profile.name.split(' ').map(part => part[0]).join('').toLowerCase();

  return (
    <header className="topbar">
      <div className="frame topbar-inner">
        <a className="wordmark" href="/" aria-label={profile.name + ', beranda'}>{initials}</a>
        <nav className="desktop-menu" aria-label="Menu utama">
          <NavLinks current={current} />
        </nav>
        <MobileMenu><NavLinks current={current} /></MobileMenu>
      </div>
    </header>
  );
}
