import React from "react";

const Modal = ({ open, onClose, children, onSubmit }) => {
  return (
    <dialog id="my_modal_3" className="modal" open={open}>
      <div className="modal-box w-auto bg-stone-900">
        <div className="my-4">
          <h2 className="text-2xl font-bold">Create Group</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn btn-error" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-success" onClick={onSubmit}>
              Create
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
