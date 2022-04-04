import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { memo } from "react";

import { useStackList } from "../../../hooks/study/useStackList";
import { Heading } from "../../atoms/common/Heading";
import { LogListTable } from "../../molucules/stackList/LogListTable";
import { StudyListTable } from "../../molucules/stackList/StudyListTable";
import { StudyModal } from "../../molucules/stackList/StudyModal";

//タブ名
const tabNames = ["StackList", "LogList"] as const;

/**
 * 学習リスト/更新情報を表示する
 * @returns 学習リストと更新情報
 */
export const StackList = memo(() => {
  //カスタムフックから学習リストデータ取得
  const { error, loading, data, stackSumList } = useStackList();

  return (
    <>
      <Flex width="50%" direction="column">
        <Flex align="center" gap={1} mb={1}>
          <Heading text="What you learned" />
          <StudyModal
            title="Add Stack"
            stackId=""
            icon={<AddIcon data-testid="addIcon" />}
            color="green"
            data-testid="addIcon"
          />
        </Flex>
        <Box
          mr={5}
          ml={5}
          backgroundColor="#f5f5f5"
          borderRadius="md"
          shadow="xl"
        >
          <Tabs
            isFitted
            isLazy
            variant="soft-rounded"
            colorScheme="green"
            p={5}
          >
            <TabList>
              {tabNames.map((tab, index) => (
                <Tab
                  key={index}
                  _focus={{ boxShadow: "none" }}
                  _selected={{ color: "white", bg: "green.300" }}
                  _hover={{ bg: "gray.300" }}
                  backgroundColor="white"
                  shadow="base"
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
            {loading ? (
              <Stack>
                <Skeleton mt={10} height={20} data-testid="loading" />
                <Skeleton height={20} />
              </Stack>
            ) : error ? (
              <p>Error...</p>
            ) : data?.getAllStudyStack.node.length ? (
              <TabPanels overflow="auto" height="550px" backgroundColor="white">
                <TabPanel backgroundColor="#f5f5f5">
                  <StudyListTable data={data} stackSumList={stackSumList} />
                </TabPanel>

                <TabPanel>
                  <LogListTable data={data} />
                </TabPanel>
              </TabPanels>
            ) : (
              <p>学習記録が1件もありません</p>
            )}
          </Tabs>
        </Box>
      </Flex>
    </>
  );
});
