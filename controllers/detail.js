const { Details } = require('../models/detail');
const {getData} = require('../services/textextract');
const fs = require("fs");

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

async function showEditDetail(req, res) {
    const detail = await Details.findById(req.params.detailId);
    return res.render('editDetail', {
        detail: detail,
    })
}

async function updateEditDetails(req, res) {
    const {identification_number, name, last_name, date_of_birth, date_of_issue, date_of_expiry} = req.body;
    const toUpdate = {};
    if(identification_number !== '') toUpdate.identification_number = identification_number;
    if(name !== '') toUpdate.name = name;
    if(last_name !== '') toUpdate.last_name = last_name;
    if(date_of_birth !== '') toUpdate.date_of_birth = date_of_birth;
    if(date_of_issue !== '') toUpdate.date_of_issue = date_of_issue;
    if(date_of_expiry !== '') toUpdate.date_of_expiry = date_of_expiry;

    const detail  = await Details.findByIdAndUpdate(req.params.detailId,toUpdate)

    return res.redirect('/');
}

async function deleteDetail(req, res) {
    const detail = await Details.findByIdAndDelete(req.params.detailId);
    fs.unlink(`./UserData/${detail.ipImage}`, () => {});
    return res.redirect('/detail/logs');
}

module.exports = {
    addDetail,
    showAddDetail,
    showLogs,
    showEditDetail,
    updateEditDetails,
    deleteDetail,
}