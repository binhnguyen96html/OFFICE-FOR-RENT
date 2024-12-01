import { Carousel } from 'flowbite-react';
import React from 'react';


interface CarouselComponentProps {
    images: string[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({images}) => {

    return (
        <>
            <div className="h-[280px]">
                <Carousel>
                    {images.map((img: string) => (
                        <img key={img} src={`/img/${img}`} alt="..." />
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default CarouselComponent;