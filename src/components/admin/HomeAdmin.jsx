import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Navbar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import { FaUserTie, FaBars } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSolidReport  } from "react-icons/bi";
import { BsBoxFill } from "react-icons/bs";
import Company from "./content/company";
// import Report from "./content/report";
import ReportMenu from "./content/ReportMenu";

function HomeAdmin() {
  const [openNav, setOpenNav] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("ข้อมูลบริษัท");
  const [selectedMenuSubItem, setSelectedMenuSubItem] = useState("");
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuItems, setSubMenuItems] = useState([]);

  const menuItems = [
    {
      icon: <BsBoxFill />,
      label: "ข้อมูลบริษัท",
      path: Company, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
    },
    {
      icon: <BiSolidReport />,
      label: "รายงาน",
      path: ReportMenu, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
      isUnderlined: 0,
    },
  ];

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    const selectedItem = menuItems.find((item) => item.label === menuItem);
    if (selectedItem.subItems) {
      setSubMenuOpen(true);
      setSubMenuItems(selectedItem.subItems);
    } else {
      setSubMenuOpen(false);
      setSelectedMenuSubItem("");
    }
  };

  const handleSubMenuClick = (subItem) => {
    // console.log(subItem);
    setSelectedMenuSubItem(subItem);
    setSubMenuOpen(false);
  };

  const isMenuItemSelected = (itemLabel) => {
    return itemLabel === selectedMenuItem;
  };

  const isSubMenuItemSelected = (subItemLabel) => {
    return subItemLabel === selectedMenuSubItem;
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  // console.log(menuItems)
  // console.log(selectedMenuItem);
  // console.log(selectedMenuSubItem);

  //------------- modal Logout -----------------------//

  const [openModalLogout, setOpenModalLogout] = useState(false);
  const [userLogout, setUserLogout] = useState([]);

  const handleModalLogout = () => {
    let user = localStorage.getItem("Status");
    setOpenModalLogout(!openModalLogout);
    setUserLogout(user);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };


  return (
    <>
      {/* HeaderBar */}
      <div>
        <Navbar
          color="blue"
          className="sticky top-0 z-10 max-w-full rounded-none py-2"
        >
          <div className="flex w-full items-center justify-between text-blue-gray-900">
            <Typography
              // as="a"
              // href="#"
              color="white"
              className="mr-4 font-bold  text-lg  py-1.5 text-center "
            >
              บริษัท Dev Sriwararak จำกัด
            </Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Button
                  // variant="outlined"
                  size="sm"
                  color="blue"
                  className="py-1 border-2 border-white"
                  onClick={handleModalLogout}
                >
                  <Typography>ออกจากระบบ</Typography>
                </Button>
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus-bg-transparent active-bg-transparent lg:hidden"
                ripple={false}
                onClick={toggleNav}
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
      </div>

      {/* Menu and Content */}
      <div className="flex   py-3 pr-3 bg-gray-300 gap-3 ">
        {/* Menu */}
        <div className={`${openNav ? "block" : "hidden"} lg:block`}>
          <Card className="flex w-[200px] h-[705px] overflow-hidden rounded-lg pt-5 ">
            <List className="flex my-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <ListItem
                    onClick={() => handleMenuItemClick(item.label)}
                    className={`w-[180px] py-3 text-sm font-normal text-blue-gray-700 focus:bg-blue-500 focus:text-white ${
                      isMenuItemSelected(item.label)
                        ? "bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex w-full">
                        <ListItemPrefix className="text-2xl">
                          {item?.icon}
                        </ListItemPrefix>
                        <ListItemPrefix className="text-base font-bold ">
                          {item?.label}
                        </ListItemPrefix>
                      </div>
                      <div className="flex w-full">
                        {item.label === selectedMenuItem && item.subItems && (
                          <List className="mt-2 ">
                            {item.subItems.map((subItem, subIndex) => (
                              <ListItem
                                key={subIndex}
                                onClick={() =>
                                  handleSubMenuClick(subItem.label)
                                }
                                className={`w-[220px]  rounded-lg py-2 text-sm font-normal text-blue-gray-700  focus-bg-blue-500 focus-text-white ${
                                  isSubMenuItemSelected(subItem.label)
                                    ? "bg-gray-300 opacity-60  text-blue-gray-700  hover:bg-blue-500 hover:text-white"
                                    : ""
                                }`}
                              >
                                {/* หากต้องการใส่  Icons  ให้เมนูย่อย   */}
                                {/* <ListItemPrefix className="text-xl" >{''}</ListItemPrefix>  */}

                                <ListItemPrefix className="text-base font-bold ">
                                  {subItem?.label}
                                </ListItemPrefix>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </div>
                    </div>
                  </ListItem>
                  <hr
                    className={` ${
                      item.isUnderlined == 1 ? " mt-2 border" : "hidden"
                    }`}
                  />
                </div>
              ))}
            </List>
          </Card>
        </div>

        {/* Content */}

        {selectedMenuSubItem
          ? menuItems.map(
              (item, index) =>
                item.label === selectedMenuItem &&
                item.subItems && (
                  <div key={index} className="flex w-full">
                    {item.subItems.map(
                      (subItem, subIndex) =>
                        subItem.label === selectedMenuSubItem && (
                          <subItem.path key={subIndex} />
                        )
                    )}
                  </div>
                )
            )
          : menuItems.map(
              (item, index) =>
                item.label === selectedMenuItem && (
                  <div key={index} className="flex w-full h-[705px]">
                    <item.path />
                  </div>
                )
            )}
      </div>

      {/* modal Logout */}

      <Dialog open={openModalLogout} size="sm" handler={handleModalLogout}>
        <DialogHeader className="bg-blue-700 py-3  px-3  justify-center text-lg text-white opacity-80">
        <Typography variant="h5">ออกจากระบบ</Typography>
          </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการ Logout: {userLogout || ""}{" "}
            </Typography>
            <Typography variant="h5" className="text-center">
              จากระบบหรือไม่?{" "}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className=" flex w-full justify-center  gap-5 ">
            <Button
              variant="gradient"
              color="red"
              size="sm"
              onClick={handleLogout}
              className="mr-1 px-10"
            >
              <span className="text-sm">ตกลง</span>
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              size="sm"
              onClick={handleModalLogout}
              className="mr-1 px-10"
            >
              <span className="text-sm">ยกเลิก</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default HomeAdmin;
