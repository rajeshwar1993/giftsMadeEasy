import React, { FC } from 'react';
import { Button, Text } from '../../components';

type Props = {
  title: string;
  isDesktop: boolean;
  isBookMarked: boolean;
  toggleBookmark: (isBookMarked: boolean) => void;
  isWishlist: boolean;
  toggleWishlist: (isWishlist: boolean) => void;
};

const ProductTitle: FC<Props> = ({
  title,
  isDesktop,
  isBookMarked,
  toggleBookmark,
  isWishlist,
  toggleWishlist
}) => {
  return (
    <div className='flex'>
      <Text
        tag='h1'
        content={title}
        styleClasses='text-xl xl:text-4xl !font-semibold'
      />
      <div className='flex flex-col space-y-2 xl:space-y-4'>
        <Button
          icon={{
            iconName: 'OutlineFavoriteBorder',
            size: isDesktop ? '20' : '16'
          }}
          defautStyle='cust-btn-btn'
          activated={isWishlist}
          onClick={() => toggleWishlist(isWishlist)}
          styleClasses='text-lg !rounded-full !py-2 !px-2'
        />
        <Button
          icon={{
            iconName: 'BookmarkBorder',
            size: isDesktop ? '20' : '16'
          }}
          defautStyle='cust-btn-btn'
          activated={isBookMarked}
          onClick={() => toggleBookmark(isBookMarked)}
          styleClasses='text-lg !rounded-full !py-2 !px-2'
        />
        <Button
          icon={{
            iconName: 'Share',
            size: isDesktop ? '20' : '16'
          }}
          defautStyle='cust-btn-btn'
          onClick={() => {}}
          styleClasses='text-lg !rounded-full !py-2 !px-2'
        />
      </div>
    </div>
  );
};

export default ProductTitle;
