import React, { useState } from "react";
import RescheduleForm from "./RescheduleForm";
import "./ManageModal.css";

function ManageModal({ appointment, onClose }) {
  const [step, setStep] = useState("options"); // 'options', 'reschedule', 'cancel', 'success'
  const [successMsg, setSuccessMsg] = useState("");

  if (!appointment) return null;

  function handleConfirm(type) {
    setSuccessMsg(`${type} requested successfully.`);
    setStep("success");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="fw-bold mb-0">
            {step === "success" ? "Confirmation" : "Manage Appointment"}
          </h4>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {step === "options" && (
            <div className="d-grid gap-2 text-center">
              <p className="text-muted mb-4">
                What would you like to do for your visit with <strong>{appointment.doctorName || "Doctor"}</strong>?
              </p>
              <button className="modal-action-btn reschedule" onClick={() => setStep("reschedule")}>
                Reschedule Request
              </button>
              <button className="modal-action-btn cancel-outline" onClick={() => setStep("cancel")}>
                Cancel Appointment
              </button>
            </div>
          )}

          {step === "reschedule" && (
            <RescheduleForm 
              onBack={() => setStep("options")} 
              onConfirm={() => handleConfirm("Reschedule")} 
            />
          )}

          {step === "cancel" && (
            <div className="modal-form">
              <p className="text-danger small mb-3">Please provide a reason for cancellation.</p>
              <textarea className="form-control mb-3" rows="3" placeholder="Reason..."></textarea>
              <div className="d-flex gap-2">
                <button className="btn-back" onClick={() => setStep("options")}>Back</button>
                <button className="modal-action-btn cancel mb-0" onClick={() => handleConfirm("Cancellation")}>
                  Confirm Cancel
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-4">
              <div className="success-icon-circle mb-3">✓</div>
              <h5 className="fw-bold text-success">{successMsg}</h5>
              <button className="btn-search-action w-100 mt-3" onClick={onClose}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageModal;