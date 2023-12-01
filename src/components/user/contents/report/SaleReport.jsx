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
  Select,
  Option,
} from "@material-tailwind/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import { AiOutlineSearch } from "react-icons/ai";

import { useState } from "react";
import ReceiptA4 from "../../../receipt/receiptA4";

const SaleReport = () => {
  const [searchQueryStart, setSearchQueryStart] = useState(new Date());
  const [searchQueryEnd, setSearchQueryEnd] = useState(new Date());

  console.log(searchQueryStart);
  console.log(searchQueryEnd);

  //------------- open Receipt A4  -----------------------//
  const [openModalReceiptA4, setOpenModalReceiptA4] = useState(false);
  const handleModalReceiptA4 = () => {
    setOpenModalReceiptA4(!openModalReceiptA4);
  };

  return (
    <div className="mt-5">
      <div className="flex gap-5 ">
        <div className="flex justify-center ">
          <DatePicker
            // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
            // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
            // showYearDropdown
            // showMonthDropdown
            // scrollableYearDropdown
            // scrollableMonthDropdown
            selected={searchQueryStart}
            locale={th}
            dateFormat=" วันที่เริ่มต้น dd/MM/yyyy"
            onChange={(date) => setSearchQueryStart(date)}
            className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-center ">
          <DatePicker
            // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
            // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
            // showYearDropdown
            // showMonthDropdown
            // scrollableYearDropdown
            // scrollableMonthDropdown
            selected={searchQueryEnd}
            locale={th}
            dateFormat=" วันที่สิ้นสุด dd/MM/yyyy"
            onChange={(date) => setSearchQueryEnd(date)}
            className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <Button
          size="sm"
          variant="gradient"
          color="green"
          className="text-base flex justify-center  items-center   bg-green-500"
          onClick={() => setOpenModalReceiptA4(true)}
        >
          <span className="mr-2 text-xl ">
            <AiOutlineSearch />
          </span>
          ค้นหา
        </Button>
      </div>
      <div className="flex gap-5 ">
        <Card>
          {/* open PDF A4 */}
          <ReceiptA4
            openModalReceiptA4={openModalReceiptA4}
            handleModalReceiptA4={handleModalReceiptA4}
            // data={data}
            // customer={selectedCustomer}
            // calculateSubtotal={calculateSubtotal}
            // calculateVAT={calculateVAT}
            // calculateTotalAmount={calculateTotalAmount}
            // note={note}
          />
        </Card>
      </div>
    </div>
  );
};

export default SaleReport;
