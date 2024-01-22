/* eslint-disable react-hooks/exhaustive-deps */
import {
  Typography,
  Button,
  IconButton,
  Card,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Select,
  Option,
} from "@material-tailwind/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import moment from "moment/min/moment-with-locales";

import Selected from "react-select";

import { AiOutlinePlus } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";

import { useEffect, useState } from "react";
import ReportPDF from "./ReportPDF";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  shopStore,
  companyStore,
  companyLoginStore,
} from "../../../../store/Store";

// import ReceiptA4Short from "../../../receipt/receiptA4Short";
import Receipt80Short from "../../../receipt/receipt80Short";
import ReceiptSubFull from "../../../receipt/receiptSubFull";
import ReceiptSubShort from "../../../receipt/receiptSubShort";
import ReceiptA4ShortReport from "../../../receipt/receiptA4ShortReport";
import {
  getReportShop,
  getReportShopAdmin,
  getShop,
} from "../../../../api/ReportApi";

// eslint-disable-next-line react/prop-types
const ShopReport = ({ userLogin }) => {
  const [isSearchable, setIsSearchable] = useState(true);
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [shopDataStore, setShopDataStore] = useRecoilState(shopStore);
  const [companyDataStore, setCompanyDataStore] = useRecoilState(companyStore);
  const companyLoginDataStore = useRecoilValue(companyLoginStore);

  //----------  Data Table --------------------//
  const [noData, setData] = useState(false);
  const [userId, setUserId] = useState("");
  const [dataShop, setDataShop] = useState([]);
  const [searchQueryStart, setSearchQueryStart] = useState(new Date());
  const [searchQueryEnd, setSearchQueryEnd] = useState(new Date());

  const dateStart = moment(searchQueryStart).format("YYYY-MM-DD");
  const dateEnd = moment(searchQueryEnd).format("YYYY-MM-DD");

  const [dataView, setDataView] = useState([]);
  const [dataSub, setDataSub] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const [dataReceipt, setDataReceipt] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchDataShop = async () => {
    if (userLogin == "admin") {
      const response = await getReportShopAdmin(
        userId,
        selectedShop,
        dateStart,
        dateEnd
      );
      // console.log(response);
      setDataReceipt(response);
    } else {
      const response = await getReportShop(
        selectedShop?.id,
        dateStart,
        dateEnd
      );
      // console.log(response);
      setDataReceipt(response);
    }
  };

  const fetchDataShopOption = async () => {
    const response = await getShop(userId);
    // console.log(response);
    setDataShop(response);
  };

  useEffect(() => {
    fetchDataShop();
    fetchDataShopOption();
  }, [userId, selectedShop, dateStart, dateEnd, selectedCompany]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = dataView?.product_data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(dataView?.length / itemsPerPage);

  // ตัวเลือก  Select

  const companyOptions = companyDataStore?.map((company) => ({
    value: company.id,
    label: company.username,
  }));

  const [shopOptions, setShopOptions] = useState([]);

  useEffect(() => {
    if (userLogin === "admin") {
      if (dataShop) {
        const options = dataShop.map((shop) => ({
          value: shop.id,
          label: shop.salepoints_name,
        }));
        setShopOptions(options);
      }
    } else {
      if (shopDataStore) {
        const options = shopDataStore.map((shop) => ({
          value: shop.id,
          label: shop.salepoints_name,
        }));
        setShopOptions(options);
      }
    }
  }, [userLogin, dataShop, shopDataStore]);

  // console.log(shopOptions);

  //  setShopOptions(userLogin == 'admin' ? dataShop?.map((shop) => ({
  //   value: shop.id,
  //   label: shop.salepoints_name,
  // })))
  // :
  // shopDataStore?.map((shop) => ({
  //   value: shop.id,
  //   label: shop.salepoints_name,
  // }))

  // console.log(shopOptions)

  const handleCompanySelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const company = companyDataStore.find((company) => company.id === e.value);
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedCompany(company);
    setUserId(company.id);
    setDataReceipt(null);
    setDataView(null);
    setSelectedRow(null);
    setSelectedRowSub(null);
    setDataSub([]);
    setShopOptions([])
    
  };

  // console.log(selectedCompany);

  const handleSelectDateStart = (date) => {
    setSearchQueryStart(date);
    setDataView([]);
    setSelectedRow(null);
    setSelectedRowSub(null);
    setDataSub([]);
  };

  const handleSelectDateEnd = (date) => {
    setSearchQueryEnd(date);
    setDataView([]);
    setSelectedRow(null);
    setSelectedRowSub(null);
    setDataSub([]);
  };

  const handleShopSelect = (e) => {
    // console.log(e);
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    if (userLogin == "admin") {
      setSelectedShop(e);
      setSelectedRow(null);
      setSelectedRowSub(null);
      setDataView([])
      setDataSub([]);
    } else {
      const shop = shopDataStore?.find((shop) => shop.id === e.value);
      // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
      setSelectedShop(shop);
      setSelectedRow(null);
      setSelectedRowSub(null);
      setDataView([])
      setDataSub([]);
    }
  };

  const handleDataView = (data) => {
    setDataView(data);
  };

  const handleDataSub = (index) => {
    // console.log(index);
    setDataSub(dataView?.sec_product_data[index]);
  };

  // console.log(dataView);
  // console.log(dataSub);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (index) => {
    setSelectedRow(index); // ตั้งค่า index ของแถวที่เลือก
    setSelectedRowSub(null);
    setDataSub([]);
  };
  const [selectedRowSub, setSelectedRowSub] = useState(null);
  const handleRowClickSub = (index) => {
    setSelectedRowSub(index); // ตั้งค่า index ของแถวที่เลือก
  };

  //------------- open Receipt A4  -----------------------//
  const [openModalReceiptA4, setOpenModalReceiptA4] = useState(false);
  const handleModalReceiptA4 = () => {
    setOpenModalReceiptA4(!openModalReceiptA4);
  };

  //------------- open Receipt 80  -----------------------//
  const [openModalReceipt80, setOpenModalReceipt80] = useState(false);
  const handleModalReceipt80 = () => {
    setOpenModalReceipt80(!openModalReceipt80);
  };
  //------------- open Receipt A4 Sub  -----------------------//
  const [openModalReceiptSubFull, setOpenModalReceiptSubFull] = useState(false);
  const handleModalReceiptSubFull = () => {
    setOpenModalReceiptSubFull(!openModalReceiptSubFull);
  };

  //------------- open Receipt 80 Sub  -----------------------//
  const [openModalReceiptSubShort, setOpenModalReceiptSubShort] =
    useState(false);
  const [sendIndex, setSendIndex] = useState("");
  const handleModalReceiptSubShort = () => {
    setOpenModalReceiptSubShort(!openModalReceiptSubShort);
  };

  return (
    <div className="mt-5 ">
      <div className="flex flex-col  sm:flex-row gap-5 ">
        <div className="flex   justify-center ">
          {userLogin == "admin" ? (
            <Selected
              className="basic-single  w-[240px]   z-20"
              classNamePrefix="select"
              placeholder="เลือกบริษัท"
              // isClearable={isClearable}
              isSearchable={isSearchable}
              name="color"
              options={companyOptions}
              onChange={(e) => handleCompanySelect(e)}
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-center ">
          {userLogin == "admin" ? (
            <Select label="เลือกจุดขาย" onChange={(e) => handleShopSelect(e)} >
              {/* <Option value="">เลือกจุดขาย</Option> */}
              {Array.isArray(shopOptions)
                ? shopOptions?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))
                : null}
            </Select>
          ) : (
            <Selected
              className="basic-single  w-[240px]   z-20"
              classNamePrefix="select"
              placeholder="เลือกจุดขาย"
              id="clearShop"
              isSearchable={isSearchable}
              name="color"
              options={shopOptions}
              onChange={(e) => handleShopSelect(e)}
            />
          )}
        </div>
        <div className="flex justify-center ">
          <DatePicker
            // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
            // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
            // showYearDropdown
            // showMonthDropdown
            // scrollableYearDropdown
            // scrollableMonthDropdown
            selected={searchQueryStart}
            locale={th}
            dateFormat=" วันที่เริ่มต้น dd/MM/yyyy"
            onChange={(date) => handleSelectDateStart(date)}
            className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-center ">
          <DatePicker
            // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
            // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
            // showYearDropdown
            // showMonthDropdown
            // scrollableYearDropdown
            // scrollableMonthDropdown
            selected={searchQueryEnd}
            locale={th}
            dateFormat=" วันที่สิ้นสุด dd/MM/yyyy"
            onChange={(date) => handleSelectDateEnd(date)}
            className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row h-[70vh]   gap-5">
        <div className="flex w-full   lg:w-[240px]  ">
          <Card className=" w-full mt-5 border-2 overflow-auto ">
            <div>
              <table className="w-full  ">
                <thead>
                  <tr>
                    <th className="border-y w-1 border-blue-gray-100 bg-blue-gray-50/50 p-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 "
                      >
                        ลำดับ
                      </Typography>
                    </th>
                    <th className="border-y w-40 border-blue-gray-100 bg-blue-gray-50/50 p-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        เลขที่บิล
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        เลือก
                      </Typography>
                    </th>
                  </tr>
                </thead>
                {dataReceipt?.invoices_list?.length < "1" ? (
                  <tbody>
                    <tr>
                      <td colSpan={3} className=" text-center">
                        <Typography className="mt-5">
                          ...ไม่พบข้อมูล...
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {dataReceipt?.invoices_list?.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={` hover:bg-gray-200  ${
                            selectedRow === index ? "bg-gray-300  " : ""
                          }`}
                        >
                          <td>
                            <div className="flex items-center justify-center mt-5">
                              <Typography
                                variant="small"
                                //   color="blue-gray"
                                className="font-normal "
                              >
                                {index + 1}
                              </Typography>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center justify-center mt-5">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal "
                              >
                                {data?.code || ""}
                              </Typography>
                            </div>
                          </td>
                          <td>
                            <div className="flex justify-center  ">
                              <IconButton
                                color="green"
                                size="sm"
                                className=" rounded-full border-4 w-6 h-6 mt-3  border-green-500 "
                                onClick={() => [
                                  handleDataView(data),
                                  handleRowClick(index),
                                ]}
                              >
                                <AiOutlinePlus className="text-xl " />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </Card>
        </div>
        <div className="flex flex-col w-full 2xl:flex-row overflow-auto">
          <div className="flex flex-col w-full 2xl:w-6/12 mt-3">
            <Typography className="w-full font-bold text-center">
              ใบเสร็จรับเงิน / ใบกำกับภาษีแบบย่อ
            </Typography>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between sm:pr-5 gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
              <div className="font-bold">
                เลขที่บิล: <span className="font-normal">{dataView?.code}</span>
              </div>
              <div className="font-bold">
                รวมทั้งสิ้น:{" "}
                <span className="font-normal">
                  {dataView?.total_price?.toLocaleString()}
                </span>{" "}
                บาท
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between sm:pr-5 gap-3 sm:gap-1 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
              <div className="font-bold">
                วันที่สร้างบิล:{" "}
                <span className="font-normal">
                  {moment(dataView?.created_at).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="font-bold">
                ภาษีมูลค่าเพิ่ม:{" "}
                <span className="font-normal">
                  {dataView?.total_tax?.toLocaleString()}
                </span>{" "}
                บาท
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between sm:pr-5 gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
              <div className="font-bold">
                <p className="text-white">.</p>
              </div>
              <div className="font-bold text-red-500">
                รวมมูลค่าสินค้า:{" "}
                <span>{dataView?.total_amount?.toLocaleString()}</span> บาท
              </div>
            </div>
            <div className="flex w-full justify-center lg:justify-end lg:px-5 gap-5 ">
                    <Button
                      size="sm"
                      className="text-base flex justify-center  items-center   bg-green-500"
                      variant="gradient"
                      color="blue"
                      disabled={dataView?.length < 1}
                      onClick={() => setOpenModalReceiptA4(true)}
                    >
                      <span className="mr-2 text-xl ">
                        <MdLocalPrintshop />
                      </span>
                      พิมพ์ (บิลเต็ม)
                    </Button>
              {/* <div>
                <Menu className="text-base flex justify-center  items-center   ">
                  <MenuHandler>
                    <Button
                      size="sm"
                      className="text-base flex justify-center  items-center   bg-green-500"
                      variant="gradient"
                      color="blue"
                    >
                      <span className="mr-2 text-xl ">
                        <MdLocalPrintshop />
                      </span>
                      พิมพ์ (บิลเต็ม)
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem onClick={() => setOpenModalReceiptA4(true)}>
                      ขนาด A4
                    </MenuItem>
                    <MenuItem onClick={() => setOpenModalReceipt80(true)}>
                      ขนาด 80 มิล
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div> */}
            </div>
            <div className=" xl:px-2 mt-5 z-10 ">
              <Card className="border w-full h-[35vh] overflow-auto ">
                <table className="w-full min-w-max  ">
                  <thead>
                    <tr>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          ลำดับ
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          ชื่อสินค้า
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          จำนวน
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          ราคา/หน่วย
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          รวมเป็น
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          เลือก
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  {dataView?.product_data < 1 ? (
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <Typography>...ไม่พบข้อมูล...</Typography>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {dataView?.product_data?.map((data, index) => {
                        const isLast = index === displayedData?.length - 1;
                        const pageIndex = startIndex + index;
                        const classes = isLast
                          ? "p-2"
                          : "p-3 border-b border-blue-gray-50";

                        return (
                          <tr
                            key={index}
                            className={` hover:bg-gray-200  ${
                              selectedRowSub === index ? "bg-gray-300  " : ""
                            }`}
                          >
                            <td className={classes}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal "
                                >
                                  {pageIndex + 1 || ""}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal "
                                >
                                  {data?.product}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal "
                                >
                                  {Number(data?.quantity).toLocaleString()}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal "
                                >
                                  {Number(data?.pricePerUnit).toLocaleString()}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal "
                                >
                                  {Number(data?.totalPrice).toLocaleString()}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex justify-center ">
                                <Button
                                  size="sm"
                                  variant="gradient"
                                  color="green"
                                  className="text-sm flex justify-center rounded-full  w-7 h-7    items-center   bg-green-500"
                                  // onClick={() => setShowPrint(true)}
                                  // onBlur={()=> setShowPrint(false)}
                                  onClick={() => [
                                    handleDataSub(data.id),
                                    handleRowClickSub(index),
                                  ]}
                                >
                                  <span className=" text-xl ">
                                    <FaCheckCircle />
                                  </span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </Card>
            </div>
          </div>
          <div className="flex w-full 2xl:w-6/12 mt-3 ">
            <div className="flex flex-col w-full">
              <div className="flex flex-col   w-full gap-3 ">
                <div>
                  <Typography className="font-bold">
                    สินค้า:{" "}
                    <span className="font-normal">
                      {" "}
                      {dataSub[0]?.product_name}
                    </span>
                  </Typography>
                </div>
                <div>
                  <Typography className="font-bold">
                    จำนวนบิลย่อยรวมกันทั้งหมด:{" "}
                    <span className="font-normal"> {dataSub?.length} </span> บิล
                  </Typography>
                </div>
              </div>
              <div className="flex w-full justify-center lg:justify-end lg:px-5 gap-5 mt-5">
                <Menu className="text-base flex justify-center  items-center   ">
                  <MenuHandler>
                    <Button
                      size="sm"
                      className="text-base flex justify-center  items-center   bg-green-500"
                      variant="gradient"
                      color="yellow"
                      disabled={dataSub?.length > 0 ? false : true}
                    >
                      <span className="mr-2 text-xl ">
                        <MdLocalPrintshop />
                      </span>
                      พิมพ์ (บิลย่อย){" "}
                    </Button>
                  </MenuHandler>

                  <MenuList className="menu-list-class">
                    <MenuItem onClick={() => setOpenModalReceiptSubFull(true)}>
                      {" "}
                      ขนาด A4
                    </MenuItem>
                    <MenuItem onClick={() => setOpenModalReceiptSubShort(true)}>
                      ขนาด 80 มิล
                    </MenuItem>
                  </MenuList>
                </Menu>
                {/* <Button
                  size="sm"
                  variant="gradient"
                  color="yellow"
                  className="text-sm flex justify-center  items-center   bg-green-500"
                  // onClick={() => setShowPrint(true)}
                  // onBlur={()=> setShowPrint(false)}
                >
                  <span className="mr-2 text-xl ">
                    <MdLocalPrintshop />
                  </span>
                  พิมพ์ (บิลย่อย)
                </Button> */}
              </div>
              <div className="xl:px-5 mt-5">
                <Card className="border w-full h-[48vh]  overflow-auto ">
                  <table className="w-full min-w-max  ">
                    <thead>
                      <tr>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ลำดับ
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            รหัสบิล
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ชื่อสินค้า
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            จำนวน
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ราคา
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    {noData ? (
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Typography>...ไม่พบข้อมูล...</Typography>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {dataSub?.map((data, index) => {
                          const isLast = index === displayedData.length - 1;
                          const pageIndex = startIndex + index;
                          const classes = isLast
                            ? "p-2"
                            : "p-3 border-b border-blue-gray-50";

                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {pageIndex + 1 || ""}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {data?.invoice_number}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {data?.product_name}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {Number(
                                      data?.products_quantity
                                    ).toLocaleString()}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {Number(
                                      data.price_per_invoice
                                    ).toLocaleString()}
                                  </Typography>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* open PDF A4 */}
      {openModalReceiptA4 == true ? (
        <ReceiptA4ShortReport
          openModalReceiptA4={openModalReceiptA4}
          handleModalReceiptA4={handleModalReceiptA4}
          dataReceipt={dataView}
          companyLoginDataStore={ userLogin == 'admin' ? selectedCompany  : companyLoginDataStore}
        />
      ) : (
        ""
      )}

      {/* open PDF  80 */}
      {openModalReceipt80 == true ? (
        <Receipt80Short
          openModalReceipt80={openModalReceipt80}
          handleModalReceipt80={handleModalReceipt80}
          dataReceipt={dataView}
          companyLoginDataStore={ userLogin == 'admin' ? selectedCompany  : companyLoginDataStore}
        />
      ) : (
        ""
      )}

      {/* open PDF A4  Sub */}
      {openModalReceiptSubFull == true ? (
        <ReceiptSubFull
          openModalReceiptSubFull={openModalReceiptSubFull}
          handleModalReceiptSubFull={handleModalReceiptSubFull}
          dataReceipt={dataSub}
          dataView={dataView}
          companyLoginDataStore={ userLogin == 'admin' ? selectedCompany  : companyLoginDataStore}
        />
      ) : (
        ""
      )}

      {/* open PDF  80 Sub */}
      {openModalReceiptSubShort == true ? (
        <ReceiptSubShort
          openModalReceiptSubShort={openModalReceiptSubShort}
          handleModalReceiptSubShort={handleModalReceiptSubShort}
          dataReceipt={dataSub}
          dataView={dataView}
          companyLoginDataStore={ userLogin == 'admin' ? selectedCompany  : companyLoginDataStore}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ShopReport;
