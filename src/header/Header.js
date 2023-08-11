import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/Action";

const Header = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const newFilterValue = event.target.value;
    setInputValue(newFilterValue);
    dispatch(setSearchTerm(newFilterValue));
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
            onChange={handleInputChange}
            className="px-4 py-2 text-black rounded-lg"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
