import React from "react";
import Repo from "./Repo";

const RepoList = ({ repo }) => {
  return (
    <div>
      {repo.map((item, index) => (
        <Repo
          key={repo[index].id}
          avatar_url={repo[index].owner.avatar_url}
          owner={repo[index].owner.login}
          name={repo[index].name}
          html_url={repo[index].html_url}
          description={repo[index].description}
          stargazers_count={repo[index].stargazers_count}
          open_issues_count={repo[index].open_issues_count}
          created_at={repo[index].created_at}
        />
      ))}
    </div>
  );
};

export default RepoList;
