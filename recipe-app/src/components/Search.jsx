import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSerachTerm] = useState("");
  const navigate = useNavigate();

  const handleSerach = () => {
    navigate(`/search-results?query=${searchTerm.trim()}`);
  };
  
  return (
    <div>
      <h2>Search Recipes</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSerachTerm(e.target.value)}
      />
      <button onClick={handleSerach}>Search</button>
    </div>
  );
}
