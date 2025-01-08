// Quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Exemple de données d'articles
  const articles = [
    {
      title: "Découverte scientifique révolutionnaire",
      content:
        "Une nouvelle étude révèle des informations fascinantes sur l'univers.",
      author: "Jean Dupont",
      date: "2025-01-08",
    },
    {
      title: "Les tendances technologiques en 2025",
      content: "Les experts discutent des innovations à venir cette année.",
      author: "Sophie Martin",
      date: "2025-01-07",
    },
    {
      title: "Santé : Les bienfaits d'une alimentation équilibrée",
      content:
        "Des conseils pour améliorer votre mode de vie grâce à une nutrition saine.",
      author: "Dr. Paul Morel",
      date: "2025-01-06",
    },
    {
      title: "Sports : Une victoire historique",
      content:
        "L'équipe locale remporte le championnat après une performance exceptionnelle.",
      author: "Emma Bernard",
      date: "2025-01-05",
    },
  ];

  // Fonction pour afficher les articles
  const renderArticles = () => {
    // Vider le conteneur avant de le remplir
    newsContainer.innerHTML = "";

    articles.forEach((article) => {
      // Création d'une colonne pour chaque article
      const col = document.createElement("div");
      col.className = "col-md-6";

      // Contenu HTML de chaque article
      col.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.content}</p>
          </div>
          <div class="card-footer text-muted">
            <small>Par ${article.author} | Publié le ${article.date}</small>
          </div>
        </div>
      `;

      // Ajout de l'article dans le conteneur
      newsContainer.appendChild(col);
    });
  };

  // Appeler la fonction pour afficher les articles au chargement de la page
  renderArticles();
});
