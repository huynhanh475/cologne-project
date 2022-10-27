import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Product List',
    path: '/retailer/productlist',
    icon: <IoIcons.IoIosListBox />,
    cName: 'nav-text-retailer'
  },
  {
    title: 'Transfer List',
    path: '/retailer/transferlist',
    icon: <IoIcons.IoIosSend />,
    cName: 'nav-text-retailer'
  },
  {
    title: 'Faulty Batch',
    path: '/retailer/faultybatch',
    icon: <IoIcons.IoMdWarning />,
    cName: 'nav-text-retailer'
  }
];