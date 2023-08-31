import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { REGISTER_USER } from '../graphql/mutations';
import { useCurrentUserContext } from '../context/CurrentUser';

export default function Registration() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [register, { error }] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await register({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        },
      });
      const { token, currentUser } = mutationResponse.data.register;
      loginUser(currentUser, token);
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-400 rounded-md shadow-md dark:bg-gray-600">
        <div className="w-full p-1 bg-gray-400 dark:bg-gray-600">
          <h2 className="mb-4 text-2xl font-semibold text-center md-2">
            Register
          </h2>
        </div>
        <form
          id="registration-form"
          onSubmit={handleFormSubmit}
          className="p-3 bg-gray-100 rounded-md dark:bg-gray-400"
        >
          <div className="mb-4">
            <label htmlFor="firstName">
              First name:
              <input
                className="w-full px-3 py-2 border rounded-md dark:text-black"
                type="text"
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="lastName">
              Last name:
              <input
                className="w-full px-3 py-2 border rounded-md dark:text-black"
                type="text"
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                className="w-full px-3 py-2 border rounded-md dark:text-black"
                type="email"
                id="email"
                name="email"
                placeholder="youremail@test.com"
                value={formState.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                className="w-full px-3 py-2 border rounded-md dark:text-black"
                type="password"
                id="password"
                name="password"
                placeholder="******"
                value={formState.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white transition ease-in-out bg-gray-700 rounded-lg hover:-translate-y-1 hover:scale-105 focus:outline-none"
          >
            Sign Up
          </button>
          {error && (
            <p className="mt-4 text-sm font-semibold text-red-500 dark:text-amber-300">
              The provided credentials are incorrect
            </p>
          )}
          <p className="mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-500 dark:text-cyan-200 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
