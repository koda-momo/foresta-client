import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { FC, memo } from "react";
import { GetAllStudyStackQuery } from "../../../types/generated/graphql";
import { getFormattedStackDate } from "../../../utils/methods";
import { StudyModal } from "./StudyModal";

type Props = {
  data: GetAllStudyStackQuery | undefined; //データベースから取得した記録データ
};

/**
 * 記録情報テーブル
 */
export const LogListTable: FC<Props> = memo((props) => {
  const { data } = props;

  return (
    <Table variant="simple" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Started at</Th>
          <Th>Tech</Th>
          <Th>Hours</Th>
          <Th>Edit</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.getAllStudyStack.node.map((stackList) => (
            <Tr key={stackList.id}>
              <Td>{getFormattedStackDate(new Date(stackList.createdAt))}</Td>
              <Td>{stackList.skillTagId}</Td>
              <Td>{(stackList.timeStack / 60).toFixed(1)}Hours</Td>
              <Td>
                <StudyModal
                  title="Edit Stack"
                  icon={<EditIcon />}
                  stackId={stackList.id}
                  color="green"
                  data-testid="editIcon"
                />
              </Td>
              <Td>
                <StudyModal
                  title="Delete Stack"
                  icon={<DeleteIcon />}
                  stackId={stackList.id}
                  color="gray"
                  data-testid="deleteIcon"
                />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
});
