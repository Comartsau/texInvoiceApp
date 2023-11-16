/* eslint-disable no-undef */
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
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillDelete } from "react-icons/ai";

import { BsPencilSquare, BsFillEyeFill, BsPlusCircle } from "react-icons/bs";
import { useEffect } from "react";

function Company() {
  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(true);

  const [listData, setListData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const getCompany = async () => {
    try {
      let token = localStorage.getItem("Token");

      let data = "";

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${
          import.meta.env.VITE_APP_API
        }/company-search?search=${searchQuery}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      await axios.request(config).then((response) => {
        setListData(response.data);
        setNoData(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(listData);

  useEffect(() => {
    getCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData?.length / itemsPerPage);

  //------------- modal View Company -----------------------//
  const [openModalView, setOpenModalView] = useState(false);
  const [dataView, setDataView] = useState([]);
  const handleModalView = (data) => {
    setOpenModalView(!openModalView);
    setDataView(data);
  };

  //------------- modal Add Company -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const handleModalAdd = () => setOpenModalAdd(!openModalAdd);

  const [newCompanyData, setNewCompanyData] = useState({
    newCompany: "",
    newTex: "",
    newAddress: "",
    newTel: "",
    newUserName: "",
    newPassword: "",
  });

  const sendAddCompany = async () => {
    try {
      let token = localStorage.getItem("Token");

      let data = {
        company: newCompanyData.newCompany,
        tax_personal: newCompanyData.newTex,
        address: newCompanyData.newAddress,
        tel: newCompanyData.newTel,
        username: newCompanyData.newUserName,
        password: newCompanyData.newPassword,
      };
      console.log(data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_APP_API}/register`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      await axios.request(config).then((response) => {
        console.log(response.data);
        handleModalAdd();
        toast.success("เพิ่มข้อมูล Company สำเร็จ");
        getCompany();
      });
    } catch (error) {
      toast.error(error);
    }
  };

  //------------- modal Edit Company -----------------------//
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editCompanyData, setEditCompanyData] = useState([]);

  const handleModalEdit = (data) => {
    setOpenModalEdit(!openModalEdit);
    setEditCompanyData(data);
  };

  const sendEditCompany = async () => {
    let token = localStorage.getItem("Token");
    let data = qs.stringify({
      id: editCompanyData.id,
      company: editCompanyData.company,
      tax_personal: editCompanyData.tax_personal,
      address: editCompanyData.address,
      tel: editCompanyData.tel,
      username: editCompanyData.username,
      password: editCompanyData.password,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_API}/company/edit`,
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
        getCompany();
        toast.success("แก้ไขข้อมูล Company สำเร็จ");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  console.log(editCompanyData);

  //------------- modal Delete Company -----------------------//
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

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_API}/company/delete/${id}`,
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
        getCompany();
        setOpenModalDelete(false);
        toast.success("ลบข้อมูล Company สำเร็จ");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Card className="w-full overflow-auto px-3">
      <ToastContainer autoClose={1000} theme="colored" />
      <div className="w-full px-3">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="flex flex-col sm:flex-row w-full items-center gap-3   sm:justify-between px-5 mt-5   ">
          <div className="flex justify-center ">
            <Input
              type="text"
              color="blue"
              label="ค้นหา ชื่อบริษัท / Username"
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
              เพิ่มสินค้า
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
                      ชื่อบริษัท
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      Username
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
                              {data?.company || ""}
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
                              {data?.username || ""}
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

      {/* modal View Company */}

      <Dialog open={openModalView} handler={handleModalView}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <div className="flex gap-3">
            <Typography variant="h5">รายละเอียดบริษัท:</Typography>
            <Typography variant="h5" className=" font-normal">
              {dataView?.company || ""}
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex w-full mt-3 gap-4    ">
              <Typography>ชื่อบริษัท:</Typography>
              <Typography>{dataView?.company || ""}</Typography>
            </div>
            <div className="flex w-full mt-3 gap-4    ">
              <Typography>ที่อยู่:</Typography>
              <Typography>{dataView?.address || ""}</Typography>
            </div>
            <div className="flex w-full  gap-3  ">
              <div className="flex w-full mt-3 gap-4    ">
                <Typography>เลขผู้เสียภาษี:</Typography>
                <Typography>{dataView?.tax_personal || ""}</Typography>
              </div>

              <div className="flex mt-3 w-full gap-4  ">
                <Typography>โทรศัพท์:</Typography>
                <Typography>{dataView?.tel || ""}</Typography>
              </div>
            </div>
            <div className="flex w-full  gap-3  ">
              <div className="flex w-full mt-3 gap-4    ">
                <Typography>Username:</Typography>
                <Typography>{dataView?.username || ""}</Typography>
              </div>

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

      <Dialog open={openModalAdd} size="sm" handler={handleModalAdd}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มบริษัทใหม่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="ชื่อบริษัท"
                  maxLength="45"
                  onChange={(e) =>
                    setNewCompanyData({
                      ...newCompanyData,
                      newCompany: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[300px]  mt-3">
                <Input
                  type="text"
                  label="เลขประจำตัวผู้เสียภาษี"
                  maxLength="13"
                  onChange={(e) =>
                    setNewCompanyData({
                      ...newCompanyData,
                      newTex: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[400px]  mt-3">
                <Input
                  type="text"
                  label="ที่อยู่"
                  maxLength="45"
                  onChange={(e) =>
                    setNewCompanyData({
                      ...newCompanyData,
                      newAddress: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  maxLength="13"
                  onChange={(e) =>
                    setNewCompanyData({
                      ...newCompanyData,
                      newTel: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[400px]  mt-3">
                <Input
                  type="text"
                  label="Username"
                  maxLength="45"
                  onChange={(e) =>
                    setNewCompanyData({
                      ...newCompanyData,
                      newUserName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="password"
                  label="Password"
                  maxLength="8"
                  onChange={(e) =>
                    setNewCompanyData({
                      ...newCompanyData,
                      newPassword: e.target.value,
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
            className="mr-1"
          >
            <span className="text-sm">ยกเลิก</span>
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="green"
            onClick={sendAddCompany}
          >
            <span className="text-sm">บันทึก</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Edit Company */}

      <Dialog open={openModalEdit} size="sm" handler={handleModalEdit}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          <Typography variant="h5">แก้ไข สินค้า:</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="ชื่อบริษัท"
                  maxLength="45"
                  value={editCompanyData?.company || ""}
                  onChange={(e) =>
                    setEditCompanyData({
                      ...editCompanyData,
                      company: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[300px]  mt-3">
                <Input
                  type="text"
                  label="เลขประจำตัวผู้เสียภาษี"
                  maxLength="13"
                  value={editCompanyData?.tax_personal || ""}
                  onChange={(e) =>
                    setEditCompanyData({
                      ...editCompanyData,
                      tax_personal: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[400px]  mt-3">
                <Input
                  type="text"
                  label="ที่อยู่"
                  maxLength="45"
                  value={editCompanyData?.address || ""}
                  onChange={(e) =>
                    setEditCompanyData({
                      ...editCompanyData,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  maxLength="13"
                  value={editCompanyData?.tel || ""}
                  onChange={(e) =>
                    setEditCompanyData({
                      ...editCompanyData,
                      tel: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:px-5 xl:justify-between">
              <div className="flex sm:w-[400px]  mt-3">
                <Input
                  type="text"
                  label="Username"
                  maxLength="45"
                  value={editCompanyData?.username || ""}
                  onChange={(e) =>
                    setEditCompanyData({
                      ...editCompanyData,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex sm:w-[200px]  mt-3">
                <Input
                  type="password"
                  label="Password"
                  maxLength="8"
                  value={editCompanyData?.password || ""}
                  onChange={(e) =>
                    setEditCompanyData({
                      ...editCompanyData,
                      password: e.target.value,
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
            className="mr-1"
          >
            <span className="text-sm">ยกเลิก</span>
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="purple"
            onClick={sendEditCompany}
          >
            <span className="text-sm">อัพเดท</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Delete Company */}

      <Dialog open={openModalDelete} size="sm" handler={handleModalDelete}>
        <DialogHeader className="bg-red-700 py-5  px-3 text-center text-lg text-white opacity-80">
        <Typography variant="h5">ลบบริษัท</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการลบ บริษัท: {dataDelete?.company || ""}{" "}
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
              className="mr-1 px-10"
            >
              <span className="text-sm">ตกลง</span>
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              size="sm"
              onClick={handleModalDelete}
              className="mr-1 px-10"
            >
              <span className="text-sm">ยกเลิก</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}

export default Company;
