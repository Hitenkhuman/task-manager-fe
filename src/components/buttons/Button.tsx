import React from "react";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  btnType?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  size = "medium",
  btnType = "primary",
  onClick,
  children,
  className,
  ...props
}) => {
  let padding, textSize;

  switch (size) {
    case "small":
      padding = "px-2 py-1";
      textSize = "text-sm";
      break;
    case "large":
      padding = "px-6 py-3";
      textSize = "text-lg";
      break;
    default:
      padding = "px-4 py-2";
      textSize = "text-base";
  }

  const baseClasses = "inline-block leading-none border rounded mt-4 lg:mt-0";
  let colorClasses;

  switch (btnType) {
    case "primary":
      colorClasses = "bg-primary text-white hover:opacity-75";
      break;
    case "secondary":
      colorClasses =
        "bg-white text-primary border-primary hover:bg-gray-100 hover:opacity-75";
      break;
    case "danger":
      colorClasses = "bg-red-500 text-white hover:bg-red-600";
      break;
    default:
      colorClasses = "bg-primary text-white hover:opacity-75";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${padding} ${textSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
