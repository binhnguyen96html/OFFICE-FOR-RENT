import {FormState} from "../screens/RentManagement";


interface FormInputProps {
    label: string;
    inputChangeHandler: (field: keyof FormState, enteredValue: string | Array<string>) => void
    name: keyof FormState;
    value: string;
}

export default function FormInput({
    label,
    inputChangeHandler,
    name,
    value,
}: FormInputProps){


    return(
        <div>
            <div>
                <p className='text-green-900 mb-1 text-sm'>{label}</p>
                <input
                    className='border rounded w-full focus:outline-none focus:border focus:ring-2 focus:ring-green-900'
                    value={value}
                    onChange={(e) => inputChangeHandler(name, e.target.value)}
                />

            </div>
        </div>
    )
}