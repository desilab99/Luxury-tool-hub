document.addEventListener("DOMContentLoaded", () => {
  fetch("data/tools.json")
    .then(res => res.json())
    .then(tools => {
      displayTools(tools);
      setupSearchAndFilter(tools);
    });
});

function displayTools(tools) {
  const grid = document.getElementById("tools-grid");
  grid.innerHTML = "";
  tools.forEach(tool => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
      <div style="font-size: 2.5rem; margin-bottom: 10px;">${tool.icon}</div>
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <a href="${tool.url}" target="_blank">Launch Tool →</a>
    `;
    grid.appendChild(card);
  });
}

function setupSearchAndFilter(allTools) {
  const search = document.getElementById("search");
  const cats = document.querySelectorAll(".cat-btn");
  let selectedCategory = "all";
  cats.forEach(btn => {
    btn.addEventListener("click", () => {
      cats.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.dataset.cat;
      filterTools();
    });
  });
  search.addEventListener("input", filterTools);
  function filterTools() {
    const query = search.value.toLowerCase();
    const filtered = allTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query);
      const matchesCat = selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
    displayTools(filtered);
  }
}
