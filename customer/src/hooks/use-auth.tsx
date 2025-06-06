import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// ------------------------
// Interfaces & Types
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
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

// ------------------------
// Schemas
// ------------------------

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

// ------------------------
// API Calls
// ------------------------

const API_BASE = "http://localhost:5000/api/auth";

async function loginFn(credentials: LoginData): Promise<User> {
  const res = await apiRequest("POST", `${API_BASE}/login`, {
    email: credentials.email,
    password: credentials.password,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Login failed");
  }

  return res.json();
}

async function registerFn(userData: RegisterData): Promise<User> {
  const { confirmPassword, ...registerData } = userData;

  const res = await apiRequest("POST", `${API_BASE}/register`, registerData);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Registration failed");
  }

  return res.json();
}

async function logoutFn(): Promise<void> {
  const res = await apiRequest("POST", `${API_BASE}/logout`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Logout failed");
  }
}

// ------------------------
// Auth Context
// ------------------------

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation<User, Error, LoginData>({
    mutationFn: loginFn,
    onSuccess: (user) => {
      // Lưu vào React Query cache
      queryClient.setQueryData(["/api/user"], user);

      // Lưu token và user info vào localStorage
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("refreshToken", user.refreshToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation<User, Error, RegisterData>({
    mutationFn: registerFn,
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.name}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error) => {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export schemas if needed for form validation
export { loginSchema, registerSchema };
