import {FaChevronDown} from "react-icons/fa";
import {useState} from "react";
import {FormStateForInsert} from "../types/buildingTypes";

interface Props {
    data: { id: string | number; name: string }[]; // Define the structure of `data`
    label?: string;
    field?: string;
    inputChangeHandler: (field: keyof FormStateForInsert, enteredValue: any) => void;
}

export default function Dropdown({ data, label, field, inputChangeHandler }: Props) {
    const [open, setOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState('Select district');

    return (
        <div className="w-44">
            {label && <p className="text-cyan-900 mb-1 text-sm">{label}</p>}
            <button
                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-2 focus:outline-none focus:ring-cyan-300
                rounded-lg text-xs px-2 py-1 text-center inline-flex items-center"
                onClick={() => setOpen((prev) => !prev)}
            >
                {displayValue}
                <FaChevronDown className="ml-2" />
            </button>

            {open && (
                <div className="bg-white rounded-lg shadow w-44 absolute z-10">
                    <ul className="py-2 text-sm text-gray-700">
                        {data.length > 0  ? data.map((item) => (
                            <li
                                key={item.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setDisplayValue(item.name);
                                    setOpen(false);
                                    inputChangeHandler("districtId", item.id); // Pass the selected value to the parent
                                }}
                            >
                                <span className="block px-4 py-2">{item.name}</span>
                            </li>
                        )) : (
                            <li className="hover:bg-gray-100 cursor-pointer">
                                <span className="block px-4 py-2">None</span>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
