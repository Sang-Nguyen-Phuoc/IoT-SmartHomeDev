import React, { useState, useEffect } from 'react';

const DateTime = () => {
    const [date, setDate] = useState({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1, // Months are zero-indexed
        year: new Date().getFullYear(),
    });

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setDate({ day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() });
        };

        const interval = setInterval(tick, 60000); // Update every minute

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const getFormattedDate = () => {
        const day = date.day < 10 ? `0${date.day}` : date.day;
        const month = date.month < 10 ? `0${date.month}` : date.month;
        const year = date.year;

        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            {getFormattedDate()}
        </div>
    );
};

export default DateTime;
