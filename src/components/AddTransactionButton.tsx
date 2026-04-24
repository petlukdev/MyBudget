import plusLogo from '../assets/plus.svg';

export default function AddTransactionButton({ onClick }: { onClick: () => void }) {
    return (
        <div className="fixed bottom-5 right-5 lg:hidden">
            <button className="cursor-pointer p-3 bg-blue-300 rounded-full shadow-lg transition-transform hover:scale-110"
            onClick={onClick}>
                <img src={plusLogo} alt="Add Transaction" className="w-8 h-8"/>
            </button>
        </div>
    );
}