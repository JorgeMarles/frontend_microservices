import React, { FC, useState } from "react";
import { Topic } from "../../utils/interfaces";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createTopic } from "../../fetch/TopicFetch";
interface FormProps {
  onSubmit: (data: Topic) => void;
  onClose: () => void;
  data?: Topic;
}

const FormTopic: FC<FormProps> = ({ data = {}, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Topic>(data as Topic);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreate(formData);
    onSubmit(formData);
  };

  const handleCreate = async (topic: Topic) => {
    try {
      await createTopic(topic);
      alert("Topic created sucesfully");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-7 rounded-lg shadow-lg relative">
        <div className="w-full flex justify-end">
          <button className="" onClick={onClose}>
            <XMarkIcon className="h-8 w-8 text-white " />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center m-0"
        >
          <div className="grid gap-10 mx-5 mb-7">
            <div className="">
              <div className="mb-3">
                <h1 className="text-5xl text-stroke font-Jomhuria">Name</h1>
                <input
                  className="px-5 py-2 w-full outline-none rounded-full"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Topic's name"
                  required
                />
              </div>
              <div className="mb-3">
                <h1 className="text-5xl text-stroke font-Jomhuria">
                  Description
                </h1>
                <input
                  className="px-5 py-2 w-full outline-none rounded-full"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="Topic's description"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full bg-red-800 m-1 px-5 pt-2 text-5xl text-stroke font-Jomhuria hover:text-black hover:bg-gray-300 border border-black "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-full bg-green-800 m-1 px-5 pt-2 text-5xl text-stroke font-Jomhuria hover:text-black hover:bg-gray-300 border border-black "
            >
              Accepted
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTopic;
