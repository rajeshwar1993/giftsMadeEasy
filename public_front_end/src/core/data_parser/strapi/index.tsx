import { BannerImageType } from '../../components/Reusable/BannerImage/type';
import { ButtonType } from '../../components/Reusable/Button/type';
import { SectionTitleType } from '../../components/Reusable/SectionTitle/type';
import { TextType } from '../../components/Reusable/Text/type';
import { ParagraphType } from '../../components/Sections/Paragraph/type';
import { HeaderType, PageProps, PageSection } from '../../pageFormats/types';

const parseSectionTitle = (data: any) => {
  let sectionTitle: SectionTitleType = {
    content: data.content,
    styleClasses: data.styleClasses,
    wrapperStyleClasses: data.wrapperStyleClasses,
    tag: data.tag
  };

  return sectionTitle;
};

const parseBanner = (bannerData: any) => {
  let banner: BannerImageType = {
    image: {
      src: 'http://localhost:1337' + bannerData.src.data.attributes.url,
      alt: bannerData.alt,
      layout: bannerData.layout,
      styleClasses: bannerData.styleClasses
    },
    wrapperClasses: bannerData.wrapperClasses
  };

  return banner;
};

const parseButton = (buttonData: any) => {
  let button: ButtonType = {
    text: buttonData.text || undefined,
    link: buttonData.link || undefined,
    icon: {
      iconName: buttonData.iconName || '',
      color: buttonData.iconColor,
      size: buttonData.iconSize,
      title: buttonData.iconTitle,
      styleClasses: buttonData.iconStyleClasses
    },
    styleClasses: buttonData.styleClasses,
    wrapperClasses: buttonData.wrapperClasses
  };
  return button;
};

const parseParagraphSection = (section: any) => {
  let data: ParagraphType = {
    id: section.section_id,
    sectionWrapperClasses: section.sectionWrapperClasses,
    sectionTitle: section.SectionTitle
      ? parseSectionTitle(section.SectionTitle)
      : undefined,
    paraWrapperClasses: section.paraWrapperClasses,
    banner: section.BannerImage && parseBanner(section.BannerImage),
    imageWrapperClasses: section.imageWrapperClasses,
    image: section.Image && {
      src: 'http://localhost:1337' + section.Image.src.data.attributes.url,
      alt: section.Image.alt,
      layout: section.Image.layout,
      styleClasses: section.Image.styleClasses
    },
    paragraphs: section.ParaText.map((p: TextType) => ({
      content: p.content,
      styleClasses: p.styleClasses,
      wrapperStyleClasses: p.wrapperStyleClasses,
      tag: p.tag
    })),
    button: section.Button && parseButton(section.Button)
  };

  return data;
};

const parseHeader = (headerData: any) => {
  let data: HeaderType = {
    title: headerData.page_title,
    metaDesc: headerData.meta_desc
  };

  return data;
};

const parseSections = (sections: Array<any>) => {
  let pageSection: Array<PageSection> = [];

  sections.forEach(section => {
    switch (section.sectionType) {
      case 'Paragraph':
        pageSection.push({
          type: section.sectionType,
          data: parseParagraphSection(section)
        });
        break;

      default:
        break;
    }
  });

  return pageSection;
};

export default function (data: any) {
  let headerData = data.attributes.Header;
  let sectionsData = data.attributes.Sections;
  let pageData: PageProps = {
    headerData: parseHeader(headerData),
    sections: parseSections(sectionsData)
  };

  return pageData;
}
