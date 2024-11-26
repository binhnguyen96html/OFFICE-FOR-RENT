import {FormStateForInsert} from "../types/buildingTypes";

interface FormInputProps {
    label: string;
    inputChangeHandler: (field: keyof FormStateForInsert, enteredValue: any) => void;
    field: keyof FormStateForInsert;
    value: any;
    required?: boolean,
}

type currentFormInputProps = FormInputProps;

export default function FormInput({
    label,
    inputChangeHandler,
    field,
    value,
    ...props
}: currentFormInputProps){


    return(
        <div>
            <div>
                <p className='text-green-900 mb-1 text-sm'>{label}</p>
                <input
                    className='border rounded w-full focus:outline-none focus:border focus:ring-2 focus:ring-green-900'
                    value={value}
                    onChange={(e) => inputChangeHandler(field, e.target.value)}
                    {...props}
                />

            </div>
        </div>
    )
}