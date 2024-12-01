import {LuAsterisk} from "react-icons/lu";


interface FormInputProps{
    label: string;
    inputChangeHandler: (field: any, enteredValue: any) => void;
    field: any;
    value: any;
    required?: boolean,
    type?: string;
    textarea?: boolean;
    placeholder?: string;
}

export default function FormInputForInsert({
    label,
    inputChangeHandler,
    field,
    value,
    required = false,
    type='text',
    textarea = false,
    placeholder
}: FormInputProps){


    return(
        <div>
            <div className={'md:grid grid-cols-6 gap-4 mb-2'}>
                <div className='flex '>
                    <p className='col-span-1 text-green-900 mb-1 text-sm'>{label}</p>
                    {required && <LuAsterisk className='text-xs'/>}
                </div>

                {textarea ? (
                    <textarea
                        className={`col-span-5 border border-gray-300 rounded w-full focus:outline-none focus:border focus:ring-1 focus:ring-green-900
                    px-2 text-xs`}
                        value={`${type !== null ? value : ''}`}
                        onChange={(e) => inputChangeHandler(field, e.target.value)}
                    />
                ) : (
                    <input
                        className={`col-span-5 border border-gray-300 rounded w-full focus:outline-none focus:border focus:ring-1 focus:ring-green-900
                    px-2 text-xs ${textarea && 'h-16'}`}
                        value={`${type !== null ? value : ''}`}
                        onChange={(e) => inputChangeHandler(field, e.target.value)}
                        type={type}
                        placeholder={placeholder}
                    />
                )}

            </div>
        </div>
    )
}