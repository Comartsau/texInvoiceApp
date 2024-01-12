/* eslint-disable react-hooks/exhaustive-deps */
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

import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";

import { AiFillDelete, AiOutlineStop } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

import { BsFillEyeFill, BsPlusCircle } from "react-icons/bs";
import { MdLocalPrintshop } from "react-icons/md";
import { TbDoorEnter } from "react-icons/tb";

import { useRecoilState, useRecoilValue } from "recoil";

import {
  createInvoiceStore,
  productStore,
  customerStore,
  headFormStore,
  companyLoginStore,
} from "../../../../store/Store";

import ReceiptA4 from "../../../receipt/receiptA4";
import Receipt80 from "../../../receipt/receipt80";

import {
  getFullInvoice,
  deleteFullInvoice,
} from "../../../../api/TaxFullInvoiceAPI";

function TaxInvoiceFull() {
  // import Data Store
  const companyLoginDataStore = useRecoilValue(companyLoginStore);

  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);

  const [openCreateInvoice, setOpenCreateInvoice] =
    useRecoilState(createInvoiceStore);

  const [listData, setListData] = useState([]);
  const [tokenError, setTokenError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFullInvioce = async () => {
    try {
      const response = await getFullInvoice(searchQuery);
      console.log(response)
      setListData(response);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchFullInvioce();
  }, [searchQuery, openCreateInvoice]);

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
  const displayedData = Array.isArray(listData)
    ? listData.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  //------------- modal View Product -----------------------//
  const [openModalView, setOpenModalView] = useState(false);
  const [dataView, setDataView] = useState([]);
  const handleModalView = (data) => {
    setOpenModalView(!openModalView);
    setDataView(data);
  };


  //------------- modal Add Invoice -----------------------//

  const [headFormDataStore, setHeadFormDataStore] =
    useRecoilState(headFormStore);
  const handleModalAdd = () => {
    setHeadFormDataStore("1");
    setOpenCreateInvoice(true);
  };

  //------------- modal Delete Product -----------------------//

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);

  const handleModalDelete = (data) => {
    setOpenModalDelete(!openModalDelete);
    setDataDelete(data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteFullInvoice(id, setToastOpen);
      // console.log(response);
      fetchFullInvioce();
      setOpenModalDelete(false);
    } catch (error) {
      toast.error(error);
    }
    // console.log(id);
  };

  const [showPrint, setShowPrint] = useState(false);

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
              สร้างใบกำกับภาษี(รูปแบบเต็ม)
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
                      ดู
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
                              onClick={() => handleModalView(data)}
                            >
                              <BsFillEyeFill className="h-5 w-5  text-light-blue-700 " />
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
        size="xl"
        // handler={handleModalView}
        className="h-[90vh] "
      >
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <div className="flex gap-3">
            <Typography variant="h5">รายละเอียด:</Typography>
            <Typography variant="h5" className=" font-normal">
              {dataView?.product_name || ""}
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto h-[73vh] ">
          <div className="flex w-full flex-col xl:flex-row  gap-4 ">
            <div className="w-full lg:w-4/12 ">
              <div className="flex flex-col 2xl:flex-row  gap-1">
                <div>
                  <Typography className="flex w-full sm:text-lg  font-bold">
                    ใบเสร็จรับเงิน / ใบกำกับภาษี
                  </Typography>
                </div>
                <div>
                  <Typography className="flex w-full sm:text-lg  font-bold">
                    (รูปแบบเต็ม){" "}
                  </Typography>
                </div>
              </div>
              <Typography className="font-bold mt-5">
                เลขที่ใบกำกับภาษี:{" "}
                <span className="font-normal">{dataView?.code}</span>
              </Typography>
              <Typography className="font-bold mt-5">
                วันที่:{" "}
                <spand className="font-normal">
                  {moment(dataView?.created_at).format("DD/MM/YYYY  ")}
                </spand>{" "}
              </Typography>
              <hr className="mt-3 border " />
              <Typography className="text-lg font-bold mt-10">
                ข้อมูลลูกค้า:{" "}
              </Typography>
              <Typography className="font-bold mt-5">
                ชื่อ:{" "}
                <span className="font-normal">{dataView?.customer_name}</span>{" "}
              </Typography>
              <Typography className="font-bold mt-5">
                ที่อยู่:{" "}
                <span className="font-normal">
                  {dataView?.customer_address}
                </span>{" "}
              </Typography>
              <Typography className="font-bold mt-5">
                เลขประจำตัวผู้เสียภาษี:{" "}
                <span className="font-normal">{dataView?.customer_id_tax}</span>
              </Typography>
              <hr className="mt-3 border " />
              <Typography className="text-lg font-bold mt-10">
                หมายเหตุ: <span className="font-normal">{dataView?.note}</span>
              </Typography>
            </div>
            <div className="w-full lg:w-8/12">
              <Typography className="text-center font-bold text-lg">
                รายการ
              </Typography>
              <Card className="border px-2 h-[340px] overflow-auto">
                <div className="mt-5">
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
                            รายการ
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
                            หน่วยนับ
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
                            รวมเงิน
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
                          const classes = "p-3 border-b border-blue-gray-50";

                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {index + 1 || ""}
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
                                    {data?.product || ""}
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
                                    {data?.quantity || ""}
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
                                    {data?.unit || ""}
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
                                      data?.pricePerUnit
                                    )?.toLocaleString() || ""}
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
                                      data?.totalPrice
                                    )?.toLocaleString() || ""}
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
              </Card>
              <div className="flex  flex-col items-end mt-3">
                <Typography className="text-lg font-bold">
                  ข้อมูลการชำระเงิน
                </Typography>
                <Typography className="mt-3">
                  รวมเงิน: {Number(dataView?.total_price)?.toLocaleString()} บาท
                </Typography>
                <Typography className="mt-3">
                  ภาษีมูลค่าเพิ่ม:{" "}
                  {Number(dataView?.total_tax)?.toLocaleString()} บาท
                </Typography>
                <Typography className="mt-3 font-bold text-lg text-red-500">
                  จำนวนเงินทั้งสิน:{" "}
                  {Number(dataView?.total_amount)?.toLocaleString()} บาท
                </Typography>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter divider>
          <div className="flex gap-3 ">
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
                  พิมพ์{" "}
                </Button>
              </MenuHandler>

              <MenuList className="menu-list-class">
                <MenuItem onClick={handleModalReceiptA4}>ขนาด A4</MenuItem>
                <MenuItem onClick={handleModalReceipt80}>ขนาด 80 มิล</MenuItem>
              </MenuList>
            </Menu>

            <div className="flex">
              <Button
                variant="gradient"
                color="gray"
                size="sm"
                onClick={handleModalView}
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
              onClick={() => handleDelete(String(dataDelete?.id))}
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
      {toastOpen == true ? (
        <ToastContainer className="mt-10" autoClose={100} theme="colored" />
      ) : (
        ""
      )}

      {/* รูปแบบเต็ม A4 */}
      {openModalReceiptA4 == true ? (
        <ReceiptA4
          openModalReceiptA4={openModalReceiptA4 || ""}
          handleModalReceiptA4={handleModalReceiptA4}
          dataReceipt={dataView}
          companyLoginDataStore={companyLoginDataStore}
        />
      ) : (
        ""
      )}

      {/* รูปแบบเต็ม 80 */}
      {openModalReceipt80 == true ? (
        <Receipt80
          openModalReceipt80={openModalReceipt80}
          handleModalReceipt80={handleModalReceipt80}
          dataReceipt={dataView}
          companyLoginDataStore={companyLoginDataStore}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default TaxInvoiceFull;
