import data from '../../data.json';
import Interior from '../interior';
import { ProjectList } from '../project-list';

export const metadata = { title: 'Proyek', alternates: { canonical: '/proyek.html' } };

export default function ProjectsPage() {
  return (
    <Interior title="Proyek" current="proyek">
      <div className="narrow ruled"><ProjectList projects={data.projects} /></div>
    </Interior>
  );
}
