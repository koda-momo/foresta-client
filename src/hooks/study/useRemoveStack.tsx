import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  useRemoveStudyStackMutation,
  GetAllStudyStackDocument,
} from "../../types/generated/graphql";

/**
 * 学習記録を削除するフックス.
 * @param onClose
 * @param stackId
 * @returns removeStack - 削除するメソッド
 */
export const useRemoveStack = (onClose: () => void, stackId: string) => {
  //トーストアラート
  const toast = useToast();

  //記録削除ミューテーション（リフェッチ機能）
  const [removeStudyStack] = useRemoveStudyStackMutation({
    refetchQueries: [GetAllStudyStackDocument],
  });

  /**
   * 学習を削除するメソッド
   */
  const removeStack = useCallback(async () => {
    try {
      const removeStackData = await removeStudyStack({
        variables: {
          studyStackId: stackId,
        },
      });
      if (removeStackData.data?.removeStudyStack.status === "success") {
        toast({
          title: "学習を削除しました",
          status: "success",
          position: "bottom-left",
        });
        onClose();
      } else if (removeStackData.data?.removeStudyStack.status === "error") {
        toast({
          title: "削除に失敗しました",
          status: "error",
          position: "bottom-left",
        });
        onClose();
      }
    } catch (error) {
      alert(error);
    }
  }, [onClose, removeStudyStack, stackId, toast]);

  return { removeStack };
};
