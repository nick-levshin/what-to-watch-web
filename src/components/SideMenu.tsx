import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import SideMenuList from './SideMenuList';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AdjustmentsHorizontalIcon
        className="w-7 h-7"
        onClick={() => setIsOpen(true)}
      />
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <SideMenuList />
      </Drawer>
    </div>
  );
};

export default SideMenu;
