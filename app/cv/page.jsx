import data from '../../data.json';
import { Certificate, Contacts, Section, Skill } from '../entries';
import PrintButton from './print-button';
import SiteHeader from '../site-header';

export const metadata = { title: 'CV', alternates: { canonical: '/cv.html' } };

function CvEntry({ item }) {
  const metadata = [item.place, item.period].filter(Boolean).join(' · ');
  return (
    <article className="entry cv-entry">
      <h3>{item.title}</h3>
      {metadata && <p className="meta">{metadata}</p>}
      {item.detail && <p>{item.detail}</p>}
      {item.tasks?.length > 0 && <ul className="tasks">
        {item.tasks.map(task => <li key={task}>{task}</li>)}
      </ul>}
    </article>
  );
}

export default function Cv() {
  const { profile } = data;
  const selectedProject = data.projects.find(project => project.id === 'kbbi');
  const otherWork = selectedProject
    ? [{
        title: selectedProject.title,
        place: selectedProject.context,
        detail: selectedProject.sentences.at(-1),
      }, ...data.otherWork]
    : data.otherWork;

  const sections = [
    ['pengalaman', 'Pengalaman kerja', data.experience, CvEntry],
    ['pendidikan', 'Pendidikan', data.education, CvEntry],
    ['keahlian', 'Keahlian', data.skills, Skill],
    ['organisasi', 'Pengalaman organisasi', data.organizations, CvEntry],
    ['proyek', 'Proyek dan kegiatan pilihan', otherWork, CvEntry],
    ['prestasi', 'Prestasi', data.awards, CvEntry],
    ['sertifikasi', 'Sertifikasi', data.certifications, Certificate],
  ];

  // <!-- TODO: sertifikat Data Management System 2022 — berkas belum ada, konfirmasi ke pemilik -->
  // <!-- TODO: nama pena + tautan profil Dreamy, jika ingin ditampilkan -->
  return (
    <div className="cv">
      <SiteHeader profile={profile} current="cv" />
      <div className="frame">
        <div className="cv-toolbar">
          <a href="/">Kembali ke portofolio</a>
          <PrintButton />
        </div>
        <main id="isi" tabIndex="-1">
          <header className="cv-header">
            <h1 className="name">{profile.name}</h1>
            <p className="position">{profile.role}</p>
            <p className="location">{profile.location}</p>
            <Contacts contacts={profile.contacts} printNumber />
          </header>
          {sections.filter(([, , items]) => items.length).map(([id, title, items, Entry]) => (
            <Section key={id} id={id} title={title}>
              {items.map(item => <Entry key={item.number ?? [item.title, item.place].join('|')} item={item} detail />)}
            </Section>
          ))}
        </main>
      </div>
    </div>
  );
}
