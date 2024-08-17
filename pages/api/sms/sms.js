import Push from 'pushsafer-notifications'
const push = new Push({
    k: process.env.PUSHSAFER_KEY,
    debug: true
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { message } = req.body;

            const msg = {
                m: message,              // Message (required)
                t: "Alert Notification", // Title (optional)
                s: '8',                  // Sound (value 0-28) (optional)
                v: '2',                  // Vibration (empty or value 1-3) (optional)
                i: '5',                  // Icon (value 1-98) (optional)
                c: '#ff3333',            // Icon color (optional)
                u: 'https://iotsmarthome.vercel.app/',                   // URL (optional)
                ut: 'Visit website',                  // URL Title (optional)
                l: '10',                 // Time to Live (optional)
                pr: '2'                  // Priority (optional: -2, -1, 0, 1, 2)
            };

            push.send(msg, function (err, result) {
                if (err) {
                    console.error('Error sending notification:', err);
                    return res.status(500).json({ success: false, error: err.message });
                }
                console.log('Notification sent:', result);
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
