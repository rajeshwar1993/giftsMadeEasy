import React, { FC } from 'react';
import Chip from '../../components/Reusable/Chip';
import { interestFilterValues } from '../../common/staticFilterValues';

type Props = {
  values: Array<string>;
  editMode?: boolean;
  onCancel: (values: Array<string>) => void;
};

const ShowSelectedInterests: FC<Props> = ({
  values,
  onCancel,
  editMode = true
}) => {
  return (
    <div className='flex flex-wrap'>
      {values.map(int => (
        <Chip
          key={int}
          editMode={editMode}
          onCancel={id => onCancel(values.filter(item => item !== id))}
          id={int}
          text={{
            content: interestFilterValues.get(int)?.name || '',
            styleClasses: 'text-xs'
          }}
        />
      ))}
    </div>
  );
};

export default ShowSelectedInterests;
