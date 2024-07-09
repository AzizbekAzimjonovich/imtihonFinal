import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
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
      <div className="flex flex-wrap gap-11 mt-11">
        {data &&
          data.slice(0, 3).map((todo) => (
            <div
              className="card bg-base-100 w-96 shadow-xl cursor-pointer"
              key={todo.id}
            >
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">{todo.title}</h2>
                  <button onClick={() => deleteTodo(todo.id)}>
                    <TiDeleteOutline />
                  </button>
                </div>
                <p>{todo.method}</p>
              </div>
              <figure onClick={() => navigateToSingleProduct(todo.id)}>
                <img src={todo.images[0]} alt="Recipe" />
              </figure>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TodosList;
