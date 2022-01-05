import React, { FC } from 'react';
import { Icon, SectionTitle, Text } from '../..';

import { TableSectionType as Props } from './type';

const TableSection: FC<Props> = ({
  sectionTitle,
  desc,
  sectionWrapperClasses = '',
  tableWrapperStyleClasses = '',
  tableHeaderClasses = '',
  tableDataClasses = '',
  tableHeader,
  tableData,
  id
}) => {
  return (
    <section id={id} className={`mx-4 md:mx-0 ${sectionWrapperClasses}`}>
      {sectionTitle && <SectionTitle {...sectionTitle} />}

      {desc && <Text {...desc} />}
      <div
        className={`table table-fixed w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden ${tableWrapperStyleClasses}`}
      >
        <table className={`w-full`}>
          {tableHeader && (
            <thead>
              <tr>
                {tableHeader.tds.map((th, i) => (
                  <th
                    className={`px-4 py-3 text-left bg-skin-accent text-skin-inverted ${tableHeaderClasses}`}
                    key={i}
                  >
                    <Text {...th} />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {tableData.rows.map((tr, i) => (
              <tr key={i}>
                {tr.tds.map((td, i) => (
                  <td
                    className={`px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px] ${tableDataClasses}`}
                    key={i}
                  >
                    <div className='flex items-center'>
                      {td.icon && (
                        <Icon
                          {...td.icon}
                          size='24'
                          styleClasses={`text-skin-accent ${td.icon.styleClasses}`}
                        />
                      )}
                      {td.icon && td.text && !td.showOnlyIcon && (
                        <div className='w-4' />
                      )}
                      {td.text && !td.showOnlyIcon && <Text {...td.text} />}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableSection;
