import { useEffect, useState, useRef, cloneElement, isValidElement } from "react";

function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false);
    
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Blocks background scrolling
    useEffect(() => {
        document.body.style.overflow = isVisible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const modal = modalRef.current;
        const focusable = modal?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        previouslyFocusedElement.current = document.activeElement as HTMLElement;
        first.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Tab") {
                const active = document.activeElement as HTMLElement;
                if (e.shiftKey && active === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && active === last) {
                    e.preventDefault();
                    first.focus();
                }
            }

            if (e.key === "Escape") {
                handleClose();
            }
        };

        modal?.addEventListener("keydown", handleKeyDown);

        return () => {
            modal?.removeEventListener("keydown", handleKeyDown);
            previouslyFocusedElement.current?.focus();
        };
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    return (
        <div className={`fixed inset-0 bg-black/75 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}>
            <div className={`bg-white p-5 rounded-lg mx-5 w-full max-w-lg max-h-screen overflow-y-auto relative transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-3 right-3 text-xl cursor-pointer text-gray-500 hover:text-gray-700" onClick={handleClose}>
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