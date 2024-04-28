import { ReactNode } from "react";

interface BtnProps {
    children: ReactNode;
    onClick(): void;
}

const Button = ({ children, onClick }: BtnProps) => {
    return (
        <button
            onClick={onClick}
            className="flex-center px-6 py-4 bg-neutral-900  hover:bg-neutral-800 bg-opacity-60 border-2 border-neutral-900 border-opacity-55  rounded-full transition-colors text-base text-neutral-50 font-semibold min-h-12 min-w-12 text-nowrap"
        >
            {children}
        </button>
    );
};

export default Button;
