import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC, JSXElementConstructor, memo, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useGetStudyStackByIdQuery } from "../../../types/generated/graphql";
import { StackButton } from "../../atoms/study/StackBotton";
import { useAddStack } from "../../../hooks/study/useAddStack";
import { useRemoveStack } from "../../../hooks/study/useRemoveStack";
import { useUpdateStack } from "../../../hooks/study/useUpdateStack";
import { StudyModalInput } from "./StudyModalInput";
import { AddStack } from "../../../types/types";
import { format } from "date-fns";

type Props = {
  title: string;
  stackId: string;
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  color: string;
};

//バリデーションチェック
const schema = yup.object().shape({
  createdAt: yup.string().required("学習日時を入力してください"),
  skillTagId: yup.string().required("学習技術を入力してください"),
  timeStack: yup
    .number()
    .min(0, "0以上の値を入力してください")
    .integer("整数で入力してください")
    .typeError("学習時間を入力してください"),
  content: yup
    .string()
    .trim("メモを入力してくだざい")
    .required("メモを入力してください"),
});

/**
 * モーダルコンポーネント
 */
export const StudyModal: FC<Props> = memo((props) => {
  //モーダルの開閉
  const { isOpen, onOpen, onClose } = useDisclosure();
  //propsでもらうもの
  const { title, icon, stackId, color } = props;
  //学習記録を１件取得クエリー（本当はdaleyを使いたい）
  const { loading, data, error } = useGetStudyStackByIdQuery({
    variables: { studyStackId: stackId },
    // fetchPolicy: "cache-and-network",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddStack>({
    resolver: yupResolver(schema),
  });

  //記録追加フックス呼ぶ
  const { addStack } = useAddStack(onClose, reset);

  //記録を削除するフックス呼ぶ
  const { removeStack } = useRemoveStack(onClose, stackId);

  //記録を編集するフックスを呼ぶ
  const { updateStack } = useUpdateStack(onClose, stackId);

  //モーダルを開いた時のメソッド
  const openMethod = () => {
    //編集ボタンをクリックしたときには初期値をセットする
    if (data) {
      setValue(
        "createdAt",
        format(new Date(data?.getStudyStackById.node.createdAt), "yyyy-MM-dd"),
      );
      setValue("skillTagId", data?.getStudyStackById.node.skillTagId);
      setValue("timeStack", data?.getStudyStackById.node.timeStack);
      setValue("content", data?.getStudyStackById.node.content);
    }
    onOpen();
    if (loading || error) {
      onOpen();
    }
  };

  //モーダルを閉じた時のメソッド
  const closeMethod = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Button
        onClick={openMethod}
        backgroundColor={`${color}.300`}
        _hover={{ bg: `${color}.400` }}
        _focus={{ boxShadow: "none" }}
        _active={{ boxShadow: "none", bg: `${color}.500` }}
        color="white"
        shadow="base"
        width={3}
      >
        {icon}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        blockScrollOnMount={false}
        closeOnOverlayClick={true}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          {title === "Delete Stack" && (
            <ModalBody>この記事を削除しますか</ModalBody>
          )}
          {title === "Add Stack" && (
            <StudyModalInput register={register} errors={errors} />
          )}
          {title === "Edit Stack" && (
            <StudyModalInput register={register} errors={errors} />
          )}

          <ModalFooter>
            {title === "Add Stack" && (
              <StackButton
                onClick={handleSubmit(addStack)}
                title="Add"
                data-testid="add"
              />
            )}
            {title === "Edit Stack" && (
              <StackButton
                onClick={handleSubmit(updateStack)}
                title="Edit Record"
              />
            )}
            {title === "Delete Stack" && (
              <StackButton onClick={removeStack} title="Delete" />
            )}
            <Button
              colorScheme="gray"
              mx={3}
              _focus={{ boxShadow: "none" }}
              onClick={closeMethod}
              shadow="base"
              data-testid="cancel"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
