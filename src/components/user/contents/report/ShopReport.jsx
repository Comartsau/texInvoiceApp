import {
  Input,
  Typography,
  Button,
  IconButton,
  Card,
  CardFooter,
} from "@material-tailwind/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import moment from "moment/min/moment-with-locales";

import Select from "react-select";

import { AiOutlinePlus } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";

import { useState } from "react";
import ReportPDF from "./ReportPDF";

import { useRecoilState } from "recoil";
import { shopStore , companyStore } from "../../../../store/Store";
import ReceiptSubFull from "../../../receipt/receiptSubFull";
import ReceiptSubShort from "../../../receipt/receiptSubShort";

// eslint-disable-next-line react/prop-types
const ShopReport = ({ userLogin }) => {
  const [isSearchable, setIsSearchable] = useState(true);
  const [shopDataStore, setShopDataStore] = useRecoilState(shopStore);
  const [companyDataStore, setCompanyDataStore] = useRecoilState(companyStore);



  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);

  //   const [listData, setListData] = useState([]);
  const [listData, setListData] = useState({
    invoice_name: "C66/0001 ",
    price: 31620,
    vat: 2380,
    total: 34000,
    product_data: [
      {
        name: "แก้วน้ำ ร้อน-เย็น",
        subInvoice: "C66/0001/1 , C66/0001/2",
        amount: 2,
        total: 29200,
        price: 14600,
        unit: "ชิ้น"
      },
      {
        name: "printer",
        subInvoice: "C66/0001/3 , C66/0001/4",
        amount: 2,
        total: 4800,
        price: 2400,
        unit: "เครื่อง"
      },
    ],
  });

  const [dataReceipt, setDataReceipt] = useState({
    code: "A66/0002",
    company: "บริษัทuser ทดสอบ01",
    created_at: "2023-12-17T09:58:24",
    customer_address: "33 หมู่ 3 หนองไทร ขอนแก่น 40000",
    customer_id_tax: "315494567778888",
    customer_name: "สินทวี งามมาก",
    customer_tel: "0628872654",
    id: 11,
    note: "dskjfjsdj;fkjlsk klsdjflkj;slkjd;ljf  jsdkljfljs;lkdf jsdkljfkljsl;kdj;flkj;slkd ",
    total_amount: 192800,
    total_price: 180187,
    total_tax: 12613,
    product_data: [
      {
        id: 1,
        name: "Item 1",
        category: 21,
        unit: "อัน",
        pricePerUnit: 4500,
        product: "เตาอบ",
        quantity: 1,
        totalPrice: 4500,
      },
      {
        id: 2,
        name: "Item 2",
        category: 9,
        unit: "ชั่วโมง",
        pricePerUnit: 100,
        product: "เก้าอี้-02",
        quantity: 3,
        totalPrice: 300,
      },
      {
        id: 3,
        name: "Item 3",
        category: 11,
        unit: "ชิ้น",
        pricePerUnit: 4500,
        product: "printer",
        quantity: 4,
        totalPrice: 18000,
      },
      {
        id: 4,
        name: "Item 4",
        category: 10,
        unit: "ชิ้น",
        pricePerUnit: 34000,
        product: "notebook",
        quantity: 5,
        totalPrice: 170000,
      },
    ],
  });

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.product_data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  // ตัวเลือก  Select

console.log(companyDataStore)

  const companyOptions = companyDataStore?.map((company) => ({
    value: company.id,
    label: company.username,
  }));

  const shopOptions = shopDataStore?.map((shop) => ({
    value: shop.id,
    label: shop.salepoints_name,
  }));

  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanySelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const company = companyDataStore.find((company) => company.id === e.value);
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    console.log(company);
    setSelectedCompany(company);
  };

  console.log(selectedCompany);


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



  //------------- open PDF A4  -----------------------//
  const [openModalReceiptA4, setOpenModalReceiptA4] = useState(false);
  const handleModalReceiptA4 = () => {
    setOpenModalReceiptA4(!openModalReceiptA4);
  };

  //------------- open Receipt A4  -----------------------//
  const [openModalReceiptSubFull, setOpenModalReceiptSubFull] = useState(false);
  const handleModalReceiptSubFull = () => {
    setOpenModalReceiptSubFull(!openModalReceiptSubFull);
  };
  //------------- open Receipt Sub A4  -----------------------//
  const [openModalReceiptSubShort, setOpenModalReceiptSubShort] = useState(false);

  const [sendIndex , setSendIndex] = useState('')
  const handleModalReceiptSubShort = () => {
    setOpenModalReceiptSubShort(!openModalReceiptSubShort);
  };

  return (
    <div className="mt-5 ">
      <div className="flex flex-col  sm:flex-row gap-5 ">
        <div className="flex   justify-center ">
          {userLogin == 'admin' ?
          <Select
            className="basic-single  w-[240px]   z-20"
            classNamePrefix="select"
            placeholder="เลือกบริษัท"
            // isClearable={isClearable}
            isSearchable={isSearchable}
            name="color"
            options={companyOptions}
            onChange={(e) => handleCompanySelect(e)}
          />
          :
          ''
          }
        </div>
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
                    <tr className=" hover:bg-gray-200 ">
                      <td>
                        <div className="flex items-center justify-center mt-5">
                          <Typography
                            variant="small"
                            //   color="blue-gray"
                            className="font-normal "
                          >
                            1
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
                            {listData?.invoice_name || ""}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center  ">
                          <IconButton
                            color="green"
                            size="sm"
                            className=" rounded-full border-4 w-6 h-6 mt-3  border-green-500 "
                          >
                            <AiOutlinePlus className="text-xl " />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
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
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
                <div className="font-bold">
                  เลขที่บิล: <span className="font-normal">C66/0001</span>
                </div>
                <div className="font-bold">
                  รวมทั้งสิ้น: <span className="font-normal">31,715</span> บาท
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
                <div className="font-bold">
                  เลขที่เอกสาร: <span className="font-normal">C66/0001</span>
                </div>
                <div className="font-bold">
                  ภาษีมูลค่าเพิ่ม: <span className="font-normal">31,715</span>{" "}
                  บาท
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
                <div className="font-bold">
                  วันที่สร้างบิล: <span className="font-normal">C66/0001</span>
                </div>
                <div className="font-bold text-red-500">
                  รวมมูลค่าสินค้า: <span>31,715</span> บาท
                </div>
              </div>
              <div className="flex w-full justify-center lg:justify-end lg:px-5 gap-5 ">
                <Button
                  size="sm"
                  variant="gradient"
                  color="blue"
                  className="text-base flex justify-center  items-center   bg-green-500"
                  // onClick={() => setShowPrint(true)}
                  // onBlur={()=> setShowPrint(false)}
                >
                  <span className="mr-2 text-xl ">
                    <MdLocalPrintshop />
                  </span>
                  พิมพ์ (บิลเต็ม)
                </Button>
              </div>
              <div className=" xl:px-2 mt-5">
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
                        {listData.product_data.map((data, index) => {
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
                                    {data.name}
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
                                    {Number(data.amount).toLocaleString()}
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
                                    {Number(data.price).toLocaleString()}
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
                                    {Number(data.total).toLocaleString()}
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
                      สินค้า: <span className="font-normal"> ปากกา</span>
                    </Typography>
                  </div>
                  <div>
                    <Typography className="font-bold">
                      จำนวนบิลย่อยรวมกันทั้งหมด:{" "}
                      <span className="font-normal"> 15 </span> บิล
                    </Typography>
                  </div>
                </div>
                <div className="flex w-full justify-center lg:justify-end lg:px-5 gap-5 mt-5">
                  <Button
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
                  </Button>
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
                            {listData.product_data.map((data, index) => {
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
                                        {data.name}
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
                                        {Number(data.amount).toLocaleString()}
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
                                        {Number(data.price).toLocaleString()}
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
                                        {Number(data.total).toLocaleString()}
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

      <ReportPDF
        openModalReceiptA4={openModalReceiptA4}
        handleModalReceiptA4={handleModalReceiptA4}
      />

      <ReceiptSubFull
        openModalReceiptSubFull={openModalReceiptSubFull}
        handleModalReceiptSubFull={handleModalReceiptSubFull}
        dataReceipt={listData}
        salePoint={selectedShop?.salepoints_name}
      />


      <ReceiptSubShort
        openModalReceiptSubShort={openModalReceiptSubShort}
        handleModalReceiptSubShort={handleModalReceiptSubShort}
        dataReceipt={listData}
        salePoint={selectedShop?.salepoints_name}
        sendIndex = {sendIndex}
      />
    </div>
  );
};

export default ShopReport;
