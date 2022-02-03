import React, { FC } from 'react';
import { ProductStatus } from '../../../models/enums';
import Product from '../../../models/Product';
import Text from '../Text';

type Props = {
  products: Array<Product>;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

const ProductsTable: FC<Props> = ({
  products,
  setSelectedProduct,
  selectedProduct
}) => {
  return (
    <table className={`w-full table-auto`}>
      <thead>
        <tr>
          {/* <th
            className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
          >
            <Text content='SNo' />
          </th> */}
          <th
            className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
          >
            <Text content='Title' />
          </th>
          {!selectedProduct && (
            <>
              <th
                className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
              >
                <Text content='UID' />
              </th>

              <th
                className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
              >
                <Text content='ProductUrl' />
              </th>
              <th
                className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
              >
                <Text content='AffiliateUrl' />
              </th>
              <th
                className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
              >
                <Text content='AmazonID' />
              </th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {products.map((tr, i) => {
          let bgColor = '';

          switch (tr.status) {
            case ProductStatus.Active:
              bgColor = 'bg-green-200';
              break;
            case ProductStatus.Hidden:
              bgColor = 'bg-gray-200';
              break;
            case ProductStatus.FetchPending:
              bgColor = 'bg-sky-200';
              break;
            case ProductStatus.FetchSuccess:
              bgColor = 'bg-orange-200';
              break;
            case ProductStatus.Error:
              bgColor = 'bg-red-200';
              break;

            default:
              bgColor = '';
          }

          return (
            <tr
              key={i}
              className={`${bgColor} ${
                selectedProduct?.uid === tr.uid && '!bg-violet-300'
              }`}
            >
              {/* <td
                className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] `}
              >
                <Text content={(i + 1).toString()} />
              </td> */}
              <td
                onClick={() => setSelectedProduct(tr)}
                className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] cursor-pointer hover:font-semibold`}
              >
                <Text content={tr.title} />
              </td>{' '}
              {!selectedProduct && (
                <>
                  <td
                    className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] `}
                  >
                    <Text content={tr.uid} />
                  </td>

                  <td
                    className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] `}
                  >
                    <Text content={tr.productUrl} />
                  </td>
                  <td
                    className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] `}
                  >
                    <Text content={tr.affiliateUrl} />
                  </td>
                  <td
                    className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] `}
                  >
                    <Text content={tr.apid} />
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductsTable;
