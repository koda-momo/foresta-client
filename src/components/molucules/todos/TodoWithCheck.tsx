import { FC, memo } from "react";
import { Checkbox, Flex } from "@chakra-ui/react";
import styled from "styled-components";

import { getformattedTodoDate } from "../../../utils/methods";
import type { TodoData } from "../../../types/types";
import { useChangeTodoStatus } from "../../../hooks/study/useChangeTodoStatus";

type Props = {
  todo: TodoData;
  openReadModal: (todo: TodoData) => void;
};

/**
 * Todoリストの一つのTodoを表示するコンポーネント.
 */
export const TodoWithCheck: FC<Props> = memo((props) => {
  const { todo, openReadModal } = props;
  // Todoのステータスを変更する関数をhooksから取得
  const { onChangeTodoStatus } = useChangeTodoStatus(todo.id);

  return (
    <Flex
      align="center"
      justify="space-between"
      _hover={{ backgroundColor: "#f5f5f5", cursor: "pointer" }}
      onClick={() => openReadModal(todo)}
    >
      <Flex align="center" overflow="hidden" white-space="nowrap">
        {/* ここでonClickで呼び出さないとe.stopPropagation();がうまくいかなかった */}
        <div onClick={(e) => onChangeTodoStatus(e)}>
          <Checkbox
            isChecked={todo.isStatus}
            colorScheme="green"
            size="lg"
            padding="5px"
          />
        </div>
        <_Title>{todo.title}</_Title>
      </Flex>
      <_Date>{getformattedTodoDate(todo.startedAt, todo.finishedAt)}</_Date>
    </Flex>
  );
});

// Todoのタイトルのスタイル
// 長すぎる場合は...で省略する
const _Title = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const _Date = styled.span`
  white-space: nowrap;
`;
