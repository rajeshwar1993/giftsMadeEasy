import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc
} from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FS_USER_DB } from '../../common/constants';
import { UserDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import { db } from '../../firebase';
import useWindowSize from '../../hooks/useWindowSize';
import Prodcut from '../../models/Product';
import { RootState, useAppDispatch } from '../../redux/store';
import { ur_updateBookmarks, ur_updateWishlist } from '../../redux/user';
import ImageCarouselSection from './ImageCarouselSection';
import ProductTitle from './ProductTitle';

type Props = {
  product: Prodcut;
};

let debounce: any = null;

const ProductPage: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const size = useWindowSize();
  const [isDesktop, toggleIsDesktop] = useState(true);
  const user = useSelector((state: RootState) => state.user.data);

  const toggleBookmark = async (isBookMarked: boolean) => {
    // TODO: have a check of user is present, launch signin if not present
    if (!user) return;

    const userRef = collection(db, FS_USER_DB);
    const toDo = isBookMarked ? 'remove' : 'add';
    dispatch(ur_updateBookmarks({ productID: product.uid, toDo }));
    if (toDo === 'add') {
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.bookmarks]: arrayUnion(product.uid)
      });
    } else {
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.bookmarks]: arrayRemove(product.uid)
      });
    }
  };

  const toggleWishlist = async (isWishlist: boolean) => {
    // TODO: have a check of user is present, launch signin if not present
    if (!user) return;

    const userRef = collection(db, FS_USER_DB);
    const toDo = isWishlist ? 'remove' : 'add';
    dispatch(ur_updateWishlist({ productID: product.uid, toDo }));
    if (toDo === 'add') {
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.wishlist]: arrayUnion(product.uid)
      });
    } else {
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.wishlist]: arrayRemove(product.uid)
      });
    }
  };

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
      <div className='flex flex-col space-y-6 xl:flex-row xl:space-x-12'>
        {/* Product Image */}
        <ImageCarouselSection
          images={product.productImgUrls}
          isDesktop={isDesktop}
        />

        {/* Details Section */}
        <div className='flex flex-col space-y-4'>
          <ProductTitle
            title={product.title}
            isDesktop={isDesktop}
            isBookMarked={!!user?.bookmarks.find(b => b === product.uid)}
            toggleBookmark={toggleBookmark}
            isWishlist={!!user?.wishlist.find(b => b === product.uid)}
            toggleWishlist={toggleWishlist}
          />

          <div className='flex flex-col space-y-8 xl:flex-row xl:space-x-40 xl:space-y-0'>
            <div className='flex flex-col justify-between space-y-4'>
              <div className='flex flex-col space-y-1'>
                <Text
                  content={'MRP: ' + product.ogPrice}
                  styleClasses='text-xl font-light line-through'
                />
                <Text
                  content={'Price: ' + product.price}
                  styleClasses='text-3xl'
                />
              </div>

              <div className='flex flex-col space-y-4 '>
                <Button
                  text='Buy Now'
                  onClick={() => {}}
                  styleClasses='text-xl w-full'
                  wrapperClasses='w-full'
                />
                <Button
                  text='See Details'
                  onClick={() => {}}
                  styleClasses='text-lg w-full'
                  wrapperClasses='w-full'
                />
              </div>
            </div>
            <div>
              <table className='table-auto'>
                <tbody>
                  {product.overviewPoints.map((op, i) => (
                    <tr key={i}>
                      <td className='font-bold px-4 py-3'>{op.key}</td>
                      <td className='font-medium px-4 py-3'>{op.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='pt-4'>
            <SectionTitle content='Features' styleClasses='!text-3xl' />
            <ul className='list-disc list-inside'>
              {product.featureList.map((fl, i) => (
                <li key={i}>
                  <Text content={fl} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
