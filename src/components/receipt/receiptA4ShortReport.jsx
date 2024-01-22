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
  
  import FontSarabun from "./font/Sarabun-Regular.ttf";
  import FontSarabunBold from "./font/Sarabun-ExtraBold.ttf";
  import FontSarabunLight from "./font/Sarabun-ExtraBold.ttf";
  import Prompt from "./font/Prompt-Regular.ttf";
  import Mitr from "./font/Mitr-Regular.ttf";
  
  import moment from "moment";
  
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
    text8: {
      fontSize: 8,
    },
    text10: {
      fontSize: 10,
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
    mt20: {
      marginTop: 20,
      wordBreak: "break-word",
    },
    mt30: {
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
      // borderTop: "0",
      // borderLeft: "0",
      // borderRight: "0",
      // borderBottom: "0",
      borderColor: "#000",
      // marginBottom: 10,
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
    tableCell1Head: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "center",
      width: "18%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCell1: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "center",
      width: "9%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCell2: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "center",
      width: "40%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "auto",
    },
    tableCell3: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "center",
      width: "12%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCell4: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "center",
      width: "12%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    borderCell4: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "center",
      width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
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
      width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
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
    tableCellNote1: {
      margin: "auto",
      fontSize: 10,
      textAlign: "center",
      alignItems: "flex-end",
      padding: 5,
      borderWidth: 1,
      borderTopWidth: 1,
      borderTop: "0",
      borderLeft: "1",
      borderRight: "1",
      borderBottom: "1",
      borderColor: "#000",
      width: "76%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCellNote2: {
      margin: "auto",
      fontSize: 10,
      textAlign: "right",
      alignItems: "flex-end",
      padding: 5,
      borderWidth: 1,
      borderTopWidth: 1,
      borderTop: "0",
      borderLeft: "1",
      borderRight: "1",
      borderBottom: "1",
      borderColor: "#000",
      width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCellNoteBorder: {
      margin: "auto",
      fontSize: 10,
      padding: 0,
      borderWidth: 1,
      borderTopWidth: 1,
      borderTop: "0",
      borderColor: "#000",
      width: "70%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
  });
  
  export const ReceiptA4ShortReport = ({
    openModalReceiptA4,
    handleModalReceiptA4,
    dataReceipt,
    companyLoginDataStore
  }) => {
    // console.log(companyLoginDataStore)
    console.log(dataReceipt)
    console.log(dataReceipt.sec_product_data[1])
  
  
    const itemsPerPage = 20; // จำนวนรายการต่อหน้า
  
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
  
      // แปลงเวลา //
      const formattedDateTime = moment(dataReceipt?.created_at).format("DD/MM/YYYY ");
  
  
    return (
      <Dialog open={openModalReceiptA4} handler={handleModalReceiptA4} size="xl" >
        <DialogBody >
          {/* <Page size={[842, 595]} style={styles.page}> */}
          {/*  9 x 11 นิ้ว (792 คือ 9 นิ้ว x 72 คือ DPI, 936 คือ 11 นิ้ว x 72 คือ DPI) */}
          <PDFViewer width="100%" height="650px">
            <Document>
              {pages.map((pageData, index) => (
                <Page key={index} size="A4" style={styles.page}>
                  <View style={[styles.flexrowbetween , styles.text12]}>
                    <Text style={[{color:"#fff"}]}>.</Text>
                    <Text>เลขที่: {dataReceipt?.code || ''}  {''}  </Text>
                  </View>
                  <View style={[styles.flexrowcenter, styles.mt20]}>
                    <Text style={[styles.flexrowcenter, styles.text18]}>
                      ใบสำคัญรับเงิน '
                    </Text>
                  </View>
                  <View >
                  <Text style={[styles.flexrowcenter, styles.text14, styles.mt10]}>
                    วันที่: {formattedDateTime}  {''}
                    </Text>
                    <Text style={[styles.flexrowcenter, styles.text14, styles.mt10]}>
                      {companyLoginDataStore?.company || ''}  {''}
                    </Text>
                    <Text
                      style={[styles.flexrowcenter, styles.text12, styles.mt10]}
                    >
                      {companyLoginDataStore?.address || ''}  {''}
                    </Text>
                    <Text
                      style={[styles.flexrowcenter, styles.text12, styles.mt10]}
                    >
                      เลขประจำตัวผู้เสียภาษี {companyLoginDataStore?.tax_personal || ''}  {''}  โทรศัพท์ {companyLoginDataStore?.tel || ''}  {''} 
                    </Text>
                  </View>
                  <View style={[styles.mt10]}>
               
        
                    <Text
                      style={[styles.flexrowcenter, styles.text12]}
                    >
                      จุดขาย: {dataReceipt?.salepoints_name || ''}  {''}
                    </Text>
                  </View>
                  <View>
                    {/*-----------  หัวตาราง ---------------------  */}
                    <View style={[styles.table, { marginTop: "10" }]}>
                      <View style={styles.tableRow}>
                        <Text style={[styles.tableCell1Head, styles.colorHead]}>
                          จำนวนสินค้า{" "}
                        </Text>
                        <Text style={[styles.tableCell1Head, styles.colorHead]}>
                          บิลย่อย{" "}
                        </Text>
                        <Text style={[styles.tableCell2, styles.colorHead]}>
                          รายการ{" "}
                        </Text>
                        <Text style={[styles.tableCell3, styles.colorHead]}>
                          ราคา/หน่วย{" "}
                        </Text>
                        <Text style={[styles.tableCell4, styles.colorHead]}>
                          จำนวนเงิน{" "}
                        </Text>
                      </View>
                      {pageData.map((item, itemIndex) =>  {
                        // console.log(item)
                        return (
                          <View key={itemIndex} style={styles.tableRow}>
                            <Text style={styles.tableCell1}>
                              {Number(item?.quantity).toLocaleString() || ""}{" "}
                            </Text>
                            <Text style={styles.tableCell1}>
                              {item?.unit || ""}{" "}
                            </Text>
                            <Text style={styles.tableCell1}>
                              {Number(dataReceipt?.sec_product_data[itemIndex + 1]?.length) || "-"}{" "}
                            </Text>
                            <Text style={styles.tableCell1}>
                              ใบ{" "}
                            </Text>
                            <Text
                              style={[styles.tableCell2, { textAlign: "left" }]}
                            >
                             {`${item?.product || ""} ${dataReceipt?.sec_product_data?.[1] == undefined ? "" : " เลขที่:"} ${dataReceipt?.sec_product_data[itemIndex + 1]?.map((item)=> ` ${item?.invoice_number}  `) || '' } `}
                            </Text>
                            <Text style={styles.tableCell3}>
                              {Number(item?.pricePerUnit).toLocaleString() || ""}  {''}
                            </Text>
                            <Text style={styles.tableCell4}>
                              {Number(item?.totalPrice).toLocaleString() || ""}  {''}
                            </Text>
                          </View>
                        );
                      })}
                      </View>
                      {index == pages.length - 1 && (
                        <>
                          <View style={styles.tableRow}>
                            {/* สรุปรวม */}
                            <Text style={[styles.tableCellNote1, styles.text12]}>
                            {THBText(dataReceipt?.total_amount) || ''}  {''}
                            </Text>
                            {/* <Text style={[styles.tableCellNote2, styles.text12]}> */}
                            <Text style={styles.tableCell3}>
                              รวมเงิน
                            </Text>
                            <Text style={styles.tableCell4}>
                            {Number(dataReceipt?.total_amount).toLocaleString() || ""}  {''}
                            </Text>
                          </View>
                          <View style={[styles.flexrow]}>
                            <Text style={[styles.text12 , styles.mt10]} >หมายเหตุ: </Text>
                            <Text style={[styles.text12 , styles.mt10 ]} >{dataReceipt?.note || ''}  {''} </Text>
                          </View>
                        </>
                      )}
                    
                    {/*   ลงชื่อผู้รับ/ผู้จ่าย  */}
                    {index == pages.length - 1 && (
                      <>
                        <View style={[styles.flexrow, styles.mtsm20]}>
                          <View
                            style={[
                              styles.flexrowstart,
                              { width: "60%" },
                              { marginLeft: "30px" },
                            ]}
                          >
                            <Text
                              style={[
                                { fontWeight: "extrabold" },
                                { fontFamily: "SarabunBold" },
                                { fontSize: "11" },
                                styles.mt20,
                                styles.spacesm,
                              ]}
                            >
                              ผู้รับเงิน:{" "}
                            </Text>
                            <Text
                              style={[
                                styles.mtsm,
                                { fontWeight: "light" },
                                { fontFamily: "Sarabun" },
                                { fontSize: "11" },
                                { display: "flex" },
                                { width: "80%" },
                                styles.mt20,
                              ]}
                            >
                              (..................................................)
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                  </View>
                  {/* <View fixed style={[styles.footer]}>
                    {" "}
                    <Text
                      style={[styles.footer, styles.text12]}
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
  
  ReceiptA4ShortReport.propTypes = {
    openModalReceiptA4Report: PropTypes.bool.isRequired,
    handleModalReceiptA4Report: PropTypes.func.isRequired,
  };
  
  export default ReceiptA4ShortReport;
  