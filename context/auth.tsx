import { clearSession, getSession, storeSession } from "@/utils/asyncStorage";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
interface AuthContextType {
  signIn: (sessionData: any) => Promise<void>;
  signOut: () => void;
  session?: string | null;
}
export function useStorageState() {
  const [session, setState] = useState<any>(null);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedValue = await getSession();
        setState(storedValue ? JSON.parse(storedValue) : null);
      } catch (error) {
        console.error("Failed to load session from storage", error);
      }
    };

    loadState();
  }, []);

  const updateSession = async (newSession: any) => {
    try {
      setState(newSession);
      if (!newSession) {
        await clearSession();
      } else {
        await storeSession(JSON.stringify(newSession));
      }
    } catch (error) {
      console.error("Failed to save session to storage", error);
    }
  };

  return { session, updateSession };
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }: PropsWithChildren) {
  const { session, updateSession } = useStorageState();
  const signIn = async (sessionData: any) => {
    await updateSession(sessionData);
  };
  const signOut = () => {
    updateSession(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session }}>
      {children}
    </AuthContext.Provider>
  );
}
