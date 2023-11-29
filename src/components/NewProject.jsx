import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const duedate = useRef();

  const handleSave = () => {
    // console.log(
    //   title.current.value,
    //   description.current.value,
    //   duedate.current.value
    // );

    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDuedate = duedate.current.value;

    // validation
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredDuedate.trim().length === 0
    ) {
      // show error modal
      modal.current.open();
      return;
    }
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      duedate: enteredDuedate,
    });
  };

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        {" "}
        <h2 className="text-xl font-bold text-stone-600 my-4 ">
          Invalid input
        </h2>
        <p className="text-stone-500 mb-4">OOPS... </p>
        <p className="text-stone-500 mb-4">
          Please enter a valid value in every field
        </p>{" "}
      </Modal>
      <div className="w-[35rem] mt-16 p-8 text-stone-50">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label="Title" type="text" />
          <Input ref={description} label="Description" type="text" isTextarea />
          <Input ref={duedate} label="Due Date" type="date" />
        </div>
      </div>
    </>
  );
}
