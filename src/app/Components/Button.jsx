import React from "react";

const Button = ({ type, icon, children, onClick, disabled, className }) => {
    const baseStyles =
        "inline-flex items-center justify-center px-4 py-2 font-medium rounded focus:outline-none transition-all  gap-2 rounded-xl hover:drop-shadow-lg";
    const primaryStyles =
        "bg-green-500 text-white hover:bg-white hover:text-green-500 border border-gray-300 disabled:bg-gray-300 disabled:text-gray-500";
    const secondaryStyles =
        "bg-white text-black hover:bg-green-500 hover:text-white border border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 flex-row-reverse gap-s";

    const styles = type === "primary" ? primaryStyles : secondaryStyles;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${styles} ${className}`}
        >
            <span className="mr-2">{icon}</span>
            {children}
        </button>
    );
};

export default Button;