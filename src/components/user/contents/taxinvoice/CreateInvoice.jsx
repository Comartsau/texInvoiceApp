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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";

import { IoIosSave } from "react-icons/io";
import { MdLocalPrintshop, MdRemoveCircle } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { BsPlusCircle } from "react-icons/bs";

import { useState } from "react";

import { useRecoilState } from "recoil";
import {
  createInvoiceStore,
  productStore,
  companyStore,
  customerStore,
} from "../../../../store/Store";

const CreateInvoice = () => {
  // import Data Store
  const [openCreateInvoice, setOpenInvoie] = useRecoilState(createInvoiceStore);
  const [productDataStore, setProductDataStore] = useRecoilState(productStore);
  const [companyDataStore, setCompanyDataStore] = useRecoilState(companyStore);
  const [customerDataStore, setCustomerDataStore] =
    useRecoilState(customerStore);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [select, setSelect] = useState("");

  const columns = [
    "ลำดับ",
    "รายการ",
    "จำนวน",
    "หน่วย",
    "ราคา/หน่วย",
    "รวมเงิน",
    "ลบ",
  ];

  const productOptions = productDataStore?.map((product) => ({
    value: product.id,
    label: product.name,
  }));
  const customerOptions = customerDataStore?.map((customer) => ({
    value: customer.id,
    label: customer.customer_name,
  }));

  console.log(customerDataStore);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const handleCustomerSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const customer = customerDataStore.find(
      (customer) => customer.id === e.value
    );
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    console.log(customer);
    setSelectedCustomer(customer);
  };

  const [selectValues, setSelectValues] = useState([]);
  const [data, setData] = useState([]);

  const handleChange = (value, index) => {
    // ตรวจสอบว่ามีค่าที่ถูกเลือกอยู่แล้วหรือไม่
    const isValueExist = selectValues.some(
      (val, i) => val && val.value === value.value && i !== index
    );

    if (!isValueExist) {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        category: value ? value.value : null,
      };

      // ค้นหาข้อมูลสินค้าที่ถูกเลือกจาก productDataStore
      const selectedProduct = productDataStore.find(
        (product) => product.id === value.value
      );

      // ตรวจสอบว่าเจอสินค้าที่ถูกเลือกหรือไม่
      if (selectedProduct) {
        updatedData[index].unit = selectedProduct.unit;
        updatedData[index].pricePerUnit = selectedProduct.price; // หรือชื่อ field ที่เก็บราคาต่อหน่วย

        // Update selectValues here
        const newSelectValues = [...selectValues];
        newSelectValues[index] = value;
        setSelectValues(newSelectValues);

        // Calculate total price here
        updatedData[index].totalPrice = calculateTotal(
          updatedData[index].quantity,
          selectedProduct.price
        );
      }

      setData(updatedData);

      const newSelectValues = [...selectValues];
      newSelectValues[index] = value;
      setSelectValues(newSelectValues);
    } else {
      toast.error("สินค้าซ้ำกัน กรุณาเลือกสินค้าใหม่");
      // หรือสามารถทำการจัดการอื่น ๆ ตามความเหมาะสมได้ เช่น แสดงข้อความเตือน
    }
  };

  const handleAddRow = () => {
    const newData = {
      id: data.length + 1,
      name: `Item ${data.length + 1}`,
      category: null,
    };
    setData([...data, newData]);
    setSelectValues([...selectValues, null]);
  };

  const handleDeleteRow = (index) => {
    const updatedData = data.filter((item, i) => i !== index);
    setData(updatedData);

    const newSelectValues = [...selectValues];
    newSelectValues.splice(index, 1);
    setSelectValues(newSelectValues);
    toast.success("ลบข้อมูลสินค้าสำเร็จ");
  };

  console.log(data);

  // const handleQuantityChange = (e, index) => {
  //   console.log(e)
  //   const newQuantity = parseInt(e, 10);
  //   const updatedData = [...data];
  //   updatedData[index] = {
  //     ...updatedData[index],
  //     quantity: newQuantity,
  //     totalPrice: calculateTotal(newQuantity, updatedData[index].pricePerUnit)
  //   };
  //   setData(updatedData);
  // };

  const handleQuantityChange = (e, index) => {
    const newQuantity = parseInt(e, 10);
    const updatedData = [...data];
    const selectedProduct = productDataStore.find(
      (product) => product.id === updatedData[index]?.category
    );

    if (selectedProduct) {
      updatedData[index] = {
        ...updatedData[index],
        quantity: newQuantity,
        totalPrice: calculateTotal(newQuantity, selectedProduct.price),
      };
      setData(updatedData);
    }
  };

  // ฟังก์ชันคำนวณรวมเงิน
  const calculateTotal = (quantity, pricePerUnit) => {
    return isNaN(quantity) || isNaN(pricePerUnit) ? 0 : quantity * pricePerUnit;
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    data.forEach((item) => {
      if (!isNaN(item.totalPrice)) {
        subtotal += item.totalPrice;
      }
    });
    return subtotal;
  };

  const calculateVAT = () => {
    const subtotal = calculateSubtotal();
    const vatRate = 0.07; // เปลี่ยนเป็นอัตราภาษีตามที่คุณต้องการ
    return subtotal * vatRate;
  };

  const calculateTotalAmount = () => {
    const subtotal = calculateSubtotal();
    const vat = calculateVAT();
    return subtotal + vat;
  };

  console.log(select);

  return (
    <div className="flex h-full flex-col p-3 overflow-auto  space-y-5 items-center ">
      <div className="flex w-full flex-col md:flex-row gap-14 ">
        <div className="flex flex-col w-full md:w-1/2 ">
          <Typography className="text-lg lg:text-xl font-bold">
            สร้างบิลใบเสร็จรับเงิน / ใบกำกับภาษี (เต็มรูปแบบ)
          </Typography>
          <Typography className=" font-bold mt-5">ข้อมูลบริษัท</Typography>
          <Typography className="  mt-5">
            บริษัท เขาสวนกวาง จำกัด 111/11 หมู่ที่10 ตใพระลับ อ.เมือง จ.ขอนแก่น
            40000 เลขประจำตัวผู้เสียภาษี 123456 โทร 0850032649
          </Typography>
          <Typography className=" font-bold mt-5">
            วันที่ออกบิล: <span className=" font-normal">22-11-2566</span>
          </Typography>
        </div>
        <div className="flex flex-col  w-full gap-3 md:w-1/2 ">
          <div className=" flex flex-col sm:flex-row  items-center sm:items-start  w-full justify-center md:justify-end   gap-5  ">
            <div className=" justify-center">
              <Button
                size="sm"
                variant="gradient"
                color="green"
                className="text-base flex justify-center  items-center   bg-green-500"
              >
                <span className="mr-2 text-xl ">
                  <IoIosSave />
                </span>
                บันทึก
              </Button>
            </div>
            <div className=" justify-center">
              <Button
                size="sm"
                variant="gradient"
                color="blue"
                className="text-base flex justify-center  items-center   bg-green-500"
              >
                <span className="mr-2 text-xl ">
                  <MdLocalPrintshop />
                </span>
                พิมพ์
              </Button>
            </div>
            <div className=" justify-center">
              <Button
                size="sm"
                variant="gradient"
                color="red"
                className="text-base flex justify-center  items-center   bg-green-500"
                onClick={() => setOpenInvoie(false)}
              >
                <span className="mr-2 text-xl ">
                  <TbLogout2 />
                </span>
                ออก
              </Button>
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row  w-full justify-start    gap-2 ">
            <Typography className=" font-bold min-w-[100px]">
              ข้อมูลลูกค้า:
            </Typography>
            <Select
              className="basic-single w-full z-20"
              classNamePrefix="select"
              placeholder="เลือกลูกค้า"
              isClearable={isClearable}
              isSearchable={isSearchable}
              name="color"
              options={customerOptions}
              onChange={(e) => handleCustomerSelect(e)}
            />
          </div>
          <div className=" flex   w-full justify-start items-center   gap-2 ">
            <Typography className="font-bold min-w-[30px] sm:w-[40px]">
              ชื่อ :
            </Typography>
            <Typography className="w-8/12">
              {selectedCustomer?.customer_name}
            </Typography>
          </div>
          <div className=" flex   w-full justify-start    gap-2 ">
            <Typography className="font-bold min-w-[40px] sm:w-[45px] md:w-[55px] xl:w-[45px]">
              ที่อยู่ :
            </Typography>
            <Typography>{selectedCustomer?.customer_address}</Typography>
          </div>
          <div className=" flex flex-col sm:flex-row md:flex-col 2xl:flex-row w-full justify-start gap-2 ">
            <div className="flex w-full">
              <Typography className="font-bold min-w-[100px] md:w-[120px] xl:w-[110px]">
                เลขประจำตัว :
              </Typography>
              <Typography>{selectedCustomer?.customer_id_tax}</Typography>
            </div>
            <div className="flex w-full">
              <Typography className="font-bold min-w-[110px] md:w-[140px] xl:w-[120px]">
                เบอร์โทรศัพท์ :
              </Typography>
              <Typography>{selectedCustomer?.customer_tel}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col xl:flex-row gap-5 ">
        <div className="flex w-full flex-col gap-3">
          <div className="flex  w-full md:w-8/8">
            <Card className="flex w-full h-[380px] overflow-y-auto ">
              <table className="w-full   ">
                <thead>
                  <tr>
                    {columns.map((head, index) => (
                      <th
                        key={index}
                        className=" text-left py-4  bg-gray-300 px-2 sticky top-0 z-10"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((data, index) => (
                    <tr key={index}>
                      <td className="w-[7%]  px-2 mt-3  ps-5 pt-3 ">
                        {index + 1}
                      </td>
                      <td className="w-[35%]   ">
                        <div className="mt-3">
                          <Select
                            isSearchable
                            value={selectValues[index]}
                            onChange={(value) => handleChange(value, index)}
                            options={productOptions}
                          />
                        </div>
                      </td>
                      <td className="w-[7%] px-2   ">
                        <div>
                          <input
                            type="number"
                            min="0"
                            value={data?.quantity}
                            className="border border-gray-400 w-full py-1 mt-3 text-right "
                            onChange={(e) =>
                              handleQuantityChange(e.target.value, index)
                            }
                          />
                        </div>
                      </td>
                      <td className="px-2 mt-3 pt-3 ">{data?.unit}</td>
                      <td className="px-2 mt-3 pt-3  ">
                        {" "}
                        {isNaN(data?.pricePerUnit)
                          ? "N/A"
                          : Number(data?.pricePerUnit)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                      <td className="px-2 mt-3 pt-3 ">
                        {isNaN(data?.totalPrice)
                          ? "N/A"
                          : Number(data?.totalPrice)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                      <td className="px-2 mt-3 pt-3">
                        <button
                          className="text-3xl text-red-500"
                          // onClick={() => deleteRow(row.id)}
                          onClick={() => handleDeleteRow(index)}
                        >
                          <MdRemoveCircle />
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan={2}>
                      <div>
                        <Button
                          size="sm"
                          variant="gradient"
                          color="green"
                          className="text-base flex justify-center  items-center mt-5 ms-16  bg-green-500"
                          // onClick={addRow}
                          onClick={handleAddRow}
                        >
                          <span className="mr-2 text-xl ">
                            <BsPlusCircle />
                          </span>
                          เพิ่มแถว
                        </Button>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
          <div>
            <Input
              className="flex w-full px-2 "
              maxLength="10"
              label="หมายเหตุ"
              type="text"
            />
          </div>
        </div>
        <div className="flex  w-full xl:w-1/3 ">
          <Card className="w-full justify-center border p-2 px-4   xl:h-[170px] 2xl:h-[120px] lg:justify-normal border-gray-500">
            <Typography className="font-bold">
              รวมเงิน:{" "}
              <span className="font-normal">
                {calculateSubtotal()
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>{" "}
              บาท{" "}
            </Typography>
       
            <Typography className="font-bold">
              ภาษีมูลค่าเพิ่ม:{" "}
              <span className="font-normal">
                {calculateVAT()
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>{" "}
              บาท{" "}
            </Typography>
            <Typography className="font-bold">
              จำนวนเงินทั้งสิน:{" "}
              <span className="font-normal">
                {calculateTotalAmount()
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>{" "}
              บาท{" "}
            </Typography>
          </Card>
        </div>
      </div>
      <ToastContainer className="mt-10" autoClose={1000} theme="colored" />
    </div>
  );
};

export default CreateInvoice;
