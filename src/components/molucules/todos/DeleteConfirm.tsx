import { FC, memo } from "react";
import { Flex, ModalBody, Heading } from "@chakra-ui/react";

import { ButtonItem } from "../../atoms/common/ButtonItem";
import { useDeleteTodo } from "../../../hooks/study/useDeleteTodo";
import { useTodoModalContext } from "../../../hooks/study/useTodoModalContext";

type Props = {
  onClose: () => void;
};

/**
 * Todoの削除確認モーダルコンポーネント.
 */
export const DeleteConfirm: FC<Props> = memo((props) => {
  const { onClose } = props;

  const { todo, setModalMode } = useTodoModalContext();

  // Todoを削除するhooksを使用
  const { onDeleteTodo } = useDeleteTodo(todo.id, onClose);

  return (
    <ModalBody padding="0 4rem">
      <Flex
        height={"300px"}
        align="center"
        justify="center"
        direction="column"
        gap={8}
      >
        <Heading as="p" size="md">
          ⚠️Todoを削除しますか？
        </Heading>
        <Flex align="center" justify="center" gap={8}>
          <ButtonItem
            onClick={onDeleteTodo}
            backgroundColor="red"
            name={"Yes"}
          />
          <ButtonItem
            onClick={() => setModalMode("read")}
            backgroundColor="gray"
            name={"No"}
          />
        </Flex>
      </Flex>
    </ModalBody>
  );
});
