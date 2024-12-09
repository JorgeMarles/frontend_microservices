import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { iota } from "../utils/services";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Column {
    label: string;
    key: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column[];
    header: boolean;
    onChange?: (index: number) => void;
    enableNumberPagination: boolean;
    pagination: number;
    onDelete?: (index: number) => void;
    onView?: (index: number) => void;
    onEdit?: (index: number) => void;
}


const Table = <T extends object>({
    data,
    columns,
    header,
    onChange,
    enableNumberPagination,
    pagination,
    onEdit,
    onDelete,
    onView
}: TableProps<T>) => {
    const [indexes, setIndexes] = useState<number[]>(iota(0, pagination));
    const [page, setPage] = useState(0);
    const actions = (onEdit || onDelete || onView) ? true : false;

    useEffect(() => {
        setPage(0);
        setIndexes(iota(0, Math.min(data.length, pagination)));
    }, [data, pagination]);

    const handleClick = (index: number) => {
        if (!onChange) return;
        onChange(index);
    }

    const handleDelete = (index: number) => {
        if (!onDelete) return;
        onDelete(index);
    }

    const handleEdit = (index: number) => {
        if (!onEdit) return;
        onEdit(index);
    }

    const handleView = (index: number) => {
        if (!onView) return;
        onView(index);
    }

    const handlePagination = (newPage: number) => {
        const start = newPage * pagination, end = Math.min(data.length, newPage * pagination + pagination);
        setPage(newPage);
        setIndexes(iota(start, end));
    }

    const getValueByKey = (value: T, key: string): string | number | boolean | undefined => {
        return key.split('.').reduce<unknown>((acc, curr) => {
            if (acc && typeof acc === 'object' && curr in acc) {
                return (acc as Record<string, unknown>)[curr];
            }
            return undefined;
        }, value) as string | number | boolean | undefined;
    };


    return (
        <div className="w-full">
            {header && (
                <div
                    className="grid gap-4 border-t-2 border-black p-4 bg-gray-400 text-center"
                    style={{ gridTemplateColumns: `repeat(${columns.length + Number(actions)}, 1fr)` }}
                >
                    {columns.map((column, index) => (
                        <div key={index} className="font-bold text-lg">
                            {column.label}
                        </div>
                    ))}
                    {actions && (
                        <div className="font-bold text-lg">
                            Actions
                        </div>
                    )}
                </div>
            )}
            {indexes.map((rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-4 border-t-2 border-black p-4 text-center hover:bg-gray-400"
                    style={{ gridTemplateColumns: `repeat(${columns.length + Number(actions)}, 1fr)` }}
                    onClick={() => handleClick(rowIndex)}
                >
                    {columns.map((column, colIndex) => (
                        <div key={colIndex}>
                            {String(getValueByKey(data[rowIndex], column.key))}
                        </div>
                    ))}
                    {actions && (
                        <div className="flex items-center justify-center gap-3">
                            {onDelete &&
                                (<div>
                                    <button onClick={() => handleDelete(rowIndex)}>
                                        <TrashIcon className="h-8 w-8 text-red-700" />
                                    </button>
                                </div>
                                )}
                            {onEdit &&
                                (<div>
                                    <button onClick={() => handleEdit(rowIndex)}>
                                        <PencilSquareIcon className="h-8 w-8 text-green-700" />
                                    </button>
                                </div>
                                )}
                            {onView &&
                                (<div>
                                    <button onClick={() => handleView(rowIndex)}>
                                        <EyeIcon className="h-8 w-8 text-blue-900 " />
                                    </button>
                                </div>
                                )}
                        </div>
                    )}
                </div>
            ))}
            <div className="border-t-2 border-black p-4 mb-1"></div>
            <Pagination
                onPagination={handlePagination}
                page={page}
                size={data.length}
                pagination={pagination}
                enableNumber={enableNumberPagination}
            />
        </div>
    );
};

export default Table;
