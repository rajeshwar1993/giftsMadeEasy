import React, { FC } from 'react';
import { SectionTitle, Text } from '../..';
import { VideoSectionType as Props } from './type';

const VideoSection: FC<Props> = ({
  sectionTitle,
  desc,
  sectionWrapperClasses,
  videoID,
  id
}) => {
  return (
    <section id={id} className={`mx-4 md:mx-0 ${sectionWrapperClasses}`}>
      {sectionTitle && <SectionTitle {...sectionTitle} />}

      {desc && <Text {...desc} />}

      <div>
        <iframe
          title='Youtube Player'
          id='ytplayer'
          src={`https://www.youtube.com/embed/${videoID}?showinfo=0&rel=0&iv_load_policy=3`}
          className={`w-full aspect-video max-w-5xl mx-auto`}
          frameBorder='0'
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
