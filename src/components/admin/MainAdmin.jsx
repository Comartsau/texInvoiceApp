import {
  Navbar,
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

import { useState, useEffect } from "react";

import { FaBars, FaSearchPlus } from "react-icons/fa";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  BsPersonCircle,
  BsPencilSquare,
  BsFillEyeFill,
  BsPlusCircle,
} from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";

function MainAdmin() {
  const [openNav, setOpenNav] = useState(false);

  //------------- modal AddCompany -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleModalAdd = () => setOpenModalAdd(!openModalAdd);

  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");
  const [newCustomerDelivery, setNewCustomerDelivery] = useState("");
  const [newCustomerContract, setNewCustomerContract] = useState("");
  const [newCustomerTel, setNewCustomerTel] = useState("");
  const [newCustomerNoun, setNewCustomerNoun] = useState("");
  const [newCustomerNumber, setNewCustomerNumber] = useState("");

  //----------  Data Table --------------------//
  //   const [noData, setNoData] = useState(true);
  const [noData, setNoData] = useState(false);
  //   const [listData, setListData] = useState([]);
  const [listData, setListData] = useState([
    {
      customer_code: "001",
      customer_name: "บริษัท A",
    },
    {
      customer_code: "002",
      customer_name: "บริษัท B",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  return (
    <Card className=" h-screen bg-gray-300">
      <Navbar
        color="blue"
        className="sticky top-0 z-10 max-w-full rounded-none py-2 "
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            color="white"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center ">
              <Button
                variant="outlined"
                size="sm"
                color="white"
                className="py-1"
              >
                <Typography>Log Out</Typography>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <AiFillCloseCircle className="text-4xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>

      {/* Menu and  Content */}

      <div className="flex w-full h-[91%]  py-3  bg-gray-300 ">
        {/* Menu */}

        <div className={`w-[200px]  ${openNav ? "block" : "hidden"} lg:block`}>
          <Card className="flex  h-full flex-col gap-3 p-2">
            <div className="flex mt-5 items-center justify-center">
              <Typography>menu1</Typography>
            </div>
            <div className="flex items-center justify-center">
              <Typography>menu2</Typography>
            </div>
            <div className="flex items-center justify-center">
              <Typography>menu3</Typography>
            </div>
          </Card>
        </div>

        {/* Content  */}
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
                className="bg-gray-200"
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
                เพิ่มบริษัท
              </Button>
            </div>
          </div>
          {/* ------------ table  ----------------------------------------- */}
          <Card className="mt-3 overflow-auto ">
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
                                {data.customer_code || ""}
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
                                {data.customer_name || ""}
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
      </div>

      {/* modal Add Company */}

      <Dialog open={openModalAdd} size="sm" handler={handleModalAdd}>
        <DialogHeader className="bg-blue-700 py-3  px-3 text-center text-lg text-white opacity-80">
          เพิ่มบริษัทใหม่
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col   items-center sm:items-start  gap-4 ">
            <div className="w-full mt-3 md:w-[200px] lg:w-[220px]    ">
              <Input
                type="text"
                label="ชื่อบริษัท"
                maxLength="45"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
         
              />
            </div>
            <div className="mt-3 w-full   lg:min-w-[220px] ">
              <Input
                type="text"
                label="ที่อยู่บริษัท"
                maxLength="50"
                value={newCustomerAddress}
                onChange={(e) => setNewCustomerAddress(e.target.value)}
              
              />
            </div>

            <div className="flex w-full  flex-col sm:flex-row gap-3 sm:justify-between ">
              <div className="mt-3 sm:mt-0 w-full   lg:min-w-[200px] xl:w-[220px]  ">
                <Input
                  type="text"
                  label="เลขที่ประจำตัวผู้เสียภาษี"
                  maxLength="50"
                  value={newCustomerContract}
                  onChange={(e) => setNewCustomerContract(e.target.value)}
              
                />
              </div>

              <div className="mt-3 sm:mt-0 w-full  lg:min-w-[200px] xl:w-[220px]  ">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  value={newCustomerNoun}
                  maxLength="45"
                  onChange={(e) => setNewCustomerNoun(e.target.value)}
               
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleModalAdd}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}

export default MainAdmin;
