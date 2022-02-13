import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { APP_NAME } from '../../common/constants';
import { Button, Text } from '../../components';
import ShareDialog from '../../components/Reusable/ShareDialog';
import { RootState } from '../../redux/store';

type Props = {
  id: string;
  title: string;
  isBookMarked: boolean;
  toggleBookmark: (isBookMarked: boolean) => void;
  isWishlist: boolean;
  toggleWishlist: (isWishlist: boolean) => void;
};

const ProductTitle: FC<Props> = ({
  id,
  title,
  isBookMarked,
  toggleBookmark,
  isWishlist,
  toggleWishlist
}) => {
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);
  const [shareProps, setShareProps] = useState<{
    open: boolean;
    url: string;
    title: string;
  }>({ open: false, url: '', title: '' });

  const closeShare = () => {
    setShareProps({ open: false, url: '', title: '' });
  };

  return (
    <>
      <div className='flex flex-row space-x-6'>
        <div className='flex-1'>
          <Text
            tag='h1'
            content={title}
            styleClasses='text-lg md:text-xl xl:text-4xl !font-semibold'
          />
        </div>
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
            onClick={() => {
              setShareProps({
                open: true,
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
                title: `${title} | ${APP_NAME}`
              });
            }}
            styleClasses='text-lg !rounded-full !py-2 !px-2'
          />
        </div>
      </div>
      <ShareDialog {...shareProps} closeModal={closeShare} />
    </>
  );
};

export default ProductTitle;
