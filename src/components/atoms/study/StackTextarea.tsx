import { FC, memo } from "react";
import { Box, FormLabel, Textarea } from "@chakra-ui/react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registers: any; //入力値登録
  errorMessage?: string | undefined; //エラーメッセージ
  placeholder: string; //プレイスホルダー名
  type: string; //テキストタイプ
  label: string; //ラベル名
};

/**
 * 学習リスト用テキストエリアコンポ―ネント.
 */
export const StackTextarea: FC<Props> = memo((props) => {
  const { registers, errorMessage, placeholder, type, label } = props;

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Textarea type={type} placeholder={placeholder} {...registers} />
      <Box textColor="red" fontSize="xs">
        {errorMessage}
      </Box>
    </>
  );
});
