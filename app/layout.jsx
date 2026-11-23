import './site.css';
import data from '../data.json';

export const metadata = {
  metadataBase: new URL(data.profile.site),
  title: { default: data.profile.name, template: '%s — ' + data.profile.name },
  description: data.profile.role + ' · ' + data.profile.location,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <a className="skip-link" href="#isi">Lewati ke isi</a>
        {children}
      </body>
    </html>
  );
}
