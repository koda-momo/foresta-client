import { Dispatch, SetStateAction, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import * as yup from "yup";

import {
  GetSheetSkillByUserIdDocument,
  GetUserByIdDocument,
  useGetSheetSkillByUserIdQuery,
  useUpdateSpecProjectMutation,
  useUpdateSpecTechInfoMutation,
} from "../../types/generated/graphql";
import { useToast } from "@chakra-ui/react";
import { SkillType } from "../../types/types";

/**
 * バリデーションチェック.
 */
const schema = yup.object().shape({
  //ID
  id: yup.string(),
  //担当工程
  devRoles: yup.array().nullable(),
  //OS
  operationEnvs: yup.array().nullable(),
  //言語
  languages: yup.array().nullable(),
  //フレームワーク
  frameworks: yup.array().nullable(),
  //ライブラリ
  libraries: yup.array().nullable(),
  //その他ツール
  otherTools: yup.array().nullable(),
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
export const useSpecTechInfo = (
  setMenuItem: Dispatch<SetStateAction<string>>,
  onClose: () => void,
) => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * スキル要約取得.
   */
  const { data: skillData } = useGetSheetSkillByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SkillType>({
    resolver: yupResolver(schema),
  });

  setValue("id", skillData?.skills.node.techInfo.id as string);
  setValue(
    "devRoles",
    skillData?.skills.node.techInfo.devRoles as Array<string>,
  );
  setValue(
    "operationEnvs",
    skillData?.skills.node.techInfo.operationEnvs as Array<string>,
  );
  setValue(
    "languages",
    skillData?.skills.node.techInfo.languages as Array<string>,
  );
  setValue(
    "frameworks",
    skillData?.skills.node.techInfo.frameworks as Array<string>,
  );
  setValue(
    "libraries",
    skillData?.skills.node.techInfo.libraries as Array<string>,
  );
  setValue(
    "otherTools",
    skillData?.skills.node.techInfo.otherTools as Array<string>,
  );
  setValue(
    "specSheetId",
    skillData?.skills.node.techInfo.specSheetId as string,
  );

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
   * スペックシートスキル要約更新.（リフェッチ機能）
   */
  const [updateSpecSkill] = useUpdateSpecTechInfoMutation({
    refetchQueries: [GetSheetSkillByUserIdDocument], //データを表示するクエリーのDocument
    awaitRefetchQueries: true,
  });

  /**
   * 更新ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  const onSubmit: SubmitHandler<SkillType> = useCallback(
    async (data: SkillType) => {
      //nullだった場合、[]に置き換える
      const os = data.operationEnvs != null ? data.operationEnvs : [];
      const lang = data.languages != null ? data.languages : [];
      const frame = data.frameworks != null ? data.frameworks : [];
      const lib = data.libraries != null ? data.libraries : [];
      const other = data.otherTools != null ? data.otherTools : [];
      const rol = data.devRoles != null ? data.devRoles : [];

      //送るデータ
      const specTechInfo = {
        specTechInfoId: data.id,
        operationEnvs: os,
        languages: lang,
        frameworks: frame,
        libraries: lib,
        otherTools: other,
        devRoles: rol,
      };

      try {
        await updateSpecSkill({
          variables: { specTechInfo },
        });
        cancel();
        toast({
          title: "更新しました",
          position: "bottom-left",
          status: "success",
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "失敗しました",
          position: "bottom-left",
          status: "error",
          isClosable: true,
        });
      }
    },
    [cancel, toast, updateSpecSkill],
  );

  return {
    useUpdateSpecProjectMutation,
    handleSubmit,
    cancel,
    register,
    errors,
    onSubmit,
    GetUserByIdDocument,
    updateSpecSkill,
  };
};
