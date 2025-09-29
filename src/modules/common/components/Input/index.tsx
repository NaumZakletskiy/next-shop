import { ChangeEvent, FC } from "react";

interface IParams {
  value: string | number | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input: FC<IParams> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <div className={className}>
      <input
        type="text"
        value={value || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};
