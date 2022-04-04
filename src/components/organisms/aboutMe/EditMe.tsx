import { memo, FC, SetStateAction, Dispatch } from "react";
import { SpecProject } from "../../molucules/editMe/specProject/SpecProject";
import { SpecSheet } from "../../molucules/editMe/SpecSheet";
import { SpecTechInfo } from "../../molucules/editMe/SpecTechInfo";
import { SpecUserInfo } from "../../molucules/editMe/SpecUserInfo";
import { UserInfo } from "../../molucules/editMe/UserInfo";
import { UserPortfolio } from "../../molucules/editMe/userPortfolio/UserPortfolio";
import { UserUrls } from "../../molucules/editMe/UserUrls";

type Props = {
  menuItem: string; //メニューで何を選んだか
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * EditMe.
 */
export const EditMe: FC<Props> = memo(({ menuItem, setMenuItem, onClose }) => {
  return (
    <>
      {menuItem === "ユーザ情報" && (
        <UserInfo setMenuItem={setMenuItem} onClose={onClose} />
      )}
      {menuItem === "制作物" && (
        <UserPortfolio setMenuItem={setMenuItem} onClose={onClose} />
      )}
      {menuItem === "URL" && (
        <UserUrls setMenuItem={setMenuItem} onClose={onClose} />
      )}
      {menuItem === "スペックシート基本情報" && (
        <SpecUserInfo setMenuItem={setMenuItem} onClose={onClose} />
      )}
      {menuItem === "スペックシートスキル要約" && (
        <SpecTechInfo setMenuItem={setMenuItem} onClose={onClose} />
      )}
      {menuItem === "スペックシートその他情報" && (
        <SpecSheet setMenuItem={setMenuItem} onClose={onClose} />
      )}
      {menuItem === "スペックシート開発経験" && (
        <SpecProject setMenuItem={setMenuItem} onClose={onClose} />
      )}
    </>
  );
});
