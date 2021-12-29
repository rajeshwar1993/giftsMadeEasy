import CorePageFormats from '../../core/pageFormats';

import CustomPageFormats from '../../custom_client_code/pageFormat_overrides';

const Pages = {
  ...CorePageFormats,
  ...CustomPageFormats
};

export default Pages;
