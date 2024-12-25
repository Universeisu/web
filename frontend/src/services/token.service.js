import { Cookies } from "react-cookie";

const cookies = new Cookies();

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.accessToken; // ดึง accessToken จาก user
};

const getUser = () => {
  const user = cookies.get("user");
  return user;
};

const setUser = (user) => {
  cookies.set("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400 * 1000), // 1 วัน
  });
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

const TokenService = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
