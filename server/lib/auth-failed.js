
module.exports = function (res) {
    res.writeHead(303, {
        'Location': '/#/login'
    });
    return res.end();
}
