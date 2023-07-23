import React, { useState, useEffect } from "react";
import RepoList from "./RepoList";

const GithubRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [timePeriod, setTimePeriod] = useState("1 month");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const timePeriodToDays = {
    "1 week": 7,
    "2 weeks": 14,
    "1 month": 30,
  };

  const loading = repositories.length === 0;

  useEffect(() => {
    fetchRepositories();
  }, [timePeriod, currentPage]);

  const fetchRepositories = async () => {
    const createdDate = calculateCreatedDate();
    const url = `https://api.github.com/search/repositories?q=created:>${createdDate}&sort=stars&order=desc&per_page=${itemsPerPage}&page=${currentPage}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setRepositories(data.items);
      } else {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setRepositories([]);
    }
  };

  const calculateCreatedDate = () => {
    const now = new Date();
    const date = new Date(
      now.getTime() - timePeriodToDays[timePeriod] * 24 * 60 * 60 * 1000
    );
    return date.toISOString().split("T")[0];
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1>Most Starred Github Repositories (Last {timePeriod})</h1>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        <label>Time Period:</label>
        <select
          style={{ fontSize: "15px" }}
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value="1 week">1 week</option>
          <option value="2 weeks">2 weeks</option>
          <option value="1 month">1 month</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <RepoList repo={repositories} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GithubRepositories;
