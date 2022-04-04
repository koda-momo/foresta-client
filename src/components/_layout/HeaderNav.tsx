import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

// ナビゲーションメニュー項目
const navMenu = [
  { link: "/", text: "Home" },
  { link: "/aboutme", text: "MyPortfolio" },
  { link: "/techforest", text: "TechTree" },
  { link: "/engineerlist", text: "EngineerList" },
];

/**
 * ヘッダーのナビゲーションメニューのコンポーネント.
 */
export const HeaderNav: FC = () => {
  return (
    <Flex gap={8} marginLeft={10}>
      {navMenu.map((nav) => (
        <NavLink
          key={nav.link}
          to={nav.link}
          state={{ engineerId: "" }}
          // activeなページのテキスト色を変更
          style={({ isActive }) => ({
            color: isActive ? "#48bb78" : "#333",
          })}
        >
          {nav.text}
        </NavLink>
      ))}
    </Flex>
  );
};
