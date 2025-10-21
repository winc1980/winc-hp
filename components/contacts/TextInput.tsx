function TextInput({ label, id, placeholder, required = false }: { label: string; id: string; placeholder?: string; required?: boolean }) {
  return (
    <>
      <label htmlFor={id} className="font-bold space-x-2"><span>{label}</span>{required && <span className="text-red-500">*</span>}</label>
      <input type="text" id={id} placeholder={placeholder} className="border-2 p-4 w-full focus-visible:outline-secondary" />
    </>
  );
}

export { TextInput };
