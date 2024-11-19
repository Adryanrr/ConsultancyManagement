import React from "react";

const ConfirmationModal = ({
  title,
  onClose,
  onConfirm,
  children,
  isDelete,
}: {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  isDelete?: boolean;
}) => {
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-main p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-md ${isDelete ? 'bg-red-500' : 'bg-green-500'}`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
