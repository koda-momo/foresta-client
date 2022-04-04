import { FC, memo } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { TodoList } from "./TodoList";
import { TodoModal } from "./TodoModal";
import { Calendar } from "../../molucules/todos/Calendar";
import { useGetAllTodoByUserQuery } from "../../../types/generated/graphql";
import { useTodoModal } from "../../../hooks/study/useTodoModal";

/**
 * Todoを表示するエリアのコンポーネント.
 */
export const TodosArea: FC = memo(() => {
  //cookie情報取得
  const [cookies] = useCookies();
  const userToken = cookies.ForestaID;

  // Todoのモーダルを使用するためのhookを使用する
  const { isOpen, onClose, openReadModal, openAddModal } = useTodoModal();

  // Todoリストを取得するためのqueryを使用する
  const { data, error, loading } = useGetAllTodoByUserQuery({
    variables: {
      userToken,
    },
  });

  // todoの配列をデータから抽出
  const todos = data?.todos.node;

  return (
    <Container maxWidth="full" pt={10}>
      <Flex alignItems="stretch">
        {/* Todoリストエリア */}
        <TodoList
          todos={todos || []} // todosがなければ空配列を渡す
          loading={loading}
          error={error}
          openReadModal={openReadModal}
          openAddModal={openAddModal}
        />

        {/* カレンダーエリア */}
        <Calendar
          todos={todos || []} // todosがなければ空配列を渡す
          error={error}
          openReadModal={openReadModal}
          openAddModal={openAddModal}
        />
      </Flex>

      {/* Todoモーダル */}
      <TodoModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
});
