import React, { FC } from 'react';
import { Button, ImageComponent, SectionTitle, Text } from '../..';
import { ColumnListType as Props } from './types';

const ColumnList: FC<Props> = ({
  sectionWrapperClasses = '',
  colWrapperStyleClasses = '',
  columns,
  sectionTitle,
  id
}) => {
  return (
    <section id={id} className={`mx-4 xl:mx-0 ${sectionWrapperClasses}`}>
      {sectionTitle && <SectionTitle {...sectionTitle} />}
      {/* flex flex-col xl:flex-row flex-wrap justify-around items-center */}
      <div
        className={`flex flex-col lg:flex-row flex-wrap justify-evenly items-center lg:items-start ${colWrapperStyleClasses}`}
      >
        {columns.map((c, i) => (
          <div
            key={i}
            className={`lg:mb-6 p-6 text-center lg:w-1/2 xl:w-1/3  flex flex-col justify-between items-center ${c.bodyWrapperStyleClasses}`}
          >
            {c.image && (
              <div
                className={`w-36 h-36 mb-4 rounded-full overflow-hidden border-2 ${c.imageWrapperClasses}`}
              >
                <ImageComponent {...c.image} />
              </div>
            )}
            <div>
              {c.colTitle && (
                <Text
                  {...c.colTitle}
                  tag={c.colTitle.tag || 'h3'}
                  styleClasses={`font-semibold text-xl ${c.colTitle.styleClasses}`}
                />
              )}
              <Text
                {...c.body}
                styleClasses={`cust-paragraph-text ${c.body.styleClasses}`}
              />
            </div>
            {c.button && (
              <Button
                {...c.button}
                wrapperClasses={`mt-4 ${c.button.wrapperClasses}`}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ColumnList;
