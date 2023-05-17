import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../helper/cardContext";
import { FcLike } from "react-icons/fc";
import { BsFilter } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

import data from "../data/demon.json";

function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLike = (gameId) => {
    // Perform like operations
  };

  const handleDownload = (gameId) => {
    // Perform download operations
  };

  const handleShare = (gameId) => {
    // Perform share operations
  };

  const handleRemoveFromLibrary = (gameId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.Id !== gameId));
  };

  const toggleActions = (gameId) => {
    setShowActions((prevState) => ({
      ...prevState,
      [gameId]: !prevState[gameId],
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }
  };

  const filteredGames = cartItems
    .filter((game) => {
      const searchTermMatches = game.Name.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const categoryMatches =
        selectedCategories.length === 0 ||
        game.Categories.some((category) =>
          selectedCategories.includes(category)
        );
      return searchTermMatches && categoryMatches;
    })
    .sort((a, b) => b.Popularity - a.Popularity);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4 mt-8">
        <h1 className="text-2xl font-bold">Kütüphane</h1>
        <Link to="/store" className="px-4 py-2 bg-blue-500 text-white rounded">
          Mağaza
        </Link>
      </div>
      <div>
        <div className="mb-8 bg-slate-100 text-black rounded-xl p-2">
          <div className="flex items-center mb-2">
            <button
              className={`${cartItems.length === 0 ? 'bg-blue-200 cursor-default px-4 py-2 flex text-white rounded' :'px-4 py-2 flex bg-blue-500 text-white rounded' }`}
              onClick={() => setShowFilters(!showFilters)}
              disabled={cartItems.length === 0}
            >
              Filtreler <BsFilter className="flex mt-1 ml-2" />
            </button>
          </div>
          {showFilters && (
            <div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Oyun Ara"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-3 py-2 rounded border-gray-300 text-black focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="items-end justify-items-end mb-2">
                <label className="mr-2">Kategoriler:</label>
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
                    <div key={category} className="mr-2">
                      <input
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={handleCategoryChange}
                      />
                      <label htmlFor={category} className="ml-1">
                        {category}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {filteredGames.map((game) => (
          <div key={game.Id} className="bg-white rounded-lg shadow-md">
          <div className="text-end flex p-1">
          <button
              className="text-red-500 hover:text-red-600"
              onClick={() => handleRemoveFromLibrary(game.Id)}
            >
              <AiOutlineCloseCircle size={20} />
            </button>
          </div>
            <img
              src={game.Cover}
              alt={game.Name}
              className="w-full h-40 object-cover p-2 rounded-2xl"
            />
            <div className="p-4 text-black">
              <h2 className="text-lg font-bold mb-2">{game.Name}</h2>
              <p className="text-gray-500 line-clamp-3">{game.Summary}</p>
            </div>
            <div className="relative inline-block p-2 text-left">
                  <button
                    onClick={() => setShowActions(!showActions)}
                    className="inline-flex  justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                  >
                    Aksiyonlar
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {showActions && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => handleDownload(game.Id)}
                        >
                          {game.Downloaded ? "Kaldır" : "Yükle"}
                        </a>
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => handleShare(game.Id)}
                        >
                          {game.Shared ? "Paylaşımı Kaldır" : "Paylaş"}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
            <div className="flex items-center justify-between text-black ml-4">
              <div className="flex">
                <h2 className="text-lg font-bold mb-2">Price:</h2>
                <span className="inline-block mb-2 mt-1 ml-2">
                  {game.Price}
                </span>
              </div>
              <div className="flex items-center space-x-1 relative p-2">
                <FcLike
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleLike(game.Id)}
                />
                <span>{game.Likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
