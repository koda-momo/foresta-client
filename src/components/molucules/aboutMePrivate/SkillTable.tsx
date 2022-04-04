import { memo, FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import { TableFlexItem } from "../../atoms/TableFlexItem";
import {
  SpecTechInfoSheet,
  useGetSheetSkillByUserIdQuery,
} from "../../../types/generated/graphql";

/**
 * スキル要約.
 */
export const SkillTable: FC = memo(() => {
  //cookieからID取得
  const [cookies] = useCookies();
  /**
   * スペックシートスキル要約取得.
   */
  const { data, loading, error } = useGetSheetSkillByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  const skillData = data?.skills.node.techInfo as SpecTechInfoSheet;

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
      {skillData && (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>項目名</Th>
              <Th>内容</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>動作環境(OS)</Td>
              <Td>
                <TableFlexItem itemArray={skillData?.operationEnvs} />
              </Td>
            </Tr>
            <Tr>
              <Td>フレームワーク</Td>
              <Td>
                <TableFlexItem itemArray={skillData?.frameworks} />
              </Td>
            </Tr>
            <Tr>
              <Td>言語</Td>
              <Td>
                <TableFlexItem itemArray={skillData?.languages} />
              </Td>
            </Tr>
            <Tr>
              <Td>ライブラリ</Td>
              <Td>
                <TableFlexItem itemArray={skillData?.libraries} />
              </Td>
            </Tr>
            <Tr>
              <Td>ツール・その他</Td>
              <Td>
                <TableFlexItem itemArray={skillData?.otherTools} />
              </Td>
            </Tr>
            <Tr>
              <Td>担当開発工程</Td>
              <Td>
                <TableFlexItem itemArray={skillData?.devRoles} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </>
  );
});
