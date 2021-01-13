module.exports.home = function(req, res){
    return res.end("<h1>Express is up for Codeial</h1>");
}
module.exports.test = function(req, res){
    return res.end("<h1>The test is successful</h1>");
}