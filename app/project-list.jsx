export function projectUrl(project) {
  return '/proyek/' + encodeURIComponent(project.id) + '.html';
}

export function ProjectList({ projects }) {
  return (
    <ul className="project-list" role="list">
      {projects.map(project => (
        <li key={project.id} id={project.id}>
          <a href={projectUrl(project)}>
            <span>{project.title}</span>
            <span className="project-arrow" aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
