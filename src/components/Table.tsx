interface Column {
    label: string;
    key: string; // Usamos string para soportar claves simples y anidadas
}

interface TableProps<T> {
    data: T[];
    columns: Column[];
}

const Table = <T extends object>({
    data,
    columns
}: TableProps<T>) => {

    const getValueByKey = (obj: T, key: string): string | number | boolean | undefined => {
        return key.split('.').reduce<unknown>((acc, curr) => {
            if (acc && typeof acc === 'object' && curr in acc) {
                return (acc as Record<string, unknown>)[curr];
            }
            return undefined;
        }, obj) as string | number | boolean | undefined;
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 border-t-2 border-black p-4">
                {columns.map((column, index) => (
                    <div key={index} className="font-bold text-lg">
                        {column.label}
                    </div>
                ))}
            </div>

            {data.map((item, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-3 gap-4 border-t-2 border-black p-4">
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
