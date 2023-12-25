const { Details } = require('../models/detail');
const {getData} = require('../services/textextract');

async function addDetail(req, res) {
    const extracted = await getData(`./UserData/Images/${req.file.filename}`, './credential.json');

    const detail = await Details.create({
        status: extracted.status,
        inputImageURL:  `/Images/${req.file.filename}`,
        identification_number: extracted.identification_number,
        name: extracted.name,
        last_name: extracted.last_name,
        date_of_birth: extracted.date_of_birth,
        date_of_issue: extracted.date_of_issue,
        date_of_expiry: extracted.date_of_expiry
    });
    console.log(detail);
    return res.render('add', {
        detail: detail,
    });
}