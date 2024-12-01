import React from 'react';

interface CardProps {
    building: any;
    image: number;
}

export default function Card({building, image}: CardProps) {
    return (
        <>
            <div>
                <div
                    className=" bg-white border border-gray-200 rounded-lg shadow
         w-80 h-[300px] grid grid-rows-2"
                >
                    <div className="rounded-t-lg overflow-hidden h-50">
                        <img
                            src={`/img/room${image}.png`}
                            alt="img"
                            className="hover:scale-105 duration-75 transition-all h-full w-full object-cover mx-auto"
                        />
                    </div>

                    <div className="p-5 overflow-hidden">
                        <h3 className="mb-2 text-xl font-bold  text-gray-900 line-clamp-2">
                            {building.name}
                        </h3>

                        <p className="mb-3 font-normal text-gray-700 line-clamp-5 tracking-tight truncate overflow-hidden whitespace-nowrap">
                            {building.address}
                        </p>

                        <p className="mb-3 font-normal text-gray-700 line-clamp-5 tracking-tight">
                            ${building.rentPrice}/month
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
