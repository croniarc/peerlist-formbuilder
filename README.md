Proj Description: -

1. Main Page (app/page.js)
   Renders the DraggableForm component in a centered container.
2. Draggable Form (DraggableForm.jsx)
   State Management: Manages states like form title, fields, preview data, modal visibility, success message, and submitted data.
   Core Features:
   Add Field: Allows adding fields with default configurations.
   Drag-and-Drop: Uses @dnd-kit/core for rearranging fields in the form.
   Field Validation: Ensures required fields are filled before submission.
   Preview & Submission: Displays a preview modal and handles form submission.
   Form Completeness: Calculates the percentage of completed fields.
   Buttons: Save as Draft and Publish Form, both depend on field completeness.
3. Custom Input (Input.jsx)
   Dynamic Input Types: Renders different input types (short, long, single select, URL, date) based on the field's type.
   Drag-and-Drop Support: Integrates with @dnd-kit/core for sorting.
   Custom Field Options: Handles field-specific configurations like options for single select.
   Validation: Highlights errors if fields are left empty and are marked required.
4. Custom Select (CustomSelect.jsx)
   A dropdown for selecting input types (short, long, single select, etc.).
   Dynamic Options: The options displayed depend on the field type.
   Handles toggling and type selection.
5. Modal (Modal.jsx)
   A reusable modal component for displaying content.
   Props: Accepts isOpen, onClose, and children.
   Key Libraries and Techniques Used:
   React: Functional components and hooks for state management.
   @dnd-kit: Drag-and-drop library.
   TailwindCSS: For styling.
