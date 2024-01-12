import {

  Typography,
  Button,
  IconButton,
  CardFooter,

} from "@material-tailwind/react";

import moment  from "moment";

import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import { AiOutlineSearch } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";

import { useEffect, useState } from "react";
import ReportPDF from "./ReportPDF";

import { useRecoilState } from "recoil";
import { companyStore } from "../../../../store/Store";

import {getReportSale , getReportSaleAdmin} from '../../../../api/ReportApi'


// eslint-disable-next-line react/prop-types
const SaleReport = ({userLogin}) => {
  const [listData, setListData] = useState([])
  const [userId, setUserId] = useState('')
  const [searchQueryStart, setSearchQueryStart] = useState(new Date());
  const [searchQueryEnd, setSearchQueryEnd] = useState(new Date());

  const dateStart = moment(searchQueryStart).format("YYYY-MM-DD");
  const dateEnd = moment(searchQueryEnd).format("YYYY-MM-DD");

  const fetchReport = async () => {
    if (userLogin == 'admin') {
      const response = await getReportSaleAdmin(userId , dateStart , dateEnd)
      // console.log(response)
      setListData(response)
    } else {
      const response = await getReportSale(dateStart , dateEnd)
      // console.log(response)
      setListData(response)
    }

    // console.log(userId)
  

  }

  useEffect(()=>{
    fetchReport()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])




  const [isSearchable, setIsSearchable] = useState(true);

  const [companyDataStore, setCompanyDataStore] = useRecoilState(companyStore);

  const companyOptions = companyDataStore?.map((company) => ({
    value: company.id,
    label: company.username,
  }));

  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanySelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const company = companyDataStore.find((company) => company.id === e.value);
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedCompany(company);
    setUserId(company.id)
  };


    //----- จัดการแสดงข้อมูล / หน้า -------------- //
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = Array.isArray(listData) ? listData?.slice(startIndex, endIndex) : [];
  
    const totalPages = Math.ceil(listData?.length / itemsPerPage);


  //------------- open Receipt A4  -----------------------//
  const [openModalReceiptA4, setOpenModalReceiptA4] = useState(false);
  const handleModalReceiptA4 = () => {
    setOpenModalReceiptA4(!openModalReceiptA4);
  };



  return (
    <div className="mt-5">
      <div className="flex flex-col sm:flex-row gap-5 ">
      <div className="flex   justify-center ">
          {userLogin == 'admin' ?
          <Select
            className="basic-single  w-[240px]   z-20"
            classNamePrefix="select"
            placeholder="เลือกบริษัท"
            // isClearable={isClearable}
            isSearchable={isSearchable}
            name="color"
            options={companyOptions}
            onChange={(e) => handleCompanySelect(e)}
          />
          :
          ''
          }
        </div>
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
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="gradient"
            color="green"
            className="text-base flex justify-center  items-center   bg-green-500"
            onClick={fetchReport}
          >
            <span className="mr-2 text-xl ">
              <AiOutlineSearch />
            </span>
            ค้นหา
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="gradient"
            color="purple"
            className="text-base flex justify-center  items-center   bg-green-500"
            onClick={() => setOpenModalReceiptA4(true)}
          >
            <span className="mr-2 text-xl ">
              <TbReportSearch />
            </span>
            PDF
          </Button>
        </div>
      </div>
      <div className="mt-5 h-[450px] overflow-auto ">
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
                  วันที่
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  ใบกำกับ
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  ชื่อผู้ขาย
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                เลขประจำตัวผู้เสียภาษี
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  มูลค่าสินค้า
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  ภาษีมูลค่าเพิ่ม
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  จำนวนเงินรวม
                </Typography>
              </th>
            </tr>
          </thead>
          {listData?.length == 0 ? (
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td> 
                  <Typography className="mt-5">...ไม่พบข้อมูล  กรุณาเลือกวันที่ต้องการดูรายงาน...</Typography>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
            {displayedData?.map((data, index) => {
              const isLast = index === displayedData?.length - 1;
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
                        {moment(data?.created_at).format('DD/MM/YYYY') || ""}
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
                        {data?.code || ""}
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
                        {data?.tax_personal || ""}
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
                        {Number(data?.total_price).toLocaleString() || ""}
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
                        {Number(data?.total_tax).toLocaleString() || ""}
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
                        {Number(data?.total_amount).toLocaleString() || ""}
                      </Typography>
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
      {/* open PDF A4 */}
      <ReportPDF
        openModalReceiptA4={openModalReceiptA4}
        handleModalReceiptA4={handleModalReceiptA4}
        dataReceipt={listData}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />
    </div>
  );
};

export default SaleReport;
