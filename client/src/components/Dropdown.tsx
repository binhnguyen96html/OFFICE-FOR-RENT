import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FaChevronDown} from "react-icons/fa";

interface DropdownProps{
    data: any;
    label?: string;
    field: any;
    inputChangeHandler: (field: any, enteredValue: any) => void;
    placeholder?: string;
    disabled?: boolean;
    currentSelectedValue?: any;
    fieldFromFetchedDataForDisplay: string;
    fieldFromFetchedDataForSendBackDatabase: string;
    reset?: boolean;
}

export default function Dropdown({
                                     data,
                                     label,
                                     field,
                                     inputChangeHandler,
                                     placeholder = 'Select an option',
                                     disabled = false,
                                     currentSelectedValue=null,
                                     fieldFromFetchedDataForDisplay,
                                     fieldFromFetchedDataForSendBackDatabase,
                                    reset = false,
                                 }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(currentSelectedValue);
    const [displayValue, setDisplayValue] = useState<string | null>(placeholder);


    useEffect(() => {
        if(currentSelectedValue !== null){
            setSelectedItem(currentSelectedValue);
            setDisplayValue(currentSelectedValue[fieldFromFetchedDataForDisplay])
        }
        // console.log('currentSelectedValue: ', currentSelectedValue)
        // console.log('selectedItem: ', selectedItem)
        if(reset === true){
            //console.log('reset: ', reset)
            setDisplayValue(placeholder)
        }
    }, [currentSelectedValue, placeholder, displayValue, reset]);

    // Memoize the toggle function to prevent unnecessary re-renders
    const toggleDropdown = useCallback(() => {
        if (!disabled) {
            setOpen(prev => !prev);
        }
    }, [disabled]);

    // Memoize the item selection handler
    const handleItemSelect = useCallback((item: any) => {
        if (!disabled) {
            setSelectedItem(item);
            setOpen(false);
            if (item === null) {
                    inputChangeHandler(field, '');
                    setDisplayValue('None')
            } else {
                    inputChangeHandler(field, item[fieldFromFetchedDataForSendBackDatabase]);
                    //console.log('item[fieldFromFetchedDataForSendBackDatabase]: ', item[fieldFromFetchedDataForSendBackDatabase])
                    setDisplayValue(item[fieldFromFetchedDataForDisplay]);
            }
        }
    }, [field, inputChangeHandler, disabled]);

    // Memoize the display value to reduce unnecessary re-renders
    // const displayValue2 = useMemo(() => {
    //        // console.log("select: ", selectedItem)
    //         return selectedItem?[showedField] || placeholder
    //     }, [selectedItem, placeholder]
    // );

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
            {label && <p className="text-green-900 text-sm mt-1">{label}</p>}

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
                                   <span className="block px-4 py-2">{item[fieldFromFetchedDataForDisplay]}</span>
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