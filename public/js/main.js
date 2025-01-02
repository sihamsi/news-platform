// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
  try {
    const response = await fetch("/api/news");
    const data = await response.json();
    displayNews(data.posts);
  } catch (error) {
    console.error("Erreur:", error);
    showError("Impossible de charger les articles");
  }
}

// TODO: Question 1 - Compléter la fonction displayNews
function displayNews(news) {
  const container = document.getElementById("news-container");
  // Utilisez Bootstrap pour créer des cards pour chaque article
}

// TODO: Question 2 - Créer une fonction pour gérer les erreurs
function showError(message) {
  // Afficher un message d'erreur avec Bootstrap
}

// Initialisation
document.addEventListener("DOMContentLoaded", fetchLatestNews);
