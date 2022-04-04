import {
  StudyStack,
  useGetStudyColorQuery,
} from "../../types/generated/graphql";
import { ChartData, ChartOptions } from "chart.js";
import { addDays } from "date-fns";

/**
 * %表示用グラフ作成hooks(日別).
 */
export const usePercentDate = (
  data: Array<StudyStack>,
  dateValueDay: number,
) => {
  /**
   * 技術の色データを取得.
   */
  const { data: colors } = useGetStudyColorQuery();
  const colorData = colors?.getAllTechTree as Array<{
    name: string;
    color: string;
  }>;

  //選択している日付データ
  const endDate = addDays(new Date(), -dateValueDay);
  const startDate = addDays(endDate, -7);

  //チャート表示用配列
  const labelArray = new Array<string>(); //ラベルデータ
  let timeArray = new Array<number>(); //時間のデータ
  const colorArray = new Array<string>(); //色のデータ

  /**
   * チャートデータ作成用(日別).
   */
  if (data && colors) {
    /**
     * 時間を搾る
     */
    const studyData = data.filter(
      (item) =>
        new Date(item.createdAt) <= endDate &&
        new Date(item.createdAt) >= startDate,
    );

    /**
     * カテゴリで情報をまとめて、ラベルの配列と時間の配列作成.
     */
    for (let i = 0; i < studyData.length; i++) {
      if (studyData[i]) {
        let totalTime = studyData[i].timeStack;
        for (let j = i + 1; j < studyData.length; j++) {
          if (studyData[j]) {
            if (studyData[i].skillTagId === studyData[j].skillTagId) {
              totalTime += studyData[j].timeStack;
              delete studyData[j];
            }
          }
        }
        labelArray.push(studyData[i].skillTagId);
        timeArray.push(totalTime);
      }
    }

    //%を出すためのトータル時間
    let total = 0;
    /**
     * 時間の配列単位を%に置き換え.
     */
    for (const time of timeArray) {
      total += time;
    }
    timeArray = timeArray.map((time) => Math.round((time / total) * 100));

    /**
     * ラベルの配列を基に色の配列を作成.
     */
    for (const label of labelArray) {
      for (const color of colorData) {
        if (label === color.name) {
          colorArray.push(`#${color.color}`);
        }
      }
    }
  }

  //円グラフデータ
  const pieDateData: ChartData<"pie"> = {
    labels: labelArray, //ラベル
    datasets: [
      {
        label: "日別%表示グラフ",
        data: timeArray, //時間データ
        backgroundColor: colorArray, //色
        hoverOffset: 4,
      },
    ],
  };

  //オプション(未定)
  const dayPercentOptions: ChartOptions<"pie"> = {};

  return { pieDateData, dayPercentOptions };
};
