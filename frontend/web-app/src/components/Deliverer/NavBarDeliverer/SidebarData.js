import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Invitation List',
    path: '/deliverer/invitationlist',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text-deliverer'
  },
  {
    title: 'Transfer List',
    path: '/deliverer/transferlist',
    icon: <IoIcons.IoMdBasket />,
    cName: 'nav-text-deliverer'
  },
  {
    title: 'Batch Journey',
    path: '/deliverer/batchjourney',
    icon: <IoIcons.IoIosNavigate />,
    cName: 'nav-text-deliverer'
  },
  {
    title: 'Faulty Batch',
    path: '/deliverer/faultybatch',
    icon: <IoIcons.IoMdWarning />,
    cName: 'nav-text-deliverer'
  }
];