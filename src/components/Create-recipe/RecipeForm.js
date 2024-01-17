"use client";

import { useState } from 'react';
import ingredientsData from '@/../ingredients.json';
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  //reset form after submit
  const resetForm = () => {
    setTitle('');
    setSelectedIngredients('');
    setInstructions('');
    setImage('');
  };
//form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || selectedIngredients.length === 0 || !instructions) {
      alert('Please fill in all required fields.');
      return;
    }

    const newRecipe = {
      id: new Date().getTime(),
      title,
      ingredients: selectedIngredients,
      instructions,
      image,
    };

    //  store recipes in local storage
    const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const updatedRecipes = [...existingRecipes, newRecipe];
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

  
    resetForm();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Recipe Added Successfully!",
      showConfirmButton: false,
      timer: 1500
    });


  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="lg:text-3xl text-xl font-bold mb-4">Create a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4 p-1">
        <label className="block">
          <span className="text-sm font-semibold text-gray-600">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-600">Ingredients:</span>
          <Multiselect
            options={ingredients}
            onSelect={(selectedList) => setSelectedIngredients(selectedList)}
            onRemove={(selectedList) => setSelectedIngredients(selectedList)}
            displayValue="label"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-600">Instructions:</span>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-600">Image URL (optional):</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>

        <button type="submit" className="bg-blue-500 hover:bg-green-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
