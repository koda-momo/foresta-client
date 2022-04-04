import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  useUpdateStudyStackMutation,
  GetAllStudyStackDocument,
} from "../../types/generated/graphql";
import { AddStack } from "../../types/types";

/**
 * 学習記録を編集するフックス
 * @param onClose
 * @param stackId
 * @returns updateStack - 学習を編集するメソッド
 */
export const useUpdateStack = (onClose: () => void, stackId: string) => {
  //トーストアラート
  const toast = useToast();

  const [updateMutation] = useUpdateStudyStackMutation({
    refetchQueries: [GetAllStudyStackDocument],
  });

  /**
   * 学習を編集するメソッド
   * @param data - 編集した内容
   */
  const updateStack = useCallback(
    async (data: AddStack) => {
      try {
        const updateStackData = await updateMutation({
          variables: {
            stack: {
              createdAt: data.createdAt,
              skillTagId: data.skillTagId,
              timeStack: data.timeStack,
              content: data.content,
              studyStackId: stackId,
            },
          },
        });
        if (updateStackData.data?.updateStudyStack.status === "success") {
          toast({
            title: "学習記録を編集しました",
            status: "success",
            position: "bottom-left",
          });
          onClose();
        } else if (updateStackData.data?.updateStudyStack.status === "error") {
          toast({
            title: "編集に失敗しました",
            status: "error",
            position: "bottom-left",
          });
          onClose();
        }
      } catch (error) {
        alert(error);
      }
    },
    [onClose, stackId, toast, updateMutation],
  );

  return { updateStack };
};
