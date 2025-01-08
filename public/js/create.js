const form = document.getElementById("news-form");
const errorContainer = document.getElementById("error-container");

function showError(message) {
  errorContainer.classList.remove("d-none");
  errorContainer.classList.add("alert", "alert-danger");
  errorContainer.innerHTML = `
    <strong>Erreur :</strong> ${message}
  `;

  setTimeout(() => {
    errorContainer.classList.add("d-none");
    errorContainer.innerHTML = "";
  }, 5000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const image = document.getElementById("image").files[0];

  if (!title) {
    showError("Le titre est requis.");
    return;
  }

  if (!content) {
    showError("Le contenu est requis.");
    return;
  }

  if (!image) {
    showError("L'image est requise.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const articleData = {
      title,
      content,
      image: reader.result, // Convert image to base64 string for storage
    };

    // Save to localStorage
    const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];
    existingArticles.push(articleData);
    localStorage.setItem("articles", JSON.stringify(existingArticles));

    alert("Article créé avec succès!");
    window.location.href = "news.html"; // Redirect to the articles page
  };

  reader.readAsDataURL(image);
});
