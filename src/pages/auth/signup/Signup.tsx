import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons/Button";
import { RouteUrls } from "../../../RouteUrls";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../../contexts/AuthContext";
import { sha256 } from "js-sha256";
import { toast } from "react-toastify";
import { GoogleAuthButton } from "../googleAuth/GoogleAuthButton";

const signupSchema = z
  .object({
    firstName: z.string().nonempty({ message: "First Name is required" }),
    lastName: z.string().nonempty({ message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormOutput = z.output<typeof signupSchema>;

export const Signup: React.FC = () => {
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: SignUpFormOutput) => {
    try {
      await signup({
        confirmPassword: sha256(data.confirmPassword),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: sha256(data.password),
      });
      navigate(RouteUrls.HOME);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error?.message ?? "Failed to sigup");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-2">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <div className="flex justify-center items-center">
          <span className="text-gray-700 font-semibold text-2xl">Sign Up</span>
        </div>
        <form className="mt-4">
          <div className="flex space-x-2">
            <label className="block w-1/2">
              <span className="text-gray-700 text-sm">First Name</span>
              <input
                {...register("firstName")}
                type="text"
                className="shadow appearance-none border rounded w-full py-1 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </label>
            <label className="block w-1/2">
              <span className="text-gray-700 text-sm">Last Name</span>
              <input
                {...register("lastName")}
                type="text"
                className="shadow appearance-none border rounded w-full py-1 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </label>
          </div>
          <label className="block mt-3">
            <span className="text-gray-700 text-sm">Email</span>
            <input
              {...register("email")}
              type="email"
              className="shadow appearance-none border rounded w-full py-1 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </label>
          <label className="block mt-3">
            <span className="text-gray-700 text-sm">Password</span>
            <input
              {...register("password")}
              type="password"
              className="shadow appearance-none border rounded w-full py-1 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </label>
          <label className="block mt-3">
            <span className="text-gray-700 text-sm">Confirm Password</span>
            <input
              {...register("confirmPassword")}
              type="password"
              className="shadow appearance-none border rounded w-full py-1 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
          <div className="mt-6">
            <Button onClick={handleSubmit(onSubmit)} className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center my-4 gap-x-1">
          <span className="text-xs">Already have an account? </span>
          <NavLink to={RouteUrls.LOGIN} className="text-xs text-blue-500">
            Login
          </NavLink>
        </div>
        <div className="flex justify-center">
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
};
