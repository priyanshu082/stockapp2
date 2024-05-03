import React, { useState } from 'react';

function Dialog() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Dialog Title</h2>
            <p>This is the content of the dialog.</p>
            <div className="mt-4 flex justify-end">
              <button onClick={closeDialog} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dialog;
