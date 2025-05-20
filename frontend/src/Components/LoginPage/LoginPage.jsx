import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import loginImage from "../../assets/loginHero.svg";
import eyeClosed from "../../assets/eyeClosed.svg";
import eyeOpen from "../../assets/eyeOpen.svg";
import { useSnackbar } from "notistack";
import axios from "axios";
import Loader from "../Loader/Loader";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(formData)) {
      return;
    }

    setLoginLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/v1/auth/login",
        formData
      );
      if (response.status === 200) {
        console.log(`logged in ${response.data}`);

        const token = response.data.token;
        localStorage.setItem("token", token);
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        navigate("/HomePage");
      }
    } catch (error) {
      console.log("An error occured", error);
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          enqueueSnackbar(`${errorMessage}`, { variant: "error" });
        }
      } else {
        enqueueSnackbar("Something went wrong.Please try again Later", {
          variant: "error",
        });
      }
    } finally {
      setLoginLoading(false);
    }
  };
  const validateInput = (data) => {
    const { username, email, password } = data;
    let isValid = true;

    if (!username) {
      enqueueSnackbar("Username is a required Field", { variant: "error" });
      isValid = false;
    }
    if (!email) {
      enqueueSnackbar("Email is a required Field", { variant: "error" });
      isValid = false;
    }
    if (!password) {
      enqueueSnackbar("Password is a required Field", { variant: "error" });
      isValid = false;
    }
    return isValid;
  };

  return (
    <>
      <div className="flex flex-col justify-center p-1 md:p-4 md:flex-row-reverse  xl:p-4 xl:flex-row-reverse overflow-x-hidden max-w-full text-center ">
        <div className="flex flex-col basis-1/2 order-2  p-10 xl:order-2 ">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-jet pb-3 font-bold text-lg md:pb-5 md:text-lg xl:text-lg">
              Welcome Back
            </h2>
            <p className="font-light text-base text-tuatara md:text-lg">
              A brand new day is here.It's your day to shape
            </p>
            <p className="font-light text-base text-tuatara ">
              Sign-in and get started
            </p>
          </div>
          <form className="flex flex-col items-center justify-center m-3 ">
            <div>
              <label
                htmlFor="username"
                className="block text-left text-xs md:text-sm mb-1"
              >
                <p className="text-xs md:text-sm">Username</p>
                <input
                  className="placeholder-style"
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-left text-xs md:text-sm mb-1"
              >
                <p className="text-xs md:text-sm">Email</p>
                <input
                  className="placeholder-style"
                  placeholder="Example@email.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="relative block text-left text-xs md:text-sm mb-1"
              >
                <p className="text-xs md:text-sm">Password</p>
                <input
                  className="placeholder-style pr-10"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <img
                  src={showPassword ? eyeOpen : eyeClosed}
                  className="absolute top-7 right-2 w-4 h-4 cursor-pointer md:top-8 xl:top-8"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </label>
            </div>
            <div className="flex flex-row items-end justify-end ">
              <p className="text-xs text-stardust cursor-pointer underline  hover:text-gray-900 transition">
                Forgot Password?
              </p>
            </div>
            <div className="flex flex-row w-full items-center justify-center">
              <button
                className="bg-jet text-quill rounded border mt-3 p-2 w-1/2 max-w-s  hover:bg-gray-900 transition"
                type="submit"
                onClick={handleSubmit}
                disabled={loginLoading}
              >
                {loginLoading ? <Loader /> : "Sign in"}
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex items-center w-full my-2">
              <div className="grow h-px bg-quill"></div>
              <span className="mx-2 text-sm text-jet">or</span>
              <div className="grow h-px bg-quill"></div>
            </div>
          </div>
          <div className="flex flex-row justify-center mb-4">
            <button className="flex items-center justify-center gap-2 border border-gray-300 rounded px-4 py-2 w-full text-sm hover:bg-gray-100 transition md:w-1/2 xl:w-1/2">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button> 
          </div>

          <div className="flex flex-col gap-1  justify-between items-center">
            <p>
              Don't you have an account ?
              <Link to="/register">
                <span className="underline text-tuatara  hover:text-gray-900 transition cursor-pointer">
                  Sign up
                </span>
              </Link>
            </p>
            <p>© 2025 MountC. All rights reserved.</p>
          </div>
        </div>

        <aside className="basis-1/2 order-1 xl:order-1 ">
          <img
            className="w-full h-48 md:w-full md:h-4/5"
            src={loginImage}
            alt="mountain_image"
          />
        </aside>
      </div>
    </>
  );
}

export default LoginPage;
