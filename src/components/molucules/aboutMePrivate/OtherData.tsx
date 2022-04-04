import { memo, FC } from "react";
import styled from "styled-components";
import { Spinner, Flex } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { returnCodeToBr } from "../../../utils/methods";

import { useGetSheetOtherByUserIdQuery } from "../../../types/generated/graphql";

/**
 * その他のデータ.
 * @remarks - 業務外、資格、前職について
 */
export const OtherData: FC = memo(() => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * スペックシートユーザ自己PR取得.
   */
  const { data, loading, error } = useGetSheetOtherByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });

  //業務外
  const studyOnOwnTime = data?.other.node.studyOnOwnTime;
  //資格
  const certification = data?.other.node.certification;
  //前職経験
  const prevJobs = data?.other.node.prevJobs;

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
      <_Title>業務外に取り組んでいること</_Title>
      {studyOnOwnTime}

      <_Title>資格</_Title>
      {certification}

      <div>
        <_Title>前職</_Title>
        {prevJobs &&
          prevJobs?.map((job) => (
            <_Job key={job.content}>{returnCodeToBr(job.content)}</_Job>
          ))}
      </div>
    </>
  );
});

//項目タイトル
const _Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 40px 0px 10px 0px;
`;

const _Job = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
