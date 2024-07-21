import React from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  header,
  body,
  footer,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Modal"
      className="bg-white rounded-lg p-6 mx-5 w-full sm:mx-auto sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-xl mt-10 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      ariaHideApp={false}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">{header}</div>
        <hr />
        <div className="flex-grow">{body}</div>
        <hr />
        <div className="mt-4">{footer}</div>
      </div>
    </ReactModal>
  );
};