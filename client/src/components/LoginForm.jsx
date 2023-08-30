import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../graphql/mutations";
import { useCurrentUserContext } from "../context/CurrentUser";

export default function Login() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const { token, user } = mutationResponse.data.login;
      loginUser(user, token);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:text-white bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <form id="login-form" onSubmit={handleFormSubmit}>
          <h2 className="mb-4 text-xl font-semibold">Login</h2>
          <label htmlFor="email" className="block mb-2">
            Email:
            <input
              id="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="youremail@test.com"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password" className="block mb-2">
            Password:
            <input
              id="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
          </label>
          
          <button
            className="w-full mt-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none"
            type="submit"
          >
            Login
          </button>
          {error && (
            <p className="mt-2 text-red-500 text-sm">
              The provided credentials are incorrect
            </p>
          )}
          <p className="mt-4">
            Need an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
