import React from "react";
import { MdDelete } from "react-icons/md";

import { useDispatch } from "react-redux";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function TodosList({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTodo = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then(() => {
        toast.success("Deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const changeStatus = async (id, status) => {
    const todoRef = doc(db, "todos", id);

    await updateDoc(todoRef, {
      completed: !status,
    })
      .then(() => {
        toast.success("Status changed");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navigateToSingleProduct = (id) => {
    navigate(`/home/${id}`);
  };

  return (
    <div className="flex flex-col w-full">
      <hr className="mb-5" />

      <h1 className="text-2xl font-semibold md:text-start text-center mb-6">
        Recipes
      </h1>
      <div className="grid gap-11 mt-11 2xl:grid-cols-3 lg:grid-cols-2 lg:gap-16 sm:grid-cols-1 mx-auto">
        {data &&
          data.map((todo) => (
            <div
              className="card h-96 bg-base-100 lg:w-96 shadow-xl cursor-pointer"
              key={todo.id}
            >
              <div className="card-body h-52">
                <div className="flex justify-between">
                  <h2 className="card-title">{todo.title}</h2>
                  <button onClick={() => deleteTodo(todo.id)}>
                    <MdDelete />
                  </button>
                </div>
                <p className=" line-clamp-3">{todo.method}</p>
              </div>
              <figure onClick={() => navigateToSingleProduct(todo.id)}>
                <img src={todo.images[0]} alt="Recipe" lg:width={50} />
              </figure>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TodosList;
