import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

const Register = () => {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isPasswordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data, "asdasdsa");
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);

    history("/");
  };

  const handleCancel = () => {
    history("/");
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md bg-black p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                className="w-full mb-4 text-black p-2 border border-gray-300 rounded-sm"
                placeholder="E-posta"
                {...register("email", { required: true })}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-semibold">
                Şifre
              </label>
              <input
                type="password"
                className="w-full mb-4 p-2 text-black  border border-gray-300 rounded-sm"
                placeholder="Şifre"
                value={password}
                {...register("password", { required: true })}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-semibold"
              >
                Şifre Doğrulama
              </label>
              <input
                type="password"
                className="w-full mb-4 p-2 text-black  border border-gray-300 rounded-sm"
                placeholder="Şifre Doğrulama"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                onClick={handleCancel}
              >
                İptal
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium text-white rounded focus:outline-none ${
                  Object.keys(errors).length > 0 || !isPasswordMatch
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={Object.keys(errors).length > 0 || !isPasswordMatch}
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
