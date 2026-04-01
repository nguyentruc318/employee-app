import React from "react";
type Variant = "primary" | "secondary" | "danger" | "outline";
type Type = "button" | "submit" | "reset";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  type?: Type;
  className?: string;
  disabled?: boolean;
};
const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: ButtonProps) => {
  const base = "min-h-12 px-4 py-2 rounded-sm cursor-pointer ";
  const variantClass: Record<Variant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline:
      "bg-white text-yellow-500 border border-yellow-500 hover:bg-yellow-50",
  };
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${base} ${variantClass[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
