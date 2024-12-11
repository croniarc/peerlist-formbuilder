Draggable Form Builder live link :- https://peerlist-formbuilder.vercel.app/
A dynamic form builder application with drag-and-drop capabilities, developed using Next.js, React, @dnd-kit, and TailwindCSS. This project allows users to create, preview, and save customizable forms with ease.

Features
Dynamic Form Creation:

Add various input types such as short answer, long answer, single select, URL, and date.
Drag-and-drop functionality to reorder form fields.
Custom Input Components:

Each input field supports real-time updates for its type, label, and values.
Includes single-select fields with dynamic options.
Preview & Submission:

Live preview of the form to verify field values before submission.
Calculates and displays form completeness percentage.
Form Validation:

Ensures required fields are filled before submission.
Highlights missing or invalid fields with visual indicators.
API Integration:

Saves form data to a mock API endpoint (/api/save-form).
API handles POST requests and logs data (replaceable with database logic).
Responsive & Accessible:

Fully responsive design using TailwindCSS.
Focus on clean, minimal, and intuitive UI/UX.
Project Structure
app/page.js: Main entry point rendering the DraggableForm component.
components/DraggableForm.jsx: Core component handling state management, validation, drag-and-drop, and API calls.
components/Input.jsx: Customizable input field supporting different types and configurations.
components/CustomSelect.jsx: Dropdown for selecting field types with icons and labels.
components/Modal.jsx: Reusable modal component for form preview and submission confirmation.
app/api/save-form/route.js: API endpoint for saving form data.
Technologies Used
Next.js (App Router)
React (with hooks)
@dnd-kit (drag-and-drop functionality)
TailwindCSS (responsive styling)
JavaScript (dynamic behavior)
Installation and Setup
Clone the repository:
git clone https://github.com/croniarc/peerlist-formbuilder
Install dependencies:
npm install
Run the development server:
npm run dev
Access the app at http://localhost:3000.
Future Enhancements
Integration with a database for persistent storage.
Add additional input types and configurations.
Enhance UI/UX with animations and additional customizations.
This summary gives a clear overview of your project for anyone viewing your README.md. Let me know if you want to customize it further!
