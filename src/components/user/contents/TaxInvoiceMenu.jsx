import { Card, Typography, Button } from "@material-tailwind/react";

import { useState } from "react";

import TaxInvoiceFull from "./TaxInvoiceFull";
import TaxInvoiceSm from "./TaxInvoiceSm";

function TaxInvoice() {
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
                className={`w-[200px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                  activeCustomerMenu === "menu1" ? "bg-blue-300 text-white" : ""
                }`}
                onClick={() => setActiveCustomerMenu("menu1")}
              >
                เต็มรูปแบบ
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 sm:flex-row lg:gap-20">
            <div className="flex justify-center">
              <Button
                variant="outlined"
                size="lg"
                className={`w-[200px]  py-3  px-4 shadow-lg border border-gray-400  ${
                  activeCustomerMenu === "menu2" ? "bg-blue-300 text-white" : ""
                }`}
                onClick={() => setActiveCustomerMenu("menu2")}
              >
                ออกใบกำกับภาษี
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                variant="outlined"
                className={`w-[200px]  py-3  px-4  shadow-lg border border-gray-400 ${
                  activeCustomerMenu === "menu3" ? "bg-blue-300 text-white" : ""
                }`}
                onClick={() => setActiveCustomerMenu("menu3")}
              >
                ออกใบกำกับภาษี แบบย่อ
              </Button>
            </div>
          </div>
        </div>
      </div>
      {activeCustomerMenu === "menu1" && (
        <div>
          <hr className=" mt-5 border border-gray-500" />
            <TaxInvoiceFull />
        </div>
      )}
      {activeCustomerMenu === "menu2" && (
        <div>
          <hr className=" mt-5 border border-gray-500" />
            <TaxInvoiceSm />
        </div>
      )}
      {activeCustomerMenu === "menu3" && (
        <div>
          <hr className=" mt-5 border border-gray-500" />
          <Card className="h-full w-full  p-3">
            <Typography>Menu3</Typography>
          </Card>
        </div>
      )}
    </Card>
  );
}

export default TaxInvoice;