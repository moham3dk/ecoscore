const { fetchArticles } = require("../services/scraper");

const getArticles = async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching articles" });
  }
};

module.exports = { getArticles };
