import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import background from '@/assets/auth-bg.jpg';
import logo from '@/assets/logo.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import Loader from '@/components/Loader';

interface Inputs {
  nickname: string;
  email: string;
  password: string;
}

const Login = () => {
  const { loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({
    nickname,
    email,
    password,
  }) => {
    if (isSignUp) {
      await signUp(nickname, email, password);
    } else {
      await signIn(email, password);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Авторизация - Что бы посмотреть?</title>
      </Head>
      <Image
        src={background}
        fill
        sizes="100vw"
        alt="background"
        className="-z-10 !hidden opacity-60 sm:!inline object-cover"
      />
      <Image
        src={logo}
        width={200}
        alt="logo"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        priority
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">
          {isSignUp ? 'Зарегистрироваться' : 'Войти'}
        </h1>
        <div className="space-y-4">
          {isSignUp && (
            <label className="inline-block w-full">
              <input
                type="text"
                placeholder="Nickname"
                className="input"
                {...register('nickname', { required: true })}
              />
              {errors.nickname && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Данный nickname некорректен или уже используется
                </p>
              )}
            </label>
          )}
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="E-mail"
              className="input"
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                E-mail некорректен или уже используется
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true, minLength: 4 })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Введите корректный пароль (не менее 4 символов)
              </p>
            )}
          </label>
        </div>
        <button type="submit" className="w-full rounded py-3 bg-[#e50914]">
          {isSignUp ? 'Зарегистрироваться' : 'Войти'}
        </button>

        <div className="text-[gray]">
          {isSignUp ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <button
            type="button"
            className="text-white hover:underline"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
