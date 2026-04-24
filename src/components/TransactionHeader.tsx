import importLogo from "../assets/import.svg";
import exportLogo from "../assets/export.svg";

interface TransactionHeaderProps {
    onImport: () => void;
    onExport: () => void;
}

export default function TransactionHeader({ onImport, onExport }: TransactionHeaderProps) {
    return (
        <div className="flex flex-row items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Transaction History</h2>
            <div className="flex flex-row gap-3 items-center">
                <button className="bg-blue-300 rounded-sm p-2 cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                    onClick={onImport}
                    title="Import JSON">
                        <img src={importLogo} alt="Import" className="w-5 h-5"/>
                </button>
                <button className="bg-blue-300 rounded-sm p-2 cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                    onClick={onExport}
                    title="Export JSON">
                        <img src={exportLogo} alt="Export" className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
}