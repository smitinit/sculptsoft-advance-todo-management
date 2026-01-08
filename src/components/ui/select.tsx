type SelectProps = {
  id: string;
  label?: string;
  children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ id, label, children, ...props }: SelectProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        {children}
      </select>
    </>
  );
}
