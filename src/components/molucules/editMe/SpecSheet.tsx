import { memo, FC, Dispatch, SetStateAction } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { TextInput } from "../../atoms/common/TextInput";
import { useSpecSheet } from "../../../hooks/editMe/useSpecSheet";
import { TextAreaWithCounter } from "../../atoms/common/TextAreaWithCounter";
import { ButtonItem } from "../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * スペックシート基本情報以外編集画面.
 * @remarks 自己PR、業務外、資格、前職
 */
export const SpecSheet: FC<Props> = memo(({ setMenuItem, onClose }) => {
  //public部分基本情報編集hooksを使用(引数に渡してあげつつ、使う機能を宣言)
  const {
    handleSubmit,
    register,
    errors,
    onSubmit,
    prevJobs,
    setPrevJobs,
    watch,
    setValue,
  } = useSpecSheet(
    setMenuItem, //メニューアイテムを空にする
    onClose, //モーダルを閉じるメソッド
  );

  return (
    <>
      <TextInput
        registers={register("studyOnOwnTime")}
        errorMessage={errors.studyOnOwnTime?.message}
        label="業務外の取り組み"
        placeholder="業務外の取り組み"
      />
      {prevJobs.length === 0
        ? setPrevJobs((cur) => [...cur, ""])
        : prevJobs?.map((item: any, index: number) => (
            <>
              <Flex>
                <Text fontWeight="semibold">{`前職${index + 1}`}</Text>
                <Text color="red" ml={4}>
                  {errors?.[`prevJobs_${index}` as any]?.message}
                </Text>
              </Flex>
              <TextAreaWithCounter
                key={item.id}
                registers={register(`prevJobs_${index}` as any)}
                placeholder={`前職${index + 1}`}
              />

              <Box mt={3} display="flex" justifyContent="right">
                <ButtonItem
                  name="Delete"
                  backgroundColor="red"
                  onClick={() => {
                    const newVal = [...prevJobs];
                    newVal.splice(index, 1);
                    setPrevJobs(newVal);
                    // prevJobが削除された時はデータをつめるように移動させる。（データが入っていない空箱があるため。）
                    prevJobs.forEach((_, idx) => {
                      if (index > idx) return;
                      setValue(`prevJobs_${idx}`, watch(`prevJobs_${idx + 1}`));
                    });
                  }}
                />
              </Box>
            </>
          ))}

      <Box mt={3} display="flex" justifyContent="right">
        <ButtonItem
          name="Add"
          backgroundColor="green"
          onClick={() => {
            setPrevJobs((cur) => [...cur, ""]);
            setValue(`prevJobs_${prevJobs.length}`, "");
          }}
        />
      </Box>

      <TextInput
        registers={register("certification")}
        errorMessage={errors.certification?.message}
        label="資格"
        placeholder="資格"
      />

      <TextAreaWithCounter
        registers={register("selfIntro")}
        errorMessage={errors.selfIntro?.message}
        label="自己PR"
        placeholder="自己PR"
      />

      <Flex gap={3} justifyContent="right" mt={7}>
        <ButtonItem
          name="Update"
          backgroundColor="green"
          onClick={handleSubmit(onSubmit)}
        />
        <ButtonItem name="Cancel" backgroundColor="gray" onClick={onClose} />
      </Flex>
    </>
  );
});
