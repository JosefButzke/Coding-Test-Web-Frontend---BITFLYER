import type { Repository } from "../types/github";
import { formatNumber, formatDate } from "../utils/format";
import { StarIcon, ForkIcon, IssueIcon } from "./icons";
import { LanguageDot } from "./LanguageDot";

export function RepoCard({ repo }: { repo: Repository }) {
  return (
    <article className="repo-card">
      <div className="repo-card-header">
        <a
          href={repo.owner.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-owner-link"
          title={repo.owner.login}
        >
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="repo-avatar"
            width={20}
            height={20}
          />
        </a>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-name"
        >
          {repo.full_name}
        </a>
        <span className={`repo-visibility ${repo.visibility}`}>
          {repo.visibility}
        </span>
      </div>

      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

      {repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.slice(0, 6).map((topic) => (
            <span key={topic} className="repo-topic">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="repo-meta">
        {repo.language && (
          <span className="repo-meta-item">
            <LanguageDot language={repo.language} />
            {repo.language}
          </span>
        )}
        <span className="repo-meta-item" title={`${repo.stargazers_count} stars`}>
          <StarIcon />
          {formatNumber(repo.stargazers_count)}
        </span>
        <span className="repo-meta-item" title={`${repo.forks_count} forks`}>
          <ForkIcon />
          {formatNumber(repo.forks_count)}
        </span>
        <span
          className="repo-meta-item"
          title={`${repo.open_issues_count} open issues`}
        >
          <IssueIcon />
          {formatNumber(repo.open_issues_count)}
        </span>
        {repo.license && (
          <span className="repo-meta-item repo-license" title="License">
            {repo.license.name}
          </span>
        )}
        <span className="repo-meta-item repo-updated">
          Updated {formatDate(repo.updated_at)}
        </span>
      </div>
    </article>
  );
}
