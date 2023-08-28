import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GROUP_CATEGORIES } from '../graphql/queries';
import SingleCategory from '../components/SingleCategory';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

function Categories({ groupId }) {
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { loading, data } = useQuery(QUERY_GROUP_CATEGORIES, {
    variables: { groupId },
  });
  const categories = data?.getGroupCategories;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="categories-container">
      <div className="category-list">
        <h2>Categories</h2>
        {categories.map((category) => (
          <div
            key={category._id}
            className="category-div"
            onClick={() => setSelectedCategory(category)}
          >
            <h3 className="category-name">{category.categoryName}</h3>
          </div>
        ))}
      </div>
      <div className="single-category-div">
        {
          selectedCategory ? (
            <SingleCategory category={selectedCategory} />
          ) : null /* add placeholder div */
        }
      </div>
      {/* <---- Modal ----> */}
      <Button onClick={() => props.setOpenModal('form-elements')}>
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
          <div className="space-y-6">
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
              <Button type="submit">Add Category!</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Categories;
