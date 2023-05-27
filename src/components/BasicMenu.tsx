import { appState } from '@/atoms/detailsAtom';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const BasicMenu = () => {
  const [appSettings, setAppSettings] = useRecoilState(appState);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogo = () => {
    handleClose();
    setAppSettings({ loading: true });
    router.push('/').then(() => setAppSettings({ loading: false }));
  };

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        <Bars3Icon className="w-7 h-7" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleLogo()} style={{ cursor: 'pointer' }}>
          Главная
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/#series" scroll={false}>
            Сериалы
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/#movies" scroll={false}>
            Фильмы
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/#popular" scroll={false}>
            Популярное
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/#liked" scroll={false}>
            Избранное
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
