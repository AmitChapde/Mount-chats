import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginHero from "../../assets/loginHero.svg";
import Loader from "../../Components/Loader/Loader";
import eyeClosed from "../../assets/eyeClosed.svg";
import eyeOpen from "../../assets/eyeOpen.svg";
import { useSnackbar } from "notistack";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerLoading, setregisterLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordMatch = registerFormData.password === confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateUserInput = (data) => {
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
    if (!confirmPassword) {
      enqueueSnackbar("Password is a required Field", { variant: "error" });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUserInput(registerFormData)) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        registerFormData
      );
      if (response.status === 201) {
        const token = response.data.token;
        enqueueSnackbar("Registered successfully", { variant: "success" });
        navigate("/");
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
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <>
      <div className="flex flex-col justify-center p-1 md:p-4 md:flex-row-reverse  xl:p-4 xl:flex-row-reverse overflow-x-hidden max-w-full text-center ">
        <div className="flex flex-col basis-1/2 order-2  p-10 xl:order-2 ">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-jet pb-3 font-bold text-lg md:pb-5 md:text-lg xl:text-lg">
              Create an Account
            </h2>
            <p className="font-light text-base text-tuatara md:text-lg">
              Join us and get started on your journey
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
                  value={registerFormData.username}
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
                  value={registerFormData.email}
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
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={registerFormData.password}
                  onChange={handleChange}
                  required
                />
                <img
                  src={showPassword ? eyeOpen : eyeClosed}
                  className="absolute top-7 right-2 w-4 h-4 cursor-pointer md:top-8 xl:top-8"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </label>
              <label
                htmlFor="confirmPassword"
                className="relative block text-left text-xs md:text-sm mb-1"
              >
                <p className="text-xs md:text-sm">Confirm Password</p>
                <input
                  className="placeholder-style pr-10"
                  placeholder="Re-enter your password"
                  type={showPassword2 ? "text" : "password"}
                  name="confirmpassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={showPassword2 ? eyeOpen : eyeClosed}
                  className="absolute top-7 right-2 w-4 h-4 cursor-pointer md:top-8 xl:top-8"
                  onClick={() => setShowPassword2((prev) => !prev)}
                />
              </label>
              {confirmPassword.length > 0 && (
                <p
                  className={`text-sm ${
                    passwordMatch ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {passwordMatch ? "" : "Passwords do not match"}
                </p>
              )}
            </div>
            {/* <div className="flex flex-row gap-1 items-baseline ">
              <input type="checkbox" />
              <label for="vehicle1">
                By signing up,you agree to our
                <Link>
                  <span className="underline"> Terms and Privacy Policy</span>
                </Link>
              </label>
            </div> */}
            <div className="flex flex-row w-full items-center justify-center">
              <button
                className="bg-jet text-quill rounded border mt-3 p-2 w-1/2 max-w-s  hover:bg-gray-900 transition"
                type="submit"
                onClick={handleSubmit}
                disabled={registerLoading}
              >
                {registerLoading ? <Loader /> : "Sign Up"}
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
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 rounded px-4 py-2 w-full text-sm hover:bg-gray-100 transition md:w-1/2 xl:w-1/2"
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </div>

          <div className="flex flex-col gap-1  justify-between items-center">
            <p>
              Already have an account ?
              <Link to='/'><span className="underline text-tuatara  hover:text-gray-900 transition cursor-pointer">
                Sign In
              </span></Link>
              
            </p>

            <p>© 2025 MountC. All rights reserved.</p>
          </div>
        </div>

        <aside className="basis-1/2 order-1 xl:order-1 ">
          <img
            className="w-full h-48 md:w-full md:h-4/5"
            src={loginHero}
            alt="mountain_image"
          />
        </aside>
      </div>
    </>
  );
}

export default RegisterPage;
