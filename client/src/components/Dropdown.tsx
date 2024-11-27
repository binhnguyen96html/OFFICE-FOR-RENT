import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FaChevronDown} from "react-icons/fa";
import {FormStateForInsert, FormStateForSearch} from "../types/buildingTypes";

interface DropdownItem {
    id: string | number;
    name: string;
    code: string;
}

interface DropdownProps{
    data: DropdownItem[];
    label?: string;
    field: keyof FormStateForInsert | keyof FormStateForSearch;
    inputChangeHandler: (field: keyof FormStateForInsert | keyof FormStateForSearch, enteredValue: any) => void;
    placeholder?: string;
    disabled?: boolean;
    purpose?: 'insert' | 'search';
    value?: DropdownItem | null;
}

export default function Dropdown({
                                     data,
                                     label,
                                     field,
                                     inputChangeHandler,
                                     placeholder = 'Select an option',
                                     disabled = false,
                                    purpose='insert',
                                    value=null
                                 }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(value);
    const [displayValue, setDisplayValue] = useState<string | null>(placeholder);


    useEffect(() => {
        if(value !== null){
            setSelectedItem(value);
            setDisplayValue(value.name)
        }
        // console.log('value: ', value)
        //console.log('selectedItem: ', selectedItem)
    }, [value, placeholder]);

    // Memoize the toggle function to prevent unnecessary re-renders
    const toggleDropdown = useCallback(() => {
        if (!disabled) {
            setOpen(prev => !prev);
        }
    }, [disabled]);

    // Memoize the item selection handler
    const handleItemSelect = useCallback((item: DropdownItem | null) => {
        if (!disabled) {
            setSelectedItem(item);
            setOpen(false);
            if (item === null) {
                    inputChangeHandler(field, '');
            } else {
                if (purpose === 'insert') {
                    inputChangeHandler(field, item.id);
                } else if (purpose === 'search') {
                    inputChangeHandler(field, item.code);
                }
            }
        }
    }, [field, inputChangeHandler, disabled]);

    // Memoize the display value to reduce unnecessary re-renders
    const displayValue2 = useMemo(() => {
           // console.log("select: ", selectedItem)
            return selectedItem?.name || placeholder
        }, [selectedItem, placeholder]
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById(`dropdown-${field}`);
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [field]);

    return (
        <div
            id={`dropdown-${field}`}
            className={`relative w-44 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {label && <p className="text-green-900 text-sm">{label}</p>}

            <button
                type="button"
                className={`
                    text-white bg-cyan-700 hover:bg-cyan-800 
                    focus:ring-2 focus:outline-none focus:ring-cyan-300
                    rounded-lg text-xs px-2 py-1 text-center 
                    inline-flex items-center w-full justify-between
                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                onClick={toggleDropdown}
                disabled={disabled}
            >
                <span className="truncate max-w-[calc(100%-30px)]">{displayValue}</span>
                <FaChevronDown className="ml-2 flex-shrink-0" />
            </button>

            {open && !disabled && (
                <div className="absolute z-10 bg-white rounded-lg shadow w-full mt-1">
                    <ul className="py-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
                        {data.length > 0 ? (
                           <>
                               {data.map((item: any) => (
                               <li
                                   key={item.id}
                                   className={`
                                            hover:bg-gray-100 cursor-pointer
                                            ${selectedItem?.id === item.id ? 'bg-gray-200' : ''}
                                        `}
                                   onClick={() => handleItemSelect(item)}
                               >
                                   <span className="block px-4 py-2">{item.name}</span>
                               </li>
                               ))}
                           <li
                               key='none'
                               className="hover:bg-gray-100 cursor-pointer"
                               onClick={() => handleItemSelect(null)}
                               >
                           <span className="block px-4 py-2">None</span>
                           </li>
                           </>
                        ) : (
                            <li className="text-gray-500 px-4 py-2 text-center">
                                No options available
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}