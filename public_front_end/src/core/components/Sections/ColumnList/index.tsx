import React, { FC } from 'react';
import { ColumnListType as Props } from './types';
import AllComponents from '../../../../core_custom_mixer/components/';

const ColumnList: FC<Props> = ({
  sectionWrapperClasses = '',
  colWrapperStyleClasses = '',
  columns,
  sectionTitle,
  id
}) => {
  let { Button, ImageComponent, SectionTitle, Text } = AllComponents;
  return (
    <section id={id} className={`mx-4 xl:mx-0 ${sectionWrapperClasses}`}>
      {sectionTitle && (
        <SectionTitle
          {...sectionTitle}
          wrapperStyleClasses={`mb-0 lg:mb-4 ${sectionTitle.wrapperStyleClasses}`}
        />
      )}
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
                  wrapperStyleClasses={`mb-2 border-b-2 border-skin-accent border-opacity-60 ${c.colTitle.wrapperStyleClasses}`}
                  styleClasses={`font-semibold text-xl ${c.colTitle.styleClasses}`}
                />
              )}
              <Text
                {...c.body}
                wrapperStyleClasses={`max-w-xl inline-block px-8 ${c.body.wrapperStyleClasses}`}
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
