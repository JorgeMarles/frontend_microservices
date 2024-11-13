import { FC, useState } from 'react';

interface ComboProps {
  data: { id: number, name: string }[];
  onChange: (value ?: string) => void;
}

const Combobox: FC<ComboProps> = ({ data, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(data[0].name);
  const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if(event.target.value === "none")
      onChange();
    else
      onChange(event.target.value);
  }

  return (
    <div className="relative inline-block ">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
      >
        {data.map((value, key) => (
          <option key={key}>{value.name}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293L9.293 11.293 13.293 7.293 14.707 8.707 9.293 14.121 3.879 8.707z" />
        </svg>
      </div>
    </div>
  );
}

export default Combobox;
