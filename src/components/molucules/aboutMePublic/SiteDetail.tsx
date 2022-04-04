import { memo, FC } from "react";
import { Flex } from "@chakra-ui/react";
import { returnCodeToBr } from "../../../utils/methods";
import styled from "styled-components";

import { SiteImage } from "../../atoms/aboutMePublic/SiteImage";
import { TableFlexItem } from "../../atoms/TableFlexItem";
import { PortfolioType } from "../../../types/types";

// 自動生成したPortfolioの型から使用したいプロパティ名だけを指定
type Props = {
  siteItem?: PortfolioType;
};

/**
 * 制作物詳細画面.
 */
export const SiteDetail: FC<Props> = memo(({ siteItem }) => {
  return (
    <>
      {siteItem && (
        <>
          <_Description>{returnCodeToBr(siteItem.description)}</_Description>
          <_SiteImage href={siteItem.portfolioURL} target="_brank">
            <SiteImage imageUrl={siteItem.img} isUp={false} />
          </_SiteImage>
          {siteItem.skills.length != 0 && (
            <>
              <_Skill>■使用スキル:</_Skill>
              <Flex my={2} ml="30px">
                <TableFlexItem itemArray={siteItem.skills} />
              </Flex>
            </>
          )}
          <_URLTitle>
            ■URL:
            <_URL href={siteItem.portfolioURL} target="_brank">
              {siteItem.portfolioURL}
            </_URL>
          </_URLTitle>
        </>
      )}
    </>
  );
});

//詳細
const _Description = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 500px;
`;

//サイト画像を中央に持ってくるCSS
const _SiteImage = styled.a`
  display: flex;
  justify-content: center;
  :focus {
    box-shadow: "none";
  }
  :hover {
    opacity: 60%;
  }
  outline: none;
`;

//使用スキル
const _Skill = styled.div`
  margin-left: 20px;
  color: #696969;
  text-align: left;
`;

//URL全体にかかっている
const _URLTitle = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  color: #696969;
  text-align: left;
`;

//URL本体にかかっている
const _URL = styled.a`
  margin-left: 10px;
  :hover {
    opacity: 50%;
  }
`;
