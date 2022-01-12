import React, { FC } from 'react';
import { Button, ImageComponent, SectionTitle, Text } from '../../components';
import Prodcut from '../../models/Product';

type Props = {
  product: Prodcut;
};

const ProductPage: FC<Props> = ({ product }) => {
  return (
    <section>
      <div className='flex flex-col xl:space-x-6'>
        {/* Product Image */}
        <div className='w-full xl:w-2/5 rounded-lg overflow-hidden mb-6 xl:mb-0'>
          <ImageComponent src='/images/product.jpg' alt='product' />
        </div>
        <div>
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
          {/* More Details  */}
          <div className='flex flex-col xl:flex-row'>
            <table>
              <tbody>
                {product.overviewPoints.map((op, i) => (
                  <tr key={i}>
                    <td className='font-semibold'>{op.key}</td>
                    <td className='font-medium'>{op.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
