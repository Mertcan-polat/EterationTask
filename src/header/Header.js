import React from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/Action";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm(newSearchTerm));
  };

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <Link to="/store" className="text-white text-2xl font-bold ml-4">
            Eteration Task
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Filtrele..."
            onChange={handleSearchInputChange}
            className="px-4 py-2 text-black rounded-lg"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
