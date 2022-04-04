import { format } from "date-fns";
import HTMLReactParser from "html-react-parser";

/**
 * 日時データをフォーマットして返すメソッド.
 *
 * @param date - フォーマットしたい日時データ
 * @returns "YYYY/MM/DD"の形でフォーマットされた日時
 */
export const getFormattedDate = (date: Date) => {
  return format(date, "yyyy/MM/dd");
};

/**
 * 日時データを月と日だけでフォーマットして返すメソッド.
 *
 * @param date - フォーマットしたい日時データ
 * @returns "MM/DDの形でフォーマットされた日時
 */
export const getFormattedDateWithoutYear = (date: Date) => {
  return format(date, "MM/dd");
};

/**
 * Todo用にフォーマットされた日付を返すメソッド.
 *
 * @remarks
 * 終了日が設定されている場合とされてない場合で場合分け
 * @param startedA - 対象のTodoの開始日
 * @param finishedAt - 対象のTodoの終了日
 * @returns フォーマットされた日付
 */
export const getformattedTodoDate = (
  startedAt: string,
  finishedAt: string | null | undefined,
): string => {
  if (startedAt && finishedAt) {
    return `${getFormattedDate(
      new Date(startedAt),
    )}-${getFormattedDateWithoutYear(new Date(finishedAt))}`;
  } else if (startedAt) {
    return `${getFormattedDate(new Date(startedAt))}`;
  } else {
    return "未定";
  }
};

/**
 * テキストをHTMLに変換するメソッド.
 *
 * @remarks
 * 改行はbrタグに変換する。
 *
 * @param text - HTMLに変換するテキスト
 * @returns textが空文字列の場合は空文字列。そうでなければHTMLに変換した文字列。
 */
export const returnCodeToBr = (text: string) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br />"));
  }
};

/**
 * 学習リスト用にフォーマットされた日付を返すメソッド.
 *
 * @param date - フォーマットしたい日時データ
 * @returns "YYYY年MM月DD日"の形でフォーマットされた日時
 */
export const getFormattedStackDate = (date: Date) => {
  return format(date, "yyyy/MM/dd");
};
