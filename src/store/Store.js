import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../helper/cardContext';
import { FcLike } from 'react-icons/fc';

import data from "../data/demon.json";

function Store() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { cartItems, addToCart } = useContext(CartContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (itemId) => {
    const selectedItem = data.find((item) => item.Id === itemId);
    addToCart(selectedItem);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getSelectedItemCount = () => {
    return cartItems.length;
  };

  const filteredGames = data
    .filter((game) => {
      const searchTermMatches = game.Name.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const categoryMatches =
        selectedCategory === "" || game.Categories.includes(selectedCategory);
      return searchTermMatches && categoryMatches;
    })
    .filter((game) => !cartItems.find((item) => item.Id === game.Id))
    .sort((a, b) => b.Popularity - a.Popularity);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4 mt-8">
        <h1 className="text-2xl font-bold">Mağaza</h1>
        <Link
          to="/library"
          className={`px-4 py-2 bg-blue-500 text-white rounded ${getSelectedItemCount() > 0 ? "disabled" : ""}`}
          disabled={getSelectedItemCount() > 0}
        >
          Kütüphanem ({getSelectedItemCount()})
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Oyun Ara"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-3 py-2 rounded border-gray-300 text-black focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-8">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full text-black px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Tüm Kategoriler</option>
          {data
            .reduce((categories, game) => {
              game.Categories.forEach((category) => {
                if (!categories.includes(category)) {
                  categories.push(category);
                }
              });
              return categories;
            }, [])
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {filteredGames.map((game) => (
    <div key={game.Id} className="bg-white rounded-lg shadow-md">
      <img
        src={game.Cover}
        alt={game.Name}
        className="w-full h-40 object-cover p-2 rounded-2xl"
      />
      <div className="p-4 text-black">
        <h2 className="text-lg font-bold mb-2">{game.Name}</h2>
        <p className="text-gray-500 line-clamp-3">{game.Summary}</p>
      </div>
      <div className="flex items-center justify-between text-black ml-4">
        <div className="flex">
          <h2 className="text-lg font-bold mb-2">Price:</h2>
          <span className="inline-block mb-2 mt-1 ml-2">{game.Price}</span>
        </div>
        <div className="flex items-center flex space-x-2">
          
          <span className="text-gray-500 flex">Likes :  {game.Likes} <FcLike className="flex ml-2 mt-1 mr-3" /></span>
        </div>
      </div>
      <div className="flex justify-end p-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleAddToCart(game.Id)}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}
export default Store;