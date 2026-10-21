// components/RepoList.jsx

export default function RepoList({ data }) {
  return (
    <div>
      {data.map((repo) => (
        <div
          key={repo.id}
          className="project-card"
        >
          <h3>{repo.name}</h3>
          {repo.description && <p>{repo.description}</p>}
          <br />
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ marginTop: '8px' }}
          >
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
}