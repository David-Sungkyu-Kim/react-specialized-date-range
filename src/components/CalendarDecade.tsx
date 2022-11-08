import * as React from "react";
import { useDateContext } from "../hooks/useDateContext";
import useDecade from "../hooks/useDecade";

import { IDatePickerContextValues } from "../@types/dateContext";
import { ICalendarProps } from "../@types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import { convertToDeafultFormat, findDecadeInYear, findYearInStr } from "../utils/dateFormat";

export default function CalendarDecade({ standard }: ICalendarProps) {
  const { value: date, action } = useDateContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;

  const { year, selectedDate } = date[standard];
  const { decades } = useDecade({ year });
  const selectedYear = findYearInStr(selectedDate, format);
  const disabledYear = disabledDates?.map((item) =>
    findDecadeInYear(convertToDeafultFormat(item, format))
  );

  const handleClickDecade = (decade: number) => {
    (!disabledYear ||
      (disabledYear &&
        (disabledYear[0] <= findDecadeInYear(decade) || !disabledYear[0]) &&
        (findDecadeInYear(decade) <= disabledYear[1] || !disabledYear[1]))) &&
      action.changeDecade(standard, decade);
  };

  return (
    <div className='calendarDateLargeUnitWrapper'>
      {decades &&
        decades.map((decade, index) => (
          <div
            key={decade}
            className={`calendarDateLargeUnitContent ${
              findDecadeInYear(selectedYear) === findDecadeInYear(decade) && "highlight"
            } ${
              (index === 0 ||
                index === 11 ||
                (disabledYear &&
                  (findDecadeInYear(decade) < disabledYear[0] ||
                    (findDecadeInYear(decade) > disabledYear[1] && disabledYear[1])))) &&
              "disabled"
            }`}
            onClick={() => handleClickDecade(decade)}
          >
            {decade}
          </div>
        ))}
    </div>
  );
}
