import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/Action";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold ml-4">Eteration Task</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Filtrele..."
            value={inputValue}
            onChange={handleSearchInputChange}
            className="px-4 py-2 text-black rounded-lg"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
