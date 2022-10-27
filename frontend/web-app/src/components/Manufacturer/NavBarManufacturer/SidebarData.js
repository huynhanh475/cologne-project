import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Product Form',
    path: '/manufacturer/productform',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text-manufacturer'
  },
  {
    title: 'Batch Order List',
    path: '/manufacturer/batchorderlist',
    icon: <IoIcons.IoMdBasket />,
    cName: 'nav-text-manufacturer'
  },
  {
    title: 'Deliverer List',
    path: '/manufacturer/delivererlist',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text-manufacturer'
  },
  {
    title: 'Batch Journey',
    path: '/manufacturer/batchjourney',
    icon: <IoIcons.IoIosNavigate />,
    cName: 'nav-text-manufacturer'
  },
  {
    title: 'Faulty Batch',
    path: '/manufacturer/faultybatch',
    icon: <IoIcons.IoMdWarning />,
    cName: 'nav-text-manufacturer'
  }
];