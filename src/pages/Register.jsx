import React, { useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import cook from "../cook.mp4";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");

  return { email, password, displayName, photoURL };
};

function Register() {
  const userData = useActionData();
  const { register, isPending, registerWithGoogle } = useRegister();

  useEffect(() => {
    if (userData) {
      register(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);

  return (
    <div className="grid ">
      <video
        src={cook}
        autoPlay
        loop
        muted
        className="h-full object-cover absolute inset-0 w-full"
      />
      <div className="h-full bg-slate-50 grid place-items-center mt-4">
        <div className="card glass w-96 shadow-xl  p-8">
          <Form method="post" className="flex flex-col items-center gap-5 ">
            <h1 className="text-3xl font-semibold">Register</h1>
            <FormInput type="text" label="displayName" name="displayName" />
            <FormInput type="url" label="photoURL" name="photoURL" />
            <FormInput type="email" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />
            <div className="w-full">
              {!isPending && (
                <button className="btn btn-primary btn-block">Register</button>
              )}
              {isPending && (
                <button disabled className="btn btn-primary btn-block">
                  Loading...
                </button>
              )}
            </div>
          </Form>
          {isPending && (
            <div className="w-full mt-5">
              <button
                disabled
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block "
              >
                Loading...
              </button>
            </div>
          )}
          {!isPending && (
            <div className="w-full mt-5">
              <button
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block "
              >
                GOOGLE
              </button>
            </div>
          )}
          <div className="flex mx-auto mt-5 gap-3">
            <p>Do you not have an account ?</p>
            <Link to={"/login"} className="link link-primary">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
