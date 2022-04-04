import { useCallback } from "react";
import type { Reference } from "@apollo/client/cache";
import { useToast } from "@chakra-ui/react";
import { useRemoveTodoMutation } from "../../types/generated/graphql";

/**
 * Todoを削除するためのHook.
 */
export const useDeleteTodo = (todoId: string, onClose: () => void) => {
  // トーストアラート
  const toast = useToast();

  // Todoを削除するmutation
  const [removeTodo] = useRemoveTodoMutation({
    // update関数で手動でキャッシュを書き換える
    update(cache) {
      cache.modify({
        fields: {
          // existingEventRefs.node...各データへの参照の配列, readField...refを扱う便利関数
          getAllTodoByUser(existingEventRefs, { readField }) {

            // 削除したもの以外で配列を作成し、キャッシュデータを書き換える
            const newTodos = existingEventRefs.node.filter(
              (ref: Reference) => todoId !== readField("id", ref)
            );
            return { node: newTodos };
          }
        }
      });
    }
  });

  /**
   * Todoを削除する.
   */
  const onDeleteTodo = useCallback(async () => {
    try {
      const res = await removeTodo({
        variables: {
          todoId
        }
      });
      if (res.data?.removeTodo.status === "success") {
        toast({
          title: "Todoを削除しました",
          status: "success",
          position: "bottom-left",
          isClosable: true
        });
        onClose();
      } else if (res.data?.removeTodo.status === "error") {
        toast({
          title: "Todoの削除に失敗しました",
          status: "error",
          position: "bottom-left",
          isClosable: true
        });
      }

    } catch (error) {
      if (error instanceof Error) { // errorがunknown型で返ってくるので型ガード
        toast({
          title: "Todoの削除に失敗しました",
          status: "error",
          position: "bottom-left",
          isClosable: true
        });
      }
    }
  }, [onClose, removeTodo, todoId, toast]);

  return { onDeleteTodo };
};