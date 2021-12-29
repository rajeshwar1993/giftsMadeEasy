import React, { FC } from 'react';
import { TextType as Props } from './type';
import sanitizeHtml from 'sanitize-html';

const Text: FC<Props> = ({
  content = 'Test Content',
  styleClasses = '',
  wrapperStyleClasses = '',
  tag: Tag = 'p'
}) => {
  let sanitizedContent = sanitizeHtml(content, {
    allowedClasses: {
      p: ['*'],
      span: ['*']
    }
  });
  return (
    <div className={`${wrapperStyleClasses}`}>
      <Tag
        className={` ${styleClasses}`}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};

export default Text;
