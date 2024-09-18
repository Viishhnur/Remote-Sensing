const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const key = "otp-secret-key";

async function createOtp(params,callback){
    const otp = otpGenerator.generate(4,{
        alphabets : false,
        upperCase : false,
        specialChars : false
    });
    const tt1 = 5* 60 * 1000;
    const expires = Data.now() + tt1;
    const data = `${params.phone}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', key).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;

    console.log('Your otp is ' + otp);
    return callback(null, fullHash);
}
async function verifyOtp(params, callback) {
    const [hash, expires] = params.hash.split('.');
    let now = Data.now();
    if(now > parseInt(expires)) return callback("OTP expired ");

    const data = `${params.phone}.${hash}.${expires}`;

    const hashFromData = crypto.createHmac('sha256', key).update(data).digest('hex');

    if(hashFromData === hash ) {
        return callback(null, "Sucess" );
    } else {
        return callback("Invalid otp    ");
    }
}