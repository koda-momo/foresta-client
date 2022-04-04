import { useCallback } from "react";
import { isWithinInterval, isToday, isBefore, addDays } from "date-fns";
import type { TodoData } from "../../types/types";

/**
 * Todoの配列の中身がnullでないことをチェックする.
 *
 * @remarks trueなら、引数の配列の中身はTodoData型になる
 * @param todos Todoの配列
 * @returns Todoの配列の中身がnullでないか
 */
export const isNonNullTodoData = (
  todoDataList: Array<TodoData | null>,
): todoDataList is Array<TodoData> => {
  return todoDataList.length > 0;
};

/**
 * 表示するTodoリストをセットするhooks.
 * @param todos DBから取得したTodoリスト
 */
export const useTodoList = (todos: Array<TodoData | null>) => {

  /**
   * 期限切れのTodoかどうかを返すメソッド.
   * @param todo - 対象のTodo
   * @returns 期限切れかどうかのboolean
   */
  const isExpired = (todo: TodoData): boolean => {
    const today = new Date();

    const startDate = new Date(todo?.startedAt);
    if (todo?.finishedAt) {
      // 複数日間のタスク
      const endDate = new Date(todo?.finishedAt);
      return isBefore(addDays(endDate, 1), today);
    }
    return isBefore(addDays(startDate, 1), today);
  };

  /**
   * 日付でTodoリストを並び替えて返すメソッド.
   * @param todos - 並び替えたいTodoリスト
   * @returns 日付の昇順で並び替えたTodoリスト
   */
  const getSortedTodosByDate = (todoList: Array<TodoData>) => {
    const sortedTodoList = todoList.sort((a: TodoData, b: TodoData) => {
      // 終了日があれば終了日、なければ開始日で比較する
      return ((a.finishedAt || a.startedAt) < (b.finishedAt || b.startedAt)) ? -1 : 1;
    });
    return sortedTodoList;
  };

  /**
   * Todoをタブのタイプに応じてフィルタリングする.
   *
   * @returns フィルタリングしたtodoの配列
   */
  const getFilteredTodos = useCallback((tabType: "All" | "Today" | "Expired") => {
    const today = new Date();

    // todosの中身がnullかどうかで型ガード
    if (!isNonNullTodoData(todos)) {
      return [];
    }

    // switch文で場合分け
    switch (tabType) {
      // 全ての場合
      case "All": {
        // 未完了のもの + 今日か未来のもの
        // 過去 + 完了済みのものは排除
        const todoList = todos.filter((todo) => !(isExpired(todo) && todo.isStatus));
        // 日付で並び替えて返す
        return getSortedTodosByDate(todoList);
      }
      case "Today": {
        // 今日の場合
        const todoList = todos.filter((todo) => {
          // 期間に今日が含まれているものを返す
          const startDate = new Date(todo.startedAt);
          if (todo?.finishedAt) {
            // 複数日間のタスク
            const endDate = new Date(todo?.finishedAt);

            // date-fnsのisWithinIntervalメソッドで、範囲内に入っているかどうかを判定
            return (
              isWithinInterval(today, {
                start: startDate,
                end: endDate,
              }) ||
              isToday(startDate) ||
              isToday(endDate)
            );
          } else {
            // 一日のタスク
            // date-fnsのisTodayメソッドで、今日かどうかを判定
            return isToday(startDate);
          }
        });
        return getSortedTodosByDate(todoList);
      }
      case "Expired": {
        // 期限切れの場合
        const todoList = todos.filter((todo) => {
          // 期限切れかつ、未完了のものを返す
          return isExpired(todo) && !todo.isStatus;
        });
        return getSortedTodosByDate(todoList);
      }
    }
  }, [todos]);

  return { getFilteredTodos };
};