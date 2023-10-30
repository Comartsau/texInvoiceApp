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

import { useState, useEffect } from "react";

import { FaUserTie, FaBars } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsBoxFill } from "react-icons/bs";
import { MdAddLocationAlt } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import Logout from "../../Logout";

import Product from "../contents/Product";
import Customer from "../contents/Customer";
import Sale from '../contents/Sale'

function MainOwner() {
  const [openNav, setOpenNav] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("ข้อมูลสินค้า"); // หลังจาก login  ให้แสดงหน้าไหนก่อน
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <BsBoxFill />,
      label: "ข้อมูลสินค้า",
      path: <Product />,
    },
    {
      icon: <FaUserTie />,
      label: "ข้อมูลลูกค้า",
      path: <Customer />,
    },
    {
      icon: <MdAddLocationAlt />,
      label: "จุดขาย",
      path: <Sale />,
    },
    {
      icon: <MdAddLocationAlt />,
      label: "รายการใบกำกับภาษี",
      path: <Sale />,
    },

  ];

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  function isMenuItemSelected(itemLabel) {
    return itemLabel === selectedMenuItem;
  }
  

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const handleLogout = async () => {
    Logout(navigate);
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
              as="a"
              href="#"
              color="white"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              Material Tailwind
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
          <Card className=" flex w-[240px] h-[90vh] overflow-hidden rounded-lg pt-5 ">
            <List  className="flex my-2">
              {menuItems.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleMenuItemClick(item.label)}
                  className={`w-[225px] rounded-lg py-3 text-sm font-normal text-blue-gray-700 focus:bg-blue-500 focus:text-white ${
                    isMenuItemSelected(item.label) ? 'bg-blue-400 text-white hover:bg-blue-500 hover:text-white' : ''
                  }`}
                >
                  <ListItemPrefix className="text-xl">
                    {item.icon}
                  </ListItemPrefix>
                  <ListItemPrefix className="text-base font-bold ">
                    {item.label}
                  </ListItemPrefix>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>

        {/* Content */}

        {menuItems.map(
          (item, index) =>
            item.label === selectedMenuItem && (
              <div key={index} className="flex w-full  ">
                {item.path}
              </div>
            )
        )}
      </div>
    </>
  );
}

export default MainOwner;
