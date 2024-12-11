import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BsGripVertical } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import CustomSelect from "./CustomSelect";

const Input = ({ field, onFieldUpdate, isSubmitted }) => {
    const { id, label, type, value, options = [], selectedOption, hasError } = field;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const typeOptions = [
        { value: "short", label: "Short Answer", icon: "/AIcon.svg" },
        { value: "long", label: "Long Answer", icon: "/BIcon.svg" },
        { value: "single", label: "Single Select", icon: "/CIcon.svg" },
        { value: "url", label: "URL", icon: "/DIcon.svg" },
        { value: "date", label: "Date", icon: "/EIcon.svg" },
    ];

    const renderInputField = () => {
        switch (type) {
            case "header":
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onFieldUpdate(id, { value: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                    />
                );
            case "short":
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onFieldUpdate(id, { value: e.target.value })}
                        className="w-full h-8 p-2 border rounded-lg outline-none bg-slate-100 text-gray-400"
                    />
                );
            case "long":
                return (
                    <textarea
                        value={value}
                        onChange={(e) => onFieldUpdate(id, { value: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-slate-100 text-gray-400 outline-none"
                    ></textarea>
                );
            case "single":
                return (
                    <div className="space-y-2">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={id}
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={(e) => onFieldUpdate(id, { selectedOption: e.target.value })}
                                    className="cursor-pointer bg-slate-100 text-gray-400"
                                />
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) =>
                                        onFieldUpdate(id, {
                                            options: options.map((opt, idx) =>
                                                idx === index ? e.target.value : opt
                                            ),
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg outline-none bg-slate-100 text-gray-400"
                                    placeholder={`Option ${index + 1}`}
                                />
                                {index === options.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onFieldUpdate(id, { options: [...options, `Option ${options.length + 1}`] })
                                        }
                                        className="flex items-center space-x-1 text-black"
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case "url":
                return (
                    <input
                        type="url"
                        value={value}
                        onChange={(e) => onFieldUpdate(id, { value: e.target.value })}
                        className="w-full p-2 border rounded bg-slate-100 outline-none text-gray-400"
                        placeholder="Link to your best work"
                    />
                );
            case "date":
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => onFieldUpdate(id, { value: e.target.value })}
                        className="w-full p-2 border rounded-lg outline-none bg-slate-100 text-gray-400"
                    />
                );
            default:
                return null;
        }
    };

    const isFieldFilled =
        (type === "short" && value) ||
        (type === "long" && value) ||
        (type === "single" && selectedOption) ||
        (type === "url" && value) ||
        (type === "date" && value) ||
        (type === "header" && value);

    return (
        <div ref={setNodeRef} style={style} className="border p-3 w-full shadow bg-white space-y-2 rounded-2xl hover:bg-gray-50 group">
            <div className="flex items-center justify-between group-hover:bg-gray-50">
                <div className="flex items-center space-x-2 group-hover:bg-gray-50">
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => onFieldUpdate(id, { label: e.target.value })}
                        className={`font-medium text-lg group-hover:bg-gray-50 focus:outline-none ${isFieldFilled
                            ? "text-black"
                            : isSubmitted && !isFieldFilled
                                ? "text-red-500"
                                : "text-gray-400"
                            } l:w-[500px] xl:w-[500px]`}
                        placeholder="Write a question"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <CustomSelect
                        type={type}
                        onTypeChange={(newType) =>
                            onFieldUpdate(id, {
                                type: newType,
                                options: newType === "single" ? ["Option 1", "Option 2"] : undefined,
                            })
                        }
                        typeOptions={typeOptions}
                    />
                    <div {...listeners} {...attributes} className="cursor-grab">
                        <BsGripVertical size={20} />
                    </div>
                </div>
            </div>
            {renderInputField()}
        </div>
    );
};

export default Input;
