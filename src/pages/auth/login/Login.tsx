import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import { Button } from "../../../components/buttons/Button";
import { RouteUrls } from "../../../RouteUrls";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormOutput = z.output<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormOutput) => {
    try {
      await login(data.email, sha256(data.password));
      navigate(RouteUrls.HOME);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-2">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <div className="flex justify-center items-center">
          <span className="text-gray-700 font-semibold text-2xl">Login</span>
        </div>
        <form className="mt-4">
          <label className="block">
            <span className="block text-gray-700 text-sm">Email</span>
            <input
              {...register("email")}
              type="email"
              className="shadow appearance-none border rounded w-full py-1 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs my-1">
                {errors.email.message}
              </p>
            )}
          </label>
          <label className="block mt-3">
            <span className="block text-gray-700 text-sm">Password</span>
            <input
              {...register("password")}
              type="password"
              className="shadow appearance-none border rounded w-full py-1 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs my-1">
                {errors.password.message}
              </p>
            )}
          </label>
          <div className="mt-6">
            <Button className="w-full" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center my-4 gap-x-1">
          <span className="text-xs">Don't have an account? </span>
          <NavLink to={RouteUrls.SIGNUP} className="text-xs text-blue-500">
            Signup
          </NavLink>
        </div>
        <Button className="w-full">Login with Google</Button>
      </div>
    </div>
  );
};
