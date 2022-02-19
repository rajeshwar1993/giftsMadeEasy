import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import AppConfig from '../../common/appConfig';
import { FS_DEDICATED_SEARCH_DB } from '../../common/constants';
import { FilterDBKeys } from '../../common/dbKeys';
import {
  ageGrpFilterValues,
  occasionFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';
import { Button, SectionTitle, Text } from '../../components';
import CheckBoxGroup from '../../components/Reusable/CheckBoxGroup';
import { createCheckboxOptions } from '../../components/Reusable/CheckBoxGroup/utils';
import ListBoxComp from '../../components/Reusable/ListBox';
import { ListBoxOption } from '../../components/Reusable/ListBox/types';
import {
  createListboxOptions,
  getOptionFromValue
} from '../../components/Reusable/ListBox/utils';
import SelectInterestsPopup from '../../components/Reusable/SelectInterestsPopup';
import { db } from '../../firebase';
import DedicatedSearch, {
  convertDedicatedSearchToJson,
  convertJsonToDedicatedSearchObj
} from '../../models/DedicatedSearch';
import { Gender } from '../../models/enums';
import ShowSelectedInterests from '../search/showSelectedInterests';

const DedicatedSearchAdminContainer = () => {
  const [DSConfigs, setDSConfigs] = useState<Array<DedicatedSearch>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDSConfig, setSelectedDSConfig] =
    useState<DedicatedSearch | null>(null);

  const fetchDedicatedSearchConfigs = async () => {
    try {
      setLoading(true);

      const colRef = collection(db, FS_DEDICATED_SEARCH_DB);
      const res = await getDocs(colRef);
      if (!res.empty) {
        let dsc: Array<DedicatedSearch> = [];
        res.forEach(d => {
          const data = d.data();
          dsc.push(convertJsonToDedicatedSearchObj(data, d.id));
        });

        setDSConfigs(dsc);
        setSelectedDSConfig(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const saveDedicatedSearchConfig = async (config: DedicatedSearch) => {
    try {
      if (!config.relationship || !config.occasion) {
        console.log('Please enter these values');
        return;
      }
      setLoading(true);

      const colRef = collection(db, FS_DEDICATED_SEARCH_DB);

      if (config.uid) {
        // update existing
        await updateDoc(doc(colRef, config.uid), {
          ...convertDedicatedSearchToJson(config)
        });
        setDSConfigs(state =>
          state.map(ds => {
            if (ds.uid !== config.uid) {
              return ds;
            }
            return config;
          })
        );
      } else {
        //create new
        config.searchCriteria = `${relationshipFilterValues.get(
          config.relationship
        )}-${occasionFilterValues.get(
          config.occasion
        )}-${new Date().getTime()}`;
        let res = await addDoc(colRef, {
          ...convertDedicatedSearchToJson(config)
        });
        config.uid = res.id;
        setDSConfigs(state => [...state, config]);
        setSelectedDSConfig(config);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className='flex space-x-4'>
        <Button
          text='Fetch'
          onClick={() => fetchDedicatedSearchConfigs()}
          loading={loading}
        />
        <Button text='Create New' onClick={() => setSelectedDSConfig(null)} />
      </div>
      <div className='grid grid-cols-6 gap-x-4 mt-6'>
        <div className='col-span-2'>
          <table className={`w-full`}>
            <thead>
              <tr>
                <th
                  className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
                >
                  No.
                </th>
                <th
                  className={`px-4 py-3 text-left bg-skin-inverted text-skin-inverted`}
                >
                  Search Key
                </th>
              </tr>
            </thead>

            <tbody>
              {DSConfigs.map((tr, i) => (
                <tr key={i}>
                  <td className={`px-4 py-3 border-b-2 border-opacity-20 `}>
                    {i + 1}
                  </td>

                  <td
                    className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] cursor-pointer`}
                    onClick={() => {
                      setSelectedDSConfig(DSConfigs[i]);
                    }}
                  >
                    {tr.searchCriteria}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-span-4'>
          <CreateDSConfig
            ds={selectedDSConfig}
            saveDedicatedSearchConfig={saveDedicatedSearchConfig}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
};

type Props = {
  ds: DedicatedSearch | null;
  saveDedicatedSearchConfig: (ds: DedicatedSearch) => void;
  loading: boolean;
};

const CreateDSConfig: FC<Props> = ({
  ds,
  saveDedicatedSearchConfig,
  loading
}) => {
  const [localDS, setLocalDS] = useState<DedicatedSearch>(
    convertJsonToDedicatedSearchObj({}, '')
  );
  const [interestPopoverOpen, setInterestPopoverOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (ds) {
      setLocalDS(ds);
    } else {
      setLocalDS({
        ...convertJsonToDedicatedSearchObj({}, '')
      });
    }
  }, [ds]);

  const updateValues = (data: ListBoxOption, key: string) => {
    setLocalDS(state =>
      convertJsonToDedicatedSearchObj(
        {
          ...convertDedicatedSearchToJson(state),
          [key]: data.value
        },
        state.uid
      )
    );
  };
  const onCheckboxClicked = (key: string, values: Array<string>) => {
    setLocalDS(state =>
      convertJsonToDedicatedSearchObj(
        {
          ...convertDedicatedSearchToJson(state),
          [key]: values
        },
        state.uid
      )
    );
  };

  const updateInterests = (data: Array<string>) => {
    setLocalDS(state =>
      convertJsonToDedicatedSearchObj(
        {
          ...convertDedicatedSearchToJson(state),
          [FilterDBKeys.interests]: data
        },
        state.uid
      )
    );
  };

  return (
    <div>
      <Button
        text='Save'
        onClick={() => saveDedicatedSearchConfig(localDS)}
        loading={loading}
      />
      <SectionTitle content={`UID: ${localDS.uid || 'NEW'}`} />
      <SectionTitle content={`SKey: ${localDS.searchCriteria || 'NEW'}`} />
      <div className='mt-6 grid grid-cols-3 gap-x-8'>
        <div className='pb-4'>
          <ListBoxComp
            filterKey={FilterDBKeys.relationship}
            selectedOption={getOptionFromValue(
              relationshipFilterValues,
              localDS.relationship,
              AppConfig.COMMON.relationshipLabel
            )}
            onSelected={updateValues}
            options={createListboxOptions(
              relationshipFilterValues,
              AppConfig.COMMON.relationshipLabel
            )}
            buttonStyleClasses='text-3xl  font-light text-center '
          />
        </div>
        <div className='pb-4'>
          <ListBoxComp
            filterKey={FilterDBKeys.occasion}
            selectedOption={getOptionFromValue(
              occasionFilterValues,
              localDS.occasion,
              AppConfig.COMMON.occasionLabel
            )}
            onSelected={updateValues}
            options={createListboxOptions(
              occasionFilterValues,
              AppConfig.COMMON.occasionLabel
            )}
            buttonStyleClasses='text-3xl font-light text-center '
          />
        </div>
        <div className='flex space-x-4'>
          <CheckBoxGroup
            filterKey={FilterDBKeys.gender}
            checkList={[
              { text: 'Female', value: Gender.Female.toString() },
              { text: 'Male', value: Gender.Male.toString() }
            ]}
            selected={
              localDS.gender ? localDS.gender.map(g => g.toString()) : []
            }
            onChangeHandler={onCheckboxClicked}
            showSelectAll
          />
        </div>
        <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg col-span-2'>
          <Text content='Age Tags' />
          <div className='flex space-x-4'>
            {
              <CheckBoxGroup
                filterKey={FilterDBKeys.ageGrp}
                checkList={createCheckboxOptions(ageGrpFilterValues)}
                selected={localDS.ageGrp}
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
              setInterestPopoverOpen(true);
            }}
            defautStyle='cust-btn-btn'
            icon={{
              iconName: 'Add'
            }}
          />
          <div className='flex flex-row flex-wrap space-x-4 mt-2'>
            <ShowSelectedInterests
              values={localDS.interests}
              editMode={true}
              onCancel={newArray => {
                onCheckboxClicked(FilterDBKeys.interests, newArray);
              }}
            />
          </div>
        </div>
      </div>
      <SelectInterestsPopup
        open={interestPopoverOpen}
        selectedInts={localDS.interests ? localDS.interests : []}
        onSave={updateInterests}
        onClose={() => setInterestPopoverOpen(false)}
      />
    </div>
  );
};

export default DedicatedSearchAdminContainer;
