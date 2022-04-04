import { useCookies } from "react-cookie";
import {
  useGetAllStudyStackQuery,
  useGetAllTechTreeQuery,
} from "../../types/generated/graphql";

//学習リスト表示用の型定義
export type StackList = {
  id: string | null | undefined; //学習リストID
  timeStack: number; //学習時間（累計）
  skillTagId: string; //学習技術
  content: string; //メモ
  createdAtStart: Date; //学習記録開始日
  createdAtLast: Date; //最終学習記録日
};

/**
 * 学習リスト表示用のデータを取得する
 * @returns
 * - error:データ取得ができなかった場合
 * - loading:データ取得中の状態
 * - data:データベースから取得したデータ
 * - stackSumList:DBから取得したデータをフロント側で技術ごとに学習時間を合算したデータ
 */
export const useStackList = () => {
  const [cookies] = useCookies();

  //userIdから学習記録データを取得する
  const { loading, data, error } = useGetAllStudyStackQuery({
    //クッキーからユーザーID取得
    variables: { userToken: cookies.ForestaID },
  });

  //テックツリーから技術リストデータを取得
  const {
    data: skillTagIdListDatas,
    loading: skillTagIdLoading,
    error: skillTagIdError,
  } = useGetAllTechTreeQuery();

  //学習リストの詳細内容一つ一つを格納する新しい配列を作成
  const timeStackDatas = new Array<number>(); //学習時間
  const skillTagIdtackDatas = new Array<string>(); //学習技術
  const createdAtStartDatas = new Array<Date>(); //記録開始日
  const createdAtLastDatas = new Array<Date>(); //最終記録日
  const contentDatas = new Array<string>(); //メモ内容
  const idDatas = new Array<string | null | undefined>(); //記録id
  //上記の記録データを格納する配列
  const stackSumList = new Array<StackList>();

  if (data) {
    //取得したデータを変数に格納
    //スプレッド構文で変数に格納しないと下でdeleteする際に元のオブジェクトにも影響が出てしまうためdeleteができない
    const stackDatas = [...data.getAllStudyStack.node];
    //記録データの数だけfor文を回す
    for (let i = 0; i < stackDatas.length; i++) {
      if (stackDatas[i]) {
        let stackAnswer = stackDatas[i].timeStack;
        const startDate = stackDatas[i].createdAt;
        let lastDate = stackDatas[i].createdAt;
        let contentAnswer = stackDatas[i].content;
        const idAnswer = stackDatas[i].id;
        //i番目とi+1番目のデータを比較
        for (let j = i + 1; j < stackDatas.length; j++) {
          if (stackDatas[j]) {
            //カテゴリ名が被っていた場合
            if (stackDatas[i].skillTagId === stackDatas[j].skillTagId) {
              //技術内容が被っていた場合に学習時間は足し、最終記録日とメモデータは上書きする
              stackAnswer = stackAnswer + stackDatas[j].timeStack;
              lastDate = stackDatas[j].createdAt;
              contentAnswer = stackDatas[j].content;
              //上書きした分のデータを次のfor文で反映させないように削除
              delete stackDatas[j];
            }
          }
        }
        //それぞれのデータを配列にプッシュする
        skillTagIdtackDatas.push(stackDatas[i].skillTagId);
        timeStackDatas.push(stackAnswer);
        createdAtStartDatas.push(startDate);
        createdAtLastDatas.push(lastDate);
        contentDatas.push(contentAnswer);
        idDatas.push(idAnswer);
      }
    }
    //まとめたデータをfor文で回して学習リスト表示用に変換
    for (let i = 0; i < skillTagIdtackDatas.length; i++) {
      stackSumList.push({
        id: idDatas[i],
        timeStack: timeStackDatas[i],
        skillTagId: skillTagIdtackDatas[i],
        content: contentDatas[i],
        createdAtStart: createdAtStartDatas[i],
        createdAtLast: createdAtLastDatas[i],
      });
    }
  }

  return {
    error,
    loading,
    data,
    stackSumList,
    cookies,
    skillTagIdListDatas,
    skillTagIdLoading,
    skillTagIdError,
  };
};
