require('dotenv').config();
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

async function sendSMSMessage(sns, params) {
    try {
        const command = new PublishCommand(params);
        const response = await sns.send(command);
        return response;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
}

(async () => {
    // Ensure credentials and region are correctly loaded from environment variables
    const sns = new SNSClient({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    const params = {
        Message: `Your OTP is ${Math.random().toString().substring(2, 8)}`, // 6 digit OTP
        PhoneNumber: process.env.phone,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: 'String'
            }
        }
    };

    try {
        const response = await sendSMSMessage(sns, params);
        console.log('Message sent successfully:', response);
    } catch (error) {
        console.error('Failed to send SMS:', error);
    }
})();
