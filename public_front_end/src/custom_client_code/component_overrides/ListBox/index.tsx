import React, { FC, Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import AllComponents from '../../../core_custom_mixer/components';
import { ListBoxType as Props } from './types';

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
];

const { Icon, Text } = AllComponents;

const ListBoxComp: FC<Props> = ({
  title,
  options,
  selectedOption,
  onSelected,
  buttonStyleClasses = '',
  optionsStyleClasses = ''
}) => {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {title && (
        <div className='mb-2'>
          <Listbox.Label>
            <Text
              {...title}
              styleClasses={`font-semibold ${title.styleClasses}`}
            />
          </Listbox.Label>
        </div>
      )}
      <div className='relative mt-1 w-full'>
        <Listbox.Button
          className={`relative w-full py-2 pl-3 pr-10 text-left bg-skin-fill text-skin-primary rounded-lg border-2 border-skin-accent cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ${buttonStyleClasses}`}
        >
          <span className='block truncate'>{selected.name}</span>
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
            className={`absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-skin-fill text-skin-primary rounded-md shadow-xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${optionsStyleClasses}`}
          >
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `${
                    active
                      ? 'text-skin-inverted bg-skin-accent'
                      : 'text-skin-primary'
                  }
                    cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
                value={person}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-bold' : 'font-normal'
                      } block truncate`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-amber-600' : 'text-amber-600'
                        }
                          absolute inset-y-0 left-0 flex items-center pl-3`}
                      ></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBoxComp;
