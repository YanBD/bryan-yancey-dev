const GITHUB_USERNAME = "YanBD";

async function loadRepos() {
  const tableBody = document.getElementById("repo-table-body");

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = await response.json();

    if (repos.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='5'>No repositories found.</td></tr>";
      return;
    }

    tableBody.innerHTML = "";

    repos.forEach(repo => {
      const row = document.createElement("tr");

      const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric"
      });

      row.innerHTML = `
        <td>${repo.name}</td>
        <td>${repo.description ? repo.description : "No description provided"}</td>
        <td>${repo.language ? repo.language : "—"}</td>
        <td>${updatedDate}</td>
        <td><a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub</a></td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="5">Couldn't load repositories: ${error.message}</td></tr>`;
    console.error("Error fetching repos:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadRepos);
