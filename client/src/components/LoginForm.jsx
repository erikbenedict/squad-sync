import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/mutations';
import { useCurrentUserContext } from '../context/CurrentUser';

export default function Login() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
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
      const { token, currentUser } = mutationResponse.data.login;
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
      <div className="w-full max-w-md p-8 bg-gray-400 dark:bg-gray-600 rounded-md shadow-md">
        <div className="bg-gray-400 dark:bg-gray-600 w-full p-1">
          <h2 className="mb-4 text-2xl font-semibold text-center md-2">
            Login
          </h2>
        </div>
        <form
          id="login-form"
          onSubmit={handleFormSubmit}
          className="bg-gray-100 dark:bg-gray-400 rounded-md p-3"
        >
          <label htmlFor="email" className="block mb-2">
            Email:
            <input
              id="email"
              className="w-full px-3 py-2 border rounded-md dark:text-black"
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
              className="w-full px-3 py-2 border rounded-md dark:text-black"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
          </label>

          <button
            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
            type="submit"
          >
            Login
          </button>
          {error && (
            <p className="mt-2 text-sm font-semibold text-red-500 dark:text-amber-300">
              The provided credentials are incorrect
            </p>
          )}
          <p className="mt-4">
            Need an account?{' '}
            <Link
              to="/register"
              className="text-blue-500 dark:text-cyan-200 hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
