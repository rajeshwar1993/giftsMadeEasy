import React, { FC } from 'react';
import DedicatedSearch from '../../models/DedicatedSearch';

type Props = {
  ds?: DedicatedSearch;
  test: string;
};

const DedicatedSearchContainer: FC<Props> = ({ test }) => {
  return <section>Dedicated Search {test}</section>;
};

export default DedicatedSearchContainer;
