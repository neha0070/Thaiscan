const iapp_ai = require("iapp_ai")
const api = new iapp_ai("{Your API Key}");

async function test(){
    const ret = await api.idcardFront_Ocr("./idcard.jpg_large");
    console.log(ret)
}
test();