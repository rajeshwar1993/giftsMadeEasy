import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { ImageComponent } from '../../components';
import { RootState } from '../../redux/store';

type Props = {
  images: Array<string>;
};

const ImageCarouselSection: FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState<number>(0);

  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  return (
    <div className='flex flex-col space-y-6'>
      <div className='rounded-lg overflow-hidden'>
        <ImageComponent
          src={images[selected] || '/images/logo.png'}
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
