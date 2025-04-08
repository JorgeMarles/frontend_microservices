import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Props {
  placeholder?: string;
  onSubmit: (query: string) => void;
}

export default function Search({ placeholder = "Search", onSubmit }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center border border-black rounded-2xl bg-white lg:w-64 w-44 px-2">
        <MagnifyingGlassIcon className="h-8 w-8 text-black" />
        <input
          className="w-full outline-none rounded-2xl p-2"
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
