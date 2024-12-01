import React from 'react';
import CarouselComponent from "../components/CarouselComponent";
import {Spinner} from "flowbite-react";
import {useGetBuildingsQuery} from "../store/slices/buildingsApiSlice";
import Alert from "../components/Alert";
import Card from "../components/Card";

const HomePage = () => {

    const {
        data: fetchedBuildings,
        error: fetchedBuildingsError,
        isLoading: fetchedBuildingsIsLoading
    } = useGetBuildingsQuery({})
    console.log('fetchedBuildings: ', fetchedBuildings)

    return (
        <div>
            <div className="">
                <CarouselComponent images={['cover.png', 'cover2.png']}/>
            </div>

            <div className="overflow-hidden">
                <div>
                    <h1 className="text-cyan-700 pt-6 pb-6 font-semibold text-2xl">
                        Current Office For Rent
                    </h1>

                    {fetchedBuildingsIsLoading ? (
                        <Spinner />
                    ) : fetchedBuildingsError ? (
                        <Alert
                            color="red"
                            message="Error"
                            error={fetchedBuildingsError}
                        />
                    ) : (
                        <div className="flex gap-4 h-[330px] hover:overflow-auto scrollbar-thin">
                            {fetchedBuildings.length > 0 ? (
                                fetchedBuildings?.map((building: any, idx:number) => (
                                        <Card building={building} image={idx+1}/>
                                ))
                            ) : (
                                <div>No Buildings</div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default HomePage;