/* eslint-disable no-unused-vars */
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

import { PDFViewer } from "@react-pdf/renderer";
import THBText from "thai-baht-text";

import moment from "moment";

import FontSarabun from "../../../receipt/font/Sarabun-Regular.ttf";
import FontSarabunBold from "../../../receipt/font/Sarabun-ExtraBold.ttf";
import FontSarabunLight from "../../../receipt/font/Sarabun-ExtraBold.ttf";
import Prompt from "../../../receipt/font/Prompt-Regular.ttf";
import Mitr from "../../../receipt/font/Mitr-Regular.ttf";
// import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

import PropTypes from "prop-types";
import { useState } from "react";

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
    textAlign: "center",
  },
  flexrowstart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
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
  mt5: {
    marginTop: 5,
    wordBreak: "break-word",
  },
  mt10: {
    marginTop: 10,
    wordBreak: "break-word",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
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
  tableHead1: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "5%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableHead2: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "40%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableHead3: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableHead4: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "12%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableHead5: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableHead6: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "8%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "auto",
  },
  tableHead7: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableHead8: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead1: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "5%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead2: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "7%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead3: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "33%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead4: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead5: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "12%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  // tableSubHead6: {
  //   margin: "auto",
  //   fontSize: 9,
  //   padding: 5,
  //   borderWidth: 1,
  //   borderColor: "#000",
  //   textAlign: "center",
  //   width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
  //   height: "100%",
  // },
  tableSubHead7: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead8: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "8%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead9: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSubHead10: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellRowsum: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderTopWidth: 1,
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    borderBottom: "0",
    borderColor: "#000",
    textAlign: "center",
    width: "72%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSum1: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "right",
    width: "8%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSum2: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "right",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableSum3: {
    margin: "auto",
    fontSize: 9,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "right",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
});

export const ReportPDF = ({
  openModalReceiptA4,
  handleModalReceiptA4,
  dataReceipt,
  dateStart,
  dateEnd,
}) => {
  const itemsPerPage = 500; // จำนวนรายการต่อหน้า

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

  const pages = generatePages(dataReceipt);

  // const totalAmount = dataReceipt?.reduce((acc, item) => acc + item?.total_amount, 0);
  // const totalPrice = dataReceipt?.reduce((acc, item) => acc + item?.total_price, 0);
  // const totalTax = dataReceipt?.reduce((acc, item) => acc + item?.total_tax, 0);

  const totalAmount = Array.isArray(dataReceipt)
    ? dataReceipt?.reduce((acc, item) => acc + item?.total_amount, 0)
    : 0;

  const totalPrice = Array.isArray(dataReceipt)
    ? dataReceipt?.reduce((acc, item) => acc + item?.total_price, 0)
    : 0;

  const totalTax = Array.isArray(dataReceipt)
    ? dataReceipt?.reduce((acc, item) => acc + item?.total_tax, 0)
    : 0;

  // console.log(pages)

  return (
    <Dialog open={openModalReceiptA4} handler={handleModalReceiptA4} size="xl" className="h-[90vh]">
      {/* <DialogHeader></DialogHeader> */}
      <DialogBody className="h-[80vh]">
        {/* <Page size={[842, 595]} style={styles.page}> */}
        {/*  9 x 11 นิ้ว (792 คือ 9 นิ้ว x 72 คือ DPI, 936 คือ 11 นิ้ว x 72 คือ DPI) */}
        <PDFViewer width="100%" height="550px">
          <Document>
            {pages.map((pageData, index) => (
              <Page
                key={index}
                size="A4"
                style={styles.page}
                orientation="landscape"
              >
                <View>
                  <Text style={[styles.flexrowcenter, styles.text14]}>
                    รายงานภาษีขาย
                  </Text>
                  <View style={[styles.flexrow, styles.mt10]}>
                    <View style={[styles.flexrowstart, { width: "65%" }]}>
                      <View>
                        <Text
                          style={[
                            { fontWeight: "extrabold" },
                            { fontFamily: "SarabunBold" },
                            { fontSize: "11" },
                            styles.spacesm,
                          ]}
                        >
                          {`ระหว่างวันที่: ${moment(dateStart).format(
                            "DD/MM/YYYY"
                          )}    ถึง   ${moment(dateEnd).format(
                            "DD/MM/YYYY"
                          )} `}{" "}
                          {""}
                          {/* {customer?.customer_id_tax || ""} */}
                        </Text>
                        <Text
                          style={[
                            { fontWeight: "extrabold" },
                            { fontFamily: "SarabunBold" },
                            { fontSize: "11" },
                            styles.spacesm,
                            styles.mt5,
                          ]}
                        >
                          {`${dataReceipt[0]?.company}`} {""}
                          {/* {customer?.customer_id_tax || ""} */}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.flexrowstart, { width: "35%" }]}>
                      <View>
                        <Text
                          style={[
                            { fontWeight: "extrabold" },
                            { fontFamily: "SarabunBold" },
                            { fontSize: "11" },
                            styles.spacesm,
                          ]}
                        >
                          {`เลขประจำตัวผู้เสียภาษี: ${dataReceipt[0]?.tax_personal}`}{" "}
                          {""}
                        </Text>
                        {/* <Text
                            style={[
                              { fontWeight: "extrabold" },
                              { fontFamily: "SarabunBold" },
                              { fontSize: "11" },
                              styles.spacesm,
                              styles.mt5
                            ]}
                          >
                            {`สำนักงานใหญ่ `}
                            {customer?.customer_id_tax || ""}
                          </Text> */}
                      </View>
                    </View>
                  </View>
                </View>
                {/*-----------  หัวตาราง ---------------------  */}
                <View>
                  <View style={[styles.table, { marginTop: "10" }]}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableHead1, styles.colorHead]}>
                        ลำดับที่{" "}
                      </Text>
                      <Text style={[styles.tableHead2, styles.colorHead]}>
                        ใบกำกับภาษี{" "}
                      </Text>
                      <Text style={[styles.tableHead3, styles.colorHead]}>
                        ชื่อผู้ซื้อสินค้า {" "}
                      </Text>
                      <Text style={[styles.tableHead4, styles.colorHead]}>
                        เลขประจำตัวผู้เสีย{" "}
                      </Text>
                      {/* <Text style={[styles.tableHead5, styles.colorHead]}>
                          สถานประกอบการ{" "}
                        </Text> */}
                      <Text style={[styles.tableHead6, styles.colorHead]}>
                        มูลค่าสินค้า{" "}
                      </Text>
                      <Text style={[styles.tableHead7, styles.colorHead]}>
                        จำนวนเงิน{" "}
                      </Text>
                      <Text style={[styles.tableHead8, styles.colorHead]}>
                        จำนวนเงินรวม{" "}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableSubHead1, styles.colorHead]}>
                        {` `}
                      </Text>
                      <Text style={[styles.tableSubHead2, styles.colorHead]}>
                        วันที่{" "}
                      </Text>
                      <Text style={[styles.tableSubHead3, styles.colorHead]}>
                        เลขที่{" "}
                      </Text>
                      <Text style={[styles.tableSubHead4, styles.colorHead]}>
                        ผู้รับบริการ{" "}
                      </Text>
                      <Text style={[styles.tableSubHead5, styles.colorHead]}>
                        ผู้ซื้อสินค้า/ลูกค้า{" "}
                      </Text>
                      {/* <Text style={[styles.tableSubHead6, styles.colorHead]}>
                          สนง.ใหญ่{" "}
                        </Text> */}
                      {/* <Text style={[styles.tableSubHead7, styles.colorHead]}>
                          สาขาที่{" "}
                        </Text> */}
                      <Text style={[styles.tableSubHead8, styles.colorHead]}>
                        หรือบริการ{" "}
                      </Text>
                      <Text style={[styles.tableSubHead9, styles.colorHead]}>
                        ภาษีมูลค่าเพิ่ม{" "}
                      </Text>
                      <Text style={[styles.tableSubHead10, styles.colorHead]}>
                        ภาษีมูลค่าเพิ่ม{" "}
                      </Text>
                    </View>
                    {pageData?.map((item, itemIndex) => {
                      return (
                        <View key={itemIndex} style={styles.tableRow}>
                          <Text
                            style={[styles.tableSubHead1, { fontSize: "8" }]}
                          >
                            {item?.index || ""}{" "}
                          </Text>
                          <Text
                            style={[styles.tableSubHead2, { fontSize: "8" }]}
                          >
                            {moment(item?.created_at).format("DD-MM-YYYY") ||
                              ""}{" "}
                          </Text>
                          <Text
                            style={[
                              styles.tableSubHead3,
                              { textAlign: "left" },
                              { fontSize: "8" },
                            ]}
                          >
                            {item?.num_code || ""}{" "}
                          </Text>
                          <Text
                            style={[
                              styles.tableSubHead4,
                              { textAlign: "left" },
                              { fontSize: "8" },
                            ]}
                          >
                            {item?.code == "ใบกำกับภาษี" ? "ใบกำกับภาษีแบบย่อ" : "   " } {"   "}
                          </Text>
                          <Text
                            style={[styles.tableSubHead5, { fontSize: "8" }]}
                          >
                            {item?.customer_id_tax || ""}{" "}
                          </Text>
                          {/* <Text style={[styles.tableSubHead6 , {fontSize:"8"}]}>
                              {item.headOffice  || ""}{" "}
                            </Text> */}
                          {/* <Text style={[styles.tableSubHead7 , {fontSize:"8"}]}>
                              {item?.company  || ""}{" "}
                            </Text> */}
                          <Text
                            style={[
                              styles.tableSubHead8,
                              { textAlign: "right" },
                              { fontSize: "8" },
                            ]}
                          >
                            {item?.total_price
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""}{" "}
                          </Text>
                          <Text
                            style={[
                              styles.tableSubHead9,
                              { textAlign: "right" },
                              { fontSize: "8" },
                            ]}
                          >
                            {item?.total_tax
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""}{" "}
                          </Text>
                          <Text
                            style={[
                              styles.tableSubHead10,
                              { textAlign: "right" },
                              { fontSize: "8" },
                            ]}
                          >
                            {item?.total_amount
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""}{" "}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  {index == pages.length - 1 && (
                    <>
                      <View View style={styles.tableRow}>
                        {/* สรุปรวม */}
                        <Text style={styles.tableCellRowsum}> {` `} </Text>
                        <Text style={styles.tableSum1}> รวมเงิน </Text>
                        <Text style={styles.tableSum2}> รวมภาษี </Text>
                        <Text style={styles.tableSum3}> รวมสุทธิ์ </Text>
                      </View>
                      <View View style={styles.tableRow}>
                        {/* สรุปรวม */}
                        <Text style={styles.tableCellRowsum}> {` `} </Text>
                        <Text style={styles.tableSum1}>
                          {" "}
                          {totalPrice
                            ?.toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        </Text>
                        <Text style={styles.tableSum2}>
                          {" "}
                          {totalTax
                            ?.toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        </Text>
                        <Text style={styles.tableSum3}>
                          {" "}
                          {totalAmount
                            ?.toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
                {/* <View fixed style={[styles.footer]}>
                    {" "}
                    <Text style={[styles.footer, styles.text12   ]}
                      render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                      }
                    />
                  </View> */}
              </Page>
            ))}
          </Document>
        </PDFViewer>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          size="sm"
          onClick={() => handleModalReceiptA4()}
          className="mr-1"
        >
          <span className="text-sm">ยกเลิก</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

ReportPDF.propTypes = {
  openModalReceiptA4: PropTypes.bool.isRequired,
  handleModalReceiptA4: PropTypes.func.isRequired,
};

export default ReportPDF;
