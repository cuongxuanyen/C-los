import React from "react";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

import { Calendar, Col, Row, Select, theme } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { TitleCalendar } from "./CalendarCustom.styled";
import { useTranslation } from "react-i18next";

dayjs.extend(dayLocaleData);

interface Props {
  disabledFromDate?: any;
  disabledToDate?: any;
  onChange?: any;
  value: any;
  disabledDate?: boolean;
}

const CalendarCustom: React.FC<Props> = ({
  onChange,
  disabledFromDate,
  disabledToDate,
  disabledDate,
  value,
}) => {
  const { token } = theme.useToken();
  const [t] = useTranslation("global");
  const defaultDate = new Date();

  const renderDisable = (current: any) => {
    if (disabledDate) {
      return false;
    } else {
      const today = new Date();
      const toDate = disabledToDate ? disabledToDate : today;
      if (disabledFromDate) {
        return (current && current > toDate) || current <= disabledFromDate;
      } else return current && current > toDate;
    }
  };
  const onChangeNow = (value: Dayjs) => {
    if (!renderDisable(value)) onChange?.(value);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: 8,
    padding: "0 16px",
    boxShadow: " 0px 4px 8px 0px #ABBED166",
  };
  const SelectStyle: React.CSSProperties = {
    width: "-webkit-fill-available",
    height: 35,
  };
  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        onSelect={(date, { source }) => {
          if (source === "date") {
            onChange?.(date);
          }
        }}
        value={value || dayjs(defaultDate)}
        disabledDate={(current: any) => renderDisable(current)}
        headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option
                style={{ padding: 15 }}
                key={i}
                value={i}
                className="month-item"
              >
                {t(`${months[i].toLocaleString()}`)}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 100; i < year + 1; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div style={{ padding: 10 }}>
              <Row gutter={8}>
                <Col style={{ display: "flex", flexDirection: "column" }}>
                  <TitleCalendar>{t("year")}</TitleCalendar>
                  <Select
                    style={SelectStyle}
                    size="small"
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col style={{ display: "flex", flexDirection: "column" }}>
                  <TitleCalendar>{t("month")}</TitleCalendar>
                  <Select
                    size="small"
                    style={SelectStyle}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        onChange={onChangeNow}
      />
    </div>
  );
};

export default CalendarCustom;
