import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Specialties.css";

const Specialties = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="specialties-page">
      {categories.map(cat => (
        <div
          key={cat.id}
          className="category-card"
          style={{ backgroundImage: `url(${cat.image})` }}
          onClick={() => navigate(`/category/${cat.id}`)}
        >
          <div className="overlay">
            <h2>{cat.name}</h2>
            <p>{cat.count} items</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Specialties;
