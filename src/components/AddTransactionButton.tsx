import plusLogo from '../assets/plus.svg';

function AddTransactionButton({ onClick }: { onClick: () => void }) {
  return (
        <div className="fixed bottom-5 right-5">
            <button className="cursor-pointer p-3 bg-blue-300 rounded-full shadow-lg transition-transform hover:scale-110"
            onClick={onClick}>
                <img src={plusLogo} alt="Add Transaction" className="w-8 h-8"/>
            </button>
        </div>
  );
}

export default AddTransactionButton;