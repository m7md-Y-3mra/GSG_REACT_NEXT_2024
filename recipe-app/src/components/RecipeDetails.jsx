import { RecipesContext } from "../contexts/recipesContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
export default function RecipeDetails() {
    const data = useContext(RecipesContext);
    const {categoryName, recipeId} = useParams();
    
    const recipes = data.find((category) => category.category == categoryName).recipes;
    const recipe = recipes.find((recipe) => recipeId == recipe.id);

    return <>
        <div>
            <h1>Recipe: {recipe.name}</h1>
            <p>This is a detailed page about how to make {recipe.name}</p>
            <ul>
                {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
            </ul>
            <p>instructions: {recipe.instructions}</p>
        </div>
    </>
    
}