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
} from "@material-tailwind/react";

import Swal from "sweetalert2";
import { useState } from "react";


import { AiFillDelete } from "react-icons/ai";

import { BsPencilSquare, BsFillEyeFill, BsPlusCircle } from "react-icons/bs";


function TaxInvoiceFull() {


  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);

  //   const [listData, setListData] = useState([]);
  const [listData, setListData] = useState([
    {
      product_name: " สินค้า 001",
      product_price: "1000",
      product_unit: "อัน",
    },
    {
      product_name: " สินค้า 002",
      product_price: "3000",
      product_unit: "ชิ้น",
    },
  ]);

  const [unitOptions, setUnitOptions] = useState([
    { value: "ชั่วโมง", label: "ชั่วโมง" },
    { value: "คัน", label: "คัน" },
    { value: "ชิ้น", label: "ชิ้น" },
    { value: "อัน", label: "อัน" },
    // เพิ่มตัวเลือกอื่น ๆ ตามที่คุณต้องการ
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  //------------- modal View Product -----------------------//
  const [openModalView, setOpenModalView] = useState(false);
  const [dataView, setDataView] = useState([]);
  const handleModalView = (data) => {
    setOpenModalView(!openModalView);
    setDataView(data);
  };

  //------------- modal Add Product -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleModalAdd = () => setOpenModalAdd(!openModalAdd);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductUnit, setNewProductUnit] = useState("");

  //------------- modal Edit Product -----------------------//
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const handleModalEdit = (data) => {
    setDataEdit(data)
    setOpenModalEdit(!openModalEdit);
  } 

  const handleDelete = (data) => {
    Swal.fire({
      title: `ต้องการลบ สินค้า: ${data} จริงหรือไม่?`,
      text: "การลบข้อมูลจะไม่สามารถเรียกคืนได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบ!",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ
        try {
          const response = axios.delete(
            `${import.meta.env.VITE_APP_API}/Customer/${id}/delete`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${Token}`,
              },
            }
          );
          // console.log(response)
          // await fetchData();
          Swal.fire({
            // position: 'top-end',
            icon: "success",
            title: "ลบสินค้าเรียบร้อย",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("ไม่สามารถลบสินค้าได้", error);
          Swal.fire({
            icon: "error",
            title: "ลบสินค้าไม่สำเร็จ ",
            text: "กรุณาลองใหม่อีกครั้ง",
            confirmButtonText: "ตกลง",
          });
        }
      }
    });
  };

  // console.log(newProductUnit);
  // console.log(editProductUnit);

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
              สร้างใบกำกับภาษี
            </Button>
          </div>
        </div>
        {/* ------------ table  ----------------------------------------- */}
        <Card className="mt-5 border-2 overflow-auto ">
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
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ดู
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
                              {data?.product_name || ""}
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
                              onClick={() => handleDelete(data.product_name)}
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

       {/* modal View Company */}

    <Dialog open={openModalView} handler={handleModalView}>
      <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
        <div className="flex gap-3">
          <Typography variant="h5">รายละเอียดบริษัท:</Typography>
          <Typography variant="h5" className=" font-normal">
            {dataView?.product_name || ""}
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody divider className=" overflow-auto ">
        <div className="flex flex-col   items-center sm:items-start  gap-4 ">
          <div className="flex w-full  gap-3  ">
            <div className="flex w-full mt-3 gap-4    ">
              <Typography>ชื่อสินค้า:</Typography>
              <Typography>{dataView?.product_name || ""}</Typography>
            </div>

            <div className="flex mt-3 w-full gap-4  ">
              <Typography>ราคา/หน่วย:</Typography>
              <Typography>{dataView?.product_price || ""}</Typography>
            </div>
          </div>
          <div className="flex w-full mt-3 gap-4    ">
            <Typography>หน่วยนับ:</Typography>
            <Typography>{dataView?.product_unit || ""}</Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="green"
          size="sm"
          onClick={handleModalView}
          className="mr-1"
        >
          <span className="text-sm">ออก</span>
        </Button>
      </DialogFooter>
    </Dialog>

    {/* modal Add Company */}

    <Dialog
      open={openModalAdd}
      size="sm"
      handler={handleModalAdd}
    >
      <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
        <Typography variant="h5">เพิ่มสินค้าใหม่</Typography>
      </DialogHeader>
      <DialogBody divider className=" overflow-auto ">
        <div className="flex flex-col   items-center sm:items-start  gap-4 ">
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
            <div className="flex sm:w-[200px]  mt-3">
              <Input
                type="text"
                label="ชื่อสินค้า"
                maxLength="45"
                value={newProductName || ''}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            </div>
            <div className="flex sm:w-[200px]  mt-3">
              <Input
                type="text"
                label="ราคา/หน่วย"
                maxLength="10"
                value={newProductPrice || ''}
                onChange={(e) => setNewProductPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex mt-3 w-full h-auto sm:w-[200px] sm:mt-0 xl:px-5 ">
            <select
              className="border border-gray-400 min-w-[200px] rounded-lg py-1 px-2 "
              onChange={(e) => setNewProductUnit(e.target.value)}
            >
              <option value="">เลือกหน่วยนับ</option>
              {unitOptions &&
                unitOptions.map((data, index) => {
                  return (
                    <option key={index} value={data.value}>
                      {data.label}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          size="sm"
          onClick={handleModalAdd}
          className="mr-1"
        >
          <span className="text-sm">ยกเลิก</span>
        </Button>
        <Button size="sm" variant="gradient" color="green">
          <span className="text-sm">บันทึก</span>
        </Button>
      </DialogFooter>
    </Dialog>

    {/* modal Edit Company */}

    <Dialog open={openModalEdit} size="sm" handler={handleModalEdit}>
      <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
        <Typography variant="h5">แก้ไข สินค้า:</Typography>
        <Typography variant="h5">{dataEdit?.product_name || ''}</Typography>
      </DialogHeader>
      <DialogBody divider className=" overflow-auto ">
        <div className="flex flex-col   items-center sm:items-start  gap-4 ">
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
            <div className="flex sm:w-[200px]  mt-3">
              <Input
                type="text"
                label="ชื่อสินค้า"
                maxLength="45"
                value={dataEdit?.product_name || ''}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    product_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex sm:w-[200px]  mt-3">
              <Input
                type="text"
                label="ราคา/หน่วย"
                maxLength="10"
                value={dataEdit?.product_price || ''}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    product_price: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-3 w-full sm:w-[200px] sm:mt-0 xl:px-5">
          <select
          className="border border-gray-400 min-w-[200px] rounded-lg py-1 px-2 "
          value={dataEdit?.product_unit || ''}
          onChange={(e) =>
            setDataEdit({
              ...dataEdit,
              product_unit: e.target.value,
            })
          }
            >
              <option value="" >เลือกหน่วยนับ</option>
              {unitOptions &&
                unitOptions.map((data, index) => {
                  return (
                    <option key={index} value={data.value}>
                      {data.label}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          size="sm"
          onClick={handleModalEdit}
          className="mr-1"
        >
          <span className="text-sm">ยกเลิก</span>
        </Button>
        <Button size="sm" variant="gradient" color="green">
          <span className="text-sm">บันทึก</span>
        </Button>
      </DialogFooter>
    </Dialog>
  </div>
)
}

export default TaxInvoiceFull