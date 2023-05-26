import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@/assets/logo.svg';
import profile from '@/assets/profile.png';
import member from '@/assets/membersince.svg';
import { appState, userState } from '@/atoms/detailsAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/utils/supabaseClient';
import bcrypt from 'bcryptjs-react';
import Loader from '@/components/Loader';

const Account = () => {
  const [appSettings, setAppSettings] = useRecoilState(appState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogo = () => {
    setAppSettings({ loading: true });
    router.push('/').then(() => setAppSettings({ loading: false }));
  };

  const changeEmail = async () => {
    try {
      const newEmail = prompt('Введите новый email:');
      if (newEmail) {
        const { error } = await supabase
          .from('users')
          .update({ email: newEmail })
          .eq('id', user?.id);
        if (!error) {
          setUser((prev) => {
            return { ...prev, email: newEmail };
          });
          localStorage.setItem('user', newEmail);
        } else {
          alert('Данный email уже используется');
          throw new Error('Incorrect email');
        }
      }
    } catch (e) {
      console.log('Change email error:', e);
    }
  };

  const changePassword = async () => {
    try {
      const newPassword = prompt('Введите новый пароль:');
      if (newPassword) {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const { error } = await supabase
          .from('users')
          .update({ password: hashedPassword })
          .eq('id', user?.id);
        if (!error) {
          setUser((prev) => {
            return { ...prev, password: hashedPassword };
          });
          alert('Пароль изменен');
        } else {
          alert('Некорректный пароль');
          throw new Error('Incorrect password');
        }
      }
    } catch (e) {
      console.log('Change email error:', e);
    }
  };

  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
  }

  if (appSettings.loading) {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>Профиль - Что бы посмотреть?</title>
      </Head>

      <header className="bg-[#131313]">
        <Image
          src={logo}
          width={200}
          alt="logo"
          className="object-contain cursor-pointer"
          priority
          onClick={() => handleLogo()}
        />
        <Link href="/account">
          <Image
            src={profile}
            alt="profile"
            className="cursor-pointer rounded"
          />
        </Link>
      </header>
      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
        <h1 className="text-4xl md:text-5xl font-semibold">{user?.username}</h1>
        <div className="flex flex-col mt-4 gap-x-4 md:flex-row md:items-center">
          <h2 className="text-3xl md:text-4xl">Аккаунт</h2>
          <div className=" -ml-0.5 flex items-center gap-x-1.5">
            <Image src={member} alt="member" className="w-7 h-7" />
            <p className="text-xs font-semibold text-[#555]">
              Дата регистрации:{' '}
              {user?.created_at?.slice(0, 19).replace('T', ' ')}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="pt-4 text-lg text-[gray]">Профиль</h4>
          <div className="col-span-3">
            <div className="flex flex-col justify-between py-4 md:flex-row">
              <div>
                <p className="font-medium">{user?.email}</p>
                <p className="text-[gray]">Пароль: *********</p>
              </div>
              <div className="md:text-right">
                <p className="membershipLink" onClick={() => changeEmail()}>
                  Изменить email
                </p>
                <p className="membershipLink" onClick={() => changePassword()}>
                  Изменить пароль
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4  md:mt-0 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 items-center">
          <h4 className="text-lg text-[gray]">Настройки</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={() => logout()}
          >
            Выйти
          </p>
        </div>
      </main>
    </div>
  );
};

export default Account;
