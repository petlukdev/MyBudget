import { Category } from "../types/Category";

interface TransactionControlsProps {
    filter: string;
    setFilter: (filter: string) => void;
    perPage: number;
    setPerPage: (perPage: number) => void;
}

export default function TransactionControls({ filter, setFilter, perPage, setPerPage }: TransactionControlsProps) {
    return (
        <div className="flex flex-col items-stretch gap-4 mb-4 sm:flex-row">
            <div className="grid grid-cols-2 items-center gap-4 w-full sm:flex">
                <label htmlFor="category-filter" className="text-nowrap">Filter by category:</label>
                <select id="category-filter"
                    className="bg-white border border-gray-300 rounded w-full p-1"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All Categories</option>
                        {Object.values(Category).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                </select>
            </div>
            <div className="hidden w-px bg-gray-300 mx-2 sm:block"></div>
            <div className="grid grid-cols-2 items-center gap-4 w-full sm:flex">
                <label htmlFor="per-page" className="text-nowrap">Items per page:</label>
                <select id="per-page"
                    className="bg-white border border-gray-300 rounded w-full p-1"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                </select>
            </div>
        </div>
    );
}