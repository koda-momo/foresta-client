import { Dispatch, SetStateAction, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  GetUserByIdDocument,
  useAddUserUrlsMutation,
  useRemoveUserUrlsMutation,
} from "../../types/generated/graphql";
import { useToast } from "@chakra-ui/react";
import { UrlType } from "../../types/types";

/**
 * バリデーションチェック.
 */
const schema = yup.object().shape({
  urlName: yup
    .string()
    .trim()
    .required("タイトルを入力して下さい")
    .max(50, "稼働開始日は50文字以内で入力して下さい"),
  url: yup.string().trim().required("URLを入力して下さい"),
});

/**
 * public部分基本情報編集メソッド.
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:エラー
 * - onSubmit:更新ボタンを押した時のメソッド
 * @params userData - 初期表示用データ
 */
export const useUserUrls = () => {
  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UrlType>({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
};

/**
 * URLを追加するメソッド.
 * @param urlTableId URLのテーブル番号
 * @returns URL追加メソッド
 */
export const useAddUrl = (
  urlTableId: string,
  setMenuItem: Dispatch<SetStateAction<string>>,
  setEditMode: Dispatch<SetStateAction<string>>,
  onClose: () => void,
) => {
  //トーストの使用
  const toast = useToast();

  //キャンセルメソッドの使用
  const { cancel } = useCancel(setMenuItem, setEditMode, onClose);

  /**
   * URL追加.（リフェッチ機能）
   */
  const [updatePortfolio] = useAddUserUrlsMutation({
    refetchQueries: [GetUserByIdDocument], //データを表示するクエリーのDocument
    awaitRefetchQueries: true,
  });

  /**
   * 更新ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  const onSubmit: SubmitHandler<UrlType> = useCallback(
    async (data: UrlType) => {
      try {
        const res = await updatePortfolio({
          variables: {
            urlData: {
              urlName: data.urlName,
              url: data.url,
              urlId: urlTableId,
            },
          },
        });

        if (res.data?.addUserUrls.status === "success") {
          toast({
            title: "追加しました",
            status: "success",
            position: "bottom-left",
            isClosable: true,
          });
        } else if (res.data?.addUserUrls.status === "error") {
          toast({
            title: "失敗しました",
            position: "bottom-left",
            status: "error",
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
      cancel();
    },
    [cancel, toast, updatePortfolio, urlTableId],
  );

  return { onSubmit };
};

/**
 * URL削除用.（リフェッチ機能）
 */
export const useDeleteUrl = (
  setMenuItem: Dispatch<SetStateAction<string>>,
  setEditMode: Dispatch<SetStateAction<string>>,
  onClose: () => void,
) => {
  const [deleteUrl] = useRemoveUserUrlsMutation({
    refetchQueries: [GetUserByIdDocument], //データを表示するクエリーのDocument
    awaitRefetchQueries: true,
  });

  //トーストの使用
  const toast = useToast();

  //キャンセルメソッドの使用
  const { cancel } = useCancel(setMenuItem, setEditMode, onClose);

  /**
   * 削除ボタンを押した際に呼ばれる.
   */
  const onDelete = useCallback(
    async (urlId: string, urlTableId: string) => {
      try {
        const res = await deleteUrl({
          variables: {
            urlData: {
              urlId: urlId,
              userUrlsId: urlTableId,
            },
          },
        });

        if (res.data?.removeUserUrls.status === "success") {
          //成功した場合
          toast({
            title: "削除しました",
            status: "success",
            position: "bottom-left",
            isClosable: true,
          });
        } else if (res.data?.removeUserUrls.status === "error") {
          toast({
            title: "失敗しました",
            position: "bottom-left",
            status: "error",
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
      cancel();
    },
    [cancel, deleteUrl, toast],
  );

  return { onDelete };
};

export const useCancel = (
  setMenuItem: Dispatch<SetStateAction<string>>,
  setEditMode: Dispatch<SetStateAction<string>>,
  onClose: () => void,
) => {
  const cancel = useCallback(() => {
    setMenuItem("");
    setEditMode("");
    onClose();
  }, [onClose, setEditMode, setMenuItem]);

  return { cancel };
};
