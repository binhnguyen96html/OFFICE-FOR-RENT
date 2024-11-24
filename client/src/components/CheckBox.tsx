

interface CheckBoxProps {
    label?: string;
    bgColor?: string;
    textColor?: string;
}

export default function CheckBox({label, bgColor='text-cyan-900', textColor='text-gray-900'}: CheckBoxProps) {
    return (
        <>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    value=""
                    className={`w-4 h-4 ${bgColor} bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2`}
                />
                <label className={`ml-2 text-sm font-medium ${textColor}`}  >
                    {label}
                </label>
            </div>
        </>
    )
}