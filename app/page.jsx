import data from '../data.json';
import { Certificate, Contacts, Section, Skill } from './entries';
import { portfolioSections } from './portfolio-sections';
import SiteHeader from './site-header';

export const metadata = { alternates: { canonical: '/' } };

const { profile, projects } = data;
const featured = projects.find(project => project.sentences[project.pullQuoteSentence]);
const renderEntry = {
  proyek: project => <Project key={project.id} project={project} />,
  keahlian: item => <Skill key={item.title} item={item} />,
  sertifikasi: item => <Certificate key={item.number} item={item} />,
};

function Project({ project }) {
  return (
    <article id={project.id} className="project">
      <header>
        <h3>{project.title}</h3>
        <p className="meta">{project.context}</p>
      </header>
      <p className="project-copy">{project.sentences.join(' ')}</p>
    </article>
  );
}

export default function Portfolio() {
  return (
    <div className="portfolio">
      <SiteHeader profile={profile} sections={portfolioSections} />
      <main className="frame" id="isi" tabIndex="-1">
        <div className={featured ? 'intro has-feature' : 'intro'}>
          <header className="intro-profile" id="tentang" tabIndex="-1">
            <h1 className="name">{profile.name}</h1>
            <p className="position">{profile.role}</p>
            <p className="location">{profile.location}</p>
            <div className="profile-actions">
              <a className="primary-action" href="./cv.html">Lihat CV</a>
              {projects.length > 0 && <a href="#proyek">Lihat proyek</a>}
            </div>
            <div id="kontak" tabIndex="-1">
              <Contacts contacts={profile.contacts} />
            </div>
          </header>
          {featured && <figure className="feature">
            <figcaption>
              <a href={'#' + featured.id}>{featured.title}</a>
            </figcaption>
            <blockquote>
              <p>{featured.sentences[featured.pullQuoteSentence]}</p>
            </blockquote>
          </figure>}
        </div>
        <div className="portfolio-sections">
          {portfolioSections.map(({ id, title, items }, index) => (
            <Section key={id} id={id} title={title} number={String(index + 1).padStart(2, '0')}>
              {items.map(renderEntry[id])}
            </Section>
          ))}
        </div>
      </main>
    </div>
  );
}
