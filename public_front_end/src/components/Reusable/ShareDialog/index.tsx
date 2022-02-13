import React, { FC } from 'react';
import { logError } from '../../../common/utils';
import Button from '../Button';
import DialogContainer from '../DialogContainer';
import SectionTitle from '../SectionTitle';
import Text from '../Text';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';

type Props = {
  open: boolean;
  closeModal: () => void;
  url: string;
  title: string;
};

const ShareDialog: FC<Props> = ({ open, closeModal, url, title }) => {
  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (e: any) {
      logError(e.message, e.stack, 'copyLink', 'ShareDialog', { url });
    }
  };

  const shareLink = async (url: string) => {
    try {
      await navigator.share({ title: 'test', url: url });
    } catch (e: any) {
      logError(e.message, e.stack, 'copyLink', 'ShareDialog', { url });
    }
  };

  return (
    <DialogContainer open={open} closeModal={closeModal}>
      <SectionTitle content='Share' />

      <div className='grid grid-cols-3 lg:grid-cols-6 gap-8'>
        <div className='col-span-3 lg:col-span-3 flex space-x-4 items-center md:hidden'>
          <Button text='Copy Product Link' onClick={() => shareLink(url)} />
        </div>
        <div className='col-span-3 lg:col-span-6 md:flex space-x-4 items-center hidden'>
          <Text content={url} tag='code' />
          <Button text='Copy Link' onClick={() => copyLink(url)} />
        </div>
        <WhatsappShareButton title={title} separator=' | ' url={url}>
          <WhatsappIcon size={60} round />
        </WhatsappShareButton>
        <FacebookShareButton quote={title} url={url}>
          <FacebookIcon size={60} round />
        </FacebookShareButton>
        <TwitterShareButton title={title} url={url}>
          <TwitterIcon size={60} round />
        </TwitterShareButton>
        <LinkedinShareButton
          title={title}
          source={process.env.NEXT_PUBLIC_BASE_URL}
          url={url}
        >
          <LinkedinIcon size={60} round />
        </LinkedinShareButton>
        <RedditShareButton title={title} url={url}>
          <RedditIcon size={60} round />
        </RedditShareButton>
        <EmailShareButton subject={title} url={url}>
          <EmailIcon size={60} round />
        </EmailShareButton>
      </div>
    </DialogContainer>
  );
};

export default ShareDialog;
