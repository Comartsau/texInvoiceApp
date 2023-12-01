import { Card, Typography, Button } from "@material-tailwind/react";

import { useState } from "react";
import SaleReport from "./report/SaleReport";



function ReportMenu() {
  //---------- Dialog  ดูข้อมูลผู้บริจาค -------------- //
  const [activeCustomerMenu, setActiveCustomerMenu] = useState("menu1");

  return (
    <Card className="w-full overflow-auto  px-3">
      <div className=" item-center mt-5 flex w-full flex-col gap-2 md:justify-around lg:flex-row">
        <div className="flex  flex-col gap-5  lg:gap-10 xl:flex-row xl:gap-20 ">
          <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
            <div className="flex justify-center">
              <Button
                size="lg"
                variant="outlined"
                className={`w-[250px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                  activeCustomerMenu === "menu1" ? "bg-blue-300 text-white" : ""
                }`}
                onClick={() => setActiveCustomerMenu("menu1")}
              >
                รายงานยอดขายรวมประจำวัน/เดือน
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 sm:flex-row lg:gap-20">
            <div className="flex justify-center">
              <Button
                variant="outlined"
                size="lg"
                className={`w-[270px]  py-3  px-4 shadow-lg border border-gray-400  ${
                  activeCustomerMenu === "menu2" ? "bg-blue-300 text-white" : ""
                }`}
                onClick={() => setActiveCustomerMenu("menu2")}
              >
                รายงานสรุปยอด แต่ละหน่วย (จุดขาย)
              </Button>
            </div>
          </div>
        </div>
      </div>
      {activeCustomerMenu === "menu1" && (
             <div>
             <hr className=" mt-5 border border-gray-500" />
             <SaleReport />
           </div>
      )}
      {activeCustomerMenu === "menu2" && (
        <div>
          <hr className=" mt-5 border border-gray-500" />
          <Typography className="flex justify-center mt-10 text-xl font-bold text-red-500">อยู่ในช่วงพัฒนา เฟส3/3</Typography>
        </div>
      )}

    </Card>
  );
}

export default ReportMenu;
