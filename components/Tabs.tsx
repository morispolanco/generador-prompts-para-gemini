
import React from 'react';

interface TabsProps<T extends string> {
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
}

const Tabs = <T extends string>({ options, selected, onSelect }: TabsProps<T>): React.ReactNode => {
  return (
    <div className="bg-slate-800 p-1 rounded-md flex space-x-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`w-full px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
            selected === option
              ? 'bg-sky-600 text-white shadow'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
