// Utils/Constants.js

export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
export const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
export const PUSHSAFER_KEY = process.env.PUSHSAFER_KEY;

// Pushsafer notification settings
export const PUSHSAFER_NOTIFICATION_SETTINGS = {
    title: "Alert Notification",
    sound: '8',          // Sound (value 0-28)
    vibration: '2',      // Vibration (value 1-3)
    icon: '5',           // Icon (value 1-98)
    iconColor: '#ff3333',// Icon color
    url: 'https://iotsmarthome.vercel.app/',
    urlTitle: 'Visit website',
    timeToLive: '10',    // Time to Live
    priority: '2'        // Priority (value -2, -1, 0, 1, 2)
};
