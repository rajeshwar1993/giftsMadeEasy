import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chip from '../../components/Reusable/Chip';
import { db } from '../../firebase';
import { FS_INTEREST_TAGS_DB } from '../../models/constants';
import InterestTag from '../../models/Interest';
import { it_add_tagArray } from '../../redux/interestTags';
import { RootState, useAppDispatch } from '../../redux/store';

type Props = {
  values: Array<string>;
  onCancel: (values: Array<string>) => void;
};

const ShowSelectedInterests: FC<Props> = ({ values, onCancel }) => {
  const [intArray, updateIntArray] = useState<Array<InterestTag>>([]);

  const dispatch = useAppDispatch();
  const interestArray = useSelector(
    (state: RootState) => state.interests.tagArray
  );

  const fetchAndUpdateInterests = async (userInterests: Array<string>) => {
    // ! POTENTIAL_ISSUE - revisit this logic, might get complicated if interests become too large

    let finalList: Array<InterestTag> = [];
    let fetchedList: Array<InterestTag> = [];

    // check which intestest already present in store
    let interestsToFetch = userInterests.filter(it => {
      const seekIntrest = interestArray.find(i => i.uid === it);
      if (seekIntrest) {
        finalList.push(seekIntrest);
        return false;
      }
      return true;
    });

    // ! POTENTIAL_ISSUE - aggregating too many promises might me an issue
    const readPromises = interestsToFetch.map(it => {
      console.log('Fetching interest: ', it);
      return getDoc(doc(db, FS_INTEREST_TAGS_DB, it));
    });

    const allSnaps = await Promise.all(readPromises);
    allSnaps.forEach(interestSnap => {
      if (interestSnap.exists()) {
        const intestest = InterestTag.convertJsonToObj(
          interestSnap.data(),
          interestSnap.id
        );
        fetchedList.push(intestest);
      }
    });
    dispatch(it_add_tagArray(fetchedList));
    updateIntArray([...finalList, ...fetchedList]);
  };

  useEffect(() => {
    fetchAndUpdateInterests(values);
  }, [values]);

  return (
    <div className='flex flex-wrap'>
      {intArray.map(int => (
        <Chip
          key={int.uid}
          editMode={true}
          onCancel={id =>
            onCancel(intArray.filter(item => item.uid !== id).map(i => i.uid))
          }
          id={int.uid}
          text={{
            content:
              int.parentId === '__PARENT__' ? `All ${int.value}` : int.value,
            styleClasses: 'text-sm'
          }}
        />
      ))}
    </div>
  );
};

export default ShowSelectedInterests;
