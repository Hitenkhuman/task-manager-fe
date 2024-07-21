import React, { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../buttons/Button";

interface FormModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  return (
    <Modal
      isOpen={isOpen}
      header={<h2 className="text-lg font-bold">{title}</h2>}
      body={<form>{children}</form>}
      footer={
        <div className="flex justify-end gap-2">
          <Button btnType="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
            className={
              isSubmitting || !isDirty ? "opacity-50 cursor-not-allowed" : ""
            }
          >
            Submit
          </Button>
        </div>
      }
    />
  );
};

export default FormModal;
