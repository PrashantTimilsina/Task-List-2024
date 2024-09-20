import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function ReactDatePicker({ selectedDate, setSelectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClearClick = () => {
    setSelectedDate(null);
  };
  return (
    <div className="calendar">
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        showMonthDropdown
        showYearDropdown
        todayButton="Today"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="MM/DD/YYYY"
        customInput={<input />}
      />

      <div className="button-container">
        <button onClick={handleClearClick} className="date-button">
          Clear
        </button>
      </div>
    </div>
  );
}
export default ReactDatePicker;
