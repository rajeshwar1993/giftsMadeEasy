import React, { FC, useEffect, useState } from 'react';
import { Button, ImageComponent, SectionTitle, Text } from '../../components';
import useWindowSize from '../../hooks/useWindowSize';
import Prodcut from '../../models/Product';
import ImageCarouselSection from './ImageCarouselSection';

type Props = {
  product: Prodcut;
};

let debounce: any = null;

const ProductPage: FC<Props> = ({ product }) => {
  const size = useWindowSize();
  const [isDesktop, toggleIsDesktop] = useState(true);

  // check window width on change
  useEffect(() => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(() => {
      if (size.width && size?.width >= 1280) {
        toggleIsDesktop(true);
        console.log(true);
      } else {
        toggleIsDesktop(false);
        console.log(false);
      }
    }, 200);
  }, [size]);

  return (
    <section>
      <div className='flex flex-col xl:flex-row xl:space-x-6'>
        {/* Product Image */}
        <ImageCarouselSection
          images={product.productImgUrls}
          isDesktop={isDesktop}
        />

        {/* Details Section */}
        <div className='w-full xl:w-3/5 flex flex-row'>
          <div className='flex flex-col space-y-4'>
            <Text
              tag='h1'
              content={product.title}
              styleClasses='text-xl xl:text-4xl !font-semibold'
            />
            <Text content='Rs 1199' styleClasses='text-3xl font-light' />
            <div className='flex space-x-4'>
              <Button
                text='Buy Now'
                onClick={() => {}}
                styleClasses='text-lg'
              />
              <Button
                text='See Details'
                onClick={() => {}}
                styleClasses='text-lg'
              />
            </div>
          </div>
          <div>
            <Button
              icon={{
                iconName: 'OutlineFavoriteBorder'
              }}
              defautStyle='cust-btn-btn'
              onClick={() => {}}
              styleClasses='text-lg !rounded-full !py-2 !px-2'
              wrapperClasses='mt-2'
            />
            <Button
              icon={{
                iconName: 'BookmarkBorder'
              }}
              defautStyle='cust-btn-btn'
              onClick={() => {}}
              styleClasses='text-lg !rounded-full !py-2 !px-2'
              wrapperClasses='mt-4'
            />
            <Button
              icon={{
                iconName: 'Share'
              }}
              defautStyle='cust-btn-btn'
              onClick={() => {}}
              styleClasses='text-lg !rounded-full !py-2 !px-2'
              wrapperClasses='mt-4'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
