import { useContext } from "react";
import { TodoModalContext } from "../../Providers/TodoModalProvider";

/**
 * TodoModalContextを使用するためのuseContextをラップ.
 * @remarks 初期値で設定したundefinedをチェックする。undefinedの場合はエラーを出す。
 */
export const useTodoModalContext = () => {
  const context = useContext(TodoModalContext);

  if (context === undefined) {
    throw new Error("useTodoModalContext must be used within a TodoModalProvider");
  }

  return context;
};
