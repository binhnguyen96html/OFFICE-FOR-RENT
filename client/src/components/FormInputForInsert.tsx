import {FormStateForInsert} from "../types/buildingTypes";
import {LuAsterisk} from "react-icons/lu";


interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string;
    inputChangeHandler: (field: keyof FormStateForInsert, enteredValue: any) => void;
    field: keyof FormStateForInsert;
    value: any;
    required?: boolean,
    type?: string;
}

export default function FormInputForInsert({
    label,
    inputChangeHandler,
    field,
    value,
    required = false,
    type='text',
    ...props
}: FormInputProps){


    return(
        <div>
            <div className={'md:grid grid-cols-6 gap-4 mb-2'}>
                <div className='flex '>
                    <p className='col-span-1 text-green-900 mb-1 text-sm'>{label}</p>
                    {required && <LuAsterisk className='text-xs'/>}
                </div>

                <input
                    className='col-span-5 border border-gray-300 rounded w-full focus:outline-none focus:border focus:ring-1 focus:ring-green-900
                    px-2 text-xs'
                    value={`${type === 'text' ? (value || "") : (value || 0)}`}
                    onChange={(e) => inputChangeHandler(field, e.target.value)}
                    type={type}
                    {...props}
                />

            </div>
        </div>
    )
}