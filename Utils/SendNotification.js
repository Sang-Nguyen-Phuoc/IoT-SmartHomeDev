import emailjs from '@emailjs/browser';

export const sendNotification = async (templateParams) => {
    try {
        // Send email
        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        );

        // Send Pushsafer notification
        const res = await fetch('/api/sms/sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
