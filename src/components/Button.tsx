import React from "react";
type Variant = "primary" | "secondary" | "danger";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
};
const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) => {
  const base = "min-h-12 px-4 py-2 rounded-sm cursor-pointer ";
  const variantClass: Record<Variant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variantClass[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
