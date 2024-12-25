import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import TokenService from "../services/token.service";
import { useAuthContext } from "../context/AuthContext"; //นำเข้าเพื่อเรียกใช้ ฟังชั่นlogin

const Login = () => {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนเส้นทาง
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuthContext(); //เรียกใช้ ฟังชั่นlogin ในAuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((User) => ({ ...User, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(user.username, user.password);
      if (response.status === 200) {
        console.log(response.data);
        login(response.data.user); //เรียกใช้ ฟังชั่นlogin ในAuthContextที่กำหนดไว้
        TokenService.setUser(response.data);
        Swal.fire({
          title: "Login Successful",
          text: "Welcome!",
          icon: "success",
        }).then(() => {
          navigate("/Home");
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.message || "Invalid credentials.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error); // เพิ่มบรรทัดนี้
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow p-2"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow p-2"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </label>

        <button
          onClick={handleSubmit}
          className="w-full py-2 btn text-[#fbeaff] bg-[#1230AE] hover:bg-[#6C48C5] hover:text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
