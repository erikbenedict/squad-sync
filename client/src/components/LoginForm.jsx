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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:text-white dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md dark:bg-gray-800">
        <form id="login-form" onSubmit={handleFormSubmit}>
          <h2 className="mb-4 text-xl font-semibold">Login</h2>
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
            className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Login
          </button>
          {error && (
            <p className="mt-2 text-sm text-red-500">
              The provided credentials are incorrect
            </p>
          )}
          <p className="mt-4">
            Need an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
