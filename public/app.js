// public/script.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error("Failed to fetch portfolio data");
    const data = await res.json();

    // Basic fields
    const nameEl = document.querySelector("#name");
    const titleEl = document.querySelector("#title");
    const aboutEl = document.querySelector("#about");
    const projectsContainer = document.querySelector("#projects-container");

    if (nameEl) nameEl.textContent = data.name || "";
    if (titleEl) titleEl.textContent = data.title || "";
    if (aboutEl) aboutEl.textContent = data.about || "";

    // Projects
    if (projectsContainer && Array.isArray(data.projects)) {
      projectsContainer.innerHTML = "";

      data.projects.forEach((project) => {
        const card = document.createElement("article");
        card.className = "project-card";

        const h3 = document.createElement("h3");
        h3.textContent = project.title || "Untitled Project";

        const p = document.createElement("p");
        p.textContent = project.description || "";

        const a = document.createElement("a");
        a.href = project.link || "#";
        a.textContent = "View Project";
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        card.appendChild(h3);
        card.appendChild(p);
        card.appendChild(a);
        projectsContainer.appendChild(card);
      });
    }
  } catch (err) {
    console.error(err);
  }
});