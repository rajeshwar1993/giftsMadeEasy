import React, { FC, useState } from 'react';
import { ImageComponent } from '../../components';

type Props = {
  images: Array<string>;
  isDesktop: boolean;
};

const ImageCarouselSection: FC<Props> = ({ images, isDesktop }) => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className='flex flex-col space-y-6'>
      <div className='rounded-lg overflow-hidden'>
        <ImageComponent
          src={images[selected]}
          alt='product'
          width={isDesktop ? 500 : 300}
          height={isDesktop ? 500 : 300}
          layout='fixed'
        />
      </div>

      <div className='flex justify-between'>
        {images.map((img, i) => (
          <div
            key={i}
            className='w-10 h-10 xl:w-16 xl:h-16 rounded-lg cursor-pointer'
            onClick={() => setSelected(i)}
          >
            <ImageComponent
              src={img}
              alt='product'
              width={40}
              height={40}
              layout='fixed'
              styleClasses={`border-2 rounded-sm overflow-hidden ${
                i === selected ? 'border-skin-inverted' : ''
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarouselSection;
