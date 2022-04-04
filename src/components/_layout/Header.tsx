import { memo, FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuDivider,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useCookies } from "react-cookie";
import { HeaderNav } from "./HeaderNav";
import { useNavigate } from "react-router-dom";

/**
 * ヘッダー.
 */
export const Header: FC = memo(() => {
  // ログアウト通知用のトースト
  const toast = useToast();
  // ログイン画面に遷移するためのnavigate
  const navigate = useNavigate();
  // クッキー
  const [cookies, , removeCookie] = useCookies();
  const auth = cookies.ForestaID;
  // ログアウトするメソッド
  const doLogout = () => {
    removeCookie("ForestaID");
    navigate("/login");
    toast({
      title: "ログアウトしました",
      position: "bottom-left",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" borderBottom="3px solid #48bb78" px={4}>
      <_Header>
        <Flex alignItems="center" gap={3}>
          <Link to="/">
            <img src="/images/header-logo.png" alt="ヘッダーロゴ" />
          </Link>
          {auth && <HeaderNav />}
        </Flex>

        {/* ログインしていればログアウトボタン表示 */}
        {/* {auth && <LogoutButton />} */}
        {auth && (
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              px={10}
              mr={8}
              my={3}
              colorScheme="green"
              variant="outline"
              borderWidth="2px"
            >
              Menu
              <ChevronDownIcon />
            </MenuButton>
            <MenuList minWidth="300px" zIndex={100}>
              <MenuItemOption>学習記録</MenuItemOption>
              <MenuItemOption>ポートフォリオ</MenuItemOption>
              <MenuItemOption>進捗ツリー</MenuItemOption>
              <MenuItemOption>エンジニア一覧</MenuItemOption>
              <MenuDivider />
              <MenuItemOption onClick={doLogout}>ログアウト</MenuItemOption>
            </MenuList>
          </Menu>
        )}
      </_Header>
      {/* ログインしていればナビゲーションメニュー表示 */}
    </Flex>
  );
});

const _Header = styled.header`
  display: flex;
  justify-content: space-between;
  aligh-items: center;
  width: 100%;
  height: 64px;

  & img {
    width: 150px;
    height: auto;
    padding: 8px 0;
    cursor: pointer;
  }
`;
