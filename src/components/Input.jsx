import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, isTextarea, ...props }, ref) {
  const styleClasses =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col my-4 gap-1">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {isTextarea ? (
        <textarea ref={ref} className={styleClasses} {...props} />
      ) : (
        <input ref={ref} className={styleClasses} {...props} />
      )}
    </p>
  );
});

export default Input;
