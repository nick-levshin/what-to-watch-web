import Image from 'next/image';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import logo from '@/assets/logo.svg';
import profile from '@/assets/profile.png';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { appState } from '@/atoms/detailsAtom';
import BasicMenu from './BasicMenu';

const Header = () => {
  const [appSettings, setAppSettings] = useRecoilState(appState);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const handleLogo = () => {
    setAppSettings({ loading: true });
    router.push('/').then(() => setAppSettings({ loading: false }));
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <header
      className={`${
        isScrolled
          ? 'bg-gradient-to-t from-[#141414] to-[#141414]'
          : 'bg-gradient-to-t from-[#010511]/0 to-[#141414]'
      }`}
    >
      <div className="flex items-center md:space-x-10">
        <Image
          src={logo}
          alt="logo"
          className="object-contain cursor-pointer w-[160px] md:w-[200px]"
          priority
          onClick={() => handleLogo()}
        />
        <BasicMenu />
      </div>
      <ul className="hidden space-x-4 md:flex">
        <li className="headerLink" onClick={() => handleLogo()}>
          Главная
        </li>
        <li className="headerLink">
          <Link href="/#series" scroll={false}>
            Сериалы
          </Link>
        </li>
        <li className="headerLink">
          <Link href="/#movies" scroll={false}>
            Фильмы
          </Link>
        </li>
        <li className="headerLink">
          <Link href="/#popular" scroll={false}>
            Популярное
          </Link>
        </li>
        <li className="headerLink">
          <Link href="/#liked" scroll={false}>
            Избранное
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <Link href="/account">
          <Image
            src={profile}
            alt="profile"
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
