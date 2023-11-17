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
} from "@material-tailwind/react";
import { FaUserTie, FaBars } from "react-icons/fa";
import { AiFillCloseCircle, AiFillSchedule } from "react-icons/ai";
import { BsBoxFill } from "react-icons/bs";
import { MdAddLocationAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Product from "./contents/Product";
import Customer from "./contents/Customer";
import Shop from "./contents/Shops";
import TaxInvoiceMenu from "./contents/TaxInvoiceMenu";
import Menutest from "./contents/Menutest";

function HomeUser() {
  const [openNav, setOpenNav] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("ข้อมูลสินค้า");
  const [selectedMenuSubItem, setSelectedMenuSubItem] = useState("");
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <BsBoxFill />,
      label: "ข้อมูลสินค้า",
      path: Product, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
    },
    {
      icon: <FaUserTie />,
      label: "ข้อมูลลูกค้า",
      path: Customer, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
      isUnderlined: 0,
    },
    {
      icon: <MdAddLocationAlt />,
      label: "จุดขายสินค้า",
      path: Shop, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
      isUnderlined: 1,
    },
    // {
    //   icon: <AiFillSchedule />,
    //   label: "ใบกำกับภาษี",
    //   path: TaxInvoiceMenu,
    //   isUnderlined: 0,
    // },
    // {
    //   icon: <AiFillSchedule />,
    //   label: "ใบกำกับภาษี",
    //   path: TaxInvoiceFull,
    //   subItems: [
    //     {
    //       icon: <MdAddLocationAlt />,
    //       label: "เต็มรูปแบบ",
    //       path: TaxInvoiceFull, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
    //     },
    //     {
    //       icon: <MdAddLocationAlt />,
    //       label: "ออกใบกำกับภาษี",
    //       path: TaxInvoiceSm, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
    //     },
    //     {
    //       icon: <MdAddLocationAlt />,
    //       label: "ออกใบกำกับภาษี แบบย่อ",
    //       path: TaxInvoiceSm, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
    //     },
    //     // เพิ่มรายการย่อยเพิ่มเติมตามต้องการ
    //   ],
    //   isUnderlined: 0,
    // },
    // {
    //   icon: <MdAddLocationAlt />,
    //   label: "เมนูtest",
    //   path: Menutest, // ใช้ชื่อของคอมโพนเนนต์แทน (ไม่มี <>)
    //   isUnderlined: 1,
    // },
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

  const handleLogout = ()=>{
    localStorage.clear()
    window.location.reload()
}
  // console.log(menuItems)
  // console.log(selectedMenuItem);
  // console.log(selectedMenuSubItem);

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
              as="a"
              href="#"
              color="white"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              ระบบใบกำกับภาษีแบบสัพ
            </Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Button
                  variant="outlined"
                  size="sm"
                  color="white"
                  className="py-1"
                  onClick={handleLogout}
                >
                  <Typography>Log Out</Typography>
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
          <Card className="flex w-[200px] h-[90vh] overflow-hidden rounded-lg pt-5 ">
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
                item.label === selectedMenuItem &&  (
                  <div key={index} className="flex w-full">
                    <item.path />
                  </div>
                )
            )}
      </div>
    </>
  );
}

export default HomeUser;
