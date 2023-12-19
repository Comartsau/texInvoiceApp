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
  Select,
  Option,
} from "@material-tailwind/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import { AiOutlineSearch } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";

import { useState } from "react";
import ReportPDF from "./ReportPDF";

const SaleReport = () => {
  const [searchQueryStart, setSearchQueryStart] = useState(new Date());
  const [searchQueryEnd, setSearchQueryEnd] = useState(new Date());

  const [listData, setListData] = useState([

      {
        "id": 1,
        "date": "5/12/2023",
        "code": "A66/0001",
        "customer": "เจริญชัย",
        "tax": "1234567890123",
        "price": 1000,
        "total_price": 1170,
        "vat": 170,
        "total_Amount": 1340,
      },
      {
        "id": 2,
        "date": "6/12/2023",
        "code": "A66/0002",
        "customer": "สุดใจ",
        "tax": "9876543210987",
        "price": 1500,
        "total_price": 1755,
        "vat": 255,
        "total_Amount": 2010,
      },
      {
        "id": 3,
        "date": "7/12/2023",
        "code": "A66/0003",
        "customer": "เพื่อนดี",
        "tax": "1111222233334",
        "price": 800,
        "total_price": 936,
        "vat": 136,
        "total_Amount": 1072,
      },
      {
        "id": 4,
        "date": "8/12/2023",
        "code": "A66/0004",
        "customer": "ความสุข",
        "tax": "4444333322221",
        "price": 2200,
        "total_price": 2574,
        "vat": 374,
        "total_Amount": 2948,
      },
      {
        "id": 5,
        "date": "9/12/2023",
        "code": "A66/0005",
        "customer": "สุขใจ",
        "tax": "8888999977776",
        "price": 3500,
        "total_price": 4095,
        "vat": 595,
        "total_Amount": 4690,
      },
      {
        "id": 6,
        "date": "10/12/2023",
        "code": "A66/0006",
        "customer": "พี่ทุกคน",
        "tax": "5678123498765",
        "price": 500,
        "total_price": 585,
        "vat": 85,
        "total_Amount": 670,
      },
      {
        "id": 7,
        "date": "11/12/2023",
        "code": "A66/0007",
        "customer": "พี่พาย",
        "tax": "7777666655554",
        "price": 1800,
        "total_price": 2106,
        "vat": 306,
        "total_Amount": 2412,
      },
      {
        "id": 8,
        "date": "12/12/2023",
        "code": "A66/0008",
        "customer": "ความสุขมาก",
        "tax": "6666555544443",
        "price": 2800,
        "total_price": 3276,
        "vat": 476,
        "total_Amount": 3752,
      },
      {
        "id": 9,
        "date": "13/12/2023",
        "code": "A66/0009",
        "customer": "ความสุขดี",
        "tax": "3333444455556",
        "price": 400,
        "total_price": 468,
        "vat": 68,
        "total_Amount": 536,
      },
      {
        "id": 10,
        "date": "14/12/2023",
        "code": "A66/0010",
        "customer": "มีความสุข",
        "tax": "2222333344445",
        "price": 6000,
        "total_price": 7020,
        "vat": 1020,
        "total_Amount": 8040,
      }
  ]);
  const [noData, setNoData] = useState(false);

    //----- จัดการแสดงข้อมูล / หน้า -------------- //
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = Array.isArray(listData) ? listData.slice(startIndex, endIndex) : [];
  
    const totalPages = Math.ceil(listData.length / itemsPerPage);

  console.log(searchQueryStart);
  console.log(searchQueryEnd);

  //------------- open Receipt A4  -----------------------//
  const [openModalReceiptA4, setOpenModalReceiptA4] = useState(false);
  const handleModalReceiptA4 = () => {
    setOpenModalReceiptA4(!openModalReceiptA4);
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col sm:flex-row gap-5 ">
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
          >
            <span className="mr-2 text-xl ">
              <AiOutlineSearch />
            </span>
            ค้นหา
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="gradient"
            color="purple"
            className="text-base flex justify-center  items-center   bg-green-500"
            onClick={() => setOpenModalReceiptA4(true)}
          >
            <span className="mr-2 text-xl ">
              <TbReportSearch />
            </span>
            PDF
          </Button>
        </div>
      </div>
      <div className="mt-5 h-[450px] overflow-auto ">
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
                  วันที่
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  ใบกำกับ
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  ชื่อผู้ขาย
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                เลขประจำตัวผู้เสียภาษี
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  มูลค่าสินค้า
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  ภาษีมูลค่าเพิ่ม
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  จำนวนเงินรวม
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
                        {data?.date || ""}
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
                        {data?.code || ""}
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
                        {data?.customer || ""}
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
                        {data?.tax || ""}
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
                        {Number(data?.price).toLocaleString() || ""}
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
                        {Number(data?.vat).toLocaleString() || ""}
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
                        {Number(data?.total_price).toLocaleString() || ""}
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
      {/* open PDF A4 */}
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

export default SaleReport;
