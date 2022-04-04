import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  margin: number;
  padding: number;
  children: ReactNode;
};

/**
 * 影付きフレームのコンポーネント.
 */
export const ShadowFrame: FC<Props> = (props) => {
  const { margin, padding, children } = props;
  return (
    <Box
      background={"white.50"}
      m={margin}
      p={padding}
      rounded={20}
      boxShadow="md"
    >
      {children}
    </Box>
  );
};
