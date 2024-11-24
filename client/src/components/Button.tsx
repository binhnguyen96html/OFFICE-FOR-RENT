interface ButtonProps {
    title?: string,
    children?: any,
    bgColor?: string,
    textColor?: string,
    onClick?: () => void,
}

export default function Button({
                                   title,bgColor= 'bg-cyan-900',
                                   textColor='text-white',
                                   children,
                    onClick

}:ButtonProps){


    return(
        <>
            <button
                className={`p-2 rounded text-center inline-flex items-center gap-2 text-sm 
            ${bgColor} ${textColor}`}
            onClick={onClick}
            >
                {title}
                {children}
            </button>
        </>
    )
}