import { useEffect, useState, cloneElement, isValidElement } from "react";

function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    return (
        <div className={`fixed inset-0 bg-black/75 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white p-5 rounded-lg mx-5 w-full max-w-lg max-h-screen overflow-y-auto relative transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
                <button className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700" onClick={handleClose}>
                    ⨉
                </button>
                {isValidElement(children) 
                    ? cloneElement(children as React.ReactElement<any>, { onClose: handleClose }) 
                    : children}
            </div>
        </div>
    );
}

export default Modal;