import React, { FC, Fragment } from 'react';
import { TextType as Props } from './type';
import sanitizeHtml from 'sanitize-html';

const Text: FC<Props> = ({
  content = 'Test Content',
  styleClasses = '',
  wrapperStyleClasses = '',
  tag: Tag = 'p',
  wrapperTag: WT = Fragment
}) => {
  let sanitizedContent = sanitizeHtml(content, {
    allowedClasses: {
      p: ['*'],
      span: ['*']
    }
  });
  return (
    <WT className={`${wrapperStyleClasses}`}>
      <Tag
        className={` ${styleClasses}`}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </WT>
  );
};

export default Text;
