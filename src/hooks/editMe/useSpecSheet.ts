import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  GetPrAndSheetByUserIdDocument,
  useGetPrAndSheetByUserIdQuery,
  useUpdateSpecSheetMutation,
} from "../../types/generated/graphql";
import { useCookies } from "react-cookie";

import {
  GetUserByIdDocument,
  useUpdateUserMutation,
} from "../../types/generated/graphql";

/**
 * public部分スペックシートその他情報編集メソッド.
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:エラー
 * - onSubmit:更新ボタンを押した時のメソッド
 */
export const useSpecSheet = (
  setMenuItem: Dispatch<SetStateAction<string>>,
  onClose: () => void,
) => {
  const [cookies] = useCookies();

  const [prevJobs, setPrevJobs] = useState([""]);

  /**
   * バリデーションチェック.
   */
  const schema = yup.object().shape(
    prevJobs.reduce(
      (acc, _, index) => {
        return {
          ...acc,
          [`prevJobs_${index}`]: yup
            .string()
            .trim()
            .required("前職を入力してください"),
        };
      },
      {
        //業務外のバリデーション
        studyOnOwnTime: yup
          .string()
          .trim()
          .required("業務外の取り組みを入力してください"),
        //資格アカウントのバリデーション
        certification: yup.string().trim().required("資格を入力してください"),
        // PRのバリデーション
        selfIntro: yup.string().trim().required("PRを入力してください"),
      },
    ),
  );

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: specSheetData } = useGetPrAndSheetByUserIdQuery({
    // データ取得後に表示
    onCompleted: ({ other, pr }: any) => {
      // デフォルト値をセット
      reset({
        certification: other.node.certification,
        selfIntro: pr.node.selfIntro,
        studyOnOwnTime: other.node.studyOnOwnTime,
        ...other.node.prevJobs?.reduce((acc: any, cur: any, index: number) => {
          return {
            ...acc,
            [`prevJobs_${index}`]: cur?.content,
          };
        }, {}),
      });

      // 空の入力欄のみを用意（デフォルト値はresetでセット）
      setPrevJobs(other.node.prevJobs.map(() => ""));
    },
    variables: {
      userToken: cookies.ForestaID,
    },
  });

  /**
   * キャンセルボタンを押した時に呼ばれる.
   */
  const cancel = useCallback(() => {
    onClose();
    setMenuItem("");
  }, [onClose, setMenuItem]);

  /**
   * ユーザ情報更新.（リフェッチ機能）
   */
  const [updateSpecSheet] = useUpdateSpecSheetMutation({
    refetchQueries: [GetPrAndSheetByUserIdDocument], //データを表示するクエリーのDocument
    awaitRefetchQueries: true,
  });

  /**
   * 更新ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  const onSubmit = useCallback(
    async (data: any) => {
      const body = Object.keys(data).reduce((acc: any, cur: string) => {
        // データがない時は送信しない
        if (cur.includes("prevJobs") && !data[cur]) return acc;
        // prevJobsが送信するデータに含まれる時はprevJobsの配列を作る
        if (cur.includes("prevJobs"))
          return {
            ...acc,
            prevJobs: acc.prevJobs ? [...acc.prevJobs, data[cur]] : [data[cur]],
          };
        return {
          ...acc,
          [cur]: data[cur],
        };
      }, {});

      try {
        await updateSpecSheet({
          variables: {
            specSheet: {
              specSheetId: specSheetData?.other.node.id as string,
              ...body,
            },
          },
        });
        cancel();
      } catch (error) {
        console.log(error);
      }
    },

    [cancel, specSheetData?.other.node.id, updateSpecSheet],
  );

  return {
    useUpdateUserMutation,
    handleSubmit,
    cancel,
    register,
    errors,
    onSubmit,
    specSheetData,
    GetUserByIdDocument,
    updateSpecSheet,
    prevJobs,
    setPrevJobs,
    setValue,
    watch,
  };
};
