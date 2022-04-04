import { useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { isSameDay } from "date-fns";

import type { TodoData } from "../../types/types";
import { useTodoModalContext } from "./useTodoModalContext";

/**
 * Todoのモーダルを操作するためのhook.
 */
export const useTodoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setModalMode, setTodo } = useTodoModalContext();

  /**
   * Todo詳細表示のモーダルを開く.
   * @param todo モーダルに表示するTodo
   */
  const openReadModal = useCallback((todo: TodoData) => {
    setModalMode("read");
    setTodo(todo);
    onOpen();
  }, [onOpen, setModalMode, setTodo]);

  /**
   * Todo追加用のモーダルを開く.
   */
  const openAddModal = useCallback((startedAt?: Date, finishedAt?: Date) => {
    // モーダルのモードを追加モードに設定
    setModalMode("create");
    if (startedAt && finishedAt) {
      // カレンダーの日付変更がトリガーとなった時
      setTodo({
        id: "",
        title: "",
        description: "",
        startedAt,
        finishedAt: isSameDay(startedAt, finishedAt) ? null : finishedAt, // 単一日の場合終了日をnullに
        isStatus: false,
      });
    } else {
      // Todo追加ボタンがトリガーとなった時
      // Todoはデフォルト値で初期化
      setTodo({
        id: "",
        title: "",
        description: "",
        startedAt: "",
        finishedAt: "",
        isStatus: false,
      });
    }

    onOpen();
  }, [onOpen, setModalMode, setTodo]);

  return { isOpen, onOpen, onClose, openReadModal, openAddModal };
};