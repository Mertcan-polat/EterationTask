import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setApiData, filterValue } from "../store/Action";
import Header from "../header/Header";

function Store() {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.data.apiData);
  const searchTerm = useSelector((state) => state.data.filterValue) || "";
  const [cartItems, setCartItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  console.log(searchTerm, "saddddddd");
  const uniqueBrands = [...new Set(apiData.map((product) => product.brand))];
  const uniqueModels = [...new Set(apiData.map((product) => product.model))];

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const filteredProducts = apiData.filter((product) => {
    return (
      (selectedBrand === "" || product.brand === selectedBrand) &&
      (selectedDate === "" || product.createdAt === selectedDate) &&
      (selectedModel === "" || product.model === selectedModel) &&
      (searchTerm === "" ||
        (product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  useEffect(() => {
    const filteredProducts = apiData.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedBrand === "" || product.brand === selectedBrand) &&
        (selectedModel === "" || product.model === selectedModel)
    );
    setFiltered(filteredProducts);
  }, [apiData, searchTerm, selectedBrand, selectedModel]);

  const handleSortChange = (event) => {
    const sortType = event.target.value;

    filteredProducts.sort((a, b) => {
      if (sortType === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortType === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    setFiltered([...filteredProducts]);
  };

  const addToCart = (product) => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProduct = existingCartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      const updatedCart = existingCartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...existingCartItems, { ...product, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  useEffect(() => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(existingCartItems);
  }, []);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const filteredProducts = apiData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredProducts);
  }, [apiData, searchTerm]);

  useEffect(() => {
    const apiUrl = "https://5fc9346b2af77700165ae514.mockapi.io/products";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => dispatch(setApiData(data)))

      .catch((error) => console.error("API veri alınamadı:", error));
  }, [dispatch]);
  console.log();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filtered.slice(startIndex, endIndex);

  const totalPages = Math.ceil(apiData.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="container mx-auto">
      <Header calculateTotalPrice={calculateTotalPrice(cartItems)} />
      <div className="flex space-x-4 my-4">
        <select
          value={selectedBrand}
          onChange={handleBrandChange}
          className="px-2 text-black py-1 border rounded"
        >
          <option value="">Bütün markalar</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          onChange={handleSortChange}
          className="px-2 py-1 text-black border rounded"
        >
          <option value="">Sıralama</option>
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
        </select>
        <select
          value={selectedModel}
          onChange={handleModelChange}
          className="px-2 py-1 text-black border rounded"
        >
          <option value="">Model Seç</option>
          {uniqueModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <Link to={`/product/${product.id}`} className="mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                </Link>
                <div className="p-4 text-black">
                  <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                  <p>Price: {product.price}</p>
                  <p>Brand: {product.brand}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="border bg-white text-black rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-2 border-b py-2"
              >
                <span className="mr-2">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 border rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                  <span>Total: {item.price * item.quantity}</span>
                </div>
              </div>
            ))}
            <div className="mt-2">
              Total Price: {calculateTotalPrice(cartItems)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-5 space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Önceki
          </button>
        )}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800"
            } px-4 py-2 rounded-lg`}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Sonraki
          </button>
        )}
      </div>
    </div>
  );
}

export default Store;
