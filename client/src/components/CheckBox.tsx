

interface CheckBoxProps {
    label: string;
}

export default function CheckBox({label}: CheckBoxProps) {
    return (
        <>
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <label  className="ms-2 text-sm font-medium text-gray-900 ">
                    {label}
                </label>
            </div>
        </>
    )
}