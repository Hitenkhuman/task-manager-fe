import React from "react";
import { Modal } from "./Modal";
import { Button } from "../buttons/Button";

interface ConfirmModalProps {
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      header={<h2 className="text-lg font-bold">{title}</h2>}
      body={<p className="my-4 text-gray-700">{message}</p>}
      footer={
        <div className="flex justify-end gap-2">
          <Button btnType="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} btnType="danger">
            {confirmText}
          </Button>
        </div>
      }
    />
  );
};

export default ConfirmModal;
