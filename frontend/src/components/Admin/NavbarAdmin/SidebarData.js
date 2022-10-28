import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'User List',
    path: '/admin/userlist',
    icon: <IoIcons.IoIosFolderOpen />,
    cName: 'nav-text-admin'
  },
  {
    title: 'Create User',
    path: '/admin/createuser',
    icon: <IoIcons.IoIosCreate />,
    cName: 'nav-text-admin'
  }
];