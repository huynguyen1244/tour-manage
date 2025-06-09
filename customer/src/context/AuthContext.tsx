import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAccessToken, saveTokens, clearTokens } from "../utils/token";

// Định nghĩa kiểu cho User (bạn có thể mở rộng nếu cần)
interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // Cho phép các thuộc tính bổ sung
}

// Định nghĩa kiểu cho Context
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Tạo context với giá trị mặc định là undefined để kiểm soát lỗi khi dùng sai
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props cho AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    saveTokens(userData); // saveTokens nên lưu accessToken/refreshToken từ userData
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    clearTokens();
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook dùng để truy cập context, có kiểm tra undefined
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
