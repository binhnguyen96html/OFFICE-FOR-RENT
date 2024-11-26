import {FormStateForSearch} from "../types/buildingTypes";

interface FormInputProps {
    label: string;
    inputChangeHandler: (field: keyof FormStateForSearch, enteredValue: any) => void;
    field: keyof FormStateForSearch;
    value: any;
    required?: boolean,
    type?: string;
}

export default function FormInputForSearch({
    label,
    inputChangeHandler,
    field,
    value,
    type='text',
    ...props
}: FormInputProps){


    return(
        <div>
            <div>
                <p className='text-green-900 mb-1 text-sm'>{label}</p>
                <input
                    className='border border-gray-300 rounded w-full focus:outline-none focus:border focus:ring-1 focus:ring-green-900'
                    value={value}
                    onChange={(e) => inputChangeHandler(field, e.target.value)}
                    type={type}
                    {...props}
                />

            </div>
        </div>
    )
}