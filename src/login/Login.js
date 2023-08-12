import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password !== "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);

        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (email === storedEmail && password === storedPassword) {
          localStorage.setItem("isLoggedIn", "true");
          navigate("/store");
        } else {
          setErrorMessage("Email veya şifre hatalı.");
        }
      }, 2000);
    } else {
      setErrorMessage("Lütfen geçerli bir email ve şifre giriniz.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="max-w-sm px-6 py-8 bg-gray-500 rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Giriş Yap</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 text-black rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 mb-1 rounded text-black border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
            disabled={!validateForm() || isLoading}
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
          <button
            type="button"
            className="max-w-md bg-blue-500 p-2 rounded shadow-md"
            onClick={handleRegisterClick}
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
