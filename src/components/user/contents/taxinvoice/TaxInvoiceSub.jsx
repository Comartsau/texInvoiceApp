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

} from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";

import { AiFillDelete, AiOutlineStop } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

import { BsFillEyeFill, BsPlusCircle } from "react-icons/bs";
import { MdLocalPrintshop } from "react-icons/md";
import { TbDoorEnter, TbCheckupList } from "react-icons/tb";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  createInvoiceStore,
  productStore,
  customerStore,
  headFormStore,
  companyLoginStore
} from "../../../../store/Store";

import moment from "moment";

import ReceiptA4Short from "../../../receipt/receiptA4Short";
import Receipt80Short from "../../../receipt/receipt80Short";
import ReceiptSubFull from "../../../receipt/receiptSubFull"
import ReceiptSubShort from "../../../receipt/receiptSubShort";
import { getSubInvoice , deleteSubInvoice} from "../../../../api/TaxSubInvoiceApi";

function TaxInvoiceSub() {
  // import Data Store
  const productDataStore = useRecoilValue(productStore);
  const customerDataStore = useRecoilValue(customerStore);
  const companyLoginDataStore = useRecoilValue(companyLoginStore);

  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);
  const [openCreateInvoice, setOpenCreateInvoice] = useRecoilState(createInvoiceStore);

  const [listData, setListData] = useState([]);

  const [tokenError, setTokenError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSubInvoice = async () => {
    try {
      const response = await getSubInvoice(searchQuery);
      // console.log(response?.invoices_list);
      setListData(response?.invoices_list);
      setNoData(false);
    } catch (error) {
      toast.error(error);
    }
  };

  // console.log(listData);

  useEffect(() => {
    fetchSubInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery,openCreateInvoice]);

  useEffect(() => {
    if (tokenError) {
      localStorage.clear();
      window.location.reload();
    }
  }, [tokenError]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const displayedData = listData?.slice(startIndex, endIndex);
  const displayedData = Array.isArray(listData) ? listData.slice(startIndex, endIndex) : [];

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  //------------- modal View Product -----------------------//
  const [openModalView, setOpenModalView] = useState(false);
  const [dataView, setDataView] = useState([]);
  const [dataViewSub, setDataViewSub] = useState([]);
  const handleModalView = (data) => {
    setOpenModalView(!openModalView);
    setDataViewSub([])
    setDataView(data);
  };

  // ตัวเวลา show Print


  const handleShowSub = (index) => {
    setDataViewSub(dataView?.sec_product_data[index + 1])
  };


  //------------- modal Add Invoice -----------------------//
  const [headFormDataStore, setHeadFormDataStore] = useRecoilState(headFormStore);
  const handleModalAdd = () => {
    setHeadFormDataStore("3");
    setOpenCreateInvoice(true);
  };


  //------------- modal Delete Product -----------------------//

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [toastOpen ,setToastOpen] = useState(false)
  const [dataDelete, setDataDelete] = useState([]);

  const handleModalDelete = (data) => {
    setOpenModalDelete(!openModalDelete);
    setDataDelete(data);
  };

  const handleDelete = async (id) => {
    // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ

    // console.log(id);
    try {
      const response = await deleteSubInvoice(id , setToastOpen)
      // console.log(response)
      fetchSubInvoice();
      setOpenModalDelete(false);
      
    } catch (error) {
      toast.error("ลบ ใบกำกับภาษี(รูปแบบสัพ) ไม่สำเร็จ  กรุณาลองใหม่")
    }
  }

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (index) => {
  setSelectedRow(index); // ตั้งค่า index ของแถวที่เลือก

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
  const [openModalReceiptSubShort, setOpenModalReceiptSubShort] = useState(false);
  const handleModalReceiptSubShort = () => {
    setOpenModalReceiptSubShort(!openModalReceiptSubShort);
  };

  return (
    <div className="w-full overflow-auto  px-3">
      <div className="w-full px-3">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="flex flex-col sm:flex-row w-full items-center gap-3   sm:justify-between px-5 mt-5   ">
          <div className="flex justify-center ">
            <Input
              type="text"
              color="blue"
              label="ค้นหา เลขใบกำกับภาษี"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // className=" bg-gray-50"
              style={{ backgroundColor: "#F4F4F4" }}
            />
          </div>
          <div className="flex justify-center">
            <Button
              size="sm"
              variant="gradient"
              color="green"
              className="text-base flex justify-center  items-center   bg-green-500"
              onClick={handleModalAdd}
            >
              <span className="mr-2 text-xl">
                <BsPlusCircle />
              </span>
              สร้างใบกำกับภาษี(รูปแบบสัพ)
            </Button>
          </div>
        </div>
        {/* ------------ table  ----------------------------------------- */}
        <Card className="mt-5 mx-10 border-2 overflow-auto ">
          <div className="p-3">
            <table className="w-full min-w-max  ">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1">
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
                      ใบกำกับภาษี
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      เลือก
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ลบ
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
                  {displayedData?.map((data, index) => {
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
                              {data?.code || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex justify-center">
                            <IconButton
                              variant="outlined"
                              color="blue"
                              size="sm"
                              className="ml-3 "
                              onClick={() => [handleModalView(data) , setSelectedRow(null)]}
                            >
                              <TbCheckupList className="h-5 w-5  text-light-blue-700 " />
                            </IconButton>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="flex justify-center ">
                            <IconButton
                              variant="outlined"
                              size="sm"
                              color="red"
                              className="rounded-full"
                              onClick={() => handleModalDelete(data)}
                            >
                              <AiFillDelete color="red" className="h-5 w-5" />
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

      {/* modal View Receipt */}

      <Dialog 
      open={openModalView} 
      size="xxl" 
      // handler={handleModalView}
      >
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <div className="flex gap-3">
            <Typography variant="h5">รายละเอียดย่อยบิล:</Typography>
            <Typography variant="h5" className=" font-normal">
              {dataView?.product_name || ""}
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto h-[100vh] ">
          <div className="flex w-full flex-col lg:flex-row h-full gap-3">
            <div className="flex flex-col w-full lg:w-1/2  border-0 border-r-2 ">
              <Typography className="w-full font-bold text-center">
                ใบเสร็จรับเงิน / ใบกำกับภาษีแบบย่อ
              </Typography>
              <hr className="mt-3" />
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between lg:px-10 gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
                <div className="font-bold">
                  เลขที่บิล: <span className="font-normal">{dataView?.code || ''}</span>
                </div>
                <div className="font-bold">
                  รวมทั้งสิ้น: <span className="font-normal">{Number(dataView?.total_price).toLocaleString() || ''}</span> บาท
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between lg:px-10 gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
                <div className="font-bold">
                  จุดขาย: <span className="font-normal">{dataView?.salepoints_name || ''}</span>
                </div>
                <div className="font-bold">
                  ภาษีมูลค่าเพิ่ม: <span className="font-normal">{Number(dataView?.total_tax).toLocaleString() || ''}</span>{" "}
                  บาท
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between lg:px-10 gap-5 mt-3 py-2 rounded-s-lg first-line: hover:bg-gray-200">
                <div className="font-bold">
                  วันที่สร้างบิล: <span className="font-normal">{moment(dataView?.created_at).format("DD/MM/YYYY  ")}</span>
                </div>
                <div className="font-bold text-red-500">
                  รวมมูลค่าสินค้า: <span>{Number(dataView?.total_amount).toLocaleString() || ''}</span> บาท
                </div>
              </div>
              <div className="flex w-full justify-center lg:justify-end lg:px-5 gap-5 mt-5">
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
                  พิมพ์ (บิลเต็ม){" "}
                </Button>
              </MenuHandler>

              <MenuList className="menu-list-class">
                <MenuItem onClick={() => setOpenModalReceiptA4(true)}>ขนาด A4</MenuItem>
                <MenuItem onClick={() => setOpenModalReceipt80(true)}>ขนาด 80 มิล</MenuItem>
              </MenuList>
            </Menu>
              </div>
              <div className=" xl:px-5 mt-10">
                <Card className="border w-full h-[41vh] overflow-auto ">
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
                              พิมพ์
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
                          {dataView?.product_data?.map((data, index) => {
                            const isLast = index === displayedData.length - 1;
                            const pageIndex = startIndex + index;
                            const classes = isLast
                              ? "p-2"
                              : "p-3 border-b border-blue-gray-50";
    
                            return (
                              <tr 
                              key={index}
                              className={` hover:bg-gray-200  ${selectedRow === index ? 'bg-gray-300  ' : ''}`} 
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
                                      {data.product}
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
                                      {Number(data.quantity).toLocaleString()}
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
                                      {Number(data.pricePerUnit).toLocaleString()}
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
                                      {Number(data.totalPrice).toLocaleString()}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex justify-center ">
                                    <Button
                                      size="sm"
                                      variant="gradient"
                                      color="green"
                                      className="text-sm flex justify-center   items-center   bg-green-500"
                                      // onClick={() => setShowPrint(true)}
                                      // onBlur={()=> setShowPrint(false)}
                                      onClick={() => [handleShowSub(index) , handleRowClick(index)]}
                                    >
                                      <span className="mr-2 text-xl ">
                                        <FaCheckCircle />
                                      </span>
                                      เลือก
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
            <div className="flex w-full lg:w-1/2 ">
              <div className="flex flex-col w-full">
                <div className="flex flex-col   w-full gap-3 ">
                  <div>
                    <Typography className="font-bold">
                      สินค้า: <span className="font-normal"> {dataViewSub[0]?.product_name || ''}</span>
                    </Typography>
                  </div>
                  <div>
                    <Typography className="font-bold">
                      จำนวนบิลย่อยรวมกันทั้งหมด:{" "}
                      <span className="font-normal"> {dataViewSub?.length || ''} </span> บิล
                    </Typography>
                  </div>
                </div>
                <div  className="flex w-full justify-center lg:justify-end lg:px-5 gap-5 mt-5">
                <Menu className="text-base flex justify-center  items-center   ">
              <MenuHandler>
                <Button
                  size="sm"
                  className="text-base flex justify-center  items-center   bg-green-500"
                  variant="gradient"
                  color="yellow"
                  disabled={dataViewSub.length > 0 ? false :true}
                >
                  <span className="mr-2 text-xl ">
                    <MdLocalPrintshop />
                  </span>
                  พิมพ์ (บิลย่อย){" "}
                </Button>
              </MenuHandler>

              <MenuList className="menu-list-class">
                <MenuItem onClick={() => setOpenModalReceiptSubFull(true)}> ขนาด A4</MenuItem>
                <MenuItem onClick={() => setOpenModalReceiptSubShort(true)}>ขนาด 80 มิล</MenuItem>
              </MenuList>
            </Menu>
                </div>
                <div className="xl:px-5 mt-10">
                  <Card className="border w-full h-[59vh] overflow-auto ">
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
                              {dataViewSub.map((data, index) => {
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
                                          {data?.invoice_number || ''}
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
                                           {data?.product_name || ''}
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
                                          {Number(data?.products_quantity).toLocaleString()}
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
                                          {Number(data?.price_per_invoice).toLocaleString()}
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
        </DialogBody>
        <DialogFooter divider>
          <div className="flex gap-3">
            <div className="flex">
              <Button
                variant="gradient"
                color="gray"
                size="sm"
                onClick={handleModalView }
                className="flex mr-1 text-base "
              >
                <span className="mr-2 text-xl ">
                  <TbDoorEnter />
                </span>
                ออก
              </Button>
            </div>
          </div>
        </DialogFooter>
      </Dialog>

      {/* modal Delete Product */}

      <Dialog open={openModalDelete} size="sm" handler={handleModalDelete}>
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ลบสินค้า</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการลบ ใบกำกับภาษี: {dataDelete?.code || ""}{" "}
            </Typography>
            <Typography variant="h5" className="text-center">
              จริงหรือไม่?{" "}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className=" flex w-full justify-center  gap-5 ">
            <Button
              variant="gradient"
              color="red"
              size="sm"
              onClick={() => handleDelete(dataDelete?.id)}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2">
                <FaCheckCircle />
              </span>
              ตกลง
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              size="sm"
              onClick={handleModalDelete}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2">
                <AiOutlineStop />
              </span>
              ยกเลิก
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* open PDF A4 */}
      {openModalReceiptA4 == true ? (
        <ReceiptA4Short
          openModalReceiptA4={openModalReceiptA4}
          handleModalReceiptA4={handleModalReceiptA4}
          dataReceipt={dataView}
          companyLoginDataStore={companyLoginDataStore}

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
          companyLoginDataStore={companyLoginDataStore}

        />
      ) : (
        ""
      )}




      {/* open PDF A4  Sub */}
      {openModalReceiptSubFull == true ? (
        <ReceiptSubFull
        openModalReceiptSubFull={openModalReceiptSubFull}
          handleModalReceiptSubFull={handleModalReceiptSubFull}
          dataReceipt={dataViewSub}
          dataView={dataView}
          companyLoginDataStore={companyLoginDataStore}

        />
      ) : (
        ""
      )}



      {/* open PDF  80 Sub */}
      {openModalReceiptSubShort == true ? (
        <ReceiptSubShort
        openModalReceiptSubShort={openModalReceiptSubShort}
        handleModalReceiptSubShort={handleModalReceiptSubShort}
          dataReceipt={dataViewSub}
          dataView={dataView}
          companyLoginDataStore={companyLoginDataStore}

        />
      ) : (
        ""
      )}

      <ToastContainer className="mt-10" autoClose={1000} theme="colored" />
    </div>
  );
}

export default TaxInvoiceSub;
