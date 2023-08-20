
import React from "react";
import "./ReservationConfirmation.css";
const ReservationConfirmation = ({ userName, userEmail, userAddress, bookedHotel, selectedRooms }) => {
  return (
    <div className="reservation-confirmation">
      <h2>Reservation Confirmation</h2>
      <p>Hello, {userName}!</p>
      <p>Email: {userEmail}</p>
      <p>Address: {userAddress}</p>
      <p>Hotel Name: {bookedHotel}</p>
      <p>Your booking details:</p>
      <ul>
        {selectedRooms.map((roomNumber) => (
          <li key={roomNumber}>Room Number: {roomNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationConfirmation;
