import { memo, FC } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import {
  SpecUserInfoSheet,
  useGetSheetByUserIdQuery,
} from "../../../types/generated/graphql";

/**
 * ユーザの基本情報テーブル.
 */
export const UserInfoTable: FC = memo(() => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * スペックシートユーザ基本情報取得.
   */
  const { data, loading, error } = useGetSheetByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  const userData = data?.user.node.userInfo as SpecUserInfoSheet;

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
      {userData && (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>項目名</Th>
              <Th>内容</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>スタッフID</Td>
              <Td>{userData?.stuffID}</Td>
            </Tr>
            <Tr>
              <Td>年齢</Td>
              <Td>{userData?.age != 0 && `${userData?.age}歳`}</Td>
            </Tr>
            <Tr>
              <Td>性別</Td>
              <Td>{userData?.gender}</Td>
            </Tr>
            <Tr>
              <Td>最寄駅</Td>
              <Td>{userData?.nearestStation}</Td>
            </Tr>
            <Tr>
              <Td>稼働開始日</Td>
              <Td>{userData?.startWorkDate}</Td>
            </Tr>
            <Tr>
              <Td>エンジニア歴</Td>
              <Td>
                <Flex gap={5}>
                  {Math.floor(
                    (userData?.seExpAmount + userData?.pgExpAmount) / 12,
                  )}
                  年{(userData?.seExpAmount + userData?.pgExpAmount) % 12}ヵ月
                  <div>
                    <Flex gap={5}>
                      <_HisTitle>SE経験:</_HisTitle>
                      <div>
                        {Math.floor(userData?.seExpAmount / 12)}年
                        {userData?.seExpAmount % 12}ヵ月
                      </div>
                    </Flex>
                    <Flex gap={5}>
                      <_HisTitle>PG,作業員経験:</_HisTitle>
                      <div>
                        {Math.floor(userData?.pgExpAmount / 12)}年
                        {userData?.pgExpAmount % 12}ヵ月
                      </div>
                    </Flex>
                  </div>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>IT全体歴</Td>
              <Td>
                {Math.floor(userData?.itExpAmount / 12)}年
                {userData?.itExpAmount % 12}ヵ月
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </>
  );
});

const _HisTitle = styled.div`
  width: 150px;
`;
