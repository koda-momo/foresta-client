import { FC, memo, ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ButtonItem } from "../atoms/common/ButtonItem";

type Props = {
  onClose: () => void; //閉じるメソッド
  isOpen: boolean; //モーダルの開閉状態
  modalTitle?: string; //モーダルのタイトル
  contents: string | ReactNode; //モーダルの中身
  closeBtnName?: string; //モーダルを閉じるボタンの名前(デフォルトあり)
  closeBtn?: boolean;
  //メソッドを含めたボタンを作成したい場合:[{name:hoge,action:method},{…}]の形で渡してください
  actionBtnArray?: Array<{ name: string; action: () => void }> | undefined;
};

/**
 * モーダルコンポーネント.
 * @remarks  このコンポーネントを使用する際は、hooksからインポートしたメソッドをそのまま渡してください
 *  const modalStore = useModal();
 *  const { onOpen, isOpen, onClose } = modalStore;
 * …<ModalSet isOpen={isOpen} onClose={onClose} />
 */
export const ModalSet: FC<Props> = memo(
  ({
    isOpen,
    onClose,
    modalTitle,
    contents,
    closeBtnName = "Cancel",
    closeBtn = true,
    actionBtnArray,
  }) => {
    return (
      <>
        {/* モーダル本体 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width="auto" minWidth={500} maxWidth="none">
            {modalTitle ? (
              <ModalHeader textAlign="left" color="#696969">
                {modalTitle}
              </ModalHeader>
            ) : (
              <Box pb={30}></Box>
            )}
            <ModalBody textAlign="center">{contents}</ModalBody>

            {/* ボタンコーナー */}
            <ModalFooter mb={3}>
              <Flex justifyContent="right" gap={3}>
                {actionBtnArray &&
                  actionBtnArray.map((btn) => (
                    <ButtonItem
                      key={btn.name}
                      onClick={() => {
                        btn.action();
                        onClose();
                      }}
                      name={btn.name}
                      backgroundColor="green"
                    />
                  ))}
                {closeBtn && (
                  <ButtonItem
                    onClick={onClose}
                    name={closeBtnName}
                    backgroundColor="gray"
                  />
                )}
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },
);
