import { FC, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface IParams {
  options: Option[];
  placeholder?: string;
  onChange: (value: string | null) => void;
}

export const Select: FC<IParams> = ({
  options,
  placeholder = "Select...",
  onChange,
}) => {
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleSelect = (value: string) => {
    if (value === isSelected) {
      setIsSelected(null);
      onChange(null);
    } else {
      setIsSelected(value);
      onChange(value);
    }
    setIsOpened(false);
  };

  const clearSelection = () => {
    setIsSelected(null);
    onChange(null);
    setIsOpened(false);
  };

  return (
    <div className="relative w-64">
      <button
        type="button"
        onClick={() => setIsOpened(!isOpened)}
        className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span>
          {isSelected
            ? options.find(({ value }) => value === isSelected)?.label
            : placeholder}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpened ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpened && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          <div
            onClick={clearSelection}
            className="px-4 py-2 cursor-pointer text-red-500 hover:bg-gray-100"
          >
            Clear
          </div>
          <hr />
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option.value === isSelected ? "bg-blue-100 font-medium" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
