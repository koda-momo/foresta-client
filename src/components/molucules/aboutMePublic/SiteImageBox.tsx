import { memo, FC, useState, MouseEvent } from "react";
import { XCircleFillIcon } from "@primer/octicons-react";
import { Flex } from "@chakra-ui/react";

import { SiteDetail } from "./SiteDetail";
import { ModalSet } from "../../molucules/ModalSet";
import { SiteImage } from "../../atoms/aboutMePublic/SiteImage";
import { Heading } from "../../atoms/common/Heading";
import { useModal } from "../../../hooks/useModal";
import { PortfolioType } from "../../../types/types";
import { ShadowFrame } from "../../atoms/common/ShadowFrame";

type Props = { data: Array<PortfolioType> };

/**
 * 制作物一覧画面.
 */
export const SiteImageBox: FC<Props> = memo(({ data }) => {
  //モーダル使用のhooks
  const modalStore = useModal();
  const { onOpen, isOpen, onClose } = modalStore;
  const [portfolioItem, setPortfolioItem] = useState<PortfolioType>();

  /**
   *モーダルを開く.
   * @param e 親への伝搬を防ぐため渡す
   * @param item - 制作物データ
   */
  const openModal = (e: MouseEvent, item: PortfolioType) => {
    setPortfolioItem(item);
    onOpen(e);
  };

  //制作物の登録が0の時の表示
  if (data?.length === 0) {
    return (
      <Flex justifyContent="center" my={15}>
        <XCircleFillIcon size={24} />
        制作物の登録がありません
      </Flex>
    );
  }

  return (
    <>
      <Flex ml={10}>
        <Heading text="Portfolio" />
      </Flex>
      <ModalSet
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={portfolioItem?.title}
        contents={<SiteDetail siteItem={portfolioItem} />}
        closeBtnName="Close"
      />
      <ShadowFrame margin={0} padding={10}>
        <Flex gap={4} justifyContent="center" wrap="wrap-reverse">
          {data &&
            data.map((item) => (
              <div key={item.id}>
                <Flex
                  direction="column"
                  cursor="pointer"
                  outline="none"
                  onClick={(e) => openModal(e, item)}
                >
                  <SiteImage siteName={item.title} imageUrl={item.img} />
                </Flex>
              </div>
            ))}
        </Flex>
      </ShadowFrame>
    </>
  );
});
