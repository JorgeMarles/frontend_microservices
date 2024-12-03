import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { iota } from "../utils/services";

interface Column {
    label: string;
    key: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column[];
    header: boolean;
    onChange: (index: number) => void;
    pagination: number;
}


const Table = <T extends object>({
    data,
    columns,
    header,
    onChange,
    pagination
}: TableProps<T>) => {
    const [indexes, setIndexes] = useState<number[]>(iota(0, pagination));
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(0);
        setIndexes(iota(0, Math.min(data.length, pagination)));
    }, [data, pagination]);

    const handleClick = (index: number) => {
        onChange(index);
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
        <div className="">
            {header && (
                <div
                    className="grid gap-4 border-t-2 border-black p-4 bg-gray-400 text-center"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                >
                    {columns.map((column, index) => (
                        <div key={index} className="font-bold text-lg">
                            {column.label}
                        </div>
                    ))}
                </div>
            )}
            {indexes.map((rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-4 border-t-2 border-black p-4 text-center hover:bg-gray-400"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                    onClick={() => handleClick(rowIndex)}
                >
                    {columns.map((column, colIndex) => (
                        <div key={colIndex}>
                            {String(getValueByKey(data[rowIndex], column.key))}
                        </div>
                    ))}
                </div>
            ))}
            <div className="border-t-2 border-black p-4 mb-1"></div>
            <Pagination 
                onPagination={handlePagination}
                page={page}
                size={data.length}
                pagination={pagination}
                enableNumber={true}
            />
        </div>
    );
};

export default Table;
