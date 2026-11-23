import { notFound } from 'next/navigation';
import data from '../../../data.json';
import Interior from '../../interior';
import { projectUrl } from '../../project-list';

export const dynamicParams = false;
export function generateStaticParams() {
  return data.projects.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = data.projects.find(item => item.id === id);
  if (!project) notFound();
  return { title: project.title, alternates: { canonical: projectUrl(project) } };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = data.projects.find(item => item.id === id);
  if (!project) notFound();

  const opening = project.sentences.slice(0, 2);
  const description = project.sentences.slice(2);
  return (
    <Interior title={project.title} current="proyek">
      <article className="project-detail narrow">
        <p className="meta">{project.context}</p>
        {opening.length > 0 && <p>{opening.join(' ')}</p>}
        {description.length > 0 && <p>{description.join(' ')}</p>}
        <a className="section-link" href="/proyek.html">Semua proyek</a>
      </article>
    </Interior>
  );
}
