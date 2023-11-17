import {
  Card,
} from "@material-tailwind/react";

import { Pie,Bar } from 'react-chartjs-2';
import { Chart } from "chart.js/auto";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Report() {

  const salesData = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน'],
    datasets: [
      {
        label: 'อยู่ระหว่างพัฒนาระบบ ',
        data: [12000, 15000, 18000, 10000, 22000, 17000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="w-full overflow-auto px-3">
    <ToastContainer autoClose={1000} theme="colored" />
    <div className="flex   justify-center mt-10  w-[90%] ps-28  h-[90%] ">
    <Bar 
  className="flex  items-center justify-center align-middle"
  options={{
    plugins: {
      legend: {
        labels: {
          font: {
            size:20  // ขนาดตัวอักษรหัวข้อ   
          }, 
        }
      },
    },
    scales: {
      x: {
        ticks: {
          font:{
            size:18 // ขนาดตัวอักษรแกน x
          }  
        },
      },
      y: {
        ticks: {
          font:{
            size:16 // ขนาดตัวอักษรแกน y
          } 
        },
      },
    },
  }}
  data={salesData}
  />
  
    </div>

  </Card>

  );
}

export default Report;
