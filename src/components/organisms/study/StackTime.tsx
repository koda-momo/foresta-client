import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { format, subDays, subMonths } from "date-fns";
import { memo, useState } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
//pluginを使うため
import "chartjs-plugin-datalabels";
//日付を使うため
import "chartjs-adapter-date-fns";
import { useTimeFig } from "../../../hooks/study/useTimeFig";
import { useFigBtn } from "../../../hooks/study/useFigBtn";
import { usePercentMonth } from "../../../hooks/study/usePercentMonth";
import { usePercentDate } from "../../../hooks/study/usePercentDate";
import { Heading } from "../../atoms/common/Heading";
import { Bar, Pie } from "react-chartjs-2";
import { StackDateButton } from "../../atoms/study/StackDateButton";
import { StackDailyButton } from "../../atoms/study/StackDailyButton";
import { StackFigButton } from "../../atoms/study/StackFigButton";

/**
 * 学習記録のグラフを表示する
 */
export const StackTime = memo(() => {
  //学習時間グラフ表示用hooks使用
  const { studyData, chartDatas } = useTimeFig();

  //表示グラフの種類を変更するための状態
  const [isDisplayFig, setIsDisplayFig] = useState(true);

  //グラフ表示変更メソッド
  const displayChange = () => {
    if (isDisplayFig === true) {
      setIsDisplayFig(false);
    }
    if (isDisplayFig === false) {
      setIsDisplayFig(true);
    }
  };

  //グラフ表示切り替えボタン用hooks使用
  const {
    monthBtn,
    subDateBtn,
    addDateBtn,
    dateValueDay,
    dateValueMonth,
    isDay,
    title,
  } = useFigBtn();

  //%表示用hooks使用
  const { pieMonthData, monthPercentOptions } = usePercentMonth(
    studyData,
    dateValueMonth,
  );
  const { pieDateData, dayPercentOptions } = usePercentDate(
    studyData,
    dateValueDay,
  );

  //棒グラフのオプションを指定（daily）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dayOptions: ChartOptions<any> = {
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        stacked: true,
        min: subDays(new Date(), 6 + dateValueDay).getTime(),
        max: subDays(new Date(), dateValueDay).getTime(),
        title: {
          display: true,
        },
        type: "time",
        time: {
          unit: "day", //日付ごと表示
        },
        ticks: {
          align: "start",
        },
      },

      yAxes: {
        stacked: true,
        title: {
          display: true,
        },
      },
    },
  };
  //棒グラフのオプションを指定（monthly）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monthOptions: ChartOptions<any> = {
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        stacked: true,
        min: subMonths(new Date(), 1 + dateValueMonth).getTime(),
        max: subMonths(new Date(), dateValueMonth).getTime(),
        title: {
          display: true,
        },
        type: "time",
        time: {
          unit: "month", //月ごと表示
        },
      },
      yAxes: {
        stacked: true,
        title: {
          display: true,
        },
      },
    },
  };

  return (
    <>
      <Flex width="50%" direction="column">
        <Heading text="Weekly Record" />
        <Box width="full" shadow="xl" borderRadius="md">
          <Stack>
            <Flex justifyContent="center" alignItems="center" mt={5}>
              {isDay ? (
                <Box mr={20}>
                  {format(subDays(new Date(), 6 + dateValueDay), "yyyy/MM/dd")}~
                  {format(subDays(new Date(), dateValueDay), "yyyy/MM/dd")}
                </Box>
              ) : (
                <Box mr={20}>
                  {format(
                    subMonths(new Date(), 1 + dateValueMonth),
                    "yyyy/MM/dd",
                  )}
                  ~{format(subMonths(new Date(), dateValueMonth), "yyyy/MM/dd")}
                </Box>
              )}

              {isDisplayFig ? (
                <StackFigButton
                  title="円グラフで表示"
                  onClick={displayChange}
                />
              ) : (
                <StackFigButton
                  title="棒グラフで表示"
                  onClick={displayChange}
                />
              )}
              <StackDailyButton title={title} onClick={monthBtn} />

              <StackDateButton
                isType={true}
                leftRadius={3}
                onClick={subDateBtn}
              />
              <StackDateButton
                isType={false}
                rightRadius={3}
                onClick={addDateBtn}
              />
            </Flex>

            <Flex justifyContent="center">
              {isDay ? (
                <Flex>
                  {isDisplayFig ? (
                    <Box height={575}>
                      <Box width={600} height={600} pb={3}>
                        <Bar data={chartDatas} options={dayOptions} />
                      </Box>
                    </Box>
                  ) : (
                    <Box height={575}>
                      <Box height={500} width={500} alignItems="center">
                        {pieDateData && pieDateData.labels?.length != 0 ? (
                          <Pie data={pieDateData} options={dayPercentOptions} />
                        ) : (
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            backgroundColor="gray.100"
                            width={450}
                            height={450}
                            borderRadius={500}
                            ml="30px"
                            mt="50px"
                          >
                            データがありません
                          </Flex>
                        )}
                      </Box>
                    </Box>
                  )}
                </Flex>
              ) : (
                <Flex>
                  {isDisplayFig ? (
                    <Box height={575}>
                      <Box width={600} height={600} pb={3}>
                        <Bar data={chartDatas} options={monthOptions} />
                      </Box>
                    </Box>
                  ) : (
                    <Box height={575}>
                      <Box height={500} width={500} alignItems="center">
                        {pieMonthData && pieMonthData.labels?.length != 0 ? (
                          <Pie
                            data={pieMonthData}
                            options={monthPercentOptions}
                          />
                        ) : (
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            backgroundColor="gray.100"
                            width={450}
                            height={450}
                            borderRadius={500}
                            ml="30px"
                            mt="50px"
                          >
                            データがありません
                          </Flex>
                        )}
                      </Box>
                    </Box>
                  )}
                </Flex>
              )}
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
