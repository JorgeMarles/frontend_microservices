import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement | string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`font-bold py-2 px-8 bg-white border border-black rounded-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
