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

  if (!title) {
    showError("Le titre est requis.");
    return;
  }

  if (!content) {
    showError("Le contenu est requis.");
    return;
  }

  const articleData = {
    title,
    content,
  };

  console.log("Données soumises :", articleData);

  form.reset();
  errorContainer.classList.add("d-none");
});
