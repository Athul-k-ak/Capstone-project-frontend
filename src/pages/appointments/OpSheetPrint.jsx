import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../styles/opSheetPrint.css";

const OpSheetPrint = () => {
  const { appointmentId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(`/appointment/${appointmentId}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to load OP sheet:", err);
      }
    };

    fetchDetails();
  }, [appointmentId]);

  useEffect(() => {
    if (data) window.print();
  }, [data]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container my-4" id="op-sheet">
      <h2 className="text-center">Outpatient (OP) Sheet</h2>
      <hr />
      <p><strong>Doctor:</strong> {data.doctorName}</p>
      <p><strong>Patient:</strong> {data.patientName}</p>
      <p><strong>Phone:</strong> {data.patientPhone}</p>
      <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {data.time}</p>
      <p><strong>Status:</strong> {data.status}</p>
      <hr />
      <p><strong>Consultation Notes:</strong> __________________________</p>
    </div>
  );
};

export default OpSheetPrint;
