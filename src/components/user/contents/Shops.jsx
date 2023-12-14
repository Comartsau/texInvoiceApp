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

import axios from "axios";
import qs from "qs";

import { addShop, deleteShop, editShop, getShop } from "../../../api/ShopApi";

import { useState, useEffect } from "react";
 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillDelete,AiOutlineStop } from "react-icons/ai";
import { FaCheckCircle, FaFileUpload, FaRegSave,FaEye ,FaRegEyeSlash  } from "react-icons/fa";

import { BsPencilSquare, BsPlusCircle } from "react-icons/bs";

import { useRecoilState } from "recoil";
import { shopStore } from "../../../store/Store";

function Shops() {
  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(true);
  const [shopDataStore,setShopDataStore] = useRecoilState(shopStore)

  const [listData, setListData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenError, setTokenError] = useState(false);


  const fetchShop = async () => {
    try {
      const response = await getShop(searchQuery)
        setListData(response);
        setShopDataStore(response)
        setNoData(false);

      
    } catch (error) {
      toast.error(error)
      
    }
  }

  useEffect(() => {
    if (tokenError) {
      localStorage.clear();
      window.location.reload();
    }
  }, [tokenError]);

  // console.log(listData);

  useEffect(() => {
    fetchShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData) ? listData?.slice(startIndex, endIndex) : [];

  const totalPages = Math?.ceil(listData?.length / itemsPerPage);

  //------------- modal Add Product -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleModalAdd = () => setOpenModalAdd(!openModalAdd);

  const [newShops, setNewShops] = useState("");


  const handleAddShop = async () =>{
    try {
      let data = {
        salepoints_name: newShops,
      }
      const response = await addShop(data)
      fetchShop()
      setOpenModalAdd(false);
      toast.success("เพิ่มข้อมูล จุดขาย สำเร็จ");

    } catch (error) {
      toast.error(error)
      
    }
  }

  //------------- modal Edit Product -----------------------//
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const handleModalEdit = (data) => {
    setDataEdit(data);
    setOpenModalEdit(!openModalEdit);
  };


  const handleEditShop = async () =>{
    try {
      let data = {
        id: dataEdit.id,
        salepoints_name: dataEdit.salepoints_name,
      }
      const response = await editShop(data)
      setOpenModalEdit(false);
      fetchShop();
      toast.success("แก้ไขข้อมูล จุดขาย สำเร็จ");

      
    } catch (error) {
      toast.error(error)
      
    }
  }

  
  //------------- modal Close Product -----------------------//

  const [openModalClose, setOpenModalClose] = useState(false);
  const [switchIcon,setSwitchIcon] = useState(true)
  const [dataClose, setDataClose] = useState([]);

  const handleModalClose = (data) => {
    setOpenModalClose(!openModalClose);
    setDataClose(data);
  };

  const handleClose = async (id) => {
    // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ
    setSwitchIcon(!switchIcon)
    setOpenModalClose(false)



    // let token = localStorage.getItem("Token");
    // let data = qs.stringify({});

    console.log(id);

    // let config = {
    //   method: "delete",
    //   maxBodyLength: Infinity,
    //   url: `${import.meta.env.VITE_APP_API}/salepoints/delete/${id}`,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   data: data,
    // };
    // axios
    //   .request(config)
    //   .then((response) => {
    //     response.data;
    //     //  setTimeout(() => {
    //     // }, 1000);
    //     console.log(response.data);
    //     getShops();
    //     setOpenModalDelete(false);
    //     toast.success("ลบข้อมูล จุดขาย สำเร็จ");

    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   });
  };

  //------------- modal Delete Product -----------------------//

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);

  const handleModalDelete = (data) => {
    setOpenModalDelete(!openModalDelete);
    setDataDelete(data);
  };

  const handleDeleteShop = async (id) => {
    try {
      const response = await deleteShop(id) 
        fetchShop();
        setOpenModalDelete(false);
        toast.success("ลบข้อมูล จุดขาย สำเร็จ");
      

      
    } catch (error) {
      toast.error(error)
      
    }
  }



  // const handleDelete = async (id) => {
  //   // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ

  //   let token = localStorage.getItem("Token");
  //   let data = qs.stringify({});

  //   console.log(id);

  //   let config = {
  //     method: "delete",
  //     maxBodyLength: Infinity,
  //     url: `${import.meta.env.VITE_APP_API}/salepoints/delete/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: data,
  //   };
  //   axios
  //     .request(config)
  //     .then((response) => {
  //       response.data;
  //       //  setTimeout(() => {
  //       // }, 1000);
  //       console.log(response.data);
  //       // getShops();
  //       setOpenModalDelete(false);
  //       toast.success("ลบข้อมูล จุดขาย สำเร็จ");

  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  return (
    <Card className="w-full overflow-auto px-3">
      <ToastContainer className="mt-10" autoClose={1000} theme="colored" />
      <div className="w-full px-3">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="flex flex-col sm:flex-row w-full items-center gap-3   sm:justify-between px-5 mt-5   ">
          <div className="flex justify-center ">
            <Input
              type="text"
              color="blue"
              label="ค้นหา จุดขาย"
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
              เพิ่มจุดขาย
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
                      ชื่อลูกค้า
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70 "
                    >
                      แก้ไข
                    </Typography>
                  </th>
                  {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ปิด / เปิด
                    </Typography>
                  </th> */}
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
              {noData || displayedData.length == 0 ? (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <Typography className="mt-5">...ไม่พบข้อมูล...</Typography>
                    </td>
                    <td></td>
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
                              {data?.salepoints_name || ""}
                            </Typography>
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
                        {/* <td className={classes}>
                          <div className="flex justify-center ">
                            <IconButton
                              variant="outlined"
                              size="sm"
                              color="red"
                              className="rounded-full"
                              onClick={() => handleModalClose(data)}
                            >
                              {
                              switchIcon ? <FaEye color="red" className="h-5 w-5" />
                              :
                              <FaRegEyeSlash color="red" className="h-5 w-5" />
                              }
                            </IconButton>
                          </div>
                        </td> */}
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

      {/* modal Add Shops */}

      <Dialog open={openModalAdd} size="sm" handler={handleModalAdd}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มจุดขาย</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 justify-center">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="ชื่อจุดขาย"
                  maxLength="45"
                  onChange={(e) => setNewShops(e.target.value)}
                />
              </div>
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
            <span className="text-xl mr-2"><AiOutlineStop /></span>
            ยกเลิก
          </Button>
          <Button size="sm" variant="gradient" color="green" onClick={handleAddShop}
          className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl"><FaRegSave /></span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Edit Shops */}

      <Dialog open={openModalEdit} size="sm" handler={handleModalEdit}>
        <DialogHeader className="bg-yellow-800 py-3  px-3 gap-2 text-center text-lg text-white opacity-80">
          <Typography variant="h5">แก้ไขจุดขาย:</Typography>
          <Typography variant="h5">
            {dataEdit?.salepoints_name || ""}
          </Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 justify-center">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="ชื่อจุดขาย"
                  maxLength="45"
                  value={dataEdit.salepoints_name}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      salepoints_name: e.target.value,
                    })
                  }
                />
              </div>
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
            <span className="text-xl mr-2"><AiOutlineStop /></span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="purple"
            onClick={handleEditShop}
            className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2"><FaFileUpload/></span>
              อัพเดท
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Close Shop */}

      <Dialog open={openModalClose} size="sm" handler={handleModalClose}>
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ปิด/เปิด จุดขาย</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการ ปิด / เปิด จุดขาย: {dataDelete?.salepoints_name || ""}{" "}
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
              onClick={() => handleClose(dataClose?.id)}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2"><FaCheckCircle /></span>
              ตกลง
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              size="sm"
              onClick={handleModalClose}
              className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2"><AiOutlineStop /></span>
            ยกเลิก
            </Button>
          </div>
        </DialogFooter>
      </Dialog>


      {/* modal Delete Shop */}

      <Dialog open={openModalDelete} size="sm" handler={handleModalDelete}>
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ลบจุดขาย</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการลบ จุดขาย: {dataDelete?.salepoints_name || ""}{" "}
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
              onClick={() => handleDeleteShop(dataDelete?.id)}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2"><FaCheckCircle /></span>
              ตกลง
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              size="sm"
              onClick={handleModalDelete}
              className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2"><AiOutlineStop /></span>
            ยกเลิก
            </Button>
          </div>
        </DialogFooter>
      </Dialog>


    </Card>
  );
}

export default Shops;
