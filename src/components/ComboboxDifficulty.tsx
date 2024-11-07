
import { Select, Option } from "@material-tailwind/react";
import { FC, useState } from 'react';

interface ComboProps {
  data: { id: number; name: string }[];
}

const ComboboxDifficulty: FC<ComboProps> = ({ data }) => {

  return (
    <div className="w-72">
      <Select 
        label="Select difficulty"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}>
        <Option>None</Option>
        <Option>Easy</Option>
        <Option>Medium</Option>
        <Option>Hard</Option>
      </Select>
    </div>
  );
}

export default ComboboxDifficulty;