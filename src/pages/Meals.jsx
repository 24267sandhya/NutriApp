import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_BASE_URL } from '../core/config';
import { addToFavourites } from '../state/slices/favouriteSlice';

const Meals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [category, setCategories] = useState(location?.state?.category);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!location?.state?.category) {
      navigate('/menu');
    }

    const fetchMeals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/1/filter.php?c=${category?.strCategory}`);
        setMeals(response.data.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, [category]);

  const handleFavorite = (meal) => {
    console.log('Meal marked as favorite:', meal);
    dispatch(addToFavourites(meal));
  };

  return (
    <div>
      <h2 className='text-center mb-4'>Meals in the category: {category?.strCategory}</h2>
      {meals && meals.map((meal) => (
        <div className="card mb-3" key={meal.idMeal}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={meal.strMealThumb} className="img-fluid rounded-start w-50" alt={meal.strMeal} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{meal.strMeal}</h5>
                <p className="card-text">Meal ID: {meal.idMeal}</p>
                <a onClick={() => handleFavorite(meal)} className="btn btn-primary">Mark as Favorite</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meals;