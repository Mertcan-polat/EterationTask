import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { setApiData, addToCart } from "../store/Action";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.data.apiData);
  const [cartItems, setCartItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(existingCartItems);
    if (apiData.length === 0) {
      fetch("https://5fc9346b2af77700165ae514.mockapi.io/products")
        .then((response) => response.json())
        .then((data) => {
          dispatch(setApiData(data));
          const productItem = data.find((item) => item.id === id);
          if (productItem) {
            setProduct(productItem);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("API veri alınamadı:", error);
          setIsLoading(false);
        });
    } else {
      const productItem = apiData.find((item) => item.id === id);
      if (productItem) {
        setProduct(productItem);
        setIsLoading(false);
      }
    }
  }, [apiData, dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    handleAddToCartLocal(product); // Doğrudan handleAddToCartLocal fonksiyonunu çağır
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleAddToCartLocal = (product) => {
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

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-screen-xl mx-auto bg-white rounded-lg overflow-hidden shadow-md flex">
        <div className="flex-shrink-0 w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full"
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-10">
            <div className="flex-grow p-6">
              <Link to="/store" className="text-blue-500 mb-4 block">
                &lt; Geri dön
              </Link>
              <h2 className="text-xl font-semibold text-black mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Brand: {product.brand}
              </p>
              <div className="text-gray-700 max-h-96 overflow-y-auto">
                {product.description}
              </div>
              <p className="text-gray-800 font-semibold mt-4">
                Price: {product.price}
              </p>
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              >
                Add to Cart
              </button>
            </div>
            <div className="col-span-2">
              <div className="mt-4 border bg-white text-black rounded-lg shadow-md p-4">
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
                        onClick={() => handleAddToCartLocal(item)}
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
