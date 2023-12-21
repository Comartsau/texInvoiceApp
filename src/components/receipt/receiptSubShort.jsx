/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import "../../App.css";

import { PDFViewer } from "@react-pdf/renderer";
import THBText from "thai-baht-text";

import moment from "moment";

import FontSarabun from "./font/Sarabun-Regular.ttf";
import FontSarabunBold from "./font/Sarabun-ExtraBold.ttf";
import FontSarabunLight from "./font/Sarabun-ExtraBold.ttf";
import Prompt from "./font/Prompt-Regular.ttf";
import Mitr from "./font/Mitr-Regular.ttf";

import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

import PropTypes from "prop-types";

Font.register({
  family: "Sarabun",
  src: FontSarabun,
});
Font.register({
  family: "SarabunBold",
  src: FontSarabunBold,
});
Font.register({
  family: "SarabunLight",
  src: FontSarabunLight,
});
Font.register({
  family: "Prompt",
  src: Prompt,
});
Font.register({
  family: "Mitr",
  src: Mitr,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    // backgroundColor: "ffff",
    padding: 20,
    margin: 1,
    fontFamily: "SarabunLight",
  },
  header1: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 10,
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    height: "20px",
  },
  signature: {
    fontSize: 12,
    textAlign: "left",
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
  },
  flexrowbetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    wordBreak: "break-word",
  },
  flexrowaround: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    wordBreak: "break-word",
  },
  flexrowcenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  flexrowend: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  flexrowstart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  text6: {
    fontSize: 12,
  },
  text8: {
    fontSize: 12,
  },
  text12: {
    fontSize: 12,
  },
  text14: {
    fontSize: 14,
  },
  text16: {
    fontSize: 16,
  },
  text16b: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text18: {
    fontSize: 18,
  },
  textxl: {
    fontSize: 24,
    fontFamily: "SarabunBold",
    fontWeight: "bold",
  },
  spacesm: {
    marginRight: 5,
  },
  spacemd: {
    marginRight: 20,
  },
  fontbase: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "SarabunLight",
  },
  fontbold: {
    fontSize: 18,
    fontWeight: "bold",
  },

  borderb: {
    borderBottom: 2,
    paddingBottom: 10,
  },

  imageContainer: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    wordBreak: "break-word",
  },
  image: {
    width: 70,
    height: 70,
  },
  image1: {
    width: 90,
    height: 90,
  },
  mt5: {
    marginTop: 5,
    wordBreak: "break-word",
  },
  mt10: {
    marginTop: 10,
    wordBreak: "break-word",
  },
  mtsm20: {
    marginTop: 20,
    wordBreak: "break-word",
  },
  mtmd: {
    marginTop: 30,
  },
  underlineText: {
    textDecoration: "underline",
    textDecorationStyle: "dot",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  colorHead: {
    backgroundColor: "#D9D9D9",
  },
  tableRow: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tableCellHead1: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "20%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellHead2: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "50%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellHead3: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellHead4: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "20%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell1: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell2: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "auto",
  },
  tableCell3: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "50%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell4: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell5: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell6: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "5%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellRowsum: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "70%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellNote: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    textAlign: "center",
    borderWidth: 1,
    borderTopWidth: 1,
    borderTop: "1",
    borderLeft: "1",
    borderRight: "1",
    borderBottom: "0",
    borderColor: "#000",
    width: "70%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellNoteBorder: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderTopWidth: 1,
    borderTop: "0",
    borderColor: "#000",
    width: "70%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
});

export const ReceiptSubShort = ({
  openModalReceiptSubShort,
  handleModalReceiptSubShort,
  dataReceipt,
  salePoint,
  sendIndex,
}) => {
  console.log(dataReceipt.product_data.length);
  console.log(sendIndex);

  const itemsPerPage = dataReceipt.product_data.length - 1; // จำนวนรายการต่อหน้า

  // แบ่งรายการออกเป็นหน้าตามจำนวนที่กำหนด

  const generatePages = (data) => {
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
      const start = i * itemsPerPage;
      const end = start + itemsPerPage;
      const slicedData = data.slice(start, end).map((item, index) => ({
        ...item,
        index: start + index + 1, // เพิ่ม property index เพื่อเก็บลำดับ
      }));
      pages.push(slicedData);
    }

    return pages;
  };

  const pages = generatePages(dataReceipt?.product_data);

  console.log(pages);

  //  แปลงเวลา
  const formattedDateTime = moment(dataReceipt?.created_at).format(
    "DD/MM/YYYY  HH:mm:ss"
  );

  return (
    <Dialog
      open={openModalReceiptSubShort}
      handler={handleModalReceiptSubShort}
      size="xl"
    >
      <DialogBody>
        <PDFViewer width="100%" height="650px">
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={[styles.flexrowbetween, styles.text6]}>
                <Text style={[{ color: "#fff" }]}>
                  ...........................
                </Text>
                <Text>ใบสำคัญรับเงิน {""}</Text>
                {sendIndex == 0 ? (
                  <Text>เลขที่: C66/0001/1 </Text>
                ) : (
                  <Text>เลขที่: C66/0001/3 </Text>
                )}
              </View>
              <View>
                <Text
                  style={[styles.flexrowcenter, styles.text14, styles.mt10]}
                >
                  บริษัท เขาสวนกวางเดินรถ จำกัด (สำนักงานใหญ่) {""}
                </Text>
                <Text
                  style={[styles.flexrowcenter, styles.text12, styles.mt10]}
                >
                  237/4 หมู่ 11 ตำบลคำม่วง อำเภอเขาสวนกลาง จังหวัดขอนแก่น {""}
                </Text>
                <Text
                  style={[styles.flexrowcenter, styles.text12, styles.mt10]}
                >
                  เลขประจำตัวผู้เสียภาษี 0405533000301 โทรศัพท์ 099-0373274 {""}
                </Text>
              </View>
              <View>
                <Text style={[styles.flexrowend, styles.text6, styles.mtsm20]}>
                  วันที่ {formattedDateTime} {""}
                </Text>
              </View>
              <View>
                <Text style={[styles.flexrowcenter, styles.text6]}>
                  จุดขาย {salePoint} {""}
                </Text>
              </View>
              <View>
                <View style={[styles.table, { marginTop: "10" }]}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCellHead1, styles.colorHead]}>
                      จำนวน {""}
                    </Text>
                    <Text style={[styles.tableCellHead2, styles.colorHead]}>
                      รายการ {""}
                    </Text>
                    <Text style={[styles.tableCellHead3, styles.colorHead]}>
                      ราคา {""}
                    </Text>
                    <Text style={[styles.tableCellHead4, styles.colorHead]}>
                      จำนวนเงิน {""}
                    </Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}>1</Text>
                    {sendIndex == 0 ? (
                      <Text
                        style={[styles.tableCell2, { textAlign: "center" }]}
                      >
                        {" "}
                        ชิ้น
                      </Text>
                    ) : (
                      <Text
                        style={[styles.tableCell2, { textAlign: "center" }]}
                      >
                        {" "}
                        เครื่อง
                      </Text>
                    )}
                    {sendIndex == 0 ? (
                      <Text style={[styles.tableCell3, { textAlign: "left" }]}>
                        {" "}
                        แก้วน้ำ ร้อน-เย็น
                      </Text>
                    ) : (
                      <Text style={[styles.tableCell3, { textAlign: "left" }]}>
                        {" "}
                        printer
                      </Text>
                    )}
                    {sendIndex == 0 ? (
                      <>
                        <Text style={styles.tableCell4}> 14,600 </Text>
                        <Text style={styles.tableCell5}> 14,600 </Text>
                        <Text style={styles.tableCell6}> -</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.tableCell4}> 2400 </Text>
                        <Text style={styles.tableCell5}> 2400 </Text>
                        <Text style={styles.tableCell6}> -</Text>
                      </>
                    )}
                  </View>

                  <View style={styles.tableRow}>
                    {/* สรุปรวม */}
                    {sendIndex == 0 ? (
                      <Text
                        style={[styles.tableCellNote, { paddingTop: "10" }]}
                      >
                        {THBText(14600) || ""}
                      </Text>
                    ) : (
                      <Text
                        style={[styles.tableCellNote, { paddingTop: "10" }]}
                      >
                        {THBText(2400) || ""}
                      </Text>
                    )}
                    <Text style={[styles.tableCell4, { paddingTop: "10" }]}>
                      {" "}
                      รวมเงิน{" "}
                    </Text>
                    {sendIndex == 0 ? (
                      <Text
                        style={[
                          styles.tableCell5,
                          { paddingTop: "10" },
                          { alignContent: "center" },
                        ]}
                      >
                        14,600
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.tableCell5,
                          { paddingTop: "10" },
                          { alignContent: "center" },
                        ]}
                      >
                        2400
                      </Text>
                    )}
                    <Text style={styles.tableCell6}>-</Text>
                  </View>
                </View>
                {/*   ลงชื่อผู้รับ/ผู้จ่าย  */}

                <View style={[styles.flexrowcenter, styles.mtsm20]}>
                  <View>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ผู้รับเงิน: ..............................................
                    </Text>
                  </View>
                </View>
              </View>
            </Page>
            <Page size="A4" style={styles.page}>
              <View style={[styles.flexrowbetween, styles.text6]}>
                <Text style={[{ color: "#fff" }]}>
                  ...........................
                </Text>
                <Text>ใบสำคัญรับเงิน {""}</Text>
                {sendIndex == 0 ? (
                  <Text>เลขที่: C66/0001/2 </Text>
                ) : (
                  <Text>เลขที่: C66/0001/4 </Text>
                )}
              </View>
              <View>
                <Text
                  style={[styles.flexrowcenter, styles.text14, styles.mt10]}
                >
                  บริษัท เขาสวนกวางเดินรถ จำกัด (สำนักงานใหญ่) {""}
                </Text>
                <Text
                  style={[styles.flexrowcenter, styles.text12, styles.mt10]}
                >
                  237/4 หมู่ 11 ตำบลคำม่วง อำเภอเขาสวนกลาง จังหวัดขอนแก่น {""}
                </Text>
                <Text
                  style={[styles.flexrowcenter, styles.text12, styles.mt10]}
                >
                  เลขประจำตัวผู้เสียภาษี 0405533000301 โทรศัพท์ 099-0373274 {""}
                </Text>
              </View>
              <View>
                <Text style={[styles.flexrowend, styles.text6, styles.mtsm20]}>
                  วันที่ {formattedDateTime} {""}
                </Text>
              </View>
              <View>
                <Text style={[styles.flexrowcenter, styles.text6]}>
                  จุดขาย {salePoint} {""}
                </Text>
              </View>
              <View>
                <View style={[styles.table, { marginTop: "10" }]}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCellHead1, styles.colorHead]}>
                      จำนวน {""}
                    </Text>
                    <Text style={[styles.tableCellHead2, styles.colorHead]}>
                      รายการ {""}
                    </Text>
                    <Text style={[styles.tableCellHead3, styles.colorHead]}>
                      ราคา {""}
                    </Text>
                    <Text style={[styles.tableCellHead4, styles.colorHead]}>
                      จำนวนเงิน {""}
                    </Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}>1</Text>
                    {sendIndex == 0 ? (
                      <Text
                        style={[styles.tableCell2, { textAlign: "center" }]}
                      >
                        {" "}
                        ชิ้น
                      </Text>
                    ) : (
                      <Text
                        style={[styles.tableCell2, { textAlign: "center" }]}
                      >
                        {" "}
                        เครื่อง
                      </Text>
                    )}
                    {sendIndex == 0 ? (
                      <Text style={[styles.tableCell3, { textAlign: "left" }]}>
                        {" "}
                        แก้วน้ำ ร้อน-เย็น
                      </Text>
                    ) : (
                      <Text style={[styles.tableCell3, { textAlign: "left" }]}>
                        {" "}
                        printer
                      </Text>
                    )}
                    {sendIndex == 0 ? (
                      <>
                        <Text style={styles.tableCell4}> 14,600 </Text>
                        <Text style={styles.tableCell5}> 14,600 </Text>
                        <Text style={styles.tableCell6}> -</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.tableCell4}> 2400 </Text>
                        <Text style={styles.tableCell5}> 2400 </Text>
                        <Text style={styles.tableCell6}> -</Text>
                      </>
                    )}
                  </View>

                  <View style={styles.tableRow}>
                    {/* สรุปรวม */}
                    {sendIndex == 0 ? (
                      <Text
                        style={[styles.tableCellNote, { paddingTop: "10" }]}
                      >
                        {THBText(14600) || ""}
                      </Text>
                    ) : (
                      <Text
                        style={[styles.tableCellNote, { paddingTop: "10" }]}
                      >
                        {THBText(2400) || ""}
                      </Text>
                    )}
                    <Text style={[styles.tableCell4, { paddingTop: "10" }]}>
                      {" "}
                      รวมเงิน{" "}
                    </Text>
                    {sendIndex == 0 ? (
                      <Text
                        style={[
                          styles.tableCell5,
                          { paddingTop: "10" },
                          { alignContent: "center" },
                        ]}
                      >
                        14,600
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.tableCell5,
                          { paddingTop: "10" },
                          { alignContent: "center" },
                        ]}
                      >
                        2400
                      </Text>
                    )}
                    <Text style={styles.tableCell6}>-</Text>
                  </View>
                </View>
                {/*   ลงชื่อผู้รับ/ผู้จ่าย  */}

                <View style={[styles.flexrowcenter, styles.mtsm20]}>
                  <View>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ผู้รับเงิน: ..............................................
                    </Text>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          size="sm"
          onClick={() => handleModalReceiptSubShort()}
          className="mr-1"
        >
          <span className="text-sm">ยกเลิก</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

ReceiptSubShort.propTypes = {
  openModalReceiptSubFull: PropTypes.bool.isRequired,
  handleModalReceiptSubFull: PropTypes.func.isRequired,
};

export default ReceiptSubShort;
