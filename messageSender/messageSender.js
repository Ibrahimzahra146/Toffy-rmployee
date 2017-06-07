const env = require('.././Public/configrations.js')

var requestify = require('requestify');
var currentBot = env.bot;
/*   
This function send atext message to the employee without any atthachments 

*/
module.exports.sendMessageSpecEmployee = function sendMessageSpecEmployee(email, text) {
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
        var responseBody = JSON.parse(body);

        var message = {
            'type': 'message',
            'channel': responseBody.userChannelId,
            user: responseBody.slackUserId,
            text: 'what is my name',
            ts: '1482920918.000057',
            team: responseBody.teamId,
            event: 'direct_message'
        };
        server.employeeBot.startConversation(message, function (err, convo) {
            if (!err) {
                var text12 = {
                    "text": "happy birthday man ",
                    "attachments": [
                        {
                            "attachment_type": "default",

                            "text": "",
                            "fallback": "ReferenceError",
                            "image_url": "http://68.media.tumblr.com/28c52c2891b4784e093830763fd92e48/tumblr_inline_o2195iz6PK1t8z0o6_540.gif"
                        }
                    ]
                }

                var stringfy = JSON.stringify(text12);
                var obj1 = JSON.parse(stringfy);
                server.employeeBot.reply(message, obj1);
            }
        });
    });
}

/*   
This function send  message to the HR whenever the employee upload sick report for sick vacation with atthachments  

*/
module.exports.sendVacationToHR = function sendVacationToHR(startDate, endDate, userEmail, type, vacationId, managerApproval, toWho, workingDays, comment, ImageUrl, attachmentsUrl) {
    var message12 = ""
    var approvarType = ""
    var approvalId = ""
    var managerEmail = ""
    var dont_detuct_button = ""
    var commentFieldInManagerMessage = ""
    if (comment != "") {
        commentFieldInManagerMessage = {
            "title": "Comment",
            "value": comment,
            "short": true
        }
    }
    if (type == "sickLeave") {
        type = "sick"
    }

    var i = 0
    var j = 0


    console.log("Mnaagers approvals ::::" + JSON.stringify(managerApproval))
    env.async.whilst(
        function () { return managerApproval[i]; },
        function (callback) {
            approvalId = managerApproval[i].id
            approvarType = managerApproval[i].type
            emailFromId = managerApproval[i].managerEmail
            managerEmail = emailFromId.replace(/\"/, "")
            managerEmail = managerEmail.replace(/\"/, "")
            env.messageGenerator.generateManagerApprovelsSection(managerApproval, managerEmail, function (managerApprovalMessage) {
                env.request({
                    url: 'http://' + env.IP + '/api/v1/toffy/get-record', //URL to hitDs
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: managerEmail
                    //Set the body as a stringcc
                }, function (error, response, body) {


                    var jsonResponse = JSON.parse(body);
                    if (approvarType == "Manager") {


                    } else {
                        //Check the Role to send it for HR only
                        hrRole = 1
                        message12 = {
                            'type': 'message',

                            'channel': jsonResponse.hrChannelId,
                            user: jsonResponse.slackUserId,
                            text: 'what is my name',
                            ts: startDate + ';' + endDate + ';' + userEmail,
                            team: jsonResponse.teamId,
                            event: 'direct_message'
                        }

                    }
                    if (type != "WFH") {
                        dont_detuct_button = {
                            "name": "dont_detuct",
                            "text": "Don’t Deduct ",
                            "type": "button",
                            "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl
                        }
                    }




                    var messageBody = {
                        "text": "This folk has pending time off request:",
                        "attachments": [
                            {
                                "attachment_type": "default",
                                "callback_id": "manager_confirm_reject",
                                "text": userEmail,
                                "fallback": "ReferenceError",
                                "fields": [
                                    {
                                        "title": "From",
                                        "value": startDate,
                                        "short": true
                                    },
                                    {
                                        "title": "Days/Time ",
                                        "value": workingDays + " day",
                                        "short": true
                                    },
                                    {
                                        "title": "to",
                                        "value": endDate,
                                        "short": true
                                    },
                                    {
                                        "title": "Your action",
                                        "value": "Pending",
                                        "short": true
                                    },
                                    {
                                        "title": "Type",
                                        "value": type,
                                        "short": true
                                    }, managerApprovalMessage,
                                    commentFieldInManagerMessage,
                                    {
                                        "title": "Sick report",
                                        "value": "<" + attachmentsUrl + "|link>",
                                        "short": false
                                    },
                                ],
                                "actions": [
                                    {
                                        "name": "confirm",
                                        "text": "Accept",
                                        "style": "primary",
                                        "type": "button",
                                        "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl
                                    },
                                    {
                                        "name": "reject",
                                        "text": "Reject",
                                        "style": "danger",
                                        "type": "button",
                                        "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl
                                    },
                                    {
                                        "name": "reject_with_comment",
                                        "text": "Reject with comment",
                                        "style": "danger",
                                        "type": "button",
                                        "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl + ";" + "Pending" + ";" + "Pending" + ";" + "Pending"
                                    },
                                ],
                                "color": "#F35A00",
                                "thumb_url": ImageUrl,
                            }
                        ]
                    }
                    var stringfy = JSON.stringify(messageBody)
                    console.log("stringfy11" + stringfy)
                    stringfy = stringfy.replace(/\\/, "")

                    stringfy = stringfy.replace(/}\"/g, "}")
                    stringfy = stringfy.replace(/\"\{/g, "{")
                    stringfy = stringfy.replace(/\\/g, "")
                    stringfy = stringfy.replace(/\",\"\"/g, "")
                    stringfy = stringfy.replace(/,,/, ",")
                    stringfy = stringfy.replace(/,\",/g, ",")
                    stringfy = stringfy.replace(/\"\"\",/g, "")
                    stringfy = stringfy.replace(/\"\{/g, "{")
                    if (approvarType == "Manager") {


                    } else {

                        currentBot = env.hRbot
                    }
                    currentBot.startConversation(message12, function (err, convo) {


                        if (!err) {

                            var stringfy = JSON.stringify(messageBody);
                            var obj1 = JSON.parse(stringfy);
                            currentBot.reply(message12, obj1, function (err, response) {
                            });

                        }

                    });



                    i++;
                })
                setTimeout(callback, 2500);

            },
                function (err) {
                    // 5 seconds have passed
                });
        })

}
