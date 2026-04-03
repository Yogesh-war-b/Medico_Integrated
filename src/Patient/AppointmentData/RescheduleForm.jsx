import React, { useState } from "react";

function RescheduleForm({ onBack, onConfirm }) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <form onSubmit={handleSubmit} className="modal-form text-start">
      <div className="mb-3">
        <label className="form-label">Requested Date</label>
        <input 
          type="date" 
          className="form-control" 
          required 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Reason</label>
        <textarea 
          className="form-control" 
          rows="2" 
          required 
          placeholder="Why do you need to reschedule?"
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
      </div>
      <div className="d-flex gap-2">
        <button type="button" className="btn-back" onClick={onBack}>Back</button>
        <button type="submit" className="modal-action-btn reschedule mb-0">Submit</button>
      </div>
    </form>
  );
}

export default RescheduleForm;