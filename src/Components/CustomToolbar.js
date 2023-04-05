import React from 'react';
import { Navigate } from 'react-big-calendar';

const CustomToolbar = (toolbar) => {
  const goToNextMonth = () => {
    toolbar.onNavigate(Navigate.NEXT);
  };

  const goToToday = () => {
    toolbar.onNavigate(Navigate.TODAY);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToToday}>
          Today
        </button>
        <button type="button" onClick={goToNextMonth}>
          Next Month
        </button>
      </span>
    </div>
  );
};

export default CustomToolbar;
