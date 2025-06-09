import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios";
import { saveTokens, clearTokens, getAccessToken } from "@/utils/token";
import { z } from "zod";

// ------------------------
// Types & Schemas
// ------------------------

interface User {
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

type AuthContextType = {
  user: User | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logout: () => void;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

const registerSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(1),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

// ------------------------
// Context Setup
// ------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ------------------------
// API Functions
// ------------------------

const API_BASE = "http://localhost:5000/api/auth";

async function loginFn(credentials: LoginData): Promise<User> {
  const res = await apiClient.post<User>(`${API_BASE}/login`, credentials);
  return res;
}

async function registerFn(data: RegisterData): Promise<User> {
  const { confirmPassword, ...payload } = data;
  const res = await apiClient.post<User>(`${API_BASE}/register`, payload);
  return res;
}

async function logoutFn(): Promise<void> {
  await apiClient.post(`${API_BASE}/logout`, {});
  clearTokens();
}

// ------------------------
// Provider
// ------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        clearTokens();
      }
    }
  }, []);

  const loginMutation = useMutation<User, Error, LoginData>({
    mutationFn: loginFn,
    onSuccess: (userData) => {
      saveTokens(userData);
      setUser(userData);
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation<User, Error, RegisterData>({
    mutationFn: registerFn,
    onSuccess: (userData) => {
      saveTokens(userData);
      setUser(userData);
      toast({
        title: "Registered",
        description: `Welcome, ${userData.name}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Register failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logout = () => {
    logoutFn()
      .then(() => {
        setUser(null);
        toast({ title: "Logged out successfully" });
      })
      .catch((error) => {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginMutation,
        logout,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ------------------------
// Hook
// ------------------------

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export schemas for form validation
export { loginSchema, registerSchema };
