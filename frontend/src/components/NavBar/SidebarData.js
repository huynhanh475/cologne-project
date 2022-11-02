import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Product Form',
    path: '/manufacturer/productform',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text-container',
    userType: 'manufacturer',
    role: 'client'
  },
  {
    title: 'Transaction List',
    path: '/manufacturer/batchorderlist',
    icon: <IoIcons.IoMdBasket />,
    cName: 'nav-text-container',
    userType: 'manufacturer',
    role: 'client'
  },
  // {
  //   title: 'Deliverer List',
  //   path: '/manufacturer/delivererlist',
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: 'nav-text-container',
  //   userType: 'manufacturer',
  //   role: 'client'
  // },
  {
    title: 'Batch Journey',
    path: '/manufacturer/batchjourney',
    icon: <IoIcons.IoIosNavigate />,
    cName: 'nav-text-container',
    userType: 'manufacturer',
    role: 'client'
  },
  {
    title: 'Faulty Batch',
    path: '/manufacturer/faultybatch',
    icon: <IoIcons.IoMdWarning />,
    cName: 'nav-text-container',
    userType: 'manufacturer',
    role: 'client'
  },
  {
    title: 'Product List',
    path: '/retailer/productlist',
    icon: <IoIcons.IoIosListBox />,
    cName: 'nav-text-container',
    userType: 'retailer',
    role: 'client'
  },
  {
    title: 'Transaction List',
    path: '/retailer/transferlist',
    icon: <IoIcons.IoIosSend />,
    cName: 'nav-text-container',
    userType: 'retailer',
    role: 'client'
  },
  {
    title: 'Batch Journey',
    path: '/retailer/batchjourney',
    icon: <IoIcons.IoIosNavigate />,
    cName: 'nav-text-container',
    userType: 'retailer',
    role: 'client'
  },
  {
    title: 'Faulty Batch',
    path: '/retailer/faultybatch',
    icon: <IoIcons.IoMdWarning />,
    cName: 'nav-text-container',
    userType: 'retailer',
    role: 'client'
  },
  {
    title: 'Invitation List',
    path: '/deliverer/invitationlist',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text-container',
    userType: 'deliverer',
    role: 'client'
  },
  {
    title: 'Transfer List',
    path: '/deliverer/transferlist',
    icon: <IoIcons.IoMdBasket />,
    cName: 'nav-text-container',
    userType: 'deliverer',
    role: 'client'
  },
  {
    title: 'Batch Journey',
    path: '/deliverer/batchjourney',
    icon: <IoIcons.IoIosNavigate />,
    cName: 'nav-text-container',
    userType: 'deliverer',
    role: 'client'
  },
  {
    title: 'Faulty Batch',
    path: '/deliverer/faultybatch',
    icon: <IoIcons.IoMdWarning />,
    cName: 'nav-text-container',
    userType: 'deliverer',
    role: 'client'
  },
  {
    title: 'User List',
    path: '/admin/userlist',
    icon: <IoIcons.IoIosFolderOpen />,
    cName: 'nav-text-container',
    role: 'admin'
  },
  // {
  //   title: 'Create User',
  //   path: '/admin/createuser',
  //   icon: <IoIcons.IoIosCreate />,
  //   cName: 'nav-text-container',
  //   role: 'admin'
  // },
  {
    title: 'Product List',
    path: '/manufacturer/productlist',
    icon: <IoIcons.IoIosListBox />,
    cName: 'nav-text-container',
    userType: 'manufacturer',
    role: 'client'
  },
];