import { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import imgSrc from '../assets/laptop.jpg';

interface Props {
  data: Object;
}

const ProducSearchItem: FC<Props> = ({ data }) => {
  return (
    <div
      className={clsx(
        'product-search-item-wrapper',
        'border',
        'rounded',
        'border-gray-300',
        'shadow-sm',
        'p-2',
        'shadow-md',
        'w-4/12',
        'h-96'
      )}
    >
      <div className={clsx('image-wrapper')}>
        <Image src={imgSrc} alt={'HP (15) Omen Laptop'} />
      </div>
      <span className={clsx('product-title', 'text-lg', 'font-semibold')}>
        HP (15) Omen Laptop
      </span>
    </div>
  );
};

export default ProducSearchItem;
