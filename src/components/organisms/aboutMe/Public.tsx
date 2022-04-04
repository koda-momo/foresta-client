import { memo, FC } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import styled from "styled-components";

import { MenuBar } from "./MenuBar";
import { SiteImageBox } from "../../molucules/aboutMePublic/SiteImageBox";
import { MyTechStack } from "../../molucules/aboutMePublic/MyTechStack";
import { UrlList } from "../../molucules/aboutMePublic/UrlList";
import { Profile } from "../../molucules/aboutMePublic/Profile";
import { Heading } from "../../atoms/common/Heading";
import { useAboutMePrivate } from "../../../hooks/useAboutMePrivate";
import { PortfolioType } from "../../../types/types";
import { Url } from "../../../types/generated/graphql";

type Props = { engineerId?: string }; //エンジニアリストページから来たらUuIdが渡ってくる
/**
 * AboutMeパブリックゾーン.
 */
export const Public: FC<Props> = memo(({ engineerId }) => {
  //cookieからID取得
  const [cookies] = useCookies();

  //引数で渡す値は他人のページが自身のページで分岐
  const postData = engineerId ? engineerId : cookies.ForestaID;

  //hooksの利用
  const { myLoading, myError, otherLoading, otherError, myData, otherData } =
    useAboutMePrivate(postData);

  //データをセット(他人のページなら他人のデータ、自身のページなら自身のデータ)
  const user = engineerId ? otherData : myData;

  //基本情報データ
  const userData = {
    name: String(user?.name),
    githubId: String(user?.githubURL),
    jobType: String(user?.jobType),
  };

  //制作物データ
  const portfolioData = user?.portfolio as Array<PortfolioType>;

  //URLデータ
  const urlData = user?.userUrls.user_urls as Array<Url>;

  //読み込み中時の表示
  if (myLoading || otherLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner color="green.400" />
      </Flex>
    );
  }
  //エラー時の表示
  if (myError && otherError) {
    return <Flex justifyContent="center">Error</Flex>;
  }

  return (
    <>
      {user && (
        <>
          {/* 編集ボタン */}
          <Flex justifyContent="right" my={5}>
            {!engineerId && <MenuBar />}
          </Flex>
          <Flex gap={50} justifyContent="center" mb={20}>
            <_Profile>
              <_Head>
                <Heading text="Profile" />
              </_Head>
              <Profile userData={userData} />
            </_Profile>

            <_MyTechStack>
              <_Head>
                <Heading text="My Tech Stack" />
              </_Head>
              <MyTechStack />
            </_MyTechStack>
          </Flex>

          <Box width="100%">
            {portfolioData && <SiteImageBox data={portfolioData} />}
          </Box>
          <Box width="100%" my={70}>
            {urlData && <UrlList data={urlData} />}
          </Box>
        </>
      )}
    </>
  );
});

//Heading
const _Head = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
`;

//profile部分サイズ調整
const _Profile = styled.div`
  width: 25%;
`;

//技術ツリーサイズ調整
const _MyTechStack = styled.div`
  width: 70%;
`;
