import FormField from "@/components/FormField/FormField";
import FormSelect from "@/components/FormField/FormSelect/FormSelect";
import { Checkbox, Col, Row, Space, TableColumnsType } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  DraftContainer,
  ExceptionContainer,
  ExceptionContent,
  ExceptionHeader,
  LabelData,
  RowButton,
  TextFrom,
  TitleFrom,
} from "./DraftFileTDTD.styled";
import FormInputNumber from "@/components/FormField/FormInputNumber/FormInputNumber";
import TableCustom from "@/components/Table/TableCustom";
import { columnProps } from "@/components/Table/TableCustom.types";
import InputCustom from "@/components/Input/InputCustom";
import ButtonCustom from "@/components/Button/ButtonCustom";
import PopupConfirm from "@/components/PopupConfirm/PopupConfirm";
const dataFake = [
  {
    key: 1,
    NgoaiLe: "Ngoại lệ khác",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
  {
    key: 2,
    NgoaiLe:
      "Thời hạn cấp tín dụng/thời hạn được tái tài trợ/phương thức giải ngân/thu nợ",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
  {
    key: 3,
    NgoaiLe: "Điều kiện Khoản vay",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
  {
    key: 4,
    NgoaiLe: "Điều kiện KH vay",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
  {
    key: 5,
    NgoaiLe: "Mục đích vay vốn/mục đích cấp tín dụng",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
  {
    key: 6,
    NgoaiLe: "Giá trị cấp tín dụng",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
  {
    key: 7,
    NgoaiLe: "Tài sản bảo đảm/ tỷ lệ cấp tín dụng trên TSBĐ",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
  {
    key: 8,
    NgoaiLe: "Danh mục khác trong hoạt động cấp bảo lãnh/LC",
    NgoaiLeQuyetDinhSo: "",
    Mota: "",
    enable: false,
  },
];
const DraftFileTDTD: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  const NgoaiLeDieuKien = useWatch({
    control: control,
    name: "NgoaiLeDieuKien",
  });
  const [rowData, setRowData] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [listItemSelect, setListItemSelect] = useState<any>([]);
  const [dataSource, setDataSource] = useState<any>([]);

  useEffect(() => {
    setDataSource(dataFake);
    resetData();
  }, []);

  const listSelectMemo = useMemo(() => {
    if (listItemSelect && listItemSelect.length > 0) {
      const listFormat = listItemSelect.map((item: any) => item?.key);
      return listFormat;
    } else {
      return [];
    }
  }, [listItemSelect]);
  const columnsTable: TableColumnsType<columnProps> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Tất cả",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: (_: any, item: any) => (
        <Checkbox
          checked={listSelectMemo.includes(item.key)}
          onChange={(e) => onSelectItem(e, item)}
        />
      ),
    },
    {
      title: "Ngoại Lệ",
      dataIndex: "NgoaiLe",
      key: "NgoaiLe",
      width: "30%",
    },
    {
      title: "Ngoại lệ theo quyết định số",
      dataIndex: "NgoaiLeQuyetDinhSo",
      key: "NgoaiLeQuyetDinhSo",
      width: "30%",
      render: (_: any, item: any) => (
        <InputCustom
          style={{ padding: "10px", width: "100%" }}
          onChange={(e: any) =>
            onChangeInput(e.target.value, item, "NgoaiLeQuyetDinhSo")
          }
          maxLength={255}
          disabled={!listSelectMemo.includes(item?.key)}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "Mota",
      key: "Mota",
      width: "30%",
      render: (_: any, item: any) => (
        <InputCustom
          style={{ padding: "10px", width: "100%" }}
          onChange={(e: any) => onChangeInput(e.target.value, item, "Mota")}
          maxLength={255}
          disabled={!listSelectMemo.includes(item?.key)}
        />
      ),
    },
  ];

  const resetData = () => {
    setValue("NgoaiLeDieuKien", 1);
    setValue("LoaiKhachHang", 1);
  };
  const onChangeInput = (value: string, item: any, type: string) => {
    const listChange = dataSource.map((element: any) => {
      if (item?.key === element?.key) {
        return { ...element, [type]: value };
      } else {
        return element;
      }
    });
    setDataSource(listChange);
  };
  const onSelectItem = (e: any, item: any) => {
    onClickRowItem(item);
    const { checked } = e.target;
    if (checked) {
      setListItemSelect([...listItemSelect, item]);
    } else {
      setListItemSelect(
        listItemSelect.filter((element: any) => element?.key !== item?.key)
      );
    }
  };
  const onClickRowItem = (item: any) => {
    setRowData(item);
  };
  const handleChangeRadio = (e: any) => {
    setValue(e?.target?.name, e?.target?.value);
  };
  return (
    <>
      <DraftContainer>
        <TitleFrom>Soạn thảo hồ sơ trình</TitleFrom>
        <Row gutter={20}>
          <Col span={8}>
            <FormSelect
              name="LoaiKhachHang"
              label={"Loại Khách hàng"}
              control={control}
              required
              props={{
                options: [
                  { value: 1, label: "--chọn--" },
                  { value: 2, label: "Khách hàng cá nhân, hộ gia đình" },
                  { value: 3, label: "Doanh nghiệp SME" },
                  { value: 4, label: "Doanh nghiệp lớn" },
                ],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={8}>
            <FormSelect
              name="LoaiSanPham"
              label={"Loại sản phẩm"}
              control={control}
              props={{
                options: [],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={8}>
            <FormSelect
              name="LoaiHoSo"
              label={"Loại hồ sơ"}
              control={control}
              props={{
                options: [],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <FormField
              props={{
                maxLength: 255,
                rowstextarea: 3,
              }}
              setValue={setValue}
              label={"Thông tin CĐVT"}
              name={"ThongTinCDVT"}
              control={control}
              className="fullWidth"
              render="textarea"
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8}>
            <TextFrom>
              <LabelData>Thang điểm: </LabelData>
              <div>value 3</div>
            </TextFrom>
          </Col>
          <Col span={8}>
            <TextFrom>
              <LabelData>SLA: </LabelData>
              <div>value 2</div>
            </TextFrom>
          </Col>
          <Col span={8}>
            <TextFrom>
              <LabelData>Mã ĐVKD: </LabelData>
              <div> value 1</div>
            </TextFrom>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8}>
            <FormSelect
              name="mien"
              label={"Miền"}
              control={control}
              required
              props={{
                options: [{ value: 1, label: "Miền bắc" }],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={8}>
            <FormSelect
              name="CumDonViKD"
              label={"Cụm đợ vị kinh doanh"}
              control={control}
              props={{
                options: [],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={8}>
            <FormSelect
              name="DonViKD"
              label={"Đơn vị kinh doanh"}
              control={control}
              props={{
                options: [],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8}>
            <FormField
              name="IDKhachHang"
              label={"ID khách hàng"}
              control={control}
              required
              props={{}}
              setValue={setValue}
            />
          </Col>
          <Col span={8}>
            <FormField
              name="TenKhachHang"
              label={"Tên khách hàng (ĐVKD nhập in hoa có dấu, đúng theo ĐKKD)"}
              control={control}
              required
              props={{}}
              setValue={setValue}
            />
          </Col>
          <Col span={8}>
            <FormSelect
              name="QuanHeTinDung"
              label={"Quan hệ tín dụng"}
              control={control}
              required
              props={{
                options: [],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormField
              props={{
                maxLength: 255,
                rowstextarea: 4,
              }}
              required
              setValue={setValue}
              label={"Thông tin khách hàng"}
              name={"ThongTinKH"}
              control={control}
              className="fullWidth"
              render="textarea"
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8}>
            <FormField
              props={{
                maxLength: 255,
              }}
              required
              setValue={setValue}
              label={"Xếp hạng tín dụng"}
              name={"XepHangTinDung"}
              control={control}
              className="fullWidth"
            />
          </Col>
          <Col span={4}>
            <FormSelect
              name="LoaiTinDung"
              label={"Loại Tín Dụng"}
              control={control}
              required
              props={{
                options: [],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={4}>
            <FormInputNumber
              label={"Thời gian tín dụng"}
              name="TimeTinDung"
              control={control}
              required
              props={{
                maxLength: 15,
                addonAfter: "Tháng",
              }}
              setValue={setValue}
            />
          </Col>
          <Col span={4}>
            <FormSelect
              name="LoaiTien"
              label={"Chọn loại tiền"}
              control={control}
              required
              props={{
                options: [],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={4}>
            <FormInputNumber
              label={"Số tiền"}
              name={"SoTien"}
              props={{
                maxLength: 19,
              }}
              required
              setValue={setValue}
              control={control}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormField
              props={{
                maxLength: 255,
                rowstextarea: 4,
              }}
              required
              setValue={setValue}
              label={"Mục đích vay"}
              name={"MucDichVay"}
              control={control}
              className="fullWidth"
              render="textarea"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormField
              props={{
                maxLength: 255,
                rowstextarea: 4,
              }}
              required
              setValue={setValue}
              label={"Tài sản đảm bảo"}
              name={"TaisanDamBao"}
              control={control}
              className="fullWidth"
              render="textarea"
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8}>
            <FormInputNumber
              label={"Giá trị TSBĐ"}
              name={"GiaTriTSBSD"}
              props={{
                maxLength: 19,
              }}
              required
              setValue={setValue}
              control={control}
            />
          </Col>
          <Col span={12}>
            <FormField
              props={{
                maxLength: 255,
              }}
              required
              setValue={setValue}
              label={"Ngành Nghề kinh doanh"}
              name={"NganhNgheKD"}
              control={control}
              className="fullWidth"
            />
          </Col>
          <Col span={4}>
            <FormSelect
              name="NhomNo"
              label={"Nhóm nợ"}
              control={control}
              required
              props={{
                options: [
                  { value: 1, label: "--Chọn--" },
                  { value: 2, label: "1" },
                  { value: 3, label: "2" },
                  { value: 4, label: "3" },
                  { value: 5, label: "4" },
                  { value: 6, label: "5" },
                ],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormField
              props={{
                maxLength: 255,
                options: [
                  { value: 0, label: "Không" },
                  { value: 1, label: "Có" },
                ],
              }}
              required
              setValue={setValue}
              label={"Ngoại lệ/điều kiện tín dụng đặc thù"}
              name={"NgoaiLeDieuKien"}
              control={control}
              className="fullWidth"
              render="radio-group"
              onChange={handleChangeRadio}
            />
          </Col>
        </Row>
        {NgoaiLeDieuKien === 1 && (
          <Row>
            <ExceptionContainer>
              <ExceptionHeader>Ngoại lệ</ExceptionHeader>
              <ExceptionContent>
                <TableCustom
                  columns={columnsTable}
                  dataSource={dataSource}
                  pagination={false}
                  currentPage={1}
                  isNotDisplayFooter
                />
              </ExceptionContent>
            </ExceptionContainer>
          </Row>
        )}

        <Row gutter={20}>
          <Col span={6}>
            <FormSelect
              name="DeNghi"
              label={"Đề nghị"}
              control={control}
              required
              props={{
                mode: "multiple",
                options: [
                  { value: 1, label: "--Chọn--" },
                  { value: 2, label: "Cấp tín dụng trong quyền ĐVKD" },
                  {
                    value: 3,
                    label:
                      "Cấp tín dụng (và ngoại lệ/ đặc thù) vượt thẩm quyền đơn vị kinh doanh",
                  },
                ],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={6}>
            <FormSelect
              name="ThamQuyen"
              label={"Thẩm quyền"}
              control={control}
              required
              props={{
                options: [
                  { value: 1, label: "--Chọn--" },
                  { value: 2, label: "HO" },
                  { value: 3, label: "ĐVKD" },
                ],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={6}>
            <FormSelect
              name="CapPheDuyen"
              label={"Cấp phê duyện"}
              control={control}
              required
              props={{
                options: [{ value: 1, label: "--Chọn--" }],
              }}
              isSortFilter={true}
              setValue={setValue}
            />
          </Col>
          <Col span={6}>
            <FormField
              props={{
                maxLength: 255,
              }}
              required
              setValue={setValue}
              label={"Tổng mức cấp tín dụng của KH và nhóm KHLQ"}
              name={"TongMucCapTinDung"}
              control={control}
              className="fullWidth"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormField
              props={{
                maxLength: 255,
                rowstextarea: 4,
              }}
              setValue={setValue}
              label={"Lưu ý về hồ sơ (nếu có)"}
              name={"LuuYHoSo"}
              control={control}
              className="fullWidth"
              render="textarea"
            />
          </Col>
        </Row>
        <RowButton>
          <ButtonCustom
            text={"Lưu thông tin"}
            colorButton="#428bca"
            onClick={() => {}}
          />
          <ButtonCustom
            text={"Hủy soạn thảo"}
            colorButton="#f0ad4e"
            onClick={() => setOpen(true)}
          />
        </RowButton>
        <PopupConfirm
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
          okText="Hủy"
          cancelText="Tiếp tục soạn"
          iconType="warning"
          description={
            "Nếu hủy các thông tin sẽ biến mất. Bạn có muốn tiếp tục hủy!"
          }
        />
      </DraftContainer>
    </>
  );
};

export default DraftFileTDTD;
