import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("/api/auth/login", { email, password });
    const role = res.data.role; // ví dụ: "user" hoặc "admin"

    if (role === "user") {
      navigate("/"); // vào client homepage
    } else if (role === "admin") {
      window.location.href = "http://localhost:3005"; // chuyển sang giao diện admin
    }
  };

  return (
    <button onClick={handleLogin}>Đăng nhập</button>
  );
}
