// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
  try {
    const response = await fetch("/api/news");
    const data = await response.json();
    displayNews(data.posts); // Appeler la fonction displayNews avec les articles récupérés
  } catch (error) {
    console.error("Erreur:", error);
    showError("Impossible de charger les articles");
  }
}

// TODO: Compléter la fonction displayNews avec interface Yahoo-like et animations
function displayNews(news) {
  const container = document.getElementById("news-container");
  container.innerHTML = ""; // Réinitialiser le contenu

  if (!news || news.length === 0) {
    showError("Aucun article disponible pour le moment.");
    return;
  }

  // Utiliser Bootstrap et AOS pour créer des cartes animées
  news.forEach((article) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.setAttribute("data-aos", "fade-up"); // Animation

    card.innerHTML = `
            <div class="card h-100">
                <img src="${
                  article.image || "/images/default.jpg"
                }" class="card-img-top" alt="${article.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary">${article.title}</h5>
                    <p class="card-text">${article.body.slice(0, 100)}...</p>
                    <a href="#" class="btn btn-link mt-auto text-primary">Lire la suite</a>
                </div>
            </div>
        `;

    container.appendChild(card);
  });
}

// TODO: Fonction pour gérer les erreurs
function showError(message) {
  const container = document.getElementById("news-container");
  container.innerHTML = `
        <div class="alert alert-danger" role="alert">
          ${message}
        </div>
      `;
}

// Initialisation
document.addEventListener("DOMContentLoaded", fetchLatestNews);
