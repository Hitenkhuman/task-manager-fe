import React from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
      <p className="mt-4 text-lg text-gray-500">{error.message}</p>
      <p className="mt-4 text-gray-700">Try refreshing your browser</p>
    </div>
  );
};

export default ErrorFallback;
