import { FC, memo } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  List,
  ListItem,
  IconButton,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import type { ApolloError } from "@apollo/client";

import { Heading } from "../../atoms/common/Heading";
import { TodoWithCheck } from "../../molucules/todos/TodoWithCheck";
import type { TodoData } from "../../../types/types";
import { useTodoList } from "../../../hooks/study/useTodoList";

type Props = {
  todos: Array<TodoData | null>;
  loading: boolean;
  error: ApolloError | undefined;
  openReadModal: (todo: TodoData) => void;
  openAddModal: (startedAt?: Date, finishedAt?: Date) => void;
};

// タブのタイプ
const tabs = ["All", "Today", "Expired"] as const; //as const をつけてreadonlyにする

/**
 * Todoリストを表示するコンポーネント.
 */
export const TodoList: FC<Props> = memo((props) => {
  const { todos, loading, error, openReadModal, openAddModal } = props;

  const { getFilteredTodos } = useTodoList(todos);

  return (
    <Flex width="50%" direction="column">
      <Flex align="center" gap={1}>
        <Heading text="TodoList" />
        <IconButton
          aria-label="Add Todo"
          color="white"
          bg="green.300"
          _hover={{ bg: "green.400" }}
          _focus={{ boxShadow: "none" }}
          _active={{ boxShadow: "none", bg: "green.500" }}
          icon={<AddIcon />}
          onClick={() => openAddModal()}
        />
      </Flex>
      <Box
        bg="#f5f5f5"
        width="93%"
        margin="auto"
        padding="8px 32px 32px 32px"
        flexGrow={1}
        borderRadius="md"
        shadow="xl"
      >
        <Tabs variant="soft-rounded" isLazy height="full">
          <Flex direction="column" height="full">
            <TabList>
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  bg="white"
                  _focus={{ boxShadow: "none" }}
                  _selected={{
                    pointerEvents: "none",
                    bg: "green.300",
                    color: "white",
                  }}
                  _hover={{ bg: "green.50" }}
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
            <TabPanels
              bg="white"
              padding="10px 40px"
              overflow="auto"
              flexGrow={1}
              borderRadius="md"
            >
              {tabs.map((tab, index) => {
                return (
                  <TabPanel key={index}>
                    {loading ? (
                      <Stack spacing={5}>
                        <Skeleton height="20px" data-testid="todo-loading" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                      </Stack>
                    ) : error ? (
                      <>エラーが発生しました{error.message}</>
                    ) : getFilteredTodos(tab).length > 0 ? (
                      <List spacing={3}>
                        {getFilteredTodos(tab).map((todo) => (
                          <ListItem key={todo.id}>
                            <TodoWithCheck
                              todo={todo}
                              openReadModal={openReadModal}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <p>該当のTodoが存在しません</p>
                    )}
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Flex>
        </Tabs>
      </Box>
    </Flex>
  );
});
