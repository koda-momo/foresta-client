import { FC, memo, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

import { useModal } from "../../../hooks/useModal";
import { ModalSet } from "../../molucules/ModalSet";
import { SpreadPr } from "../../molucules/editMe/spreadSheet/SpreadPr";
import { SpreadUserInfo } from "../../molucules/editMe/spreadSheet/SpreadUserInfo";
import { SpreadAll } from "../../molucules/editMe/spreadSheet/SpreadAll";
import { SpreadPj } from "../../molucules/editMe/spreadSheet/SpreadPj";
import { SpreadTech } from "../../molucules/editMe/spreadSheet/SpreadTech";
import { SpreadUrl } from "../../molucules/editMe/spreadSheet/SpreadUrl";
import { SetUp } from "../../molucules/editMe/spreadSheet/SetUp";
import { AlertIcon } from "@primer/octicons-react";

/**
 * スプレッドシート出力用メニューバーコンポーネント
 */
export const SpreadMenuBar: FC = memo(() => {
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
        modalTitle={
          menuItem != "初期"
            ? `${menuItem}をスプレッドシートに出力しますか？`
            : "初期設定について"
        }
        closeBtn={false}
        contents={
          <>
            {menuItem === "全て" && (
              <SpreadAll onClose={onClose} setMenuItem={setMenuItem} />
            )}
            {menuItem === "基本情報" && (
              <SpreadUserInfo onClose={onClose} setMenuItem={setMenuItem} />
            )}
            {menuItem === "自己PR" && (
              <SpreadPr onClose={onClose} setMenuItem={setMenuItem} />
            )}
            {menuItem === "開発経験" && (
              <SpreadPj onClose={onClose} setMenuItem={setMenuItem} />
            )}
            {menuItem === "スキル" && (
              <SpreadTech onClose={onClose} setMenuItem={setMenuItem} />
            )}
            {menuItem === "url" && (
              <SpreadUrl onClose={onClose} setMenuItem={setMenuItem} />
            )}
            {menuItem === "初期" && (
              <SetUp onClose={onClose} setMenuItem={setMenuItem} />
            )}
          </>
        }
      />
      <Menu>
        <MenuButton
          _focus={{ boxShadow: "none" }}
          as={Button}
          backgroundColor="green.400"
          textColor="white"
          _hover={{ backgroundColor: "green.300" }}
          _active={{ backgroundColor: "green.200" }}
          width="auto"
          height={10}
          justifyContent="center"
          textAlign="center"
        >
          スプレッドシートに出力
        </MenuButton>
        <MenuList>
          {/* 全て */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("全て");
              onOpen(e);
            }}
          >
            全情報
          </MenuItem>

          {/* 基本情報 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("基本情報");
              onOpen(e);
            }}
          >
            基本情報
          </MenuItem>

          {/* 自己PR */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("自己PR");
              onOpen(e);
            }}
          >
            自己PR
          </MenuItem>

          {/* URL */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("url");
              onOpen(e);
            }}
          >
            URL
          </MenuItem>

          {/* スキル */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("スキル");
              onOpen(e);
            }}
          >
            スキル要約
          </MenuItem>

          {/* 開発経験 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("開発経験");
              onOpen(e);
            }}
          >
            開発経験
          </MenuItem>

          {/* 初期設定 */}
          <MenuItem
            onClick={(e) => {
              setMenuItem("初期");
              onOpen(e);
            }}
          >
            <AlertIcon size={16} />
            はじめに必要な設定について
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
});
