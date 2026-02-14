type Props = {
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextArea({
  label,
  id,
  placeholder,
  required = false,
  errorMessage,
  ...props
}: Props) {
  return (
    <>
      <div>
        <label htmlFor={id} className="font-bold space-x-2">
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
        <p className="col-span-2 text-sm font-medium text-red-600">{errorMessage}</p>
      </div>
      <textarea
        id={id}
        placeholder={placeholder}
        className="border-2 p-4 w-full h-64 focus-visible:outline-secondary"
        {...props}
      />
    </>
  );
}

export { TextArea };
