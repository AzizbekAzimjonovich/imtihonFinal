import { useState } from "react";
import { useSelector } from "react-redux";
import { useActionData, Form, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { FormInput } from "../components";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let cookingTime = formData.get("cookingTime");
  let method = formData.get("method");
  let category = formData.get("category");
  let price = formData.get("price");
  let ingredients = [];

  // Collect all ingredients from formData
  formData.getAll("ingredients").forEach((ingredient) => {
    ingredients.push(ingredient);
  });

  // Retrieve uploaded images URLs
  let images = [];
  formData.getAll("images").forEach((image) => {
    images.push(image);
  });

  return { title, cookingTime, method, category, price, ingredients, images };
};

function Create() {
  const navigate = useNavigate();
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);

  const [addedIngredients, setAddedIngredients] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    if (userData) {
      const newTodo = {
        title: userData.title,
        uid: user.uid,
        cookingTime: userData.cookingTime,
        method: userData.method,
        category: userData.category,
        price: userData.price,
        ingredients: userData.ingredients,
        images: userData.images,
      };

      addDoc(collection(db, "todos"), newTodo)
        .then(() => {
          toast.success("New Todo added");
          navigate("/");
        })
        .catch((error) => toast.error(error.message));
    }
  }, [userData, user.uid, navigate]);

  const handleAddIngredient = () => {
    const formData = new FormData(document.getElementById("todo-form"));
    const newIngredient = formData.get("ingredients");
    setAddedIngredients([...addedIngredients, newIngredient]);
    formData.set("ingredients", "");
  };

  const handleUploadImage = () => {
    const formData = new FormData(document.getElementById("todo-form"));
    const newImage = formData.get("images");
    setUploadedImages([...uploadedImages, newImage]);
    formData.set("images", "");
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl p-8">
      <Form
        id="todo-form"
        method="post"
        className="flex flex-col items-center gap-5"
      >
        <h2 className="text-3xl font-semibold">New Todo</h2>
        <FormInput name="title" type="text" label="Todo title" />
        <FormInput name="cookingTime" type="number" label="Cooking time" />
        <div className="w-full flex-col gap-5">
          <div className="flex items-end gap-4">
            <FormInput
              name="ingredients"
              type="text"
              label="Ingredients"
              multiple
            />
            <button
              className="btn btn-primary w-16"
              type="button"
              onClick={handleAddIngredient}
            >
              +
            </button>
          </div>
          <div>
            <h3>Added Ingredients:</h3>
            <ul>
              {addedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full flex gap-5">
          <FormInput name="images" type="text" label="Image URL" multiple />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleUploadImage}
          >
            Upload
          </button>
        </div>
        <div className="flex w-full gap-3 items-center">
          <h3>Uploaded Images:</h3>
          <ul className="flex flex-wrap gap-3">
            {uploadedImages.map((image, index) => (
              <li key={index}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: "50px", maxHeight: "100px" }}
                />
              </li>
            ))}
          </ul>
        </div>
        <FormInput name="method" type="text" label="Method" />
        <FormInput name="category" type="text" label="Category" />
        <FormInput name="price" type="number" label="Price" />

        <button className="btn btn-primary btn-block">Add</button>
      </Form>
    </div>
  );
}

export default Create;
