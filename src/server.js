require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const axios = require("axios");

// Routes
app.use("/api/news", newsRoutes);

// TODO: Question 3
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Une erreur interne est survenue.",
  });
});

// Route DELETE pour supprimer un article via DummyJSON
app.delete("/api/articles/:id", async (req, res) => {
  const articleId = req.params.id;

  try {
    // Effectuer une requête DELETE sur l'API DummyJSON pour supprimer l'article
    const response = await axios.delete(
      `https://dummyjson.com/posts/${articleId}`
    );

    // Répondre avec les données renvoyées par DummyJSON
    if (response.status === 200) {
      res.status(200).json({ message: "Article supprimé avec succès" });
    } else {
      res.status(404).json({ error: "Article non trouvé" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'article :",
      error.message
    );
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
