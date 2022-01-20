import React, { FC } from 'react';
import {
  DisclosureListType,
  DiscolusreListComponentType as Props
} from './type';

import { Disclosure, Transition } from '@headlessui/react';
import { Icon, SectionTitle, Text } from '../..';

const DisclosureList: FC<Props> = ({
  sectionTitle,
  list,
  sectionWrapperClasses,
  listWrapperClasses,
  id
}) => {
  return (
    <section
      id={id}
      className={`max-w-4xl mx-4 md:mx-auto ${sectionWrapperClasses}`}
    >
      {sectionTitle && <SectionTitle {...sectionTitle} />}
      {list.length > 0 && (
        <div
          className={`flex flex-col bg-skin-inverted bg-opacity-10 p-4 rounded-lg ${listWrapperClasses}`}
        >
          {list.map((l: DisclosureListType, i: number) => (
            <Disclosure key={i}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex justify-between items-center text-left bg-skin-inverted bg-opacity-90 hover:bg-opacity-100 text-skin-inverted rounded-xl py-2 px-4 my-2 ${l.titleWrapperClasses}`}
                  >
                    <Text
                      {...l.title}
                      styleClasses={`md:text-xl text-base ${l.title.styleClasses}`}
                      tag={l.title.tag || 'h4'}
                    />
                    <Icon
                      iconName={'ExpandMore'}
                      size='30'
                      styleClasses={
                        open ? 'transform rotate-180 transition-all' : ''
                      }
                    />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-300 ease-out'
                    enterFrom='transform opacity-0 -translate-y-6'
                    enterTo='transform opacity-300 translate-y-0'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform opacity-300 translate-y-0'
                    leaveTo='transform opacity-0 -translate-y-6'
                  >
                    <Disclosure.Panel className={`py-2 px-4`}>
                      <Text
                        {...l.body}
                        styleClasses={`cust-paragraph-text ${l.title.styleClasses}`}
                      />
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      )}
    </section>
  );
};

export default DisclosureList;
