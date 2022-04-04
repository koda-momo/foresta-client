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
  Box,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import styled from "styled-components";

import { TableFlexItem } from "../../atoms/TableFlexItem";
import { returnCodeToBr } from "../../../utils/methods";
import {
  SpecProjectSheet,
  useGetSheetProjectByUserIdQuery,
} from "../../../types/generated/graphql";
import { AccordionContent } from "../AccordionContent";
import { format } from "date-fns";

/**
 * 開発経験.
 */
export const Project: FC = memo(() => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * スペックシート開発経験取得.
   */
  const { data, loading, error } = useGetSheetProjectByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  const projectData = data?.projects.node.project as Array<SpecProjectSheet>;

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
      {projectData &&
        projectData.map((project) => (
          <div key={project?.id}>
            {project.name && (
              <>
                <AccordionContent
                  title={project?.name}
                  content={
                    <>
                      <Table variant="striped" colorScheme="gray">
                        <Thead>
                          <Tr>
                            <Th>項目名</Th>
                            <Th>内容</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>プロジェクト名</Td>
                            <Td>{project?.name}</Td>
                          </Tr>
                          <Tr>
                            <Td>期間</Td>
                            <Td>
                              <Flex gap={3}>
                                {project?.startedAt && (
                                  <>
                                    {format(
                                      new Date(project?.startedAt),
                                      "yyyy-M-d",
                                    )}
                                    ~
                                    {format(
                                      new Date(project?.finishedAt),
                                      "yyyy-M-d",
                                    )}
                                  </>
                                )}
                              </Flex>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>担当役割</Td>
                            <Td>{project?.roleSharing}</Td>
                          </Tr>
                          <Tr>
                            <Td>担当工程</Td>
                            <Td>
                              <TableFlexItem itemArray={project?.devRoles} />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>チーム人数</Td>
                            <Td>
                              {project?.memberCount != 0 && (
                                <>{project?.memberCount}</>
                              )}
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>動作環境(OS)</Td>
                            <Td>
                              <TableFlexItem
                                itemArray={project?.operationEnvs}
                              />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>言語</Td>
                            <Td>
                              <TableFlexItem itemArray={project?.languages} />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>フレームワーク</Td>
                            <Td>
                              <TableFlexItem itemArray={project?.frameworks} />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>ライブラリ</Td>
                            <Td>
                              <TableFlexItem itemArray={project?.libraries} />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>ツール・その他</Td>
                            <Td>
                              <TableFlexItem itemArray={project?.otherTools} />
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                      <_Detail>プロジェクト詳細</_Detail>
                      <Box mx={10}>{returnCodeToBr(project?.content)}</Box>
                    </>
                  }
                  size="sm"
                />
              </>
            )}
          </div>
        ))}
    </>
  );
});

const _Detail = styled.div`
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;
