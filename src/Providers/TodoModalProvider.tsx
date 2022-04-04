import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { TodoData, TodoModalModeType } from "../types/types";

type Props = {
  children: ReactNode;
};

// contextのタイプ定義
type ContextType = {
  modalMode: TodoModalModeType;
  setModalMode: Dispatch<SetStateAction<TodoModalModeType>>;
  todo: TodoData;
  setTodo: Dispatch<SetStateAction<TodoData>>;
};

// contextを使用する
export const TodoModalContext = createContext<ContextType | undefined>(undefined);

/**
 * Todoのモーダルの状態を管理するグローバルstate.
 */
export const TodoModalProvider: FC<Props> = (props) => {
  const { children } = props;

  // モーダルのモード (read, edit, add, delete)
  const [modalMode, setModalMode] = useState<TodoModalModeType>("read");
  // モーダルに表示する対象のTodo
  const [todo, setTodo] = useState<TodoData>({
    id: "",
    title: "",
    description: "",
    startedAt: "",
    finishedAt: "",
    isStatus: false,
  });

  return (
    <TodoModalContext.Provider
      value={{
        modalMode,
        setModalMode,
        todo,
        setTodo,
      }}
    >
      {children}
    </TodoModalContext.Provider>
  );
};
