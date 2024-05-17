import express from "express";
import cors from "cors";

import unitRoute from "./routes/unit.route";
import categoryRoute from "./routes/category.route";
import ingredientRoute from "./routes/ingredient.route";
import recipeRoute from "./routes/recipe.route";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ response: "pong" });
});

app.use("/api/units", unitRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/ingredients", ingredientRoute);
app.use("/api/recipes", recipeRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
