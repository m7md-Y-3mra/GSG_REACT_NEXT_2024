import data from "./data/recipes.js";
import { Link, Route, Routes } from "react-router-dom";
import { RecipesContext } from "./contexts/recipesContext.js";
import Home from "./components/Home.jsx";
import Recipe from "./components/Recipe.jsx";
import RecipeDetails from "./components/RecipeDetails.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Search from "./components/Search.jsx";
function App() {
  return (
    <>
      <RecipesContext.Provider value={data}>
        <nav>
          <Link to="/">Home</Link> | <Link to="/search">Search</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Recipe />} />
          <Route
            path="/category/:categoryName/recipe/:recipeId"
            element={<RecipeDetails />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="//search-results" element={<SearchResults />} />
          {/* <Route path="/search/:searchTerm" element={<SearchResults />} /> */}
        </Routes>
      </RecipesContext.Provider>

      {/* ROUTES */}
      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category'>
          <Route path=':categoryName' > 
            <Route index element={<Recipe />} />
            <Route path=':recipeId' element={<RecipeDetails />} />
          </Route>
        </Route>
        <Route path='/search' element={<Search />}/>
        <Route path='/search-result' element={<SearchResults />} />
      </Routes> */}
    </>
  );
}

export default App;
