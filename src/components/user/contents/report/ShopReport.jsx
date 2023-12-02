import {
  Input,
  Typography,
  Button,
  IconButton,
  Card,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Option,
} from "@material-tailwind/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import moment from "moment/min/moment-with-locales";

import Select from "react-select";

import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";

import { useState } from "react";
import ReportPDF from "./ReportPDF";

import { useRecoilState } from "recoil";
import { shopStore } from "../../../../store/Store";

const ShopReport = () => {
  const [isSearchable, setIsSearchable] = useState(true);
  const [shopDataStore, setShopDataStore] = useRecoilState(shopStore);

  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);

  //   const [listData, setListData] = useState([]);
  const [listData, setListData] = useState([
    {
      invoice_name: "A66/0001 ",
      price: 800,
      total: 1600,
    },
    {
      invoice_name: "  A66/0002 ",
      price: 800,
      total: 1600,
    },
    {
      invoice_name: "  A66/0003 ",
      price: 800,
      total: 1600,
    },
    {
      invoice_name: "  A66/0004 ",
      price: 800,
      total: 1600,
    },
    {
      invoice_name: "  A66/0005 ",
      price: 800,
      total: 1600,
    },
    {
      invoice_name: "  A66/0006 ",
      price: 800,
      total: 1600,
    },
    {
      invoice_name: "  A66/0007 ",
      price: 800,
      total: 1600,
    },
  ]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  const shopOptions = shopDataStore?.map((shop) => ({
    value: shop.id,
    label: shop.salepoints_name,
  }));

  const [selectedShop, setSelectedShop] = useState(null);
  const handleShopSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const shop = shopDataStore.find((shop) => shop.id === e.value);
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    console.log(shop);
    setSelectedShop(shop);
  };

  console.log(selectedShop);

  const [searchQueryStart, setSearchQueryStart] = useState(new Date());
  const [searchQueryEnd, setSearchQueryEnd] = useState(new Date());

  console.log(searchQueryStart);
  console.log(searchQueryEnd);

  const [showPrint, setShowPrint] = useState(false);

  const handlePrintButtonClick = () => {
    setShowPrint(true); // กำหนดให้แสดง element เมื่อคลิกปุ่มพิมพ์

    setTimeout(() => {
      setShowPrint(false); // เปลี่ยนค่า showPrint เป็น false เมื่อผ่านไป 2 วินาที
    }, 3000); // 2 วินาที
  };

  //------------- open Receipt A4  -----------------------//
  const [openModalReceiptA4, setOpenModalReceiptA4] = useState(false);
  const handleModalReceiptA4 = () => {
    setOpenModalReceiptA4(!openModalReceiptA4);
  };

  return (
    <div className="mt-5 ">
      <div className="flex flex-col  sm:flex-row gap-5 ">
        <div className="flex   justify-center ">
          <Select
            className="basic-single  w-[240px]   z-20"
            classNamePrefix="select"
            placeholder="เลือกจุดขาย"
            // isClearable={isClearable}
            isSearchable={isSearchable}
            name="color"
            options={shopOptions}
            onChange={(e) => handleShopSelect(e)}
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
            selected={searchQueryStart}
            locale={th}
            dateFormat=" วันที่เริ่มต้น dd/MM/yyyy"
            onChange={(date) => setSearchQueryStart(date)}
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
            onChange={(date) => setSearchQueryEnd(date)}
            className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="gradient"
            color="green"
            className="text-base flex justify-center  items-center   bg-green-500"
            onClick={() => setOpenModalReceiptA4(true)}
          >
            <span className="mr-2 text-xl ">
              <AiOutlineSearch />
            </span>
            ค้นหา
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row h-[70vh]   gap-5">
        <div className="flex w-full lg:w-3/12  ">
          <Card className=" w-full mt-5 border-2 overflow-auto ">
            <div>
              <table className="w-full min-w-max  ">
                <thead>
                  <tr>
                    <th className="border-y w-1 border-blue-gray-100 bg-blue-gray-50/50 p-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
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
                    {listData.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              //   color="blue-gray"
                              className="font-normal "
                            >
                              {index + 1 || ""}
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data?.invoice_name || ""}
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <div className="flex justify-center ">
                            <IconButton
                              color="green"
                              size="sm"
                              className=" rounded-full border-4 w-6 h-6 mt-2  border-green-500 "
                            >
                              <AiOutlinePlus className="text-xl" />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </Card>
        </div>
        <div className="flex w-full xl:w-9/12 ">
          <div className="flex flex-col w-full">
            <div className="flex flex-col lg:flex-row  w-full gap-3 ">
              <div className=" w-full  lg:w-7/12">
                <Typography className="  mt-5">
                  บริษัท เขาสวนกวาง จำกัด
                </Typography>
                <Typography className="  mt-3">
                  111/11 หมู่ที่10 ตใพระลับ อ.เมือง จ.ขอนแก่น 40000
                </Typography>
                <div className="flex  flex-col sm:flex-row gap-3">
                  <Typography className="font-bold  mt-3">
                    เลขประจำตัวผู้เสียภาษี:{" "}
                    <span className="font-normal">123456</span>
                  </Typography>
                  <Typography className="font-bold  sm:mt-3">
                    โทร: <span className="font-normal">0850032649</span>
                  </Typography>
                </div>
                <Typography className=" font-bold mt-3">
                  วันที่ออกบิล:{" "}
                  <span className=" font-normal">
                    {moment(Date.now()).locale("th").format("L")}
                  </span>
                </Typography>
              </div>
              <div className="flex flex-col justify-center">
                <Typography className="mt-2">
                  บิลย่อย: <span> 2 </span> ใบ
                </Typography>
                <Typography className="mt-2">
                  รวมเงิน: <span>14,980</span> บาท
                </Typography>
              </div>
            </div>
            <div className="flex w-full justify-center lg:justify-end lg:px-9 gap-5 mt-5">
              <Button
                size="sm"
                variant="gradient"
                color="blue"
                className="text-base flex justify-center  items-center   bg-green-500"
                // onClick={() => setShowPrint(true)}
                // onBlur={()=> setShowPrint(false)}
                onClick={handlePrintButtonClick}
              >
                <span className="mr-2 text-xl ">
                  <MdLocalPrintshop />
                </span>
                พิมพ์ (บิลเต็ม)
              </Button>
              <Button
                size="sm"
                variant="gradient"
                color="orange"
                className="text-base flex justify-center  items-center    bg-green-500"
                // onClick={() => setShowPrint(true)}
                // onBlur={()=> setShowPrint(false)}
                onClick={handlePrintButtonClick}
              >
                <span className="mr-2 text-xl ">
                  <MdLocalPrintshop />
                </span>
                พิมพ์ (บิลย่อย)
              </Button>
            </div>
            <div className=" mt-3">
              <Card className="border w-full h-[40vh] overflow-auto ">
                <div className="p-3">
                  <table className="w-full min-w-max  ">
                    <thead>
                      <tr>
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
                            รายการ
                          </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ราคา / หน่วย
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
                        {displayedData.map((data, index) => {
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
                                    {data?.invoice_name || ""}
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
                                    {data?.price || ""}
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
                                    {data?.total || ""}
                                  </Typography>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                  <Button
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ก่อนหน้า
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <IconButton
                        key={i}
                        variant="outlined"
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className={
                          currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                        }
                      >
                        {i + 1}
                      </IconButton>
                    ))}
                  </div>
                  <Button
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    ถัดไป
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ReportPDF
        openModalReceiptA4={openModalReceiptA4}
        handleModalReceiptA4={handleModalReceiptA4}
        // data={data}
        // customer={selectedCustomer}
        // calculateSubtotal={calculateSubtotal}
        // calculateVAT={calculateVAT}
        // calculateTotalAmount={calculateTotalAmount}
        // note={note}
      />
    </div>
  );
};

export default ShopReport;
