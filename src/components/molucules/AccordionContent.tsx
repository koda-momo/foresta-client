import { memo, FC, ReactNode } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

type Props = {
  title: string; //アコーディオンを閉じている際に表示するタイトル
  content: ReactNode; //中に表示する内容
  size: string; //タイトルのサイズ
};

/**
 * アコーディオン(トグル)が作成出来るコンポーネント.
 */
export const AccordionContent: FC<Props> = memo(({ title, content, size }) => {
  return (
    <>
      <Accordion allowMultiple backgroundColor="white" defaultIndex={[0]}>
        <AccordionItem outlineOffset={0}>
          <AccordionButton _focus={{ boxShadow: "none" }}>
            {size === "lg" ? (
              <Box flex="1" textAlign="left" fontWeight="bold" fontSize={25}>
                {title}
              </Box>
            ) : (
              <Box flex="1" textAlign="left">
                {title}
              </Box>
            )}

            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>{content}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
});
