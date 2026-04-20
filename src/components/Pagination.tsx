import arrLeftLogo from "../assets/arrow-left.svg";
import arrRightLogo from "../assets/arrow-right.svg";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number | ((prev: number) => number)) => void;
    isHidden?: boolean;
}

export default function Pagination({ page, totalPages, onPageChange, isHidden = false }: PaginationProps) {
    if (isHidden) return null;

    return (
        <div className="flex items-center mt-4 justify-center gap-5 lg:justify-between">
            <button className="cursor-pointer hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={page === 1}
                onClick={() => onPageChange((p) => p - 1)}>
                <img src={arrLeftLogo} alt="Previous" className="w-7 h-7"/>
            </button>
            <span className="select-none">{page} / {totalPages || 1}</span>
            <button className="cursor-pointer hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => onPageChange((p) => p + 1)}>
                <img src={arrRightLogo} alt="Next" className="w-7 h-7"/>
            </button>
        </div>
    );
}