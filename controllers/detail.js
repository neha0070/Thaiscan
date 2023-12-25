const { Details } = require('../models/detail');
const {getData} = require('../services/textextract');

async function addDetail(req, res) {
    const extracted = await getData(`./UserData/Images/${req.file.filename}`, './credential.json');

    const detail = await Details.create({
        status: extracted.status,
        ipImage:  `/Images/${req.file.filename}`,
        identification_number: extracted.identification_number,
        name: extracted.name,
        last_name: extracted.last_name,
        date_of_birth: extracted.date_of_birth,
        date_of_issue: extracted.date_of_issue,
        date_of_expiry: extracted.date_of_expiry
    });

    return res.render('addDetail', {
        detail: detail,
    });
}

async function showAddDetail(req, res) {
    return res.render('addDetail');
}

async function showLogs(req, res) {
    const details = await Details.find({});
    res.render('logs', {
        details: details,
    })
}

module.exports = {
    addDetail,
    showAddDetail,
    showLogs,
}