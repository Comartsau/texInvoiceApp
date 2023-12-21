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
    DialogHeader,
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
      color:'#ccc',
      textAlign: "center",
      marginBottom: 10,
      position:'absolute',
      bottom:'0',
      left:'0',
      right:'0',
      height:'20px'
      
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
    text7: {
      fontSize: 7,
    },
    text8: {
      fontSize: 8,
    },
    text9: {
      fontSize: 9,
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
    mt3: {
      marginTop: 3,
      wordBreak: "break-word",
    },
    mt5: {
      marginTop: 5,
      wordBreak: "break-word",
    },
    mt7: {
      marginTop: 7,
      wordBreak: "break-word",
    },
    mt10: {
      marginTop: 10,
      wordBreak: "break-word",
    },
    mt15: {
      marginTop: 15,
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
      marginBottom: 10,
    },
    colorHead: {
      backgroundColor: "#D9D9D9",
    },
    tableRow: {
      margin: "auto",
      display:'flex',
      flexDirection: "row",
      alignItems:'center',
    },
    tableCell1Head: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderTop:'1',
      borderLeft:'0',
      borderRight:'0',
      borderBottom:'1',
      borderColor: "#000",
      textAlign: "center",
      width: "7%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCell2Head: {
        margin: "auto",
        fontSize: 10,
        padding: 5,
        borderWidth: 1,
        borderTop:'1',
        borderLeft:'0',
        borderRight:'0',
        borderBottom:'1',
        borderColor: "#000",
        textAlign: "center",
        width: "53%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
        height: "auto",
      },
      tableCell3Head: {
        margin: "auto",
        fontSize: 10,
        padding: 5,
        borderWidth: 1,
        borderTop:'1',
        borderLeft:'0',
        borderRight:'0',
        borderBottom:'1',
        borderColor: "#000",
        textAlign: "center",
        width: "20%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
        height: "100%",
      },
      tableCell4Head: {
        margin: "auto",
        fontSize: 10,
        padding: 5,
        borderWidth: 1,
        borderTop:'1',
        borderLeft:'0',
        borderRight:'0',
        borderBottom:'1',
        borderColor: "#000",
        textAlign: "center",
        width: "20%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
        height: "100%",
      },
    tableCell1: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      textAlign: "center",
      width: "7%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCell2: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      textAlign: "center",
      width: "53%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "auto",
    },
    tableCell3: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      textAlign: "center",
      width: "20%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    tableCell4: {
      margin: "auto",
      fontSize: 10,
      padding: 5,
      textAlign: "center",
      width: "20%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
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
      borderWidth: 1,
      borderTopWidth: 1,
      borderTop:'1',
      borderLeft:'1',
      borderRight:'1',
      borderBottom:'0',
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
      borderTop:'0',
      borderColor: "#000",
      width: "70%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
      height: "100%",
    },
    borderTB:{
        paddingTop:'5px',
        paddingBottom:'3px',
        borderWidth: 1,
        borderTop:'1',
        borderLeft:'0',
        borderRight:'0',
        borderBottom:'1',
        borderColor: "#000",
    },
    borderB:{
        paddingTop:'5px',
        paddingBottom:'3px',
        borderWidth: 1,
        borderTop:'0',
        borderLeft:'0',
        borderRight:'0',
        borderBottom:'1',
        borderColor: "#000",
    }
  
  
  });
  
  export const Receipt80 = ({
    openModalReceipt80,
    handleModalReceipt80,
    dataReceipt
  }) => {
    console.log(dataReceipt);

    const itemsPerPage = 100; // จำนวนรายการต่อหน้า
  
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

    const totalQuantity = dataReceipt.product_data?.reduce((total, item) => total + item.quantity, 0);
    console.log(totalQuantity); // ผลลัพธ์จำนวน quantity ทั้งหมด
  
    console.log(pages);

    // แปลงเวลา //
    const formattedDateTime = moment(dataReceipt.created_at).format("DD/MM/YYYY  HH:mm:ss");

  
    return (
      <Dialog open={openModalReceipt80} handler={handleModalReceipt80} size="xl">
        <DialogHeader></DialogHeader>
        <DialogBody>
          {/* <Page size={[842, 595]} style={styles.page}> */}
          {/*  กระดาษ A4 => 8.3 inc x 11.7 inc =>  point = 597 = 842  */}
          {/*  กระดาษ 80 mm => 3.14 inc => point = 295 */}
          <PDFViewer width="100%" height="650px">
            <Document>
              {pages.map((pageData, index) => (
                <Page key={index} size={[295 ]} style={styles.page} > 
                {/*  <Page key={index} size='B7' style={styles.page} >  */}
                  <View>
                    <Text style={[styles.flexrowcenter, styles.text12]}>
                      บริษัท เขาสวนกวางเดินรถ จำกัด (สำนักงานใหญ่) ''
                    </Text>
                    <Text
                      style={[styles.flexrowcenter, styles.text9, styles.mt10]}
                    >
                      237/4 หมู่ 11 ตำบลคำม่วง อำเภอเขาสวนกลาง จังหวัดขอนแก่น ''
                    </Text>
                    <Text
                      style={[
                        styles.flexrowcenter,
                        styles.text9,
                        styles.mt10,
                        styles.borderb,
                      ]}
                    >
                      เลขประจำตัวผู้เสียภาษี 0405533000301 โทรศัพท์ 099-0373274 '
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[styles.flexrowcenter, styles.text10, styles.mt10]}
                    >
                      ใบเสร็จรับเงิน / ใบกำกับภาษีแบบย่อ '
                    </Text>
                    <View style={[styles.flexrow, styles.mt20]}>
                      <View style={[styles.flexrowcenter]}>
                        <View>
                          <Text style={[styles.spacesm,styles.text10]}>
                            เลขที่ใบกำกับภาษี: {dataReceipt.code}
                          </Text>
                          <Text style={[styles.spacesm,styles.text10 , styles.mt5]}>
                          วันที่ขาย: {formattedDateTime}
                          </Text>
                        </View>
                      </View>
                    </View>
  
                    {/*-----------  หัวตาราง ---------------------  */}
                    <View style={[styles.table, { marginTop: "10" }]}>
                      <View style={styles.tableRow}>
                        <Text style={[styles.tableCell1Head]}>
                        {''}
                        </Text>
                        <Text style={[styles.tableCell2Head]}>
                          รายการ{" "}
                        </Text>
                        <Text style={[styles.tableCell3Head]}>
                          หน่วยละ{" "}
                        </Text>
                        <Text style={[styles.tableCell4Head]}>
                          รวมเงิน{" "}
                        </Text>
                      </View>
                      {pageData.map((item, itemIndex) => {
                        console.log(item);
                        return (
                          <View key={itemIndex} style={styles.tableRow}>
                            <Text style={styles.tableCell1}>
                            {item?.quantity || ""}{" "}
                            </Text>
                            <Text
                              style={[styles.tableCell2, { textAlign: "left" }]}
                            >
                              {`${item?.product || ''} `}
                            </Text>
                            <Text style={styles.tableCell3}>
                              {" "}
                              {Number(item?.pricePerUnit).toLocaleString() || ""}{" "}
                            </Text>
                            <Text style={styles.tableCell4}>
                              {" "}
                              {Number(item?.totalPrice).toLocaleString() ||""}
                            </Text>
                          </View>
                        );
                      })}
                    <View style={[styles.flexrowstart , styles.mt15, styles.borderTB]}>
                          <Text style={[styles.spacesm,styles.text10]}>
                            รายการ: {dataReceipt.product_data?.length || ''}   จำนวนชิ้น:  {totalQuantity || ''}
                          </Text>
                      </View>
                      {index == pages.length - 1 && (
                        <>
                            {/* สรุปรวม */}
                          <View View style={[styles.flexrowbetween , styles.mt10]}>
                            <Text style={styles.text10}> รวมเป็นเงิน </Text>
                            <Text style={styles.text10}>
                              {Number(dataReceipt?.total_amount).toLocaleString()}
                            </Text>
                          </View>
                          <View View style={[styles.flexrowbetween , styles.mt5]}>
                            <Text style={styles.text10}> ส่วนลด </Text>
                            <Text style={styles.text10}>
                              0.00 
                            </Text>
                          </View>
                          <View View style={[styles.flexrowbetween , styles.mt5 , styles.borderB]}>
                            <Text style={styles.text12}> รวมทั้งสิ้น </Text>
                            <Text style={styles.text12}>
                            {Number(dataReceipt?.total_amount).toLocaleString()}
                            </Text>
                          </View>
                          <View View style={[styles.flexrowbetween , styles.mt5]}>
                            <Text style={styles.text10}> รวมมูลค่าสินค้า </Text>
                            <Text style={styles.text10}>
                            {Number(dataReceipt?.total_price).toLocaleString()}
                            </Text>
                          </View>
                          <View View style={[styles.flexrowbetween , styles.mt5 , styles.borderB]}>
                            <Text style={styles.text10}> ภาษีมูลค่าเพิ่ม </Text>
                            <Text style={styles.text10}>
                            {Number(dataReceipt?.total_tax).toLocaleString()}
                            </Text>
                          </View>
                 
                          <View View style={[styles.flexrowbetween , styles.mt10]}>
                            <Text style={styles.text10}>
                            {` เงินสด: ${Number(dataReceipt?.total_amount).toLocaleString()}  `} 
                            </Text>
                            <Text style={styles.text10}>
                            {` เงินทอน:  0.00  `} 
                            </Text>
                          </View>
                          <View View style={[styles.flexrowstart , styles.mt10]}>
                            <Text style={styles.text10}>หมายเหตุ:</Text>
                          </View>
                          <View View style={[styles.flexrowstart , styles.mt5]}>
                            <Text style={styles.text10}>{dataReceipt?.note}</Text>
                          </View>
   
                        </>
                      )}
                    </View>
       
                    {/*   ลงชื่อผู้รับ/ผู้จ่าย  */}
                    {/* {index == pages.length - 1 && (
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
                                styles.mtsm,
                                styles.spacesm,
                              ]}
                            >
                              ลงชื่อ:{" "}
                            </Text>
                            <Text
                              style={[
                                styles.mtsm,
                                { fontWeight: "light" },
                                { fontFamily: "Sarabun" },
                                { fontSize: "11" },
                                { display: "flex" },
                                { width: "80%" },
                              ]}
                            >
                              (..................................................)
                            </Text>
                          </View>
  
                          <View style={[styles.flexrow, { width: "40%" }]}>
                            <View style={styles.flexrowstart}>
                              <Text
                                style={[
                                  { fontWeight: "extrabold" },
                                  { fontFamily: "SarabunBold" },
                                  { fontSize: "11" },
                                  styles.mtsm,
                                  styles.spacesm,
                                ]}
                              >
                                ลงชื่อ:{" "}
                              </Text>
                              <Text
                                style={[
                                  styles.mtsm,
                                  { fontWeight: "light" },
                                  { fontFamily: "Sarabun" },
                                  { fontSize: "11" },
                                  { display: "flex" },
                                  { width: "80%" },
                                ]}
                              >
                                (..................................................)
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={[styles.flexrow, styles.mtsm20]}>
                          <View
                            style={[
                              styles.flexrowstart,
                              { width: "60%" },
                              { marginLeft: "25px" },
                            ]}
                          >
                            <Text
                              style={[
                                { fontWeight: "extrabold" },
                                { fontFamily: "SarabunBold" },
                                { fontSize: "11" },
                                { marginLeft: "90px" },
                                styles.mtsm,
                                styles.spacesm,
                              ]}
                            >
                              ผู้รับเงิน:{" "}
                            </Text>
                          </View>
  
                          <View style={[styles.flexrow, { width: "40%" }]}>
                            <View style={styles.flexrowstart}>
                              <Text
                                style={[
                                  { fontWeight: "extrabold" },
                                  { fontFamily: "SarabunBold" },
                                  { fontSize: "11" },
                                  { marginLeft: "90px" },
                                  styles.mtsm,
                                  styles.spacesm,
                                ]}
                              >
                                ผู้จ่ายเงิน:{" "}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </>
                    )} */}
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
            onClick={() => handleModalReceipt80()}
            className="mr-1"
          >
            <span className="text-sm">ยกเลิก</span>
          </Button>
        </DialogFooter>
      </Dialog>
    );
  };
  
  Receipt80.propTypes = {
    openModalReceipt80: PropTypes.bool.isRequired,
    handleModalReceipt80: PropTypes.func.isRequired,
    dataReceipt: PropTypes.array.isRequired,
  };
  
  export default Receipt80;
  