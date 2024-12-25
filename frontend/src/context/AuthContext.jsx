import { useState, useContext, createContext, useEffect } from "react";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    cookie.remove("user", { path: "/" });
    cookie.remove("accessToken", { path: "/" });
  };

  // ฟังก์ชันใหม่ getUser สำหรับการดึงข้อมูลผู้ใช้
  const getUser = () => {
    return user; // ส่งคืนข้อมูล user หรือ null
  };

  useEffect(() => {
    if (user) {
      cookie.set("user", JSON.stringify(user), {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });
    } else {
      cookie.remove("user", { path: "/" });
    }
  }, [user]); // ตรวจสอบทุกครั้งที่ state user เปลี่ยนแปลง

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
