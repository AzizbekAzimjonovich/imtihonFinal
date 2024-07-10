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

  formData.getAll("ingredients").forEach((ingredient) => {
    ingredients.push(ingredient);
  });

  let images = [];
  formData.getAll("images").forEach((image) => {
    images.push(image);
  });

  if (
    !title ||
    !cookingTime ||
    !method ||
    !category ||
    !price ||
    ingredients.length === 0 ||
    images.length === 0
  ) {
    toast.error("All fields are required");
    return null;
  }

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
      const newRecipe = {
        title: userData.title,
        uid: user.uid,
        cookingTime: userData.cookingTime,
        method: userData.method,
        category: userData.category,
        price: userData.price,
        ingredients: addedIngredients,
        images: uploadedImages, // Updated to use state variable
      };

      addDoc(collection(db, "todos"), newRecipe)
        .then(() => {
          toast.success("New Recipe added");
          navigate("/");
        })
        .catch((error) => toast.error(error.message));
    }
  }, [userData, user.uid, navigate, addedIngredients, uploadedImages]); // Added uploadedImages to dependency array

  const handleAddIngredient = () => {
    const formData = new FormData(document.getElementById("todo-form"));
    const newIngredient = formData.get("ingredients");
    setAddedIngredients([...addedIngredients, newIngredient]);
    formData.set("ingredients", ""); // Clear the input field after adding
  };

  const handleUploadImage = () => {
    const formData = new FormData(document.getElementById("todo-form"));
    const newImage = formData.get("images");
    setUploadedImages([...uploadedImages, newImage]);
    formData.set("images", ""); // Clear the input field after adding
  };

  return (
    <div className="card bg-base-100 shadow-xl p-8 mx-auto w-full max-w-4xl">
      <Form
        id="todo-form"
        method="post"
        className="flex flex-col items-center gap-5 w-full"
      >
        <h2 className="text-3xl font-semibold">Add New Recipe</h2>
        <FormInput name="title" type="text" label="Recipe title" required />
        <FormInput
          name="cookingTime"
          type="number"
          label="Cooking time"
          required
        />
        <div className="w-full flex flex-col gap-5">
          <div className="flex items-end gap-4 ">
            <FormInput
              name="ingredients"
              type="text"
              label="Ingredients"
              multiple
              required
            />
            <button
              className="btn btn-primary w-16"
              type="button"
              onClick={handleAddIngredient}
            >
              +
            </button>
          </div>
          <div className="flex w-full gap-3 flex-wrap">
            <h3>Added Ingredients:</h3>
            <ul className="flex gap-2 flex-wrap">
              {addedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient},</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className="flex items-end gap-5 ">
            <FormInput
              name="images"
              type="text"
              label="Image URL"
              multiple
              required
            />
            <button
              className="btn btn-primary w-16"
              type="button"
              onClick={handleUploadImage}
            >
              +
            </button>
          </div>
          <div className="flex w-full gap-3 items-center flex-wrap">
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
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Method</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            name="method"
            placeholder="Method"
          ></textarea>
        </div>

        <select
          className="flex select select-bordered w-full"
          name="category"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option>Uzbek national dishes</option>
          <option>Turkish foods</option>
          <option>Fast food</option>
        </select>
        <FormInput name="price" type="number" label="Price" required />

        <button className="btn btn-primary btn-block">Add</button>
      </Form>
    </div>
  );
}

export default Create;
