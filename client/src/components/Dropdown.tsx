import { FaChevronDown } from "react-icons/fa";
import {useState} from "react";

interface Props {
    value: Array<any>,
    label?: string,
}

export default function Dropdown({value, label}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className='w-44'>
            <p className='text-cyan-900 mb-1 text-sm'>{label}</p>
            <button
                className="text-white bg-cyan-700 hover:bg-cyan-800
                focus:ring-2 focus:outline-none focus:ring-cyan-300
                rounded-lg text-xs px-2 py-1 text-center inline-flex items-center "
                onClick={() => setOpen((!open))}
            >
                Select district
                <FaChevronDown className='ml-2'/>
            </button>

            {open && (
                <div className="bg-white rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700">
                        {value.map((value, index) => (
                            <li key={index}>
                                <text className="block px-4 py-2 hover:bg-gray-100">{value}</text>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}