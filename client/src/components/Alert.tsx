import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

interface AlertProps {
    color: string;
    error?: FetchBaseQueryError | SerializedError;
    message: string;
}


const Alert = ({ color, error, message }: AlertProps) => {

    let content = error
        ? 'data' in error
            ? JSON.stringify((error as FetchBaseQueryError).data, null, 2)
            : (error as SerializedError).message || 'An error occurred'
        : null;

    return (
        <div
            role="alert"
            className={`mt-4 mb-4 border border-${color}-500`}
        >
            <div className={`text-${color}-500 font-bold rounded-t px-4 py-2`}>
                Alert
            </div>
            <div
                className={`border-t border-${color}-400  bg-${color}-100 
                    px-4 py-3 text-${color}-700`}
            >
                <p>{content || message}</p>
            </div>
        </div>
    );
};

export default Alert;