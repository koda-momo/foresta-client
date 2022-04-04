import { FC, memo } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Box,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import styled from "styled-components";

import { TodoEditForm } from "../../molucules/todos/TodoEditForm";
import { TodoHeaderButtons } from "../../molucules/todos/TodoHeaderButtons";
import { DeleteConfirm } from "../../molucules/todos/DeleteConfirm";
import { getformattedTodoDate, returnCodeToBr } from "../../../utils/methods";
import { useTodoModalContext } from "../../../hooks/study/useTodoModalContext";
import { ButtonItem } from "../../atoms/common/ButtonItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Todoの詳細表示や編集のためのモーダルコンポーネント.
 */
export const TodoModal: FC<Props> = memo((props) => {
  const { isOpen, onClose } = props;

  const { todo, modalMode, setModalMode } = useTodoModalContext();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size="xl"
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        {/* 編集モードもしくは追加モード */}
        {(modalMode === "update" || modalMode === "create") && (
          <TodoEditForm
            todo={todo}
            setModalMode={setModalMode}
            onClose={onClose}
          />
        )}
        {/* 閲覧モード */}
        {modalMode === "read" && (
          <>
            <ModalHeader>
              <Flex justify="start">
                <CloseButton onClick={onClose} />
              </Flex>
            </ModalHeader>

            <ModalBody padding="0 4rem">
              <>
                <Heading as="h2" size="lg" mb={5}>
                  {todo.title}
                </Heading>
                <div>
                  <_Label>Date: </_Label>

                  {getformattedTodoDate(todo.startedAt, todo.finishedAt)}
                </div>
                <div>
                  <_Label>Status: </_Label>
                  {todo.isStatus ? "完了" : "未完了"}
                </div>

                <Box mt={5}>
                  <_Label>Detail</_Label>
                  <_MemoContent>
                    {todo.description ? returnCodeToBr(todo.description) : " "}
                  </_MemoContent>
                </Box>
              </>
            </ModalBody>
            <ModalFooter>
              <Flex gap={5}>
                <ButtonItem
                  onClick={() => setModalMode("update")}
                  name={
                    <>
                      <EditIcon />
                      <span>Edit Todo</span>
                    </>
                  }
                />
                <ButtonItem
                  onClick={() => setModalMode("delete")}
                  backgroundColor="red"
                  name={
                    <>
                      <DeleteIcon />
                      Delete Todo
                    </>
                  }
                />
              </Flex>
            </ModalFooter>
          </>
        )}

        {/* 削除モード */}
        {modalMode === "delete" && <DeleteConfirm onClose={onClose} />}
      </ModalContent>
    </Modal>
  );
});

const _Label = styled.span`
  font-weight: bold;
`;

const _MemoContent = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 40px;
  border-radius: 10px;
  min-height: 50px;
`;
