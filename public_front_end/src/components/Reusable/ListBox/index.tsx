import React, { FC, Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { ListBoxType as Props } from './types';
import { DEFAULT_LIST_VALUE } from './utils';
import { Icon, Text } from '../../../components';

const ListBoxComp: FC<Props> = ({
  filterKey,
  title,
  options = [{ name: 'DEFAULT', value: DEFAULT_LIST_VALUE }],
  selectedOption = { name: 'DEFAULT', value: DEFAULT_LIST_VALUE },
  onSelected,
  buttonStyleClasses = '',
  optionsStyleClasses = ''
}) => {
  return (
    <Listbox value={selectedOption} onChange={so => onSelected(so, filterKey)}>
      {title && (
        <div className='mb-2'>
          <Listbox.Label>
            <Text
              tag='label'
              htmlFor={filterKey}
              {...title}
              styleClasses={`font-semibold ${title.styleClasses}`}
            />
          </Listbox.Label>
        </div>
      )}
      <div className='relative mt-1 w-full'>
        <Listbox.Button
          name={filterKey}
          id={filterKey}
          className={`relative w-full py-1 md:py-2 pl-3 pr-10 text-left bg-skin-fill text-skin-primary rounded-lg border-2 border-skin-inverted cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ${buttonStyleClasses}`}
        >
          <span className='block truncate'>{selectedOption.name}</span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <Icon iconName='ExpandMore' size='20' />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className={`absolute z-30 w-full py-1 mt-1 overflow-auto text-base bg-skin-fill text-skin-primary rounded-md shadow-xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${optionsStyleClasses}`}
          >
            {options.map(option => {
              const isDefault = option.value === DEFAULT_LIST_VALUE;

              return (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-skin-inverted bg-skin-inverted'
                        : 'text-skin-primary'
                    }
                    cursor-pointer select-none relative py-2 ${
                      isDefault ? 'pl-4' : 'pl-10'
                    } pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-bold' : 'font-normal'
                        } block truncate`}
                      >
                        <Text
                          content={option.name}
                          styleClasses={`font-semibold ${
                            isDefault ? 'text-lg' : ''
                          }`}
                        />
                      </span>
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBoxComp;
