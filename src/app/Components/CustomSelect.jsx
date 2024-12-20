import React, { useState, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import Image from "next/image";
const CustomSelect = ({ type, onTypeChange, typeOptions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleOptionClick = (option) => {
        onTypeChange(option.value);
        setIsOpen(false);
    };

    const selectedOption = typeOptions.find((option) => option.value === type);
    console.log(selectedOption)

    return (
        <div className="relative group-hover:bg-gray-50">
            <div
                className="flex items-center text-center justify-center p-2 rounded cursor-pointer group-hover:bg-gray-50  bg-white"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="text-lg"><Image width={20} height={20} src={selectedOption?.icon} alt={selectedOption?.label} /></span>
                <BsChevronDown className="text-gray-500 " />
            </div>

            {isOpen && (
                <ul
                    ref={dropdownRef}
                    className="absolute right-[-32px] w-[240px] mt-1 border bg-white shadow-md z-10 max-h-60 overflow-y-auto rounded-2xl p-3 "
                >
                    {typeOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className="flex items-center  p-2 cursor-pointer hover:bg-gray-100 text-black"
                        >
                            <span className="mr-2"><Image width={20} height={20} src={option?.icon} alt={option?.label} /></span>
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
