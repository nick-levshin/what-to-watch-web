import { useMemo, useContext, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { User } from '../../typings';
import bcrypt from 'bcryptjs-react';
import { useRecoilState } from 'recoil';
import { appState, userState } from '@/atoms/detailsAtom';

interface IAuth {
  user: User | null;
  signUp: (nickname: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [appSettings, setAppSettings] = useRecoilState(appState);
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
            setAppSettings({ loading: false });
          } else {
            throw new Error('Incorrect email or password');
          }
        } catch (e) {
          console.log('Fetch user error:', e);
        }
      } else {
        await router.push('/login');
        setAppSettings({ loading: false });
      }
    };

    fetchUser();
  }, []);

  const signUp = async (nickname: string, email: string, password: string) => {
    setAppSettings({ loading: true });
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
        router.push('/').then(() => setAppSettings({ loading: false }));
      }
    } catch (e) {
      console.log('Sign Up error:', e);
      setAppSettings({ loading: false });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAppSettings({ loading: true });
      const { data } = await supabase
        .from('users')
        .select('id, username, email, password, created_at, liked_movies')
        .eq('email', email)
        .single();
      if (data && bcrypt.compareSync(password, data.password)) {
        setUser(data);
        localStorage.setItem('user', email);
        router.push('/').then(() => setAppSettings({ loading: false }));
      } else {
        alert('Некорректный email или пароль');
        throw new Error('Incorrect email or password');
      }
    } catch (e) {
      console.log('Sign In error:', e);
      setAppSettings({ loading: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);

    router.push('/login');
  };

  const memoedValue = useMemo(() => ({ user, signUp, signIn, logout }), [user]);

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
