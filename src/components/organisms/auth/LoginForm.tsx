import { FC, memo, useState, ChangeEvent } from "react";
import { useLogin } from "../../../hooks/auth/useLogin";
import { EmailInput } from "../../atoms/auth/EmailInput";
import { PasswordInput } from "../../atoms/auth/PasswordInput";
import { LoginButton } from "../../atoms/auth/LoginButton";
import { Center, Box, SimpleGrid } from "@chakra-ui/react";

export const LoginForm: FC = memo(() => {
  // メールアドレス
  const [mailAddress, setMailAddress] = useState<string>("");
  // テキストボックス入力時に入力内容をStateに設定
  const onChangeMailAddress = (e: ChangeEvent<HTMLInputElement>) =>
    setMailAddress(e.target.value);
  // パスワード
  const [password, setPassword] = useState<string>("");
  // テキストボックス入力時に入力内容をStateに設定
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  // ログインフックス呼ぶ
  const { doLogin } = useLogin(mailAddress, password);

  return (
    <div>
      <Box h="600px" display="flex" justifyContent="center" bg="white">
        <Center>
          <Box
            w={80}
            h="310px"
            color="gray"
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.50"
          >
            <SimpleGrid columns={1} spacing={8}>
              <EmailInput
                value={mailAddress}
                onChange={(e) => onChangeMailAddress(e)}
              />
              <PasswordInput
                value={password}
                onChange={(e) => onChangePassword(e)}
              />
              <LoginButton doLogin={doLogin} />
            </SimpleGrid>
          </Box>
        </Center>
      </Box>
    </div>
  );
});
