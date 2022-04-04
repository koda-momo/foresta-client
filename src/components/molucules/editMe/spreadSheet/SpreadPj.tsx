import {
  memo,
  FC,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { Spinner, Flex, useToast, Select } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import {
  useGetPjNameByUserIdQuery,
  useUpdateSpreadProjectMutation,
} from "../../../../types/generated/graphql";
import { ButtonItem } from "../../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * スプレッドシートに開発経験を出力.
 */
export const SpreadPj: FC<Props> = memo(({ onClose, setMenuItem }) => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * 開発経験情報の取得.
   */
  const { data } = useGetPjNameByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  const projectData = data?.pj.node.project as Array<{ name: string }>;

  //トーストの使用
  const toast = useToast();
  //開発経験番号格納用
  const [pjIndex, setPjIndex] = useState(0);

  /**
   * リセットボタン.
   */
  const cancel = useCallback(() => {
    setMenuItem("");
    onClose();
  }, [onClose, setMenuItem]);

  /**
   * 開発経験のインデックス番号を取得.
   */
  const setIndex = useCallback((e) => {
    setPjIndex(e.target.value);
  }, []);

  /**
   * スプレッドシートにスキル要約を出力.
   */
  const [updateSpreadProjectMutation, { loading, error }] =
    useUpdateSpreadProjectMutation({
      variables: {
        userToken: cookies.ForestaID,
        projectIndex: Number(pjIndex),
      },
    });

  /**
   * ボタンを押した際に呼ばれる.
   */
  const outputSheet = useCallback(async () => {
    try {
      await updateSpreadProjectMutation();
      toast({
        title: "出力しました",
        status: "success",
        isClosable: true,
      });
      cancel();
    } catch (e) {
      console.log(e);
    }
  }, [cancel, toast, updateSpreadProjectMutation]);

  //読み込み中時の表示
  if (loading) {
    return (
      <>
        書き出し中…
        <Flex justifyContent="center">
          <Spinner color="green.400" />
        </Flex>
      </>
    );
  }
  //エラー時の表示
  if (error) {
    return <Flex justifyContent="center">Error</Flex>;
  }

  return (
    <>
      出力する開発経験を選んで下さい
      <Select
        onChange={(e) => {
          setIndex(e);
        }}
      >
        {projectData.map((item, index) => (
          <option key={index} value={index}>
            {item.name != ""
              ? `${index + 1}開発目:${item.name}`
              : `${index + 1}開発目:未登録`}
          </option>
        ))}
      </Select>
      <Flex gap={3} justifyContent="center">
        <ButtonItem name="はい" onClick={outputSheet} />
        <ButtonItem name="キャンセル" onClick={cancel} />
      </Flex>
    </>
  );
});
