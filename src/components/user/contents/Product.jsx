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
} from "@material-tailwind/react";

import {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../../api/ProductApi";

import { useRecoilState } from "recoil";
import { productStore  } from "../../../store/Store";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegSave, FaFileUpload, FaCheckCircle } from "react-icons/fa";
import { TbDoorEnter } from "react-icons/tb";
import { AiFillDelete, AiOutlineStop } from "react-icons/ai";

import { BsPencilSquare, BsFillEyeFill, BsPlusCircle } from "react-icons/bs";

function Product() {
  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(true);

  const [listData, setListData] = useState([]);
  const [productDataStore, setProductDataStore] = useRecoilState(productStore);


  const [searchQuery, setSearchQuery] = useState("");
  const [tokenError, setTokenError] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(searchQuery);
      setListData(response);
      console.log(response)
      setNoData(false);
      setProductDataStore(response);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(listData)

  useEffect(() => {
    if (tokenError) {
      localStorage.clear();
      window.location.reload();
    }
  }, [tokenError]);

  // console.log(listData);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);


  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData)
    ? listData?.slice(startIndex, endIndex)
    : [];

  const totalPages = Math?.ceil(listData?.length  / itemsPerPage);

  console.log(totalPages)

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

  const [newProduct, setNewProduct] = useState("");

  const handleAddProduct = async () => {
    try {
      let data = {
        name: newProduct.name,
        price: newProduct.price,
        unit: newProduct.unit,
      };

      const response = await addProduct(data);
      setOpenModalAdd(false);
      fetchProduct();
      toast.success("เพิ่มข้อมูล สินค้า สำเร็จ");
    } catch (error) {
      toast.error(error);
    }
  };

  //------------- modal Edit Product -----------------------//
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const handleModalEdit = (data) => {
    setDataEdit(data);
    setOpenModalEdit(!openModalEdit);
  };

  const handleEditProduct = async () => {
    try {
      let data = {
        id: dataEdit.id,
        name: dataEdit.name,
        price: dataEdit.price,
        unit: dataEdit.unit,
      };
      const response = await editProduct(data);
      setOpenModalEdit(false);
      fetchProduct();
      toast.success("แก้ไขข้อมูล สินค้า สำเร็จ");
    } catch (error) {
      toast.error(error);
    }
  };

  //------------- modal Delete Product -----------------------//

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);

  const handleModalDelete = (data) => {
    setOpenModalDelete(!openModalDelete);
    setDataDelete(data);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      setOpenModalDelete(false);
      fetchProduct();
      toast.success("ลบข้อมูล สินค้า สำเร็จ");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Card className="w-full overflow-auto px-3">
      <ToastContainer className="mt-10" autoClose={800} theme="colored" />
      <div className="w-full px-3">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="flex flex-col sm:flex-row w-full items-center gap-3   sm:justify-between px-5 mt-5   ">
          <div className="flex justify-center ">
            <Input
              type="text"
              color="blue"
              label="ค้นหา สินค้า"
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
              <span className="mr-2 text-xl ">
                <BsPlusCircle />
              </span>
              เพิ่มสินค้า
            </Button>
          </div>
        </div>
        {/* ------------ table  ----------------------------------------- */}
        <Card className="mt-5 mx-10 border-2 overflow-auto ">
          <div className="p-3 ">
            <table className="w-full min-w-max   ">
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
                      ชื่อสินค้า
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
                        className="font-bold leading-none opacity-70 "
                      >
                        แก้ไข
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
              {noData || displayedData?.length == 0 ? (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <Typography>...ไม่พบข้อมูล...</Typography>
                    </td>
                    <td></td>
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
                              {data?.name || ""}
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
                          <div className="flex justify-center">
                            <IconButton
                              variant="outlined"
                              color="amber"
                              size="sm"
                              onClick={() => handleModalEdit(data)}
                            >
                              <BsPencilSquare className="h-5 w-5 text-yellow-900" />
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

      {/* modal View Product */}

      <Dialog open={openModalView} handler={handleModalView}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <div className="flex gap-3">
            <Typography variant="h5">รายละเอียดบริษัท:</Typography>
            <Typography variant="h5" className=" font-normal">
              {dataView?.name || ""}
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex w-full  gap-3  ">
              <div className="flex w-full mt-3 gap-4    ">
                <Typography className="font-bold">ชื่อสินค้า:</Typography>
                <Typography>{dataView?.name || ""}</Typography>
              </div>

              <div className="flex mt-3 w-full gap-4  ">
                <Typography className="font-bold">ราคา/หน่วย:</Typography>
                <Typography>
                  {Number(dataView?.price).toLocaleString() || ""}
                </Typography>
              </div>
            </div>
            <div className="flex w-full mt-3 gap-4    ">
              <Typography className="font-bold">หน่วยนับ:</Typography>
              <Typography>{dataView?.unit || ""}</Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
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
        </DialogFooter>
      </Dialog>

      {/* modal Add Product */}

      <Dialog open={openModalAdd} size="sm" handler={handleModalAdd}>
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
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="number"
                  label="ราคา/หน่วย"
                  maxLength="10"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex mt-3 w-full h-auto sm:w-[200px] sm:mt-0 xl:px-5 ">
              <Input
                type="text"
                label="หน่วยนับ"
                maxLength="30"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    unit: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalAdd}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="green"
            onClick={handleAddProduct}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Edit Product */}

      <Dialog open={openModalEdit} size="sm" handler={handleModalEdit}>
        <DialogHeader className="bg-yellow-800 py-3  px-3 gap-2 text-center text-lg text-white opacity-80">
          <Typography variant="h5">แก้ไข สินค้า:</Typography>
          <Typography variant="h5">{dataEdit?.name || ""}</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="ชื่อสินค้า"
                  maxLength="45"
                  value={dataEdit?.name || ""}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="number"
                  label="ราคา/หน่วย"
                  maxLength="10"
                  value={dataEdit?.price || ""}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      price: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-3 w-full sm:w-[200px] sm:mt-0 xl:px-5">
              <Input
                type="text"
                label="หน่วยนับ"
                maxLength="30"
                value={dataEdit?.unit || ""}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    unit: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalEdit}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="purple"
            onClick={handleEditProduct}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <FaFileUpload />
            </span>
            อัพเดท
          </Button>
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
              ต้องการลบ สินค้า: {dataDelete?.name || ""}{" "}
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
              onClick={() => handleDeleteProduct(dataDelete?.id)}
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
    </Card>
  );
}

export default Product;
