import { useState, useMemo, useContext, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { User } from '../../typings';
import bcrypt from 'bcryptjs-react';
import { useRecoilState } from 'recoil';
import { userState } from '@/atoms/detailsAtom';

interface IAuth {
  user: User | null;
  signUp: (nickname: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  loading: boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  loading: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('user');
      if (email) {
        try {
          const { data } = await supabase
            .from('users')
            .select('id, username, email, password, created_at, liked_movies')
            .eq('email', email)
            .single();
          if (data) {
            setUser(data);
          } else {
            throw new Error('Incorrect email or password');
          }
        } catch (e) {
          console.log('Fetch user error:', e);
        }
      }
    };

    fetchUser();
  }, []);

  const signUp = async (nickname: string, email: string, password: string) => {
    setLoading(true);
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const { data } = await supabase
        .from('users')
        .insert({ username: nickname, email, password: hashedPassword })
        .select('id, username, email, password, created_at, liked_movies')
        .single();
      if (data) {
        setUser(data);
        localStorage.setItem('user', email);
        router.push('/').then(() => setLoading(false));
      }
    } catch (e) {
      console.log('Sign Up error:', e);
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('users')
        .select('id, username, email, password, created_at, liked_movies')
        .eq('email', email)
        .single();
      if (data && bcrypt.compareSync(password, data.password)) {
        setUser(data);
        localStorage.setItem('user', email);
        router.push('/').then(() => setLoading(false));
      } else {
        alert('Некорректный email или пароль');
        throw new Error('Incorrect email or password');
      }
    } catch (e) {
      console.log('Sign In error:', e);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);

    router.push('/login');
  };

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, loading, logout }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
