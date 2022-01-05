import React, { FC, Fragment } from 'react';
import { TextType as Props } from './type';
import sanitizeHtml from 'sanitize-html';

const Text: FC<Props> = ({
  content = 'Test Content',
  styleClasses = '',
  tag: Tag = 'span'
}) => {
  let sanitizedContent = sanitizeHtml(content, {
    allowedClasses: {
      p: ['*'],
      span: ['*']
    }
  });
  return (
    <Tag
      className={` ${styleClasses}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default Text;
