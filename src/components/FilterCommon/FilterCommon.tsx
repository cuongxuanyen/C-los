import { DatePicker, Dropdown, Input, Select, Spin, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import images from "@/res/images";
import ButtonCustom from "../Button/ButtonCustom";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import {
  BottomFilter,
  ClearAll,
  ContainerChip,
  ContainerFilter,
  ContainerListSelect,
  DropdownFilter,
  Filters,
  FormBox,
  FormFieldDate,
  HeaderFilter,
  LabelForm,
  ListFilter,
  TitleChip,
  TitleStatus,
} from "./FilterCommon.styled";
import { convertTime, getTextDate } from "@/common/function";
import { Controller, useForm, useWatch } from "react-hook-form";
import FormSelect from "../FormField/FormSelect/FormSelect";
dayjs.extend(buddhistEra);
interface ListSelectFilterProps {
  option: Array<{
    label: string;
    value: any;
  }>;
  isMultiple?: boolean;
  onChange?: any;
  title: string;
  key: string;
  props: any;
  width?: any;
}
interface Props {
  actionFilter?: any;
  paramList?: any;
  setParamList?: any;
  listStatus?: any;
  isDate?: boolean;
  ListSelectFilter: Array<ListSelectFilterProps>;
  maxWidth?: number;
  isReport?: boolean;
  reportBy?: number;
  isTransaction?: boolean;
  isSortFilter?: boolean;
  setReportBy?: any;
  height?: any;
  ListUnshowLabel?: any;
}

const FilterCommon: React.FC<Props> = ({
  actionFilter,
  paramList,
  setParamList,
  ListSelectFilter,
  isDate = false,
  maxWidth,
  isReport,
  reportBy,
  setReportBy,
  isTransaction = false,
  isSortFilter = true,
  height,
  ListUnshowLabel,
}) => {
  const [t] = useTranslation("global");
  const { handleSubmit, control, reset, setValue } = useForm<any>();
  const { RangePicker } = DatePicker;
  const date = useWatch({
    control,
    name: "date",
  });
  const reportType = useWatch({
    control,
    name: "type",
  });
  const quarterWatch = useWatch({
    control,
    name: "quarter",
  });
  const monthWatch = useWatch({
    control,
    name: "month",
  });
  const yearWatch = useWatch({
    control,
    name: "year",
  });
  const statusListWatch = useWatch({
    control,
    name: "statusList",
  });

  const [open, setOpen] = useState<boolean>(false);
  const [dataSourceTrans, setDataSourceTrans] = useState<any[]>([]);
  const { Option } = Select;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(1);
  const listItemFilter = useMemo(() => {
    const arr = Object.entries(paramList);
    const listItemFormat = arr?.map((item: any) => {
      return {
        key: item[0],
        value: item[1],
      };
    });
    return listItemFormat;
  }, [paramList]);
  const isCheckClearIcon = useMemo(() => {
    if (listItemFilter && listItemFilter.length > 0) {
      const listItemChip = listItemFilter.filter(
        (item: any) =>
          ![
            "page",
            "keyword",
            "size",
            "types",
            isReport && "type",
            "invoiceCategory",
          ]
            .concat(ListUnshowLabel)
            .includes(item?.key) &&
          (item?.value || item?.value === 0)
      );
      return listItemChip.length > 0;
    } else return false;
  }, [paramList]);

  useEffect(() => {
    if (isTransaction) {
      setDataSourceTrans([]);
    }
  }, [reportType]);

  useEffect(() => {
    if (isTransaction) {
      setPageSize(1);
      getListTrans();
    }
  }, [quarterWatch, monthWatch, yearWatch, date]);

  useEffect(() => {
    getListTrans();
  }, [statusListWatch]);
  const getTitleFilter = (data: any) => {
    if (ListSelectFilter && ListSelectFilter.length > 0) {
      const element = ListSelectFilter.find(
        (item: any) => item?.key === data?.key
      );
      if (element?.option && element?.option.length > 0) {
        const find = element?.option.find(
          (item: any) => item?.value === data?.value
        );
        return {
          value: find?.label,
          title: element?.title,
        };
      } else
        return {
          value: "",
          title: "",
        };
    } else
      return {
        value: "",
        title: "",
      };
  };
  const getItemSelect = (key: any) => {
    const element = ListSelectFilter.find((item: any) => item?.key === key);
    return element;
  };
  const handleItemChip = (item: any) => {
    switch (item?.key) {
      case "startDate":
        return {
          title: t("formDate"),
          value: convertTime(formatEndDate(item?.value), "dd/MM/yyyy"),
        };
      case "endDate":
        return {
          title: t("toDate"),
          value: convertTime(formatEndDate(item?.value), "dd/MM/yyyy"),
        };
      case "transactionIdList":
        return {
          title: t("transactionID"),
          value:
            item?.value &&
            item?.value?.map((ele: any) => (
              <TitleStatus>
                {handleItemMultipleTrans(ele)}
                <CloseOutlined
                  onClick={() => actionClearItemMultiple(item, ele)}
                />
              </TitleStatus>
            )),
        };
      default:
        return {
          title: getTitleFilter(item)?.title,
          value: getTitleFilter(item)?.value,
        };
    }
  };
  const handleItemMultipleChip = (value: any, key: any) => {
    const elementSelect = getItemSelect(key);
    if (elementSelect?.option && elementSelect?.option.length > 0) {
      const element = elementSelect?.option.find(
        (item: any) => item?.value === value
      );
      return element?.label;
    } else return "";
  };
  const handleItemMultipleTrans = (value: any) => {
    const elementSelect = selectedValues;
    if (elementSelect && elementSelect?.length > 0) {
      const element = elementSelect?.find((item: any) => item === value);
      return element;
    } else return "";
  };
  const onClearAll = () => {
    const param = {
      page: 0,
      size: paramList?.size,
      keyword: paramList?.keyword || "",
    };
    reset();
    setValue("startDate", "");
    setValue("endDate", "");
    if (isTransaction) {
      setSelectedValues([]);
    }
    setParamList(param);
    actionFilter(param);
  };
  const onCancel = () => {
    setOpen(false);
  };
  const onApply = (value: any) => {
    let param = {
      ...paramList,
      ...value,
      page: 0,
    };

    if (value?.date && value?.date.length > 0) {
      //to date
      const endDate = new Date(value?.date[1]);
      const formatEndDate = getTextDate(endDate, "23:59:59");
      //to date
      const startDate = new Date(value?.date[0]);
      const formatStartDate = getTextDate(startDate, "00:00:00");

      param = {
        ...param,
        startDate: formatStartDate,
        endDate: formatEndDate,
      };
      delete param.date;
    } else {
      delete param.date;
      delete param.endDate;
      delete param.startDate;
    }
    if (!value?.year && isReport) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      param = {
        ...param,
        year: year,
      };
      setValue("year", year);
    }
    if (!value?.month && isReport) {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      param = {
        ...param,
        month: month,
      };
      setValue("month", month);
    }
    if (!value?.quarter && isReport) {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const quarter = Math.floor(month / 4) + 1;
      param = {
        ...param,
        quarter: quarter,
      };
      setValue("quarter", quarter);
    }
    if (reportBy && isReport) {
      if (reportBy === 1) {
        if (!param?.endDate && !param?.startDate) {
          const startDate = new Date();
          const formatStartDate = getTextDate(startDate, "00:00:00");
          const formatEndDate = getTextDate(startDate, "23:59:59");
          param = {
            ...param,
            type: 1,
            startDate: formatStartDate,
            endDate: formatEndDate,
            quarter: null,
            month: null,
            year: null,
          };
        } else {
          param = {
            ...param,
            type: 1,
            quarter: null,
            month: null,
            year: null,
          };
        }
      }
      if (reportBy === 2) {
        if (param?.year) {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          param = {
            ...param,
            type: 2,
            quarter: null,
            endDate: null,
            startDate: null,
            year: year,
          };
        } else {
          param = {
            ...param,
            type: 2,
            quarter: null,
            endDate: null,
            startDate: null,
          };
        }
      }
      if (reportBy === 3) {
        if (param?.year) {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          param = {
            ...param,
            type: 3,
            month: null,
            endDate: null,
            startDate: null,
            year: year,
          };
        } else {
          param = {
            ...param,
            type: 3,
            month: null,
            endDate: null,
            startDate: null,
          };
        }
      }
    }
    actionFilter(param);
    setParamList(param);
    onCancel();
  };
  const actionClearItem = (key: any) => {
    setValue(key, null);
    const param = {
      ...paramList,
      [key]: null,
    };
    actionFilter(param);
    setParamList(param);
  };
  const actionClearItemMultiple = (item: any, value: any) => {
    const deleteItem = item?.value.filter((ele: any) => ele !== value);
    setValue(item?.key, deleteItem);
    const param = {
      ...paramList,
      [item?.key]: deleteItem.length > 0 ? deleteItem : null,
    };
    actionFilter(param);
    setParamList(param);
    if (item.key === "transactionIdList") {
      setSelectedValues(deleteItem);
    }
  };
  const formatEndDate = (date: any) => {
    if (date) {
      const day = date.split("T");
      const formatDate = day[0];
      return formatDate;
    }
    return "";
  };
  const RenderSelectFilter = (item: ListSelectFilterProps, index: any) => {
    return (
      <div key={index} style={{ width: item?.width ? item?.width : 200 }}>
        <FormSelect
          label={item?.title}
          name={item?.key}
          control={control}
          props={{
            ...item?.props,
            options: item?.option,
            mode: item?.isMultiple ? "multiple" : "",
            onChange: (e: any, name: string) => {
              if (item?.onChange) {
                item?.onChange(e);
              }
              setValue(name, e);
            },
          }}
          isSortFilter={isSortFilter}
          setValue={setValue}
        />
      </div>
    );
  };
  const renderItemFilter = (item: any, index: any) => {
    return ![
      "page",
      "keyword",
      "size",
      "types",
      isReport && "type",
      !isReport && "invoiceCategory",
    ]
      .concat(ListUnshowLabel)
      .includes(item?.key) &&
      ((!Array.isArray(item?.value) && item?.value) ||
        item?.value === 0 ||
        (Array.isArray(item?.value) && item?.value.length > 0)) ? (
      <ContainerChip key={index}>
        <TitleChip>{handleItemChip(item)?.title}</TitleChip>
        {getItemSelect(item?.key)?.isMultiple ? (
          <>
            {item?.value &&
              item?.value?.map((ele: any) => (
                <TitleStatus>
                  {handleItemMultipleChip(ele, item?.key)}
                  <CloseOutlined
                    onClick={() => actionClearItemMultiple(item, ele)}
                  />
                </TitleStatus>
              ))}
          </>
        ) : (
          <>
            {item?.key === "transactionIdList" ? (
              <TitleStatus>{handleItemChip(item)?.value}</TitleStatus>
            ) : (
              <TitleStatus>
                {handleItemChip(item)?.value}
                <CloseOutlined onClick={() => actionClearItem(item?.key)} />
              </TitleStatus>
            )}
          </>
        )}
      </ContainerChip>
    ) : (
      ""
    );
  };
  const getValueDate = (param: any) => {
    const currentDate = new Date();
    if (param?.startDate && param?.endDate) {
      return [
        dayjs(formatEndDate(param?.startDate)),
        dayjs(formatEndDate(param?.endDate)),
      ];
    } else if (param?.startDate && !param?.endDate) {
      return [dayjs(formatEndDate(param?.startDate)), dayjs(currentDate)];
    } else if (!param?.startDate && param?.endDate) {
      return [dayjs(currentDate), dayjs(formatEndDate(param?.endDate))];
    } else {
      return [];
    }
  };
  const handleOpenChange = (newOpen: boolean) => {
    setSelectedValues([]);
    setOpen(newOpen);
    const filterList = listItemFilter.filter(
      (item: any) =>
        !["page", "keyword", "size", "types", "invoiceCategory"]
          .concat(ListUnshowLabel)
          .includes(item?.key)
    );
    if (filterList && filterList.length > 0) {
      listItemFilter.forEach((item: any) => {
        if (item?.key === "startDate" || item?.key === "endDate") {
          const value = getValueDate(paramList);
          setValue("date", value);
        } else if (item?.key === "type" && isReport && setReportBy) {
          setReportBy(item?.value);
          setValue("type", item?.value);
        } else {
          setValue(item?.key, item?.value);
          if (item?.key === "transactionIdList") {
            setSelectedValues(item?.value);
          }
        }
      });
    } else {
      reset();
    }
    // if (isReport) {
    //   if (!reportType) {
    //     setValue("type", '');
    //   }
    // }
  };
  // transactions
  const getListTrans = async () => {
    //to date
    const endDate = new Date(date ? date[1] : null);
    const formatEndDate = getTextDate(endDate, "23:59:59");
    //from date
    const startDate = new Date(date ? date[0] : null);
    const formatStartDate = getTextDate(startDate, "00:00:00");
    const param = {
      startDate: formatStartDate,
      endDate: formatEndDate,
      type: reportType,
      quarter: quarterWatch,
      month: monthWatch,
      year: yearWatch,
      statusList: statusListWatch,
    };
    if (
      (startDate && endDate && reportType == 1) ||
      (reportType == 2 && monthWatch && yearWatch) ||
      (reportType == 3 && quarterWatch && yearWatch)
    ) {
      const res: any = {};
      if (res?.status === 200 || res?.status === 201) {
        setLoading(false);
        const response: any = res?.data;
        response?.data.length
          ? setDataSourceTrans(
              response &&
                response?.data?.map((item: any, index: any) => ({
                  key: index,
                  transactionId: item.transactionId,
                  invoiceTime: convertTime(item.invoiceTime, "dd-MM-yyyy"),
                }))
            )
          : setDataSourceTrans([]);
      }
    } else {
      setDataSourceTrans([]);
    }
  };

  const columns = [
    {
      title: t("transactionId"),
      dataIndex: "transactionId",
      key: "transactionId",
      width: "60%",
    },
    {
      title: t("time"),
      dataIndex: "invoiceTime",
      key: "invoiceTime",
      width: "30%",
    },
  ];

  const handleTableChange = (_: any, selectedRows: any) => {
    const transactionIds = selectedRows?.map((row: any) => row.transactionId);
    setSelectedValues(transactionIds);
    setValue("transactionIdList", transactionIds);
  };

  const handleSelectChange = (values: any) => {
    setSelectedValues(values);
    setValue("transactionIdList", values);
  };
  const filteredDataSource = dataSourceTrans.filter((item: any) =>
    item?.transactionId.toLowerCase().includes(filterText.toLowerCase())
  );
  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setLoading(true);
      setPageSize(pageSize + 1);
      getListTrans();
    }
  };

  return (
    <ContainerFilter style={{ height: 37, width: "-webkit-fill-available" }}>
      <Dropdown
        trigger={["click"]}
        open={open}
        onOpenChange={handleOpenChange}
        dropdownRender={() => (
          <DropdownFilter>
            <HeaderFilter>
              {t("Filter")} <CloseOutlined onClick={() => setOpen(false)} />
            </HeaderFilter>

            <div>
              <ContainerListSelect
                style={{ maxWidth: maxWidth ? maxWidth : 830 }}
              >
                {ListSelectFilter &&
                  ListSelectFilter?.map((item: any, index: any) =>
                    RenderSelectFilter(item, index)
                  )}
              </ContainerListSelect>
              {isDate && (
                <FormFieldDate style={{ width: 410 }}>
                  <FormBox
                    style={{
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <LabelForm
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {t("selectDate")}
                    </LabelForm>
                    <Controller
                      name={"date"}
                      control={control}
                      render={({ field }) => (
                        <RangePicker
                          {...field}
                          placeholder={["dd/MM/yyyy", "dd/MM/yyyy"]}
                          style={{ height: 37 }}
                          format={["DD/MM/YYYY", "DD/MM/YYYY"]}
                          disabledDate={(current: any) => {
                            const date = new Date().getTime();
                            const valueDate = new Date(current).getTime();
                            return date < valueDate;
                          }}
                        />
                      )}
                    />
                  </FormBox>
                </FormFieldDate>
              )}
              {isTransaction && (
                <div
                  style={{ display: "flex", flexFlow: "column", paddingTop: 4 }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      paddingBottom: 4,
                    }}
                  >
                    {t("transactionID")}
                  </span>
                  <Controller
                    name="transactionIdList"
                    control={control}
                    render={() => (
                      <Select
                        value={selectedValues}
                        mode="multiple"
                        style={{ width: 400 }}
                        onChange={handleSelectChange}
                        allowClear
                        placeholder={t("selectTransactionId")}
                        showSearch={false}
                        dropdownRender={() => (
                          <>
                            <Input
                              placeholder={t("filterTransactionId")}
                              value={filterText}
                              onChange={(e) => setFilterText(e.target.value)}
                              style={{ marginBottom: 8, display: "block" }}
                            />
                            <Spin spinning={loading}>
                              <div
                                style={{
                                  maxHeight: 300,
                                  maxWidth: 800,
                                  overflowY: "auto",
                                }}
                                onScroll={handleScroll}
                              >
                                <Table
                                  columns={columns}
                                  dataSource={filteredDataSource}
                                  pagination={false}
                                  rowSelection={{
                                    type: "checkbox",
                                    selectedRowKeys: selectedValues?.map(
                                      (value: any) =>
                                        dataSourceTrans?.find(
                                          (item: any) =>
                                            item?.transactionId === value
                                        )?.key
                                    ) as React.Key[],
                                    onChange: handleTableChange,
                                  }}
                                  rowKey="key"
                                  size="small"
                                />
                              </div>
                            </Spin>
                          </>
                        )}
                      >
                        {dataSourceTrans?.map((item: any) => (
                          <Option key={item.key} value={item.transactionId}>
                            {item.transactionId}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </div>
              )}
            </div>

            <BottomFilter>
              <ButtonCustom
                text={t("applyFilter")}
                colorText="#FFFFFF"
                colorButton="#66BB69"
                onClick={handleSubmit(onApply)}
                style={{ width: 164 }}
              />
              <ButtonCustom
                text={t("cancel")}
                colorText="#66BB69"
                colorButton="#FFFFFF"
                style={{ border: "1px solid #C8DDF2", width: 164 }}
                onClick={onCancel}
              />
            </BottomFilter>
          </DropdownFilter>
        )}
      >
        <Filters
          style={{ height: height || 37 }}
          onClick={() => setOpen(!open)}
        >
          <img src={"images?.Filters"} />
          {t("Filter")}
        </Filters>
      </Dropdown>

      <div
        style={{
          display: "flex",
          width: "-webkit-fill-available",
          position: "relative",
          paddingRight: 60,
          flexFlow: "wrap",
        }}
      >
        <ListFilter>
          {listItemFilter &&
            listItemFilter?.map((item: any, index: any) =>
              renderItemFilter(item, index)
            )}
        </ListFilter>
        {isCheckClearIcon && (
          <ClearAll onClick={() => onClearAll()}>{t("clearAll")}</ClearAll>
        )}
      </div>
    </ContainerFilter>
  );
};

export default FilterCommon;
