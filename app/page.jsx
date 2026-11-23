import data from '../data.json';
import SiteHeader from './site-header';
import { ProjectList } from './project-list';

export const metadata = { alternates: { canonical: '/' } };

export default function Portfolio() {
  const { profile, projects } = data;

  return (
    <>
      <SiteHeader profile={profile} />
      <main className="frame page" id="isi" tabIndex="-1">
        <header className="hero" id="tentang">
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-location">{profile.location}</p>
          <div className="hero-actions">
            <a className="button" href="/tentang.html">Tentang saya</a>
            <a href="/cv.html">Lihat CV</a>
          </div>
        </header>
        {projects.length > 0 && <section className="home-projects" id="proyek" aria-labelledby="pilihan">
          <header>
            <h2 id="pilihan">Proyek pilihan</h2>
            <a className="section-link" href="/proyek.html">Semua proyek</a>
          </header>
          <ProjectList projects={projects} />
        </section>}
      </main>
    </>
  );
}
