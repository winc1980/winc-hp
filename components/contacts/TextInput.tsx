type Props = {
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function TextInput({
  label,
  id,
  placeholder,
  required = false,
  autoComplete,
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
        <p className="col-span-2 text-sm font-medium text-red-600">
          {errorMessage}
        </p>
      </div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="border-2 p-4 w-full focus-visible:outline-secondary"
        autoComplete={autoComplete}
        {...props}
      />
    </>
  );
}

export { TextInput };
