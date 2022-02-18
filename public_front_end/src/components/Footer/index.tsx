import Link from 'next/link';
import React, { FC } from 'react';
import { Button, Icon, ImageComponent, SectionTitle, Text } from '..';
import AppConfig from '../../common/appConfig';
import AppLink from '../Reusable/AppLink';
import { FooterConfig } from './type';

type Props = {
  config: FooterConfig;
};

const Footer: FC<Props> = ({ config }) => {
  return (
    <div id={'footer'} className='bg-skin-fill mt-6'>
      <footer className='pt-8 border-t-2 mx-auto p-4 stext-base xl:flex'>
        <div className='xl:w-[12%]' />
        <div className='grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-24 xl:w-[86%] px-2'>
          {/* Main */}
          <div className='flex flex-col items-start'>
            <div>
              <ImageComponent
                src={config.logo.img}
                alt={config.logo.alt}
                height={100}
                width={230}
                layout={'fixed'}
              />
            </div>
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
          <div className='flex flex-col items-start space-y-2'>
            <SectionTitle content={'Quick Links'} />
            {config.links.map((link, i) => (
              <AppLink
                key={i}
                text={link.text || ''}
                link={link.link || '#'}
                styleClasses='mx-2 px-2'
              />
            ))}
          </div>
          {/* Contact */}
          <div className='flex flex-col'>
            <SectionTitle content={'Contact'} />
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
          <div className='col-span-1 md:col-span-3 text-center'>
            <Text
              content={config.bottomDisclaimer}
              styleClasses='text-xs font-semibold'
            />
          </div>
        </div>
        <div className='xl:w-[12%]' />
      </footer>
    </div>
  );
};

export default Footer;
