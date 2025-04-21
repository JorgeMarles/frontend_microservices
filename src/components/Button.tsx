import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement | string;
  variant?: "DEFAULT" | "DARK";
}

export default function Button({
  children,
  className,
  variant = "DEFAULT",
  ...props
}: ButtonProps) {
  const variantClasses = {
    DEFAULT: "bg-white border-black text-black",
    DARK: "bg-black border-black text-white",
  };

  return (
    <button
      className={`font-bold py-2 px-8 border rounded-full ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
