import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFilter } from "../store/Action";

const Header = ({ ...props }) => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.data.filterValue);
  const totalPrice = props.calculateTotalPrice;

  const handleFilterChange = (e) => {
    const newFilterValue = e.target.value;
    dispatch(setFilter(newFilterValue));
  };

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <Link to="/store" className="text-white text-2xl font-bold ml-4">
            Eteration Task
          </Link>
        </div>
        {totalPrice ? (
          <p className="text-white">
            Total Price: {totalPrice ? totalPrice : 0}
          </p>
        ) : null}
        <div>
          <input
            type="text"
            value={filterValue}
            placeholder="Filtrele..."
            onChange={handleFilterChange}
            className="px-4 py-2 mr-4 text-black rounded-lg"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
