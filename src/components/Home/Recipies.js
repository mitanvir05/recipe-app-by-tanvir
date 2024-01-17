"use client";
import React, { useEffect, useState } from 'react'

export default function Recipies() {
    const [recipes, setRecipes] = useState([]);

    const [isEditingRecipe, setIsEditingRecipe] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedIngredients, setEditedIngredients] = useState([]);
    const [editedInstructions, setEditedInstructions] = useState('');
   const [searchRecipes, setSearchRecipes] = useState('');

//get recipes from local Store
    useEffect(() => {
        const storedRecipes = JSON.parse(
          localStorage.getItem("recipes") || "[]"
        );
        setRecipes(storedRecipes);
      }, []);
//for search
 const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchRecipes.toLowerCase())
  );
//for modals
 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleProductClick = (item, e) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
    // e.preventDefault();
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };
//for edit 

const handleEditRecipe = () => {
  setIsEditingRecipe(true);
  setEditedTitle(selectedProduct.title);
  setEditedIngredients(selectedProduct.ingredients);
  setEditedInstructions(selectedProduct.instructions);
};

// Add input 
const handleTitleChange = (e) => setEditedTitle(e.target.value);
const handleIngredientsChange = (e) => setEditedIngredients(e.target.value.split(',').map(label => ({ id: Math.random(), label })));
const handleInstructionsChange = (e) => setEditedInstructions(e.target.value);

// update 
const handleUpdateRecipe = () => {
    const updatedRecipe = {
      ...selectedProduct,
      title: editedTitle,
      ingredients: editedIngredients,
      instructions: editedInstructions,
    };
  
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === selectedProduct.id ? updatedRecipe : recipe
    );
  
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setIsEditingRecipe(false);
    closeModal();
  };
  
  
  //delete recipe

  const handleDeleteRecipe = () => {

    const updatedRecipes = recipes.filter((r) => r.id !== selectedProduct.id);
  
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    closeModal();
  };
  
  

  const handleCloseEditing = () => {
    setIsEditingRecipe(false);
    setEditedTitle('');
    setEditedIngredients([]);
    setEditedInstructions('');
  };
  return (
    <div className='max-w-[1500px] mx-auto'>
        <div className='mb-6 '>
            <h1 className='mt-5 lg:10 font-semibold lg:text-3xl text-lg text-center text-yellow-500'>Recipies <span className='text-black'>List</span> </h1>
        </div>

        {/* search */}
        <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Search Recipe here'
          className='input input-bordered mt-1 mx-auto input-warning w-full max-w-xs'
          value={searchRecipes}
          onChange={(e) => setSearchRecipes(e.target.value)}
        />
        </div>
        <div className="  grid grid-cols-1 lg:grid-cols-4 gap-4 mx-auto mt-5">
        {filteredRecipes.map((item) => (
                  <div
                    key={item.id}
                    className=" p-3"
                  >
        <div className=' mx-auto px-4'>
        <div className="card card-compact w-80 bg-base-100 shadow-xl">
  <figure>
    
    <img
                    src={
                        item?.image ||
                      "https://i.ibb.co/9NGXvR8/Screenshot-3.jpg"
                    }
                    alt={item?.title}
                    className="lg:h-[200px] h-[60px] mx-auto 1  w-[full]"
                   
                  />
                   
    
    </figure>
  <div className="card-body">
    <h2 className="card-title">{item.title}</h2>
  
    <div className="card-actions justify-end">
      <button  onClick={() => handleProductClick(item)} className="btn btn-primary">View Details</button>
    </div>
  </div>
</div>
        </div>
        </div>
        ))}
        </div>


        {/* modal part for details*/}
        {selectedProduct && (
        <div>
          <dialog
            id="my_modal_3"
            className={`modal modal-background-blur overflow-scroll fixed inset-0 flex items-center justify-center ${
              isModalOpen ? "block" : "hidden"
            }`}
            open={isModalOpen}
            onClose={closeModal}
          >
            <form
              method="dialog"
              className="modal-size   overflow-auto  bg-white "
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="">
                <div className="flex justify-end items-center">
                  <button
                    className=" bg-gray-100 text-gray-600 "
                    onClick={(e) => {
                      closeModal();
                      e.stopPropagation();
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div className=" grid lg:grid-cols-2 grid-cols-1 gap-1 ">
                  <div>
                  <img
                    src={
                        selectedProduct?.image ||
                      "https://i.ibb.co/9NGXvR8/Screenshot-3.jpg"
                    }
                    alt={ selectedProduct?.title}
                    className="lg:h-[200px] h-[60px] mx-auto 1  w-[full]"
                   
                  />
                   
                  </div>
                  <div>
                    
                    <h3 className="lg:text-2xl mb-2 font-semibold text-black mt-1">
                      {selectedProduct.title}
                    </h3>
                    <h2 className='text-lg  font-semibold'>Ingredients:</h2>
      <ul>
        {selectedProduct.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.label}</li>
        ))}
      </ul>
      <h2 className='text-lg mt-3 font-semibold'>Instructions :</h2>
      <p>{selectedProduct?.instructions}</p>

                  </div>
                  <div className="mt-4 flex space-x-4">
                  {isEditingRecipe && (
                <div>
                  {/* Editing form or dialog here */}
                </div>
              )}
</div>
{/* edit and update */}
<div className="flex justify-end ">
        {isEditingRecipe ? (
           <div className="">
            <h1 className='text-center text-xl my-2 font-semibold text-yellow-500'>Update recipe</h1>
           <label className="block">
             <span className="text-gray-700 font-bold text-lg me-1">Title</span>
             <input
               type="text"
               className="mt-1 ms-1 p-2 border rounded"
               value={editedTitle}
               onChange={handleTitleChange}
             />
           </label>
           <label className="block">
             <span className="text-gray-700 font-bold text-lg me-1">Ingredients (comma-separated)</span>
             <input
               type="text"
               className="mt-1 p-2 border rounded"
               value={editedIngredients.map(ingredient => ingredient.label).join(',')}
               onChange={handleIngredientsChange}
             />
           </label>
           <label className="block mt-2 mb-3 items-center">
             <span className="text-gray-700 font-bold  flex items-center text-lg me-1">Instructions :</span>
             <textarea
               className="mt-1 p-2 border rounded"
               value={editedInstructions}
               onChange={handleInstructionsChange}
             />
           </label>

           <button className="btn btn-primary me-2" onClick={handleUpdateRecipe}>
        Update
      </button>
      <button className="btn btn-secondary" onClick={handleCloseEditing}>
        Cancel
      </button>
         </div>
       
        ) : (
          <>
            <button className="btn btn-secondary me-2 " onClick={handleEditRecipe}>
              Edit Recipe
            </button>
            <button className="btn btn-danger" onClick={handleDeleteRecipe}>
              Delete Recipe
            </button>
          </>
        )}
      </div>
                </div>
               
              </div>
            </form>
          </dialog>
        </div>
      )}
    </div>
  )
}
