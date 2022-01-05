import React from 'react';
import {
  Button,
  ImageComponent,
  SectionTitle,
  Text
} from '../../../core/components';

const ProductPage = () => {
  return (
    <section>
      <div className='flex flex-col xl:flex-row'>
        {/* Product Image */}
        <div className='w-full xl:w-2/5 rounded-lg overflow-hidden mb-6 xl:mb-0'>
          <ImageComponent src='/images/product.jpg' alt='product' />
        </div>
        {/* Details Section */}
        <div className='w-full xl:w-3/5 xl:pl-6 flex flex-row'>
          <div>
            <SectionTitle
              tag='h1'
              content='Product Title Might be long so who knows'
            />
            <Text content='Rs 1199' styleClasses='text-3xl font-light' />
            <div className='mt-6 flex'>
              <Button
                text='Buy from Amazon'
                onClick={() => {}}
                styleClasses='text-lg'
              />
            </div>
          </div>
          <div className='pl-4'>
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
