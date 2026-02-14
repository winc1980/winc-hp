type Props<T extends string> = {
  label: string;
  values: { value: T; label: string }[];
  required?: boolean;
  errorMessage?: string;
} & React.HTMLAttributes<HTMLInputElement>;

function RadioGroup<T extends string>({
  label,
  values,
  required = false,
  errorMessage,
  ...props
} : Props<T>) {
  return (
    <>
      <div>
        <p className="font-bold space-x-2">
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </p>
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      </div>
      <div className="space-y-3">
        {values.map((option) => (
          <div key={option.value} className="grid grid-cols-[12px_1fr] gap-3">
            <input
              type="radio"
              key={option.value}
              id={option.value}
              value={option.value}
              className="appearance-none border-2 checked:border-6 rounded-full my-1 size-4 transition-all"
              {...props}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export { RadioGroup };
