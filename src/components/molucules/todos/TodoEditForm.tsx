import { Dispatch, FC, memo, SetStateAction } from "react";
import {
  Flex,
  Box,
  Input,
  Heading,
  Textarea,
  Checkbox,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import styled from "styled-components";

import { ButtonItem } from "../../atoms/common/ButtonItem";
import { TextInput } from "../../atoms/common/TextInput";
import { DateRangePicker } from "../../atoms/study/DateRangePicker";
import type { TodoData, TodoModalModeType } from "../../../types/types";
import { useEditTodo } from "../../../hooks/study/useEditTodo";
import { useTodoModalContext } from "../../../hooks/study/useTodoModalContext";

type Props = {
  todo: TodoData;
  setModalMode: Dispatch<SetStateAction<TodoModalModeType>>;
  onClose: () => void;
};

/**
 * Todoの詳細を編集するコンポーネント.
 */
export const TodoEditForm: FC<Props> = memo((props) => {
  const { todo, setModalMode, onClose } = props;
  const { modalMode } = useTodoModalContext();

  const {
    register,
    handleSubmit,
    onUpdateTodo,
    onCreateTodo,
    errors,
    watch,
    startedAt,
    setStartedAt,
    finishedAt,
    setFinishedAt,
  } = useEditTodo(todo, setModalMode, onClose);

  return (
    <>
      <ModalHeader>
        {modalMode === "update" && (
          <Heading color="#696969" size="md">
            Todoを編集する
          </Heading>
        )}
        {modalMode === "create" && (
          <Heading color="#696969" size="md">
            Todoを追加する
          </Heading>
        )}
      </ModalHeader>
      <ModalBody padding="0 4rem">
        <>
          <div>
            <TextInput
              registers={register("title")}
              errorMessage={errors.title?.message}
              label="Title"
              placeholder="必須・50文字以内"
            />
          </div>
          <_Label>Date </_Label>
          <DateRangePicker
            startedAt={startedAt}
            setStartedAt={setStartedAt}
            finishedAt={finishedAt}
            setFinishedAt={setFinishedAt}
          />
          <Flex alignItems="center" mt={2}>
            <_Label>Status: </_Label>
            {watch("isStatus") ? "完了" : "未完了"}
            <Checkbox
              {...register("isStatus")}
              size="lg"
              colorScheme="green"
              bg="white"
              ml={1}
            />
          </Flex>

          <Box mt={5}>
            <_Label>Detail</_Label>
            <Textarea {...register("description")} mb={5} rows={10} />
          </Box>
        </>
      </ModalBody>
      <ModalFooter>
        {modalMode === "update" && (
          <Flex gap={5}>
            <ButtonItem onClick={handleSubmit(onUpdateTodo)} name={"Save"} />
            <ButtonItem
              onClick={() => setModalMode("read")}
              backgroundColor="gray"
              name={"Cancel"}
            />
          </Flex>
        )}
        {modalMode === "create" && (
          <Flex gap={5}>
            <ButtonItem onClick={handleSubmit(onCreateTodo)} name={"Save"} />
            <ButtonItem
              onClick={onClose}
              backgroundColor="gray"
              name={"Cancel"}
            />
          </Flex>
        )}
      </ModalFooter>
    </>
  );
});

const _Label = styled.span`
  color: "#9F9F9F";
  text-align: left;
  font-weight: bold;
`;
