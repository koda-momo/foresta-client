import { useCallback, useState } from "react";

/**
 * モーダルを開け閉めできるhook.
 * @returns 開閉状況／モーダルを開ける／モーダルを閉じる
 */
export const useModal = () => {
  // モーダルのオープン状態
  const [isOpen, setIsOpen] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const onOpen = useCallback((e) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, setIsOpen, onOpen, onClose };
};
