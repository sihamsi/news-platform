
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

// TODO: Compléter la fonction displayNews avec interface Yahoo-like et animations
function displayNews(news) {
  const container = document.getElementById("news-container");
  container.innerHTML = ""; 

  if (!news || news.length === 0) {
    showError("Aucun article disponible pour le moment.");
    return;
  }

  news.forEach((article) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.setAttribute("data-aos", "fade-up"); 

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
  let errorContainer = document.getElementById("error-container");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    errorContainer.className = "alert alert-danger alert-dismissible fade show";
    errorContainer.style.position = "fixed";
    errorContainer.style.top = "20px";
    errorContainer.style.right = "20px";
    errorContainer.style.zIndex = "1050"; 
    document.body.appendChild(errorContainer);
  }

  errorContainer.innerHTML = `
      <span>${message}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  setTimeout(() => {
    if (errorContainer) {
      errorContainer.remove();
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", fetchLatestNews);
