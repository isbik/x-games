import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Props = {
  value: string;
  items: string[];
  label: string;
  onChangeValue: (pack: string) => void;
};

export const Select = ({ label, value, items, onChangeValue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <h3 className="text-lg font-bold text-blue-500 mb-1">{label}</h3>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full  px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-between border"
      >
        <span>{value}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-10 overflow-hidden"
          >
            {items.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setIsOpen(false);
                  onChangeValue(item);
                }}
                className={`flex items-center justify-between w-full text-left px-4 py-3 hover:bg-blue-100 truncate transition-colors ${
                  value === item
                    ? "bg-blue-100 text-blue-500 font-medium"
                    : "text-gray-800"
                }`}
              >
                {item}

                {value === item && <Check className="size-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
