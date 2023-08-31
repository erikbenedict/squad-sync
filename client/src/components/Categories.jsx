import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROUP_CATEGORIES } from '../graphql/queries';
import { ADD_CATEGORY, REMOVE_CATEGORY } from '../graphql/mutations';
import SingleCategory from '../components/SingleCategory';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

function Categories({ groupId }) {
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };

  const { loading, data } = useQuery(QUERY_GROUP_CATEGORIES, {
    variables: { groupId },
  });
  const [categories, setCategories] = useState(data?.getGroupCategories || []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    setCategories(data?.getGroupCategories || []);
  }, [data]);

  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [{ query: QUERY_GROUP_CATEGORIES, variables: { groupId } }],
  });

  const [removeCategory] = useMutation(REMOVE_CATEGORY);

  const updateCategory = (newData) => {
    console.log(newData);
    const updatedCategories = categories.map((category) =>
      category._id === newData._id ? newData : category
    );
    console.log(updatedCategories);
    setCategories(updatedCategories);
    setSelectedCategory(newData);
  };

  const handleRemoveCategory = async (event, categoryId) => {
    event.preventDefault();
    try {
      await removeCategory({
        variables: {
          groupId: groupId,
          categoryId: categoryId,
        },
      });
      setCategories((updatedCategories) =>
        updatedCategories.filter((category) => category._id !== categoryId)
      );
      setSelectedCategory(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCategoryFormSubmit = async (event) => {
    event.preventDefault();

    const categoryName = event.target.categoryName.value;

    try {
      await addCategory({
        variables: {
          groupId: groupId,
          categoryName: categoryName,
        },
      });
      setOpenModal(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="categories-container">
      <div className="flex">
        <div className="category-list w-1/2 p-2">
          <h2 className="text-center text-2xl font-semibold mb-2">
            Categories
          </h2>
          {categories.map((category) => (
            <div
              key={category._id}
              className="category-div border-4 rounded-lg border-2 border-gray-900 shadow-2xl hover:bg-white bg-slate-300 p-2 mb-3 flex justify-between items-center cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <h3 className="category-name font-semibold text-lg">
                {category.categoryName}
              </h3>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs text-center mr-2 mb-2"
                onClick={(event) => handleRemoveCategory(event, category._id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div
          className={`single-category-div w-1/2 border-4 rounded-lg border-solid border-slate-300 p-3 mb-3 ${
            selectedCategory ? '' : 'hidden'
          }`}
        >
          {
            selectedCategory ? (
              <SingleCategory
                key={selectedCategory._id}
                category={selectedCategory}
                updateCategory={updateCategory}
              />
            ) : null /* add placeholder div */
          }
        </div>
      </div>

      {/* <---- Modal ----> */}
      <Button
        onClick={() => props.setOpenModal('form-elements')}
        className="p-1 mt-2 text-white bg-gray-700 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
      >
        <i className="fa-solid fa-plus pr-2"></i>Category
      </Button>
      <Modal
        show={props.openModal === 'form-elements'}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleCategoryFormSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create a new Category
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categoryName" value="Category Name" />
              </div>
              <TextInput
                id="categoryName"
                placeholder="Enter a name for the new category"
                required
              />
            </div>
            <div className="w-full">
              <Button
                type="submit"
                className="p-1 mt-2 text-white bg-gray-700 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
              >
                Add Category!
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Categories;
