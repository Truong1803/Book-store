import React, { useEffect, useState } from "react";

function Notification({ toast, msg }) {
  const [backgroundColor, setBackgroundColor] = useState("#41A3E2");
  const [type, setType] = useState(<i className={`fas fa-info-circle`}></i>);
  useEffect(() => {
    switch (toast) {
      case "success":
        setBackgroundColor("#07C50E");
        setType(<i className={`fas fa-check-circle`}></i>);
        break;
      case "failure":
        setBackgroundColor("#E85642");
        setType(<i className="fas fa-exclamation-triangle"></i>);
        break;
      default:
    }
  }, [backgroundColor, toast]);
  return (
    <div id="toast">
      <div className="toast toast--success">
        <div className="toast__icon">{type}</div>
        <div className="toast__body">
          <h3 className="toast__title">{toast}</h3>
          <p className="toast__msg">{msg}</p>
        </div>
        <div className="toast__close">
          <i className="fas fa-times"></i>
        </div>
      </div>
    </div>
  );
}

export default Notification;
