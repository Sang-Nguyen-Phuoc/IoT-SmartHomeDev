// Utils/sendNotification.js
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '@/Utils/Constants';

export const sendNotification = async (templateParams) => {
    try {
        // Send email
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_USER_ID
        );

        // Send Pushsafer notification
        const res = await fetch('/api/sms/sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Send the data as JSON
            },
            body: JSON.stringify(templateParams),
        });

        const result = await res.json();
        if (result.success) {
            return true;
        } else {
            console.error('Failed to send notification:', result.error);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
