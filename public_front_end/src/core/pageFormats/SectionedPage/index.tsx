import React, { FC } from 'react';
import AllComponents from '../../../core_custom_mixer/components';

import { BannerImageType } from '../../components/Reusable/BannerImage/type';
import { ColumnListType } from '../../components/Sections/ColumnList/types';
import { DiscolusreListComponentType } from '../../components/Sections/DisclosureList/type';
import { ParagraphType } from '../../components/Sections/Paragraph/type';
import { ParagraphImageSplitType } from '../../components/Sections/ParagraphImageSplit/types';
import { TableSectionType } from '../../components/Sections/TableSection/type';
import { TestimonialType } from '../../components/Sections/Testimonial/type';
import { VideoSectionType } from '../../components/Sections/Video/type';
import { PageSection } from '../types';

type Props = {
  sections: Array<PageSection>;
};

const SectionedPages: FC<Props> = ({ sections }) => {
  let {
    Paragraph,
    ParagraphImageSplit,
    Testimonial,
    ColumnList,
    DisclosureList,
    TableSection,
    VideoSection
  } = AllComponents;

  const renderSection = (section: any) => {
    // TODO: Need to find out the correct typescript way to define this
    let data;
    switch (section.type) {
      case 'Paragraph':
        data = section.data as ParagraphType;
        return <Paragraph {...data} />;

      case 'ParagraphImageSplit':
        data = section.data as ParagraphImageSplitType;
        return <ParagraphImageSplit {...data} />;

      case 'Testimonial':
        data = section.data as TestimonialType;
        return <Testimonial {...data} />;

      case 'ColumnList':
        data = section.data as ColumnListType;
        return <ColumnList {...data} />;

      case 'DisclosureList':
        data = section.data as DiscolusreListComponentType;
        return <DisclosureList {...data} />;

      case 'TableSection':
        data = section.data as TableSectionType;
        return <TableSection {...data} />;

      case 'Video':
        data = section.data as VideoSectionType;
        return <VideoSection {...data} />;

      default:
        return <></>;
    }
  };

  return (
    <div>
      {sections.map((section, i: number) => {
        return (
          <div className='mb-16' key={i}>
            {renderSection(section)}
          </div>
        );
      })}
    </div>
  );
};

export default SectionedPages;
