import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { FC, memo } from "react";
import { GetAllStudyStackQuery } from "../../../types/generated/graphql";
import { StackList } from "../../../hooks/study/useStackList";
import styled from "styled-components";
import { getFormattedStackDate } from "../../../utils/methods";

type Props = {
  data: GetAllStudyStackQuery | undefined; //データベースから取得した記録データ
  stackSumList: Array<StackList>; //取得したデータをフロントで操作したデータ
};

/**
 * 学習記録リストを表示するテーブル
 */
export const StudyListTable: FC<Props> = memo((props) => {
  const { stackSumList } = props;
  return (
    <Table variant="simple" colorScheme="gray">
      <Thead position="sticky" top={0} background="#f5f5f5">
        <Tr>
          <Th>
            <_Content>Tech</_Content>
          </Th>
          <Th>
            <_Content>Hours</_Content>
          </Th>
          <Th>Started at</Th>
          <Th>Ended at</Th>
        </Tr>
      </Thead>

      {stackSumList &&
        stackSumList.map((stackList) => (
          <Tbody key={stackList.id} backgroundColor="white">
            <Tr>
              <Td>
                <_Content>{stackList.skillTagId}</_Content>
              </Td>
              <Td>
                <_Content>
                  {(stackList.timeStack / 60).toFixed(1)}Hours
                </_Content>
              </Td>
              <Td>
                <_Content>
                  {getFormattedStackDate(new Date(stackList.createdAtStart))}
                </_Content>
              </Td>
              <Td>
                <_Content>
                  {getFormattedStackDate(new Date(stackList.createdAtLast))}
                </_Content>
              </Td>
            </Tr>
            <Tr>
              <Td colSpan={4} textAlign="center">
                {stackList.content}
              </Td>
            </Tr>
            <Tr>
              <Td colSpan={4} backgroundColor="#f5f5f5"></Td>
            </Tr>
          </Tbody>
        ))}
    </Table>
  );
});

const _Content = styled.span`
  overflowx: hidden;
  white-space: nowrap;
`;
