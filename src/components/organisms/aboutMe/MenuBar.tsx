import { FC, memo, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

import { useModal } from "../../../hooks/useModal";
import { ModalSet } from "../../molucules/ModalSet";
import { EditMe } from "./EditMe";

/**
 * 編集メニューバーコンポーネント
 */
export const MenuBar: FC = memo(() => {
  //モーダル使用のhooks
  const modalStore = useModal();
  const { onOpen, isOpen, onClose } = modalStore;

  //メニューのどれを選んだか
  const [menuItem, setMenuItem] = useState("");

  return (
    <>
      <ModalSet
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={`${menuItem}を更新`}
        closeBtn={false}
        contents={
          <EditMe
            menuItem={menuItem}
            setMenuItem={setMenuItem}
            onClose={onClose}
          />
        }
      />
      <Menu>
        <MenuButton
          _focus={{ boxShadow: "none" }}
          type="button"
          as={Button}
          textColor="white"
          width="auto"
          height={10}
          justifyContent="center"
          textAlign="center"
          display="flex"
          backgroundColor="green.400"
          _hover={{ backgroundColor: "green.300" }}
          _active={{ backgroundColor: "green.200" }}
          data-testid="open-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </MenuButton>
        <MenuList>
          {/* ユーザ情報 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("ユーザ情報");
              onOpen(e);
            }}
          >
            ユーザ情報
          </MenuItem>

          {/* 制作物 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("制作物");
              onOpen(e);
            }}
          >
            制作物
          </MenuItem>

          {/* URL */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("URL");
              onOpen(e);
            }}
          >
            URL
          </MenuItem>

          {/* スペックシート基本情報 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("スペックシート基本情報");
              onOpen(e);
            }}
          >
            スペックシート基本情報
          </MenuItem>

          {/* スペックシートスキル要約 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("スペックシートスキル要約");
              onOpen(e);
            }}
          >
            スペックシートスキル要約
          </MenuItem>

          {/* スペックシートその他情報 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("スペックシートその他情報");
              onOpen(e);
            }}
          >
            スペックシートその他情報
          </MenuItem>

          {/* スペックシート開発経験 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("スペックシート開発経験");
              onOpen(e);
            }}
          >
            スペックシート開発経験
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
});
