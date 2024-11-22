import { FaArrowRight } from "react-icons/fa";

interface ButtonProps {
    title: string;
}

export default function Button({title}:ButtonProps){


    return(
        <>
            <button className='px-4 py-2 rounded text-center inline-flex items-center gap-2
            bg-cyan-900 text-sm text-white'>
                {title}
                <FaArrowRight />
            </button>
        </>
    )
}