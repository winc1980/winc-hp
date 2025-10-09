
function RadioGroup({
  label,
  name,
  values,
  required = false
}: {
  label: string;
  name: string;
  values: { id: string; value: string; label: string; }[];
  required?: boolean
}) {
  return (
    <>
      <p className="font-bold space-x-2"><span>{label}</span>{required && <span className="text-red-500">*</span>}</p>
      <div className="space-y-3">
        {values.map((option) => (
          <div key={option.id} className="grid grid-cols-[12px_1fr] gap-3">
            <input type="radio" key={option.id} id={option.id} name={name} value={option.value} className="appearance-none border-2 checked:border-6 rounded-full my-1 size-4 transition-all" />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export { RadioGroup };
