import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (simulate checking local storage)
    const checkAuthStatus = async () => {
      try {
        // Simulate checking for saved credentials
        await new Promise((resolve) => setTimeout(resolve, 500));
        // For demo purposes, we'll just set to null
        setUser(null);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        setError("Failed to check authentication status");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, create a fake user
      const fakeUser: User = {
        id: "1",
        name: "Demo User",
        email: email,
      };

      setUser(fakeUser);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid email or password";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, create a fake user
      const fakeUser: User = {
        id: "2",
        name: name,
        email: email,
      };

      setUser(fakeUser);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create account";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      signup,
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
