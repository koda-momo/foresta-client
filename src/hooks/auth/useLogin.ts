import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../../types/generated/graphql";
import { useToast } from "@chakra-ui/react";

/**
 * ログイン処理を行うhook.
 * @param mailAddress
 * @param password
 * @returns doLogin - ログインするメソッド
 */
export const useLogin = (mailAddress: string, password: string) => {
  // ログイン通知用のトースト
  const toast = useToast();
  // 画面遷移用のnavigate
  const navigate = useNavigate();
  // クッキー
  const [, setCookie] = useCookies();
  // ログインするMutaion
  const [userLoginMutation] = useUserLoginMutation({
    variables: {
      user: {
        email: mailAddress,
        password: password,
      },
    },
  });

  // ログイン処理
  const doLogin = async () => {
    try {
      const response = await userLoginMutation();
      // ログインが成功した場合はCookieにForestaIDを保存;
      if (response.data?.userLogin.status == "success") {
        setCookie("ForestaID", response.data.userLogin.node.token);
        toast({
          title: "ログインに成功しました",
          position: "bottom-left",
          status: "success",
          isClosable: true,
        });
        navigate("/");
      }
    } catch {
      toast({
        title: "ログインに失敗しました",
        position: "bottom-left",
        status: "error",
        isClosable: true,
      });
    }
  };

  return { doLogin };
};
