import { useLocation, useSearchParams } from "react-router-dom";
import { RecipesContext } from "../contexts/recipesContext";
import { useContext } from "react";

const useQuery = () => {
  console.log(useLocation());
  // console.log(window.location);
  
  return new URLSearchParams(useLocation().search);
};

export default function SearchResults() {
  const data = useContext(RecipesContext);
  const query = useQuery();

  let [searchParams] = useSearchParams();
  console.log(searchParams.get("query"));
  

  const searchTerm = query.get("query");
  // const {searchTerm} = useParams();

  let mockRecipes = data.flatMap((category) =>
    category.recipes.map((recipe) => recipe.name)
  );

  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Search Results for {searchTerm}</h2>
      <ul>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => {
            return <li key={index}>{recipe}</li>;
          })
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}
