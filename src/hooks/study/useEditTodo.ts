import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import { useUpdateTodoMutation, useAddTodoMutation } from "../../types/generated/graphql";
import type { TodoData, TodoModalModeType } from "../../types/types";
import { useTodoModalContext } from "./useTodoModalContext";

//バリデーションチェック
const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Todoのタイトルを入力してください")
    .max(50, "50文字以内で入力してください"),
  isStatus: yup.boolean(),
  description: yup.string(),
});

type Data = {
  title: string;
  isStatus: boolean;
  description: string;
}

/**
 * Todoを更新・作成するためのHook.
 * @param todo Todoデータ
 * @param setModalMode Todoモーダルのモードの更新関数
 */
export const useEditTodo = (todo: TodoData, setModalMode: Dispatch<SetStateAction<TodoModalModeType>>, onClose: () => void) => {
  // cookie情報取得
  const [cookies] = useCookies();
  //トーストアラート
  const toast = useToast();

  const [updateTodo] = useUpdateTodoMutation();

  // Todoを新規追加するためのmutation
  const [addTodo] = useAddTodoMutation({
    // Todo追加後、キャッシュを自動更新
    // 第二引数にはレスポンスデータ
    update(cache, { data }) {
      cache.modify({
        fields: {
          // existingTodos = はデフォルト値を設定している
          getAllTodoByUser(existingTodos = { node: [] }) {
            const newTodo = data?.addTodo?.node;

            // キャッシュに、レスポンスから取得した追加データを追加
            return { node: [...existingTodos.node, newTodo] };
          },
        },
      });
    },
  });

  const { setTodo } = useTodoModalContext();

  // react-hoook-formのuseFormを使用
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: todo.title || "",
      isStatus: todo.isStatus || false,
      description: todo.description || " ",
    },
  });

  // Todoの開始日
  const [startedAt, setStartedAt] = useState(todo.startedAt ? new Date(todo.startedAt) : new Date());

  // Todoの終了日
  const [finishedAt, setFinishedAt] = useState(
    todo.finishedAt ? new Date(todo.finishedAt) : null,
  );

  /**
   * Todoを新規作成する.
   * @param data フォームのデータ
   */
  const onCreateTodo = useCallback(async (data: Data) => {
    const newData = {
      title: data.title,
      description: data.description,
      startedAt,
      finishedAt: finishedAt || "",
      isStatus: data.isStatus,
      userToken: cookies.ForestaID,
    };
    try {
      const addTodoData = await addTodo({
        variables: {
          todo: newData,
        }
      });
      if (addTodoData.data?.addTodo.status === "success") {
        toast({
          title: "Todoを追加しました",
          status: "success",
          position: "bottom-left",
          isClosable: true
        });
        onClose();

      } else if (addTodoData.data?.addTodo.status === "error") {
        toast({
          title: "Todoの追加に失敗しました",
          status: "error",
          position: "bottom-left",
          isClosable: true
        });
      }

    } catch (error) {
      if (error instanceof Error) { // errorがunknown型で返ってくるので型ガード
        toast({
          title: "Todoの追加に失敗しました",
          status: "error",
          position: "bottom-left",
          isClosable: true
        });
      }
    }
  }, [addTodo, finishedAt, onClose, startedAt, toast, cookies]);

  /**
   * Todoを更新する.
   * @param data フォームのデータ
   */
  const onUpdateTodo = useCallback(async (data: Data) => {
    const newData = {
      todoId: todo.id,
      title: data.title,
      description: data.description,
      startedAt,
      finishedAt: finishedAt || "",
      isStatus: data.isStatus
    };

    try {
      const updateTodoData = await updateTodo({
        variables: {
          todo: newData,
        }
      });
      if (updateTodoData.data?.updateTodo.status === "success") {
        toast({
          title: "Todoを更新しました",
          status: "success",
          position: "bottom-left",
          isClosable: true
        });

        // 表示させるTodoを手動で更新
        setTodo({
          ...todo,
          title: data.title,
          description: data.description,
          startedAt,
          finishedAt: finishedAt || null,
          isStatus: data.isStatus,
        });
        // 閲覧モードに戻す
        setModalMode("read");

      } else if (updateTodoData.data?.updateTodo.status === "error") {
        toast({
          title: "Todoの更新に失敗しました",
          status: "error",
          position: "bottom-left",
          isClosable: true
        });
      }

    } catch (error) {
      if (error instanceof Error) { // errorがunknown型で返ってくるので型ガード
        toast({
          title: "Todoの更新に失敗しました",
          status: "error",
          position: "bottom-left",
          isClosable: true
        });
      }
    }
  }, [finishedAt, setModalMode, setTodo, startedAt, toast, todo, updateTodo]);

  return {
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
  };
};