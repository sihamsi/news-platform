async function fetchArticles() {
  try {
    const response = await fetch("/api/news");
    const articles = await response.json();

    const container = document.getElementById("news-container");
    articles.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.body}</p>
        `;
      container.appendChild(articleDiv);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des articles :", error);
  }
}

fetchArticles();
