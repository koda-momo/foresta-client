import { useState } from "react";

/**
 * 学習時間グラフ用ボタンメソッド
 * @returns 学習時間グラフ用ボタンメソッド
 */
export const useFigBtn = () => {
  //月ごとか日毎か
  const [isDay, setIsDay] = useState(true);
  const [title, setTitle] = useState("Monthly");

  //月ごと表示ボタン
  const monthBtn = () => {
    if (isDay === true) {
      setIsDay(false);
      setTitle("Daily");
    }
    if (isDay === false) {
      setIsDay(true);
      setTitle("Monthly");
    }
  };

  //日付用グラフの変化させる日にち
  const [dateValueDay, setDateValueDay] = useState(0);
  //月用グラフの変化させる月
  const [dateValueMonth, setDateValueMonth] = useState(0);
  //過去の記録を見るメソッド
  const subDateBtn = () => {
    if (isDay) {
      setDateValueDay(dateValueDay + 7);
    } else {
      setDateValueMonth(dateValueMonth + 1);
    }
  };
  //未来の記録を見るメソッド
  const addDateBtn = () => {
    if (isDay) {
      setDateValueDay(dateValueDay - 7);
    } else {
      setDateValueMonth(dateValueMonth - 1);
    }
  };
  return {
    monthBtn,
    subDateBtn,
    addDateBtn,
    dateValueDay,
    dateValueMonth,
    isDay,
    title,
  };
};
