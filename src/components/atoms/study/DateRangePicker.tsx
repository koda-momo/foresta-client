import { FC, memo, useCallback, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Flex, IconButton, Input } from "@chakra-ui/react";

import { getFormattedDate } from "../../../utils/methods";

type Props = {
  startedAt: Date;
  setStartedAt: Dispatch<SetStateAction<Date>>;
  finishedAt: Date | null;
  setFinishedAt: Dispatch<SetStateAction<Date | null>>;
};

/**
 * 複数日選択できるDatePickerのコンポーネント.
 */
export const DateRangePicker: FC<Props> = memo((props) => {
  const { startedAt, setStartedAt, finishedAt, setFinishedAt } = props;

  // Inputに表示させる文字列
  const inputDate = finishedAt
    ? `${getFormattedDate(startedAt)} - ${getFormattedDate(finishedAt)}`
    : getFormattedDate(startedAt);

  /**
   * DatePickerの選択日を変更したときのハンドラ.
   */
  const onChange = useCallback(
    (dates: [Date, Date | null]) => {
      const [start, end] = dates;
      setStartedAt(start);
      setFinishedAt(end);
    },
    [setStartedAt, setFinishedAt],
  );

  return (
    <DatePicker
      onChange={onChange}
      startDate={startedAt}
      endDate={finishedAt}
      selectsRange
      minDate={new Date()}
      customInput={
        <Flex align="center">
          <Input type="text" value={inputDate} />
          <IconButton isRound aria-label="Edit date" icon={<>🗓</>} />
        </Flex>
      }
    />
  );
});
