import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import * as yup from "yup";

import {
  GetSheetByUserIdDocument,
  GetUserByIdDocument,
  useGetSheetByUserIdQuery,
  useUpdateSpecProjectMutation,
  useUpdateSpecUserInfoMutation,
} from "../../types/generated/graphql";
import { useToast } from "@chakra-ui/react";
import { SpecUserInfoType } from "../../types/types";

/**
 * バリデーションチェック.
 */
const schema = yup.object().shape({
  //スタッフID
  stuffID: yup
    .string()
    .trim()
    .required("スタッフIDを入力してください")
    .typeError("スタッフIDを入力してください")
    .min(11, "スタッフIDは11文字で入力してください")
    .max(11, "スタッフIDは11文字で入力してください"),
  //年齢
  age: yup
    .number()
    .required("年齢を入力して下さい")
    .typeError("年齢を入力して下さい"),
  //性別
  gender: yup.string(),
  //最寄駅
  nearestStation: yup
    .string()
    .trim()
    .required("最寄駅を入力して下さい")
    .typeError("最寄駅を入力して下さい")
    .max(50, "最寄駅は50文字以内で入力して下さい"),
  //最寄線
  nearestLine: yup
    .string()
    .trim()
    .required("最寄路線を入力して下さい")
    .typeError("最寄路線を入力して下さい")
    .max(50, "最寄路線は50文字以内で入力して下さい"),
  //稼働開始日
  startWorkDate: yup
    .string()
    .trim()
    .required("稼働開始日を入力して下さい")
    .typeError("稼働開始日を入力して下さい")
    .max(50, "稼働開始日は50文字以内で入力して下さい"),
  //歴
  seExpAmountYear: yup.number(),
  seExpAmountMonth: yup.number(),
  pgExpAmountYear: yup.number(),
  pgExpAmountMonth: yup.number(),
  itExpAmountYear: yup.number(),
  itExpAmountMonth: yup.number(),
});

/**
 * public部分基本情報編集メソッド.
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:エラー
 * - onSubmit:更新ボタンを押した時のメソッド
 * @params useruserData - 初期表示用データ
 */
export const useSpecUserInfo = (
  setMenuItem: Dispatch<SetStateAction<string>>,
  onClose: () => void,
) => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * スペックシート基本情報取得.
   */
  const { data: userData } = useGetSheetByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });

  //最寄駅デフォルト値作成に使用
  const stationuserData = userData?.user.node.userInfo.nearestStation.split(
    "(",
  ) as Array<string>;
  //最寄駅
  const [station, setStation] = useState("");
  //最寄線
  const [line, setLine] = useState("");

  //IT歴デフォルト値作成に使用
  const seHis = Number(userData?.user.node.userInfo.seExpAmount);
  const pgHis = Number(userData?.user.node.userInfo.pgExpAmount);
  const itHis = Number(userData?.user.node.userInfo.itExpAmount);

  const [seMonth, setSeMonth] = useState(0);
  const [seYear, setSeYear] = useState(0);
  const [pgMonth, setPgMonth] = useState(0);
  const [pgYear, setPgYear] = useState(0);
  const [itMonth, setItMonth] = useState(0);
  const [itYear, setItYear] = useState(0);

  useEffect(() => {
    /**
     * 最寄駅を最寄路線を切り離す
     */
    {
      stationuserData && setStation(stationuserData[0]);
      setLine(String(stationuserData?.[1]).replace(")", ""));
    }

    /**
     * IT経験歴をヵ月→年+ヵ月に修正
     */
    setSeYear(Math.floor(Number(seHis) / 12));
    setSeMonth(Number(seHis) % 12);

    setPgYear(Math.floor(Number(pgHis) / 12));
    setPgMonth(Number(pgHis) % 12);

    setItYear(Math.floor(Number(itHis) / 12));
    setItMonth(Number(itHis) % 12);
  }, [
    itHis,
    pgHis,
    seHis,
    stationuserData,
    userData?.user.node.userInfo.itExpAmount,
    userData?.user.node.userInfo.nearestStation,
    userData?.user.node.userInfo.pgExpAmount,
    userData?.user.node.userInfo.seExpAmount,
  ]);

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SpecUserInfoType>({
    resolver: yupResolver(schema),
  });

  setValue("stuffID", userData?.user.node.userInfo.stuffID as string);
  setValue("age", userData?.user.node.userInfo.age as number);
  setValue("gender", String(userData?.user.node.userInfo.gender));
  setValue("nearestStation", station);
  setValue("nearestLine", line);
  setValue(
    "startWorkDate",
    userData?.user.node.userInfo.startWorkDate as string,
  );
  setValue("seExpAmountYear", seYear);
  setValue("seExpAmountMonth", seMonth);
  setValue("pgExpAmountYear", pgYear);
  setValue("pgExpAmountMonth", pgMonth);
  setValue("itExpAmountYear", itYear);
  setValue("itExpAmountMonth", itMonth);

  //トーストの使用
  const toast = useToast();

  /**
   * キャンセルボタンを押した時に呼ばれる.
   */
  const cancel = useCallback(() => {
    onClose();
    setMenuItem("");
  }, [onClose, setMenuItem]);

  /**
   * スペックシート基本情報更新.（リフェッチ機能）
   */
  const [updateSpecInfo] = useUpdateSpecUserInfoMutation({
    refetchQueries: [GetSheetByUserIdDocument], //データを表示するクエリーのDocument
    awaitRefetchQueries: true,
  });

  /**
   * 更新ボタンを押した時に呼ばれる
   * @param userData - 入力したデータ
   */
  const onSubmit: SubmitHandler<SpecUserInfoType> = useCallback(
    async (data: SpecUserInfoType) => {
      const neareuserData = `${data.nearestStation}(${data.nearestLine})`;
      const se = data.seExpAmountYear * 12 + data.seExpAmountMonth;
      const pg = data.pgExpAmountYear * 12 + data.pgExpAmountMonth;
      const it = data.itExpAmountYear * 12 + data.itExpAmountMonth;

      try {
        const res = await updateSpecInfo({
          variables: {
            specUserInfo: {
              specUserInfoId: String(userData?.user.node.userInfo.id),
              stuffID: data.stuffID,
              age: data.age,
              gender: String(data.gender),
              nearestStation: String(neareuserData),
              startWorkDate: data.startWorkDate,
              seExpAmount: Number(se),
              pgExpAmount: Number(pg),
              itExpAmount: Number(it),
            },
          },
        });

        if (res.data?.updateSpecUserInfo.status === "error") {
          toast({
            title: res.data?.updateSpecUserInfo.msg,
            status: "error",
            isClosable: true,
          });
        } else {
          cancel();
          toast({
            title: "更新しました",
            status: "success",
            position: "bottom-left",
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "失敗しました",
          position: "bottom-left",
          status: "error",
          isClosable: true,
        });
      }
    },
    [cancel, toast, updateSpecInfo, userData?.user.node.userInfo.id],
  );

  return {
    useUpdateSpecProjectMutation,
    handleSubmit,
    cancel,
    register,
    errors,
    onSubmit,
    GetUserByIdDocument,
    updateSpecInfo,
  };
};
