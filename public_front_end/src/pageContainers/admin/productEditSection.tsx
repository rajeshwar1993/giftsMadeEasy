import React, { FC } from 'react';
import DataConfig from '../../common/componentConfig';
import { ProductDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import CheckBoxGroup from '../../components/Reusable/CheckBoxGroup';
import Product from '../../models/Product';
import ImageCarouselSection from '../product/ImageCarouselSection';

type Props = {
  product: Product;
  onCheckboxClicked: (key: string, values: Array<string>) => void;
  saveProduct: () => void;
  loading: boolean;
};

const ProductEditSection: FC<Props> = ({
  product,
  onCheckboxClicked,
  saveProduct,
  loading
}) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex space-x-4'>
        <ImageCarouselSection images={product.productImgUrls} />
        <div className='flex flex-col space-y-4'>
          <SectionTitle content={product.title} styleClasses='!text-3xl' />
          <div className='flex justify-between'>
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
              Product Url: <strong>{product.productUrl}</strong>
            </span>
            <span>
              Affiliate Url: <strong>{product.productUrl}</strong>
            </span>
          </div>
          <div className='flex space-x-4'>
            <div className='w-7/12'>
              <strong>Feature List</strong>
              <ul className='list-disc'>
                {product.featureList.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className='w-5/12'>
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

      <div className='flex flex-row space-x-4'>
        <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
          <Text content='Relationship Tags' />
          <div className='flex space-x-4'>
            {
              <CheckBoxGroup
                filterKey={ProductDBKeys.relationshipTags}
                checkList={Object.keys(DataConfig.relationship).map(
                  (key: any, i) => ({
                    text: key,
                    value: DataConfig.relationship[key]
                  })
                )}
                selected={product.relationshipTags}
                onChangeHandler={onCheckboxClicked}
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
                checkList={Object.keys(DataConfig.ageGrp).map(
                  (key: any, i) => ({
                    text: key,
                    value: DataConfig.ageGrp[key]
                  })
                )}
                selected={product.ageTags}
                onChangeHandler={onCheckboxClicked}
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
                checkList={Object.keys(DataConfig.occasion).map(
                  (key: any, i) => ({
                    text: key,
                    value: DataConfig.occasion[key]
                  })
                )}
                selected={product.occasionTags}
                onChangeHandler={onCheckboxClicked}
              />
            }
          </div>
        </div>
      </div>
      <Button text='Save' onClick={saveProduct} loading={loading} />
    </div>
  );
};

export default ProductEditSection;
