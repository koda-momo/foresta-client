import {
  StudyStack,
  useGetStudyColorQuery,
} from "../../types/generated/graphql";
import { useStackList } from "./useStackList";

/**
 * 棒グラフを表示するためのデータ取得
 * @returns 棒グラフ用データ
 */
export const useTimeFig = () => {
  //学習リストのデータを取得
  const { data } = useStackList();
  const studyData = data?.getAllStudyStack.node as Array<StudyStack>;

  //技術の色データを取得
  const { data: colors } = useGetStudyColorQuery();

  //色（背景）
  const backgroundColors = new Array<string>();
  //色（線）
  const borderColors = new Array<string>();

  //データ変換用
  const firstDatasets = [];
  //グラフ用
  const datasets = [];

  //取得データをグラフ表示用に加工
  if (data && colors) {
    const stackDatas = [...data.getAllStudyStack.node];
    const colorData = [...colors.getAllTechTree];
    //学習リストで取得したデータをグラフ用に変換する
    for (const stackData of stackDatas) {
      for (const color of colorData) {
        //ラベル名と同じ色をプッシュする
        if (stackData.skillTagId === color.name) {
          backgroundColors.push(`#${color.color}`);
          borderColors.push(`#${color.color}`);
        }
      }

      firstDatasets.push({
        label: stackData.skillTagId,
        data: [
          {
            x: new Date(stackData.createdAt).getTime(),
            y: stackData.timeStack,
          },
        ],
        backgroundColor: backgroundColors,
        borderColor: borderColors,
      });
    }

    //グラフ用に変換したデータを同じ技術内容ごとに振り分けて技術内容ごとに色分けする
    for (let i = 0; i < firstDatasets.length; i++) {
      if (firstDatasets[i]) {
        for (let j = i + 1; j < firstDatasets.length; j++) {
          if (firstDatasets[j]) {
            if (firstDatasets[i].label === firstDatasets[j].label) {
              firstDatasets[i].data.push(firstDatasets[j].data[0]);
              delete firstDatasets[j];
            }
          }
        }
        //それぞれのデータをグラフ用datasetsにpushする
        datasets.push({
          label: firstDatasets[i].label,
          data: firstDatasets[i].data,
          borderWidth: 1,
          backgroundColor: backgroundColors[i],
          borderColor: borderColors[i],
        });
      }
    }
  }
  //グラフ表示用
  const chartDatas = { datasets };

  return {
    studyData,
    chartDatas,
  };
};
