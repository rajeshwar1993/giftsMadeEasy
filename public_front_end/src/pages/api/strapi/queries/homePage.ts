export default `
query {
  homePage {
    data {
      attributes {
        Header {
          page_title
          meta_desc
        }
        Sections {
          __typename
          ... on ComponentPageSectionParagraphSection {
            id
            section_id
            sectionType
            sectionWrapperClasses
            SectionTitle {
              id
              content
              styleClasses
              wrapperStyleClasses
              tag
            }
            BannerImage {
              id
              wrapperClasses
              src {
                data {
                  id
                  attributes {
                    name
                    url
                    width
                    height
                  }
                }
              }
              alt
              layout
              styleClasses
            }
            paraWrapperClasses
            imageWrapperClasses
            Image {
              id
              src {
                data {
                  id
                  attributes {
                    name
                    url
                    width
                    height
                  }
                }
              }
              alt
              layout
              styleClasses
            }
            ParaText {
              id
              content
              styleClasses
              wrapperStyleClasses
              tag
            }
            Button{
              text,
              link,
              iconName,
              iconSize,
              iconColor,
              iconTitle,
              iconStyleClasses,
              wrapperClasses,
              styleClasses,
              showOnlyIcon,
            }
          }
        }
      }
    }
  }
}
`;
