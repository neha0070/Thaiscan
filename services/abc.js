const f = () => {
    require('dotenv').config();
    console.log('Environment Variables:', process.env);
    console.log('Credential Key:', process.env.credentialkey);
    console.log('Port:', process.env.PORT);
};
module.exports = f;