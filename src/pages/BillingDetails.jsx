import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance"; // adjust the path if needed

const BillingDetails = () => {
  const { billingId } = useParams();
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth); // ✅ grab token from redux

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const { data } = await axiosInstance.get(`/billing/${billingId}`, {
          headers: { Authorization: `Bearer ${token}` }, // ✅ pass token here
        });
        setBilling(data);
      } catch (error) {
        console.error("Error fetching billing details:", error);
        toast.error("Failed to load billing details");
      } finally {
        setLoading(false);
      }
    };

    if (billingId && token) fetchBilling(); // ✅ don't run until both are ready
  }, [billingId, token]);

  if (loading) return <div className="text-center mt-5">Loading billing details...</div>;
  if (!billing) return <div className="text-center mt-5">No billing record found.</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Billing Details</h2>
      <div className="card shadow p-4">
        <h5 className="mb-3">Patient: {billing.patientName || billing.patientId?.name || "Unknown"}</h5>
        <p><strong>Patient ID:</strong> {billing.patientId?._id || "N/A"}</p>
        <p><strong>Billing Date:</strong> {billing.billingDate ? new Date(billing.billingDate).toLocaleString() : "N/A"}</p>
        <p><strong>Details:</strong> {billing.details || "Not Provided"}</p>
        <p><strong>Amount:</strong> ₹{billing.amount ? billing.amount.toFixed(2) : "0.00"}</p>
        <p>
          <strong>Status:</strong>
          <span className={`ms-2 badge ${billing.paymentStatus?.toLowerCase() === "paid" ? "bg-success" : "bg-warning text-dark"}`}>
            {billing.paymentStatus?.toUpperCase() || "UNKNOWN"}
          </span>
        </p>
        <p><strong>Appointment ID:</strong> {billing.appointmentId || "N/A"}</p>

        <div className="mt-4">
          <Link to="/admin/billing" className="btn btn-outline-primary">Back to Billing</Link>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
