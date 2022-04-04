import { memo, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserAutoLoginMutation } from "../../../types/generated/graphql";

export const Auth = memo(() => {
  // クッキー
  const [cookie, , removeCookie] = useCookies();
  // ログイン状態の管理
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  // 自動でログインを行うMutation
  const [userAutoLoginMutation] = useUserAutoLoginMutation({
    variables: {
      userToken: cookie.ForestaID,
    },
  });
  useEffect(() => {
    // 自動ログインを実行するメソッド
    const autoLogin = async () => {
      try {
        const result = await userAutoLoginMutation();
        if (result.data?.userAutoLogin.status == "success") {
          setLoginStatus(true);
        }
      } catch {
        removeCookie("ForestaID");
        setLoginStatus(false);
      }
    };
    autoLogin();
  }, [userAutoLoginMutation, removeCookie]);

  return loginStatus ? <Outlet /> : <Navigate to={"/login"} />;
});
