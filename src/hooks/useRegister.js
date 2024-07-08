import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const register = async (email, password, displayName, photoURL) => {
    setIsPending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      const { user } = userCredential;
      setIsPending(false);
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName,
          photoURL,
        })
      );
      toast.success(`Welcome ${displayName}`);
    } catch (error) {
      setIsPending(false);
      toast.error(error.message);
    }
  };

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIsPending(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName}`);
      dispatch(login(user));
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPending(false);
    }
  };

  return { isPending, register, registerWithGoogle };
};
