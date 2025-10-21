function PrimaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`flex gap-1 p-4 w-fit border-2 border-foreground transition-colors duration-300 ease-in-out text-background font-semibold button-slider from-blue-300 to-rose-300 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export { PrimaryButton };
