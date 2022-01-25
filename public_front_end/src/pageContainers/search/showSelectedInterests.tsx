import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chip from '../../components/Reusable/Chip';
import { db } from '../../firebase';
import { FS_INTEREST_TAGS_DB } from '../../common/constants';
import InterestTagType, { convertITJsonToObj } from '../../models/Interest';
import { it_add_tagArray } from '../../redux/interestTags';
import { RootState, useAppDispatch } from '../../redux/store';
import { interestFilterValues } from '../../common/staticFilterValues';

type Props = {
  values: Array<string>;
  onCancel: (values: Array<string>) => void;
};

const ShowSelectedInterests: FC<Props> = ({ values, onCancel }) => {
  return (
    <div className='flex flex-wrap'>
      {values.map(int => (
        <Chip
          key={int}
          editMode={true}
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
