import { notFound } from 'next/navigation';
import data from '../../data.json';
import Interior from '../interior';
import { Certificate, Contacts, Section, Skill } from '../entries';

const sections = {
  tentang: { label: 'Tentang', render: About },
  keahlian: { label: 'Keahlian', render: Skills },
  sertifikasi: { label: 'Sertifikasi', render: Certificates },
  kontak: { label: 'Kontak', render: Contact },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(sections).map(section => ({ section }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const entry = sections[section];
  if (!entry) notFound();
  return { title: entry.label, alternates: { canonical: '/' + section + '.html' } };
}

function About() {
  return (
    <>
      <p className="page-subtitle">{data.profile.role}</p>
      <p className="meta">{data.profile.location}</p>
      {data.education.length > 0 && <div className="narrow spaced">
        <Section id="pendidikan" title="Pendidikan">
          {data.education.map(item => (
            <article className="entry" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.place}</p>
              {item.period && <p className="meta">{item.period}</p>}
              {item.detail && <p>{item.detail}</p>}
            </article>
          ))}
        </Section>
      </div>}
    </>
  );
}

function Skills() {
  return <div className="narrow ruled">{data.skills.map(item => <Skill key={item.title} item={item} />)}</div>;
}

function Certificates() {
  return (
    <div className="narrow ruled">
      {data.certifications.map(item => <Certificate key={item.number} item={item} detail />)}
    </div>
  );
}

function Contact() {
  return <Contacts contacts={data.profile.contacts} />;
}

export default async function InfoPage({ params }) {
  const { section } = await params;
  const entry = sections[section];
  if (!entry) notFound();
  const Content = entry.render;
  return (
    <Interior title={section === 'tentang' ? data.profile.name : entry.label} current={section}>
      <Content />
    </Interior>
  );
}
