import React, { useEffect, useState } from "react";
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { TotalLabel } from "../Table/TableCustom.styled";
import { Select } from "antd";
import { removeEmoji } from "@/common/function";
import { useTranslation } from "react-i18next";
import InputCustom from "@/components/Input/InputCustom";
import { columnProps } from "../Table/TableCustom.types";
import { useAppSelector } from "@/hooks";

const Pagination: React.FC<columnProps> = ({
  currentPage,
  total,
  onChangePage,
  pageSizeOptions,
  pageSizeProps,
}) => {
  const [t] = useTranslation("global");

  const [page, setPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState(pageSizeProps ? pageSizeProps : 10);
  const [textRecord, setTextRecord] = useState("");
  const [totalPages, setTotalPage] = useState(Math.ceil(total / pageSize));

  const optionPageSize = pageSizeOptions?.length
    ? pageSizeOptions
    : [10, 20, 50, 100];

  useEffect(() => {
    const totalPagesValue = Math.ceil(total / pageSize);
    setTotalPage(totalPagesValue);
  }, [total]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!total || total == 0) {
      setTextRecord("0");
      setPage(1);
    } else {
      if (currentPage == totalPages) {
        const valueTextStart = (currentPage - 1) * pageSize + 1;
        setTextRecord(valueTextStart + " - " + total);
      } else {
        const valueTextStart = (currentPage - 1) * pageSize + 1;
        const valueTextEnd = (currentPage - 1) * pageSize + pageSize;
        setTextRecord(valueTextStart + " - " + valueTextEnd);
      }
    }
  }, [currentPage, pageSize, total]);

  useEffect(() => {
    if (totalPages == 1) {
      setTextRecord("1" + " - " + total);
    }
  }, [totalPages]);

  useEffect(() => {
    onChangePage?.(1, pageSize);
    const totalPagesValue = Math.ceil(total / pageSize);
    setTotalPage(totalPagesValue);
  }, [pageSize]);

  const onChangePageRight = () => {
    if (page < totalPages) {
      const currentPage = Number(page);
      onChangePage(currentPage + 1, pageSize);
      setPage(page + 1);
    } else {
      return;
    }
  };

  const onChangePageLeft = () => {
    if (page > 1) {
      onChangePage(page - 1, pageSize);
      setPage(page - 1);
    } else {
      return;
    }
  };

  const onChangePageRightDouble = () => {
    if (page < totalPages) {
      onChangePage(totalPages, pageSize);
      setPage(totalPages);
    } else {
      return;
    }
  };
  const onChangePageLeftDouble = () => {
    if (page > 1) {
      onChangePage(1, pageSize);
      setPage(1);
    } else {
      return;
    }
  };

  const handleChangePageSize = (value: any) => {
    setPageSize(value);
    onChangePage(page, value);
  };

  const filterSearch = () => {
    if (page == 0) {
      return;
    } else {
      if (!page) {
        setPage("1");
        onChangePage(1, pageSize);
      } else {
        const newPage = totalPages < page ? totalPages : page;
        onChangePage(newPage, pageSize);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setPage(inputValue);
    }
  };
  const handlePaste = (e: any) => {
    e.preventDefault(); // Ngăn chặn hành vi dán mặc định

    if (!removeEmoji(e)) {
      // Lấy nội dung được dán
      const textPaste = e.clipboardData.getData("text");
      // Lọc ký tự đặc biệt và chữ cái
      const filteredText = filterSpecialCharsAndLetters(textPaste);
      // Cập nhật trạng thái nếu có nội dung hợp lệ
      if (filteredText) {
        setPage(page + filteredText);
      }
    }
  };
  const filterSpecialCharsAndLetters = (text: any) => {
    // Loại bỏ các ký tự không phải số
    return text.replace(/[^0-9]/g, "");
  };
  return (
    <>
      <TotalLabel>
        {textRecord} {t("of")}{" "}
        <span style={{ fontWeight: "bolder" }}>{total}</span>{" "}
        {t("totalRecords")}
      </TotalLabel>
      <Select
        defaultValue={pageSize}
        style={{ width: 120 }}
        onChange={handleChangePageSize}
        options={optionPageSize.map((item: number) => ({
          value: item,
          label: `${item} / page`,
        }))}
      />
      <DoubleLeftOutlined
        style={{
          cursor: "pointer",
          color: "#4D4D4D",
          fontSize: 15,
          fontWeight: "bold",
          margin: "0 24px",
        }}
        onClick={onChangePageLeftDouble}
      />
      <LeftOutlined
        style={{
          cursor: "pointer",
          color: "#4D4D4D",
          fontSize: 15,
          fontWeight: "bold",
          margin: "0 24px",
        }}
        onClick={onChangePageLeft}
      />
      <InputCustom
        style={{
          width: 50,
          height: 40,
          marginRight: 8,
          textAlign: "center",
        }}
        onChange={handleChange}
        onPressEnter={filterSearch}
        onBlur={(e) => {
          if (e.target.value > totalPages) {
            setPage(totalPages);
            onChangePage(totalPages, pageSize);
          } else if (e.target.value < 1) {
            setPage(1);
            onChangePage(1, pageSize);
          } else {
            setPage(e.target.value);
            onChangePage(e.target.value, pageSize);
          }
        }}
        onPaste={handlePaste}
        value={page}
      />
      {t("of")} {totalPages ? totalPages : "1"}
      <RightOutlined
        style={{
          cursor: "pointer",
          color: "#4D4D4D",
          fontSize: 15,
          fontWeight: "bold",
          margin: "0 24px",
        }}
        onClick={onChangePageRight}
      />
      <DoubleRightOutlined
        style={{
          cursor: "pointer",
          color: "#4D4D4D",
          fontSize: 15,
          fontWeight: "bold",
          margin: "0 24px",
        }}
        onClick={onChangePageRightDouble}
      />
    </>
  );
};

export default Pagination;
