type InputProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ id, label, ...props }: InputProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none"
        {...props}
      />
    </>
  );
}
