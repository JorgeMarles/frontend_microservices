import { FC } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { iota } from "../utils/services";

interface PaginationProps {
    page: number;
    size: number;
    pagination: number;
    enableNumber: boolean;
    onPagination: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, size, pagination, onPagination, enableNumber }) => {
    const pagesTotal = Math.ceil(size / pagination);
    const startPage = Math.max(1, page);
    const endPage = Math.min(pagesTotal, page + 2);
    const numbers = iota(startPage, endPage + 1);

    const getBoundaryPages = () => {
        const firstPages = [1, 2].filter(p => p < startPage);
        const lastPages = [pagesTotal - 1, pagesTotal].filter(p => p > endPage);
        return { firstPages, lastPages };
    };

    const { firstPages, lastPages } = getBoundaryPages();

    const handlePrevious = () => page > 0 && onPagination(page - 1);
    const handleNext = () => page < pagesTotal - 1 && onPagination(page + 1);
    const handleChangePage = (newPage: number) => onPagination(newPage - 1);

    return (
        <div className="flex justify-between mx-6">
            <button onClick={handlePrevious} disabled={page === 0} className="disabled:opacity-50">
                <div className="flex text-gray-700 hover:text-black">
                    <ArrowLeftIcon className="h-7 w-7" />
                    <p className="px-2">Previous</p>
                </div>
            </button>
            {enableNumber && (
                <div className="flex">
                    {firstPages.map(item => (
                        <button key={`first-${item}`} className="w-9 h-9" onClick={() => handleChangePage(item)}>
                            {item}
                        </button>
                    ))}
                    {startPage > 3 && <div className="flex items-end">...</div>}
                    {numbers.map(pageNumber => {
                        return (
                            <button
                                key={pageNumber}
                                className={`w-9 h-9 ${pageNumber === page + 1 ? 'bg-gray-700 text-white rounded-lg' : ''}`}
                                onClick={() => handleChangePage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}
                    {endPage < pagesTotal - 2 && <div className="flex items-end">...</div>}
                    {lastPages.map(item => (
                        <button key={`last-${item}`} className="w-9 h-9" onClick={() => handleChangePage(item)}>
                            {item}
                        </button>
                    ))}
                </div>
            )}
            <button onClick={handleNext} disabled={page === pagesTotal - 1} className="disabled:opacity-50">
                <div className="flex text-gray-700 hover:text-black">
                    <p className="px-2">Next</p>
                    <ArrowRightIcon className="h-7 w-7" />
                </div>
            </button>
        </div>
    );
};

export default Pagination;
