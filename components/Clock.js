import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState({ hour: new Date().getHours(), minute: new Date().getMinutes() });

    useEffect(() => {
        const tick = () => {
            setTime({ hour: new Date().getHours(), minute: new Date().getMinutes() });
        };

        const interval = setInterval(tick, 60000); // Update every minute

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const getFormattedTime = () => {
        const now = new Date();
        let hour = now.getHours();
        const minute = now.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'

        // Add leading zero to minutes if needed
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
        return { hour, minute: formattedMinute, ampm };
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#4C4F69",
            gap: "10px",
        }}>
            <p>{time.hour}</p>
            <p style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "#8839EF",
            }}>:</p>
            <p>{getFormattedTime().minute}</p>
            <p style={{
                marginLeft: "20px",
            }}>{getFormattedTime().ampm}</p>
        </div>
    );
};

export default Clock;
