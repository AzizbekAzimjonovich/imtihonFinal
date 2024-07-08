import React, { useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();
  const { loginUser, isPending } = useLogin();
  const { isPending: isPendingUseRegister, registerWithGoogle } = useRegister();

  useEffect(() => {
    if (userData) {
      loginUser(userData.email, userData.password);
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block h-full bg-orange-50 bg-[url('https://picsum.photos/1600/2400')] bg-center bg-cover bg-no-repeat"></div>
      <div className="h-full bg-slate-50 grid place-items-center lg:bg-none bg-[url('https://picsum.photos/1600/2400')] bg-center bg-cover bg-no-repeat bg-fixed">
        <div className="card bg-base-100 w-96 shadow-xl  p-8">
          <Form method="post" className="flex flex-col items-center gap-5 ">
            <h1 className="text-3xl font-semibold">Login</h1>
            <FormInput type="email" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />

            {isPending && (
              <div className="w-full">
                <button disabled className="btn btn-primary btn-block">
                  Loading...
                </button>
              </div>
            )}
            {!isPending && (
              <div className="w-full">
                <button className="btn btn-primary btn-block">Login</button>
              </div>
            )}
          </Form>
          {isPendingUseRegister && (
            <div className="w-full mt-5">
              <button
                disabled
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                Loading...
              </button>
            </div>
          )}
          {!isPendingUseRegister && (
            <div className="w-full mt-5">
              <button
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                GOOGLE
              </button>
            </div>
          )}
          <div className="flex mx-auto mt-5 gap-3">
            <p>Do you not have an account ?</p>
            <Link to={"/register"} className="link link-primary">
              register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
