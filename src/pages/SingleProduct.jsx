// src/components/SingleProduct.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [itemNum, setItemNum] = useState(1);
  const dispatch = useDispatch();

  const plusFunc = () => {
    setItemNum(itemNum + 1);
  };

  const minusFunc = () => {
    if (itemNum > 1) {
      setItemNum(itemNum - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: itemNum }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "todos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <a>SingleProduct</a>
          </li>
        </ul>
      </div>
      <div className="carousel carousel-center bg-neutral rounded-box  space-x-4 p-4 h-96">
        {product.images.map((img, index) => (
          <div className="carousel-item" key={index}>
            <img src={img} alt={`Image ${index}`} className="rounded-box" />
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-4">{product.title}</h2>
      <p className="mt-2">{product.method}</p>
      <p className="mt-2">Cooking Time: {product.cookingTime}</p>
      <p className="mt-2">Category: {product.category}</p>
      <p className="mt-2">Price: {product.price}$</p>
      <ul className="mt-2 flex gap-5">
        <strong>Ingredients:</strong>
        {product.ingredients.map((ingredient, index) => (
          <li className="badge badge-neutral" key={index}>
            {ingredient}
          </li>
        ))}
      </ul>
      <div className="mb-5 text-center flex lg:flex-row md:flex-row sm:flex-row flex-col gap-10">
        <div className="flex  items-center gap-5">
          <button className="btn  text-2xl" onClick={minusFunc}>
            -
          </button>
          <span className=" btn text-lg font-semibold">{itemNum}</span>
          <button className="btn  text-2xl" onClick={plusFunc}>
            +
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary w-full text-white text-lg "
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
