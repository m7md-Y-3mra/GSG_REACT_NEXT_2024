import { Link } from "react-router-dom";
import { RecipesContext } from "../contexts/recipesContext";
import { useContext } from "react";
export default function Home() {
  const categories = useContext(RecipesContext);

  return (
    <>
      <h1>Recipe Categories</h1>
      <ul>
        {categories.map((category) => (
          <Link key={category.category} to={`category/${category.category}`}>
            <li>{category.category}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
