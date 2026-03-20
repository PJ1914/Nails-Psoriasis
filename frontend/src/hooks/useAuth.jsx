import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

const AuthContext = createContext(null);

async function fetchProfile(uid) {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      try {
        if (!nextUser) {
          startTransition(() => {
            setUser(null);
            setProfile(null);
            setLoading(false);
          });

          return;
        }

        const nextProfile = await fetchProfile(nextUser.uid);

        startTransition(() => {
          setUser(nextUser);
          setProfile(nextProfile);
          setLoading(false);
        });
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        startTransition(() => {
          setUser(nextUser ?? null);
          setProfile(null);
          setLoading(false);
        });
      }
    });

    return unsubscribe;
  }, []);

  const refreshProfile = async () => {
    if (!auth.currentUser) {
      setProfile(null);
      return null;
    }

    const nextProfile = await fetchProfile(auth.currentUser.uid);
    setProfile(nextProfile);
    return nextProfile;
  };

  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const nextProfile = await fetchProfile(credentials.user.uid);
    setUser(credentials.user);
    setProfile(nextProfile);
    return credentials.user;
  };

  const register = async ({ name, email, password, role }) => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(credentials.user, { displayName: name });
    await setDoc(doc(db, 'users', credentials.user.uid), {
      uid: credentials.user.uid,
      name,
      email,
      role,
      created_at: new Date().toISOString(),
    });

    const nextProfile = await fetchProfile(credentials.user.uid);
    setUser(credentials.user);
    setProfile(nextProfile);
    return credentials.user;
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const resultUser = result.user;
    
    let nextProfile = await fetchProfile(resultUser.uid);
    
    // If new user, create a profile in Firestore
    if (!nextProfile) {
      await setDoc(doc(db, 'users', resultUser.uid), {
        uid: resultUser.uid,
        name: resultUser.displayName || 'Google User',
        email: resultUser.email,
        role: 'user',
        created_at: new Date().toISOString(),
      });
      nextProfile = await fetchProfile(resultUser.uid);
    }

    setUser(resultUser);
    setProfile(nextProfile);
    return resultUser;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
        refreshProfile,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
