import { Link, useParams } from "react-router-dom";
import { RecipesContext } from "../contexts/recipesContext";
import { useContext } from "react";
export default function Recipe() {
    const data = useContext(RecipesContext);
    const {categoryName} = useParams();
    const recipes = data.find((category) => categoryName == category.category).recipes;
    return <>
        <h2>{categoryName}: </h2>
        <ul>
            {recipes.map((recipe) => {            
            return <Link key={recipe.id} to={`/category/${categoryName}/recipe/${recipe.id}`}>
                <li>{recipe.name}</li>
            </Link>})}
        </ul>
    </>
    
}