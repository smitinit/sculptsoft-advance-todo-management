import type React from "react";

type ButtonVariant = "default" | "destructive";

type ButtonProps = {
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "default",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "py-1 px-2 rounded transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-blue-500 hover:bg-blue-700 text-white",
    destructive: "bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
