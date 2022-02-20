import React, { FC, useState } from 'react';
import DataConfig from '../../common/componentConfig';
import { ProductDBKeys } from '../../common/dbKeys';
import {
  ageGrpFilterValues,
  festivalilterValues,
  occasionFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';
import { Button, SectionTitle, Text } from '../../components';
import CheckBoxGroup from '../../components/Reusable/CheckBoxGroup';
import { createCheckboxOptions } from '../../components/Reusable/CheckBoxGroup/utils';
import SelectInterestsPopup from '../../components/Reusable/SelectInterestsPopup';
import { Gender, ProductStatus } from '../../models/enums';
import Product from '../../models/Product';
import ImageCarouselSection from '../product/ImageCarouselSection';
import ShowSelectedInterests from '../search/showSelectedInterests';

type Props = {
  product: Product;
  onCheckboxClicked: (key: string, values: Array<string>) => void;
  saveProduct: () => void;
  loading: boolean;
  updateProductStatus: (status: ProductStatus) => void;
  removeProduct: () => void;
};

const ProductEditSection: FC<Props> = ({
  product,
  onCheckboxClicked,
  saveProduct,
  loading,
  updateProductStatus,
  removeProduct
}) => {
  const [popupOpen, updatePopupOpen] = useState<boolean>(false);

  return (
    <>
      <div className='flex flex-col space-y-4'>
        {product.status === ProductStatus.Error && (
          <div>
            <ul className='list-disc list-inside'>
              {product.statusMessage.map(sm => (
                <Text tag='li' content={sm} styleClasses='text-skin-error' />
              ))}
            </ul>
          </div>
        )}
        <div className='flex space-x-4'>
          <div className='w-2/5'>
            {/* <ImageCarouselSection images={product.productImgUrls} /> */}
            <img
              src={`//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=IN&ASIN=${product.apid}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_`}
            />
          </div>
          <div className='flex flex-col space-y-4'>
            <SectionTitle content={product.title} styleClasses='!text-3xl' />
            <div className='flex justify-between'>
              <span>
                ID: <strong>{product.uid}</strong>
              </span>
              <span>
                Amazon ID: <strong>{product.apid}</strong>
              </span>
              <span>
                Rating: <strong>{product.rating}</strong>
              </span>
              <span>
                Price: <strong>{product.price}</strong>
              </span>
              <span>
                OG Price: <strong>{product.ogPrice}</strong>
              </span>
            </div>
            <div className='flex flex-col space-y-3'>
              <span>
                Product Url:{' '}
                <strong>
                  <a href={product.productUrl} target='_blank'>
                    {product.productUrl}
                  </a>
                </strong>
              </span>
              <span>
                Affiliate Url: <strong>{product.affiliateUrl}</strong>
              </span>
            </div>
            <div className='flex space-x-4'>
              <div className='w-9/12'>
                <strong>Feature List</strong>
                <ul className='list-disc'>
                  {product.featureList.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className='w-3/12'>
                <table className='table-auto'>
                  <strong>Overview points</strong>
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
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
            <Text content='Relationship Tags' />
            <div className='flex space-x-4'>
              {
                <CheckBoxGroup
                  filterKey={ProductDBKeys.relationshipTags}
                  checkList={createCheckboxOptions(relationshipFilterValues)}
                  selected={product.relationshipTags}
                  onChangeHandler={onCheckboxClicked}
                  showSelectAll
                />
              }
            </div>
          </div>
          <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
            <Text content='Age Tags' />
            <div className='flex space-x-4'>
              {
                <CheckBoxGroup
                  filterKey={ProductDBKeys.ageTags}
                  checkList={createCheckboxOptions(ageGrpFilterValues)}
                  selected={product.ageTags}
                  onChangeHandler={onCheckboxClicked}
                  showSelectAll
                />
              }
            </div>
          </div>
          <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
            <Text content='Occasion Tags' />
            <div className='flex space-x-4'>
              {
                <CheckBoxGroup
                  filterKey={ProductDBKeys.occasionTags}
                  checkList={createCheckboxOptions(occasionFilterValues)}
                  selected={product.occasionTags}
                  onChangeHandler={onCheckboxClicked}
                  showSelectAll
                />
              }
            </div>
          </div>
          <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
            <Text content='Festival Tags' />
            <div className='flex space-x-4'>
              {
                <CheckBoxGroup
                  filterKey={ProductDBKeys.festivalTags}
                  checkList={createCheckboxOptions(festivalilterValues)}
                  selected={product.festivalTags}
                  onChangeHandler={onCheckboxClicked}
                  showSelectAll
                />
              }
            </div>
          </div>
          <div className='border-2 border-skin-inverted p-2 rounded-lg'>
            <Button
              text='Add Interests'
              onClick={() => {
                updatePopupOpen(true);
              }}
              defautStyle='cust-btn-btn'
              icon={{
                iconName: 'Add'
              }}
            />
            <div className='flex flex-row flex-wrap space-x-4 mt-2'>
              <ShowSelectedInterests
                values={product.interestTags}
                editMode={true}
                onCancel={newArray => {
                  onCheckboxClicked(ProductDBKeys.interestTags, newArray);
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
          <Text content='Gender Tags' />
          <div className='flex space-x-4'>
            {
              <CheckBoxGroup
                filterKey={ProductDBKeys.genderTags}
                checkList={[
                  { text: 'Female', value: Gender.Female.toString() },
                  { text: 'Male', value: Gender.Male.toString() }
                ]}
                selected={product.genderTags.map(g => g.toString())}
                onChangeHandler={onCheckboxClicked}
                showSelectAll
              />
            }
          </div>
        </div>
        <SectionTitle content={`Status: ${product.status}`} />
        <div className='flex justify-between'>
          <Button text='Save' onClick={saveProduct} loading={loading} />

          <Button
            text='Mark as Active'
            onClick={() => updateProductStatus(ProductStatus.Active)}
            loading={loading}
          />

          <Button
            text='Mark as Fetch Success'
            onClick={() => updateProductStatus(ProductStatus.FetchSuccess)}
            loading={loading}
          />

          <Button
            text='Mark For Refetch'
            onClick={() => updateProductStatus(ProductStatus.FetchPending)}
            loading={loading}
          />

          <Button
            text='Mark as Error'
            onClick={() => updateProductStatus(ProductStatus.Error)}
            loading={loading}
          />

          <Button
            text='Delete Product'
            onClick={removeProduct}
            loading={loading}
            disabled={true}
          />
        </div>
      </div>
      <SelectInterestsPopup
        open={popupOpen}
        selectedInts={product.interestTags}
        onClose={() => updatePopupOpen(false)}
        onSave={newTagsList => {
          onCheckboxClicked(ProductDBKeys.interestTags, newTagsList);
        }}
      />
    </>
  );
};

export default ProductEditSection;
