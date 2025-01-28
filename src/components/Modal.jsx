import React from "react";

const Modal = ({
  open,
  onClose,
  children,
  onSubmit,
  width = "w-auto",
  closeBtnText = "Close",
  saveBtnText = "Create",
  isDisabled = false,
  titleTxt = "Create",
}) => {
  return (
    <dialog id="my_modal_3" className="modal" open={open}>
      <div className={`modal-box ${width} bg-stone-900 scroll-auto`}>
        <div className="my-4">
          <h2 className="text-2xl font-bold">{titleTxt}</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn btn-error" onClick={onClose}>
              {closeBtnText}
            </button>
            <button
              className="btn btn-success"
              disabled={isDisabled}
              onClick={onSubmit}
            >
              {saveBtnText}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
