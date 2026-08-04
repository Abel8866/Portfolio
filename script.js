document.addEventListener("DOMContentLoaded", async () => {
  const nameEl = document.getElementById("name");
  const titleEl = document.getElementById("title");
  const aboutEl = document.getElementById("about");
  const skillsContainer = document.getElementById("skills-container");
  const projectsContainer = document.getElementById("projects-container");

  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    if (nameEl) {
      nameEl.textContent = data.name;
    }

    if (titleEl) {
      titleEl.textContent = data.title;
    }

    if (aboutEl) {
      aboutEl.textContent = data.about;
    }

    if (skillsContainer) {
      skillsContainer.innerHTML = "";
      data.skills.forEach((skill) => {
        const skillTag = document.createElement("span");
        skillTag.className =
          "rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200";
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
      });
    }

    if (projectsContainer) {
      projectsContainer.innerHTML = "";
      data.projects.forEach((project) => {
        const article = document.createElement("article");
        article.className =
          "group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff5c35]/60 hover:shadow-[0_16px_38px_rgba(0,0,0,0.42)]";

        article.innerHTML = `
          <img src="${project.image}" alt="${project.imageAlt}" class="h-64 w-full object-cover transition-all duration-300 group-hover:scale-[1.03]">
          <div class="p-7">
            <div class="flex flex-wrap gap-2">
              <span class="rounded-full bg-[#ff5c35]/10 px-3 py-1 text-xs font-medium text-[#ff5c35]">${project.category}</span>
              <span class="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">${project.stack}</span>
            </div>
            <h3 class="mt-4 text-2xl font-semibold text-white">${project.title}</h3>
            <p class="mt-4 text-sm leading-relaxed text-zinc-400">${project.description}</p>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex text-sm font-semibold text-white transition-all duration-300 hover:text-[#ff5c35]">View case study →</a>
          </div>
        `;

        projectsContainer.appendChild(article);
      });
    }
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
});
