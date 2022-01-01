import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { SectionTitle, Text } = AllComponents;

const BookmarksSection = () => {
  return (
    <div>
      <SectionTitle content='Bookmarks' />
      <Text content='This is a private list, helpful for keeping items you want to give as gifts.' />
    </div>
  );
};

export default BookmarksSection;
