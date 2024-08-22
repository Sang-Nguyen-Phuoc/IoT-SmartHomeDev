// Utils/sms.js
import Push from 'pushsafer-notifications';
import { PUSHSAFER_KEY, PUSHSAFER_NOTIFICATION_SETTINGS } from '@/Utils/Constants';

const push = new Push({
    k: PUSHSAFER_KEY,
    debug: true
}); // Initialize Pushsafer with the API key

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { message } = req.body;

            const msg = {
                m: message,                   // Message (required)
                t: PUSHSAFER_NOTIFICATION_SETTINGS.title,        // Title
                s: PUSHSAFER_NOTIFICATION_SETTINGS.sound,        // Sound
                v: PUSHSAFER_NOTIFICATION_SETTINGS.vibration,    // Vibration
                i: PUSHSAFER_NOTIFICATION_SETTINGS.icon,         // Icon
                c: PUSHSAFER_NOTIFICATION_SETTINGS.iconColor,    // Icon color
                u: PUSHSAFER_NOTIFICATION_SETTINGS.url,          // URL
                ut: PUSHSAFER_NOTIFICATION_SETTINGS.urlTitle,    // URL Title
                l: PUSHSAFER_NOTIFICATION_SETTINGS.timeToLive,   // Time to Live
                pr: PUSHSAFER_NOTIFICATION_SETTINGS.priority     // Priority
            };

            push.send(msg, function (err, result) {
                if (err) {
                    console.error('Error sending notification:', err);
                    return res.status(500).json({ success: false, error: err.message });
                }
                return res.status(200).json({ success: true, result });
            });
        } catch (error) {
            console.error('Error in API handler:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
