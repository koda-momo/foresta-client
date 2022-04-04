import { memo, FC } from "react";
import { Flex, Spacer, Spinner } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import styled from "styled-components";

import { AccordionContent } from "../../molucules/AccordionContent";
import { UserInfoTable } from "../../molucules/aboutMePrivate/UserInfoTable";
import { SkillTable } from "../../molucules/aboutMePrivate/SkillTable";
import { OtherData } from "../../molucules/aboutMePrivate/OtherData";
import { Project } from "../../molucules/aboutMePrivate/Project";
import { SpecPr } from "../../molucules/aboutMePrivate/SpecPr";
import { Heading } from "../../atoms/common/Heading";
import { SpreadMenuBar } from "./SpreadMenuBar";
import { ShadowFrame } from "../../atoms/common/ShadowFrame";
import { ButtonItem } from "../../atoms/common/ButtonItem";
import { useGetSpreadSheetIdQuery } from "../../../types/generated/graphql";

/**
 * AboutMeプライベート(スペックシート)ゾーン.
 */
export const Private: FC = memo(() => {
  //cookieを使用
  const [cookies] = useCookies();

  /**
   * スプレッドシートID取得.
   */
  const { data, loading, error } = useGetSpreadSheetIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  const spreadSheetID = data?.getUserById.node.spreadSheetID;

  //アコーディオンに渡すデータ
  const propsDataArray = [
    { title: "基本情報", content: <UserInfoTable />, size: "lg" },
    { title: "スキル要約", content: <SkillTable />, size: "lg" },
    { title: "自己PR・前職経験", content: <SpecPr />, size: "lg" },
    { title: "その他", content: <OtherData />, size: "lg" },
  ];

  //読み込み中時の表示
  if (loading) {
    return (
      <Flex justifyContent="center">
        <Spinner color="green.400" />
      </Flex>
    );
  }
  //エラー時の表示
  if (error) {
    return <Flex justifyContent="center">Error</Flex>;
  }

  return (
    <>
      <Flex m={10}>
        <Heading text={"SpecSheet"} />
        <Spacer />
        <Flex gap={3}>
          <SpreadMenuBar />
          <ButtonItem
            name="PDFを発行"
            onClick={() =>
              window.open(
                `https://docs.google.com/spreadsheets/d/${spreadSheetID}/export?format=pdf`,
                "_blank",
              )
            }
          />
        </Flex>
      </Flex>
      <ShadowFrame margin={0} padding={10}>
        {propsDataArray.map((propsData) => (
          <div key={propsData.title}>
            <AccordionContent {...propsData} />
          </div>
        ))}

        <_Title>開発経験</_Title>
        <Project />
      </ShadowFrame>
    </>
  );
});

//項目名
const _Title = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin: 60px 0px 10px 0px;
`;
