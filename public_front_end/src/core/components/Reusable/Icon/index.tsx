import React, { FC, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { IconType as Props } from './type';
import { IconType } from 'react-icons';
const Icon: FC<Props> = ({
  iconName,
  size = '30',
  color,
  title,
  styleClasses
}) => {
  const [icon, updateIcon] = useState<any>(null);

  const importIconDynamically = async () => {
    let IconToUse: IconType;
    switch (iconName) {
      case 'Facebook':
        let { BsFacebook } = await import('react-icons/bs');
        IconToUse = BsFacebook;
        break;

      case 'Twitter':
        let { BsTwitter } = await import('react-icons/bs');
        IconToUse = BsTwitter;
        break;

      case 'Linkedin':
        let { BsLinkedin } = await import('react-icons/bs');
        IconToUse = BsLinkedin;
        break;

      case 'Instagram':
        let { BsInstagram } = await import('react-icons/bs');
        IconToUse = BsInstagram;
        break;

      case 'Close':
        let { MdOutlineClose } = await import('react-icons/md');
        IconToUse = MdOutlineClose;
        break;

      case 'Menu':
        let { MdOutlineMenu } = await import('react-icons/md');
        IconToUse = MdOutlineMenu;
        break;

      case 'Phone':
        let { MdPhone } = await import('react-icons/md');
        IconToUse = MdPhone;
        break;

      case 'Email':
        let { MdMailOutline } = await import('react-icons/md');
        IconToUse = MdMailOutline;
        break;

      case 'ExpandMore':
        let { MdExpandMore } = await import('react-icons/md');
        IconToUse = MdExpandMore;
        break;

      case 'Lightbulb':
        let { MdLightbulb } = await import('react-icons/md');
        IconToUse = MdLightbulb;
        break;

      case 'CheckCircle':
        let { MdCheckCircle } = await import('react-icons/md');
        IconToUse = MdCheckCircle;
        break;

      case 'FilterListAlt':
        let { MdFilterListAlt } = await import('react-icons/md');
        IconToUse = MdFilterListAlt;
        break;

      case 'OutlineFavoriteBorder':
        let { MdOutlineFavoriteBorder } = await import('react-icons/md');
        IconToUse = MdOutlineFavoriteBorder;
        break;

      case 'OutlineFavorite':
        let { MdOutlineFavorite } = await import('react-icons/md');
        IconToUse = MdOutlineFavorite;
        break;

      case 'BookmarkBorder':
        let { MdBookmarkBorder } = await import('react-icons/md');
        IconToUse = MdBookmarkBorder;
        break;

      case 'BookmarkAdded':
        let { MdBookmarkAdded } = await import('react-icons/md');
        IconToUse = MdBookmarkAdded;
        break;

      default:
        let { MdDoDisturb } = await import('react-icons/md');
        IconToUse = MdDoDisturb;
        break;
    }

    updateIcon(IconToUse);
  };

  useEffect(() => {
    importIconDynamically();
  }, []);

  return (
    <IconContext.Provider
      value={{ color: color, size: size, className: `${styleClasses}` }}
    >
      <span className='sr-only'>{title || `${iconName} icon`}</span>
      {icon}
    </IconContext.Provider>
  );
};

export default Icon;
