import { FC, useEffect, useRef, useState } from "react";

interface IOption {
  label: string;
  value: string;
}

interface IParams {
  options: IOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export const CheckboxDropdown: FC<IParams> = ({
  options,
  selected,
  onChange,
  placeholder = "Select...",
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isSelected = (value: string) => selected.includes(value);

  const toggleValue = (value: string) => {
    if (isSelected(value)) {
      onChange(selected.filter((selectedValue) => selectedValue !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={`relative inline-block text-left`} ref={rootRef}>
      <button
        ref={toggleButtonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpened}
        onClick={() => setIsOpened((isOpenedState) => !isOpenedState)}
        className="w-48 inline-flex justify-between items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="truncate max-w-xs">
          {selected.length === 0 ? placeholder : `${selected.length} selected`}
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
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute z-50 mt-2 w-48 rounded-lg border bg-white shadow-md overflow-auto`}
        >
          <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
            <div className="text-sm text-gray-700">
              {selected.length} selected
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => {
                  const allEnabled = options.map((o) => o.value);
                  onChange(allEnabled);
                }}
                className="text-xs text-indigo-600 hover:underline px-2 py-1"
              >
                All
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-gray-600 hover:underline px-2 py-1"
              >
                Clear
              </button>
            </div>
          </div>
          <ul className="p-2" role="none">
            {options.map((option) => {
              const checked = isSelected(option.value);
              return (
                <li key={option.value} className="rounded hover:bg-gray-50">
                  <label
                    className={`flex w-full cursor-pointer items-center gap-3 rounded px-2 py-2`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleValue(option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-800">
                      {option.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
