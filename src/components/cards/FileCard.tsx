import { FC, useState } from "react";

interface CardProps {
    name?: string;
    onSubmit: (data: File, state?: boolean) => void;
    type: string;
    textSubmit: string;
    share?: boolean;
    data?: File;
}

const FileCard: FC<CardProps> = ({ name, type, onSubmit, share, textSubmit, data }) => {
    const [file, setFile] = useState<File | undefined>(data);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);

    const handleSubmit = () => {
        if (!file) {
            alert("Please, select a file before submit");
            return;
        }
        setConfirm(true);
        if (share) onSubmit(file, isChecked);
        else onSubmit(file);

    };

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (!selectedFile.name.endsWith(type)) {
                alert(`The type of the file has to be ${type}`);
                return;
            }
            setConfirm(false);
            setFile(selectedFile);
        }
    };

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    const handleClick = () => {
        if (file) {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
    }

    return (
        <div className="w-full px-7 py-3">
            {name && (
                <h1 className="font-Jomhuria text-7xl">{name}</h1>
            )}
            <div className="bg-white py-5 px-8  border-2 border-gray-800 flex flex-col justify-center" >
                {file ? (
                    <h1 className="text-center pb-4 text-blue-800">
                        <button onClick={handleClick}>
                            {file.name}
                        </button>
                    </h1>
                ) : (
                    <h1 className="text-center text-lg pb-4">
                        You have to select a file.
                    </h1>
                )}
                <label
                    className={`bg-gray-300 m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black cursor-pointer text-center ${share ? "" : "rounded-full"
                        }`}>
                    Select file
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleUploadFile}
                        accept={type}
                    />
                </label>
                {share && (
                    <div className="flex items-center justify-center my-5 ">
                        <input
                            type="checkbox"
                            id="onlyUser"
                            checked={isChecked}
                            onChange={handleChange}
                            className="w-7 h-7  border-gray-300 border-2 checked:bg-gray-700 bg-gray-300 border-2 border-gray-700 appearance-none"
                        />
                        <label htmlFor="onlyUser" className="ml-2 text-gray-800 text-md">
                            Share source file
                        </label>
                    </div>
                )}
                <button
                    className={`${confirm ? "bg-green-300" : ""} rounded-full m-1 px-5 py-2 text-black hover:text-black hover:bg-gray-500 border border-black`}
                    onClick={handleSubmit}
                >
                    {textSubmit}
                </button>
            </div>
        </div>
    );
};

export default FileCard;
