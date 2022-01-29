import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc
} from 'firebase/firestore';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import AppConfig from '../../common/appConfig';
import { FS_USER_DB } from '../../common/constants';
import { UserDBKeys } from '../../common/dbKeys';
import {
  relationshipFilterValues,
  ageGrpFilterValues,
  occasionFilterValues,
  interestFilterValues
} from '../../common/staticFilterValues';
import { Button, Icon, SectionTitle, Text } from '../../components';
import Chip from '../../components/Reusable/Chip';
import { db } from '../../firebase';
import useWindowSize from '../../hooks/useWindowSize';
import Prodcut from '../../models/Product';
import { app_toggle_isSigupOpen } from '../../redux/appCommon';
import { RootState, useAppDispatch } from '../../redux/store';
import { ur_updateBookmarks, ur_updateWishlist } from '../../redux/user';
import ImageCarouselSection from './ImageCarouselSection';
import ProductTitle from './ProductTitle';

type Props = {
  product: Prodcut;
};

const ProductPage: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const toggleBookmark = async (isBookMarked: boolean) => {
    if (!user) {
      dispatch(app_toggle_isSigupOpen('signup'));
      return;
    }

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
    if (!user) {
      dispatch(app_toggle_isSigupOpen('signup'));
      return;
    }

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

  return (
    <section>
      <div className='flex flex-col space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0'>
        {/* Product Image */}
        <div>
          <div className='lg:sticky lg:top-20'>
            <ImageCarouselSection images={product.productImgUrls} />
          </div>
        </div>
        {/* Details Section */}
        <div className='flex flex-col space-y-4 lg:flex-1 px-2'>
          <ProductTitle
            title={product.title}
            isBookMarked={!!user?.bookmarks.find(b => b === product.uid)}
            toggleBookmark={toggleBookmark}
            isWishlist={!!user?.wishlist.find(b => b === product.uid)}
            toggleWishlist={toggleWishlist}
          />

          <div className='flex flex-col xl:flex-row space-y-8 xl:space-x-24 xl:space-y-0'>
            <div className='flex flex-col justify-start space-y-4'>
              <div className='flex flex-row space-x-8 items-end'>
                <div className='flex flex-col space-y-1'>
                  <Text
                    content={'MRP: ' + product.ogPrice}
                    styleClasses='text-xl font-light line-through'
                  />

                  <SectionTitle content={`${product.price}*`} />
                </div>
                <div className='flex space-x-2 items-end'>
                  <Icon iconName='Star' size='40' />
                  <Text
                    content={product.rating}
                    styleClasses='text-4xl font-light'
                  />
                </div>
              </div>

              <Button
                icon={{
                  iconName: 'LinkUrl',
                  size: '26'
                }}
                text={AppConfig.COMMON.buyNowLabel}
                link={product.affiliateUrl}
                target='_blank'
                styleClasses='text-xl w-full'
                wrapperClasses='w-full xl:max-w-sm'
              />
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                <div>
                  <Text
                    styleClasses='text-lg'
                    content={'Ideal for gifing your'}
                  />
                  <div className='flex flex-wrap mt-1'>
                    {product.relationshipTags.map(r => (
                      <Chip
                        key={r}
                        editMode={false}
                        id={r}
                        text={{
                          content: relationshipFilterValues.get(r) || '',
                          styleClasses: ''
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Text
                    styleClasses='text-lg'
                    content={'Perfect for Age-groups'}
                  />
                  <div className='flex flex-wrap mt-1'>
                    {product.ageTags.map(r => (
                      <Chip
                        key={r}
                        editMode={false}
                        id={r}
                        text={{
                          content: ageGrpFilterValues.get(r) || '',
                          styleClasses: ''
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Text
                    styleClasses='text-lg'
                    content={'Best suited for occasions like'}
                  />
                  <div className='flex flex-wrap mt-1'>
                    {product.occasionTags.map(r => (
                      <Chip
                        key={r}
                        editMode={false}
                        id={r}
                        text={{
                          content: occasionFilterValues.get(r) || '',
                          styleClasses: ''
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Text
                    styleClasses='text-lg'
                    content={'Loved by people interested in'}
                  />
                  <div className='flex flex-wrap mt-1'>
                    {product.interestTags.map(r => (
                      <Chip
                        key={r}
                        editMode={false}
                        id={r}
                        text={{
                          content: interestFilterValues.get(r)?.name || '',
                          styleClasses: ''
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:spaxe-x-8'>
            <div className='flex-1'>
              <SectionTitle content='Overview' styleClasses='!text-3xl' />
              <table className='table-auto'>
                <tbody>
                  {product.overviewPoints.map((op, i) => (
                    <tr key={i}>
                      <td className='font-bold px-4 py-2'>{op.key}</td>
                      <td className='font-medium px-4 py-2'>{op.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex-1'>
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
          <Text
            styleClasses='text-xs'
            content={
              '* This is an indicative price. Actual prices will be seen after adding to the actual cart.'
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
