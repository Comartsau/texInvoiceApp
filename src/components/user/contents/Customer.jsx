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

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillDelete,AiOutlineStop, } from "react-icons/ai";
import { FaRegSave,FaFileUpload,FaCheckCircle } from "react-icons/fa";
import { TbDoorEnter } from "react-icons/tb";

import { BsPencilSquare, BsFillEyeFill, BsPlusCircle } from "react-icons/bs";

import { useRecoilState } from "recoil";
import { customerStore } from "../../../store/Store";

function Customer() {
  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);

  const [listData, setListData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [tokenError, setTokenError] = useState(false);

  const [customerDataStore,setCustomerDataStore] = useRecoilState(customerStore)

  const getCustomer = async () => {
    try {
      let token = localStorage.getItem("Token");

      let data = "";

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${
          import.meta.env.VITE_APP_API
        }/customer/customer-search?search=${searchQuery}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      await axios.request(config).then((response) => {
        console.log(response.data);
        setListData(response.data);
        setCustomerDataStore(response.data)
        setNoData(false);
      });
    } catch (error) {
      if (error.response.statusText == "Unauthorized") {
        setTokenError(true);
      }
      console.log(error)
    }
  };

  useEffect(() => {
    if (tokenError) {
      localStorage.clear();
      window.location.reload();
    }
  }, [tokenError]);

  // console.log(listData);

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  //------------- modal View Customer -----------------------//
  const [openModalView, setOpenModalView] = useState(false);
  const [dataView, setDataView] = useState([]);
  const handleModalView = (data) => {
    setOpenModalView(!openModalView);
    setDataView(data);
  };

  //------------- modal Add Product -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleModalAdd = () => setOpenModalAdd(!openModalAdd);

  const [newCustomer, setNewCustomer] = useState("");

  const addCustomer = async () => {
    let token = localStorage.getItem("Token");
    let data = qs.stringify({
      customer_name: newCustomer.customer_name,
      customer_address: newCustomer.customer_address,
      customer_id_tax: newCustomer.customer_id_tax,
      customer_tel: newCustomer.customer_tel,
    });

    console.log(data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_API}/customer/addcustomer`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        response.data;
        getCustomer();
        setOpenModalAdd(false);
        toast.success("เพิ่มข้อมูล ลูกค้า สำเร็จ");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  //------------- modal Edit Product -----------------------//
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const handleModalEdit = (data) => {
    setDataEdit(data);
    setOpenModalEdit(!openModalEdit);
  };

  const sendEditCustomer = async () => {
    let token = localStorage.getItem("Token");
    console.log(dataEdit);

    let data = qs.stringify({
      id: dataEdit.id,
      customer_name: dataEdit.customer_name,
      customer_id_tax: dataEdit.customer_id_tax,
      customer_address: dataEdit.customer_address,
      customer_tel: dataEdit.customer_tel,
    });

    console.log(data);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_API}/customer/editcustomer`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        response.data;
        setOpenModalEdit(false);
        getCustomer();
        toast.success("แก้ไขข้อมูล ลูกค้า สำเร็จ");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  //------------- modal Delete Product -----------------------//

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);

  const handleModalDelete = (data) => {
    setOpenModalDelete(!openModalDelete);
    setDataDelete(data);
  };

  const handleDelete = async (id) => {
    // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ

    let token = localStorage.getItem("Token");
    let data = qs.stringify({});

    console.log(id);

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_API}/customer/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        response.data;
        console.log(response.data);
        getCustomer();
        setOpenModalDelete(false);
        toast.success("ลบข้อมูล ลูกค้า สำเร็จ");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

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
              label="ค้นหา ชื่อลูกค้า"
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
              เพิ่มลูกค้า
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
                      className="font-bold leading-none opacity-70"
                    >
                      ดู
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
                              {data?.customer_name || ""}
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

      {/* modal View Customer */}

      <Dialog open={openModalView} handler={handleModalView}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <div className="flex gap-3">
            <Typography variant="h5">รายละเอียดลูกค้า:</Typography>
            <Typography variant="h5" className=" font-normal">
              {dataView?.customer_name || ""}
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex w-full mt-3 gap-4    ">
              <Typography className="font-bold">ชื่อลูกค้า:</Typography>
              <Typography>{dataView?.customer_name || ""}</Typography>
            </div>
            <div className="flex w-full mt-3 gap-4    ">
              <Typography className="font-bold">ที่อยู่:</Typography>
              <Typography>{dataView?.customer_address || ""}</Typography>
            </div>
            <div className="flex w-full  gap-3  ">
              <div className="flex w-full mt-3 gap-4    ">
                <Typography className="font-bold">เลขประจำตัวผู้เสียภาษีอากร:</Typography>
                <Typography>{dataView?.customerTaxId || ""}</Typography>
              </div>

              <div className="flex mt-3 w-full gap-4  ">
                <Typography className="font-bold">โทรศัพท์:</Typography>
                <Typography>{dataView?.customer_tel || ""}</Typography>
              </div>
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

      {/* modal Add Customer */}

      <Dialog open={openModalAdd} size="sm" handler={handleModalAdd}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มลูกค้าใหม่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="ชื่อลูกค้า"
                  maxLength="45"
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      customer_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex w-full  mt-3">
                <Input
                  type="text"
                  label="ที่อยู่"
                  maxLength="45"
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      customer_address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="เลขประจำตัวผู้เสียภาษีอากร"
                  maxLength="13"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length <= 5) {
                      setNewCustomer({
                        ...newCustomer,
                        customer_id_tax: inputValue,
                      });
                    }
                  }}
                  // onChange={(e) =>
                  //   setNewCustomer({
                  //     ...newCustomer,
                  //     customer_id_tax: e.target.value,
                  //   })
                  // }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="number"
                  label="เบอร์โทรศัพท์"
                  maxLength="10"
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      customer_tel: e.target.value,
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
            onClick={handleModalAdd}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2"><AiOutlineStop /></span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="green"
            onClick={addCustomer}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl"><FaRegSave /></span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Edit Customer */}

      <Dialog open={openModalEdit} size="sm" handler={handleModalEdit}>
        <DialogHeader className="bg-yellow-800 py-3  px-3 gap-2 text-center text-lg text-white opacity-80">
          <Typography variant="h5">แก้ไขลูกค้า:</Typography>
          <Typography variant="h5">{dataEdit?.customer_name || ""}</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="ชื่อลูกค้า"
                  maxLength="45"
                  value={dataEdit.customer_name || ""}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      customer_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex w-full  mt-3">
                <Input
                  type="text"
                  label="ที่อยู่"
                  maxLength="45"
                  value={dataEdit.customer_address || ""}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      customer_address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="เลขประจำตัวผู้เสียภาษีอากร"
                  maxLength="15"
                  value={dataEdit.customer_id_tax || ""}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      customer_id_tax: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="number"
                  label="เบอร์โทรศัพท์"
                  maxLength="10"
                  value={dataEdit.customer_tel || ""}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      customer_tel: e.target.value,
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
            onClick={sendEditCustomer}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2"><FaFileUpload/></span>
            อัพเดท
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Delete Product */}

      <Dialog open={openModalDelete} size="sm" handler={handleModalDelete}>
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ลบลูกค้า</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการลบ ลูกค้า: {dataDelete?.customer_name || ""}{" "}
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

export default Customer;
