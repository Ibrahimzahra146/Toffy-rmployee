const env = require('.././Public/configrations.js')


/**
 * Get slack user info like Slack Id ,team Id,hr channel ID
 * 
 */
module.exports.getSlackRecord = function getSlackRecord(email,callback) {
    request({
        url: 'http://' + IP + '/api/v1/toffy/get-record', //URL to hitDs
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=24D8D542209A0B2FF91AB2A333C8FA70'
        },
        body: email
        //Set the body as a stringcc
    }, function (error, response, body) {
        callback(body)
    })
}