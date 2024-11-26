interface ButtonProps {
    title?: string,
    children?: any,
    bgColor?: string,
    hoverColor?: string,
    textColor?: string,
    onClick?: () => void,
    type?: "button" | "submit" | "reset",
}

export default function Button({title,bgColor= 'bg-cyan-900',hoverColor='bg-cyan-700', textColor='text-white', children, onClick, type='button', ...props}:ButtonProps){

    return(
        <>
            <button
                className={`p-2 rounded text-center inline-flex items-center gap-2 text-sm 
                hover:${hoverColor} duration-75 transition
                ${bgColor} ${textColor}`}
                onClick={onClick}
                type={type}
                {...props}
            >
                {title}
                {children}
            </button>
        </>
    )
}