import React from "react";
import { Modal } from "./Modal";
import { Button } from "../buttons/Button";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
}

const ViewModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      header={<h2 className="text-lg font-bold">{title}</h2>}
      body={body}
      footer={
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      }
    />
  );
};

export default ViewModal;
