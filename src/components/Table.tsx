interface Column {
    label: string;
    key: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column[];
    header: boolean;
    onChange: (index : number) => void;
}

const Table = <T extends object>({
    data,
    columns,
    header,
    onChange
}: TableProps<T>) => {

    const handleClick = (index : number) => {
        onChange(index);
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
        <div>
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
            {data.map((item, rowIndex) => (
                <div 
                    key={rowIndex} 
                    className="grid gap-4 border-t-2 border-black p-4 text-center hover:bg-gray-400"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                    onClick={() => handleClick(rowIndex)}
                >
                    {columns.map((column, colIndex) => (
                        <div key={colIndex}>
                            {String(getValueByKey(item, column.key))}
                        </div>
                    ))}
                </div>
            ))}
            <div className="border-t-2 border-black p-4"></div>
        </div>
    );
};

export default Table;
