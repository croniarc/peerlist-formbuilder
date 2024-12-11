"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

const DraggableForm = () => {
    const [title, setTitle] = useState("Untitled Form");
    const [fields, setFields] = useState([]);
    const [preview, setPreview] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [submittedData, setSubmittedData] = useState([]);

    const handleAddField = () => {
        setFields((prevFields) => [
            ...prevFields,
            { id: `field-${Date.now()}`, label: "Write a question", type: "short", value: "", required: false },
        ]);
    };

    const handleFieldUpdate = (id, updates) => {
        setFields((prevFields) =>
            prevFields.map((field) => (field.id === id ? { ...field, ...updates } : field))
        );
    };

    const validateFields = () =>
        fields.map((field) => ({
            ...field,
            hasError: field.required && !field.value.trim(),
        }));

    const calculateCompleteness = () => {
        const filledFields = fields.filter((field) => field.value.trim()).length;
        return fields.length > 0 ? Math.round((filledFields / fields.length) * 100) : 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields and mark errors for empty required fields
        const validatedFields = fields.map((field) => ({
            ...field,
            hasError: field.required && !field.value.trim(), // Add hasError flag for empty required fields
        }));

        setFields(validatedFields);

        // If any field has errors, prevent form submission
        if (validatedFields.some((field) => field.hasError)) {
            return;
        }

        // Collect form data for preview and submission
        const formData = validatedFields.reduce((acc, field) => {
            acc[field.label] = field.type === "single" ? field.selectedOption : field.value;
            return acc;
        }, {});

        // Set the form data for preview
        setPreview(formData);

        // Save the form data via the API
        try {
            const response = await fetch('/api/save-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Form data saved successfully:", result);

                // Clear success message for preview submit
                setSuccessMessage("");

                // Optional: Reset fields or retain them for editing after save
            } else {
                throw new Error("Failed to save form data");
            }
        } catch (error) {
            console.error("Error submitting form data:", error);
            setSuccessMessage("Failed to save form data.");
        }
    };


    const handleDragEnd = ({ active, over }) => {
        if (active.id !== over.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handlePreviewSubmit = () => {
        console.log(preview)
        if (preview) {
            setSuccessMessage("Your data has been submitted.");
            setFields(fields.map((field) => ({ ...field, value: "" })));
            setSubmittedData((prev) => [...prev, preview]);
            setPreview(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-full">
            <div className="flex flex-col border border-gray-300">
                <div className="w-full h-14 flex justify-between items-center gap-2 border-b p-6">
                    <input
                        type="text"
                        className="border-none outline-none rounded font-semibold text-gray-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        type="secondary"
                        onClick={() => setIsPreviewOpen(true)}
                        disabled={!fields.length}
                        className="w-28 h-8"
                    >
                        Preview
                    </Button>
                </div>
                <div className="flex flex-col w-full p-6 gap-8 h-[calc(100vh-122px)] overflow-y-scroll no-scrollbar items-center">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                            {fields.map((field) => (
                                <Input
                                    key={field.id}
                                    field={field}
                                    onFieldUpdate={handleFieldUpdate}
                                    className="hover:bg-gray-100"
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <Button type="secondary" onClick={handleAddField} className="h-8 max-w-56">
                        + Add Question
                    </Button>
                </div>
            </div>
            <div className="flex justify-between px-6 items-center bg-[#F6F8FAE5] border border-gray-300 h-16">
                <Button
                    type="secondary"
                    disabled={!fields.some((field) => field.value.trim())}
                    className="min-w-28 h-8"
                >
                    Save as Draft
                </Button>
                <Button
                    type="primary"
                    disabled={!fields.some((field) => field.value.trim())}
                    className="min-w-28 h-8"
                >
                    Publish form
                </Button>
            </div>

            <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
                <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl w-full">
                    {!successMessage ? (
                        <>
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <h2 className="text-xl font-bold">Submit Form</h2>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Form completeness — {calculateCompleteness()}%</span>
                                    <div className="w-40 bg-gray-200 rounded-full h-1 mt-1">
                                        <div
                                            className="bg-green-500 h-1 rounded-full"
                                            style={{ width: `${calculateCompleteness()}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {preview &&
                                    Object.entries(preview).map(([key, value]) => (
                                        <div key={key} className="mb-4">
                                            <div className="text-sm font-semibold text-gray-700 mb-1">{key}</div>
                                            <div className="border rounded p-2 bg-gray-50 text-gray-800">
                                                {value || <span className="text-gray-400 italic">No response</span>}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="flex justify-end mt-6">
                                <Button type="primary" onClick={handlePreviewSubmit} lassName="h-10 w-32">
                                    Submit
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-center">
                                <p className="text-green-600 font-semibold mb-4">{successMessage}</p>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Submitted Data</h3>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        {Object.keys(submittedData[0] || {}).map((header) => (
                                            <th
                                                key={header}
                                                className="border p-2 text-left text-sm font-semibold text-gray-600"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {submittedData.map((data, index) => (
                                        <tr key={index}>
                                            {Object.values(data).map((value, idx) => (
                                                <td key={idx} className="border p-2 text-sm text-gray-800">
                                                    {value || <span className="text-gray-400 italic">No response</span>}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </Modal>
        </form>
    );
};

export default DraggableForm;