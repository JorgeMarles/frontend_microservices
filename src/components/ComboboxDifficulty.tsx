import { Select, Option } from "@material-tailwind/react";
import { FC, useState } from 'react';

interface ComboProps {
  data: { id: number; name: string }[];
  onFilter: (value: string | undefined) => void;
}

const Combobox: FC<ComboProps> = ({ data, onFilter }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('');

  const handleSelect = (value: string | undefined) => {
    setSelectedValue(value);
    onFilter(value);
  }

  return (
    <div className="w-72">
      <Select
        label="Select difficulty"
        value={selectedValue} 
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={handleSelect}
      >
        {data.map((option) => (
          <Option key={option.id} value={option.name}>
            {option.name.charAt(0).toUpperCase() + option.name.slice(1).toLowerCase()}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default Combobox;
