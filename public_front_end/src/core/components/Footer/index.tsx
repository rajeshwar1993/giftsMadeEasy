import Link from 'next/link';
import React, { FC } from 'react';
import { FooterConfig } from './type';
import AllComponents from '../../../core_custom_mixer/components';

type Props = {
  config: FooterConfig;
};

const Footer: FC<Props> = ({ config }) => {
  let { Icon, Button, Text } = AllComponents;
  return (
    <div id={'footer'} className='bg-skin-fill text-skin-primary'>
      <footer className='pt-8 border-t-2 mx-auto p-4 sm:px-6 md:px-4 lg:px-12 lg:text-xl text-base'>
        <div className='flex md:flex-row flex-col justify-between'>
          {/* Main */}
          <div className='flex flex-col md:w-2/6'>
            <div className='my-2 font-bold'>{config.main.title}</div>
            <div className='my-2 ml-4 text-base'>
              <Text {...config.main.desc} />
            </div>
            <div className='flex my-2 ml-4'>
              {config.main.socialIconLinks.map((btn, i) => (
                <Button
                  key={i}
                  link={btn.link}
                  onClick={btn.onClick}
                  text={btn.text}
                  icon={btn.icon}
                  showOnlyIcon={btn.showOnlyIcon}
                  wrapperClasses={`border-0  mr-2 ${btn.wrapperClasses}`}
                  styleClasses={`hover:text-skin-accent font-normal ${btn.styleClasses}`}
                />
              ))}
            </div>
          </div>
          {/* Links */}
          <div className='flex flex-col items-start md:w-1/6'>
            <div className='my-2 font-bold'>Quick Links</div>
            {config.links.map((btn, i) => (
              <Button
                key={i}
                link={btn.link}
                onClick={btn.onClick}
                text={btn.text}
                icon={btn.icon}
                showOnlyIcon={btn.showOnlyIcon}
                wrapperClasses={`border-0  mx-2 ${btn.wrapperClasses}`}
                styleClasses={`hover:text-skin-accent font-normal ${btn.styleClasses}`}
              />
            ))}
          </div>
          {/* Contact */}
          <div className='flex flex-col md:w-2/6'>
            <div className='my-2 font-bold'>Contact</div>
            {config.contactInfo.addressLine1 && (
              <span className='my-2 mt-1 ml-4'>
                {config.contactInfo.addressLine1}
              </span>
            )}
            {config.contactInfo.addressLine2 && (
              <span className='my-2 mt-1 ml-4'>
                {config.contactInfo.addressLine2}
              </span>
            )}
            {config.contactInfo.addressLine3 && (
              <span className='my-2 mt-1 mb-6 ml-4'>
                {config.contactInfo.addressLine3}
              </span>
            )}
            {config.contactInfo.email && (
              <span className='my-2 ml-4 flex items-center'>
                <Icon iconName='Email' styleClasses='text-skin-primary mr-2' />
                <a href={`mailto:${config.contactInfo.email}`}>
                  {config.contactInfo.email}
                </a>
              </span>
            )}
            {config.contactInfo.phone && (
              <span className='my-2 ml-4 flex items-center'>
                <Icon iconName='Phone' styleClasses='text-skin-primary mr-2' />
                <a href={`tel:${config.contactInfo.phone}`}>
                  {config.contactInfo.phone}
                </a>
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
