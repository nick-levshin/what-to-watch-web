import Image from 'next/image';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import logo from '@/assets/logo.svg';
import profile from '@/assets/profile.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src={logo}
          width={100}
          alt="logo"
          className="cursor-pointer object-contain"
          priority
        />
      </div>
      <ul className="hidden space-x-4 md:flex">
        <li className="headerLink">Главная</li>
        <li className="headerLink">Сериалы</li>
        <li className="headerLink">Фильмы</li>
        <li className="headerLink">Популярное</li>
        <li className="headerLink">Избранное</li>
      </ul>
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Дети</p>
        <BellIcon className="h-6 w-6" />
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
