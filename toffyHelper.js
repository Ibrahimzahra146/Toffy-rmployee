const env = require('./Public/configrations.js')

var requestify = require('requestify');
var userIdInHr = "initial";
exports.userIdInHr = userIdInHr

var currentBot = env.bot;
var hrRole = 0;
var general_remember_me = "";
exports.general_remember_me = general_remember_me
general_session_id = "";
exports.general_session_id = general_session_id;




//store the user slack information in database
module.exports.storeUserSlackInformation = function storeUserSlackInformation(email, msg) {

    env.mRequests.getSlackRecord(email, function (error, response, body) {

        if (response.statusCode == 404) {
            env.mRequests.addSlackRecord(email, msg.body.event.user, msg.body.event.channel, "", "", msg.body.team_id, function (error, response, body) {

            })


        }
        else if (response.statusCode == 200) {
            if (((JSON.parse(body)).userChannelId) != (msg.body.event.channel)) {

                var managerChId = JSON.parse(body).managerChannelId;
                var hrChId = JSON.parse(body).hrChannelId;


                env.request({
                    url: "http://" + env.IP + "/api/v1/toffy/" + JSON.parse(body).id, //URL to hitDs
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: email
                    //Set the body as a stringcc
                }, function (error, response, body) {
                    console.log(response.statusCode)
                    printLogs("DELETED");

                });
                requestify.post("http://" + env.IP + "/api/v1/toffy", {
                    "email": email,
                    "hrChannelId": hrChId,
                    "managerChannelId": managerChId,
                    "slackUserId": msg.body.event.user,
                    "teamId": msg.body.team_id,
                    "userChannelId": msg.body.event.channel
                })
                    .then(function (response) {
                        console.log("Add slack recoed" + response.statusCode)


                        // Get the response body
                        response.getBody();

                    });
            }
        }
    })



}

//*
//send vacation notification to the managers to approve or reject
module.exports.sendVacationToManager = function sendVacationToManager(startDate, endDate, userEmail, type, vacationId, managerApproval, employee, toWho, workingDays, comment) {
    var message12 = ""
    var approvarType = ""
    var approvalId = ""
    var managerEmail = ""
    var dont_detuct_button = ""
    var commentFieldInManagerMessage = ""
    var approver2State = "--"
    var timeOut = 3000
    //check if there is second approver to print it in the message  
    if (!managerApproval[1]) {
        approver2State = "--"

    } else approver2State = "Pending :thinking_face:"

    if (comment != "") {
        var commentFieldInManagerMessage = env.stringFile.commentFieldInManagerMessageFunction(comment);// change 1 
    }
    if (type == "sickLeave") {
        type = "sick"
        timeOut = 2500

    }
    var i = 0
    var j = -1
    var emailFromId;
    var previousI = 0;
    var ImageUrl = employee.profilePicture
    var incrementFlag = true
    env.async.whilst(
        function () { return managerApproval[i]; },
        function (callback) {
            if (managerApproval[0]) {

                if (incrementFlag == true && i > j) {
                    managerApproval.sort(function (a, b) {
                        return a.id - b.id;
                    });
                    console.log(" Ranked managerApproval:" + JSON.stringify(managerApproval))




                    approvalId = managerApproval[i].id
                    approvarType = managerApproval[i].type
                    managerEmail = managerApproval[i].managerEmail
                    incrementFlag = false
                    j = i
                    console.log("Manager #:" + i + ":" + approvarType + ":" + managerApproval[i].managerEmail)
                    env.mRequests.getSlackRecord(managerEmail, function (error, response, body) {

                        env.messageGenerator.generateManagerApprovelsSection(managerApproval, managerEmail, type, false, function (managerApprovalMessage) {
                            env.messageGenerator.generateYourActionSection(managerApproval, managerEmail, function (YourActionMessage) {
                                if (body != 1000) {



                                    var messageBody = ""

                                    var jsonResponse = JSON.parse(body);
                                    console.log("approvarType::" + approvarType)
                                    if (approvarType == "Manager") {
                                        //change 2
                                        message12 = env.stringFile.Slack_Channel_Function(jsonResponse.managerChannelId, jsonResponse.slackUserId, jsonResponse.teamId);
                                        messageBody = env.stringFile.sendVacationToManagerFunction(comment, ImageUrl, userEmail, startDate, workingDays, endDate, type, approver2State, vacationId, approvalId, managerEmail, managerApprovalMessage, YourActionMessage);


                                    } else if (approvarType == "HR") {

                                        message12 = env.stringFile.Slack_Channel_Function(jsonResponse.hrChannelId, jsonResponse.slackUserId, jsonResponse.teamId);
                                        messageBody = env.stringFile.sendNotificationToHrOnSick(comment, ImageUrl, userEmail, startDate, workingDays, endDate, type, approver2State, vacationId, approvalId, managerEmail);


                                    }
                                    if (type != "WFH") {//change 3

                                        dont_detuct_button = env.stringFile.dont_detuct_button_Function(userEmail, vacationId, approvalId, managerEmail, startDate, endDate, type, workingDays, ImageUrl);
                                    }



                                    // needs import (StringFile)
                                    //change 4
                                    if (approvarType == "Manager")
                                        currentBot = env.bot
                                    else currentBot = env.hRbot;

                                    currentBot.startConversation(message12, function (err, convo) {
                                        if (!err) {

                                            var stringfy = JSON.stringify(messageBody);
                                            var obj1 = JSON.parse(stringfy);

                                            currentBot.reply(message12, obj1, function (err, response) {

                                                //set that this time off requests has been sent to this approvalId
                                                env.mRequests.setSendFlagForManager(approvalId, function (error, response, body) {
                                                    console.log("Set flag=" + response.statusCode)

                                                })





                                            });

                                        } else {



                                        }

                                    });



                                    flagForWhileCallbacks = 1



                                } else {


                                }
                            })

                        })
                    });

                } else {
                }

            } else {
                msg.say("Your vacation has been posted but there are nor approvers for you.")
            }

            i++;
            incrementFlag = true
            setTimeout(callback, 5000);

        })


},
    function (err) {

        // 5 seconds have passed


    }

//list all holidays with range period

module.exports.showHolidays = function showHolidays(msg, email, date, date1, holidayRequestType, response11) {
    console.log("date" + date)
    console.log("date1" + date1)
    env.mRequests.getHolidays(email, date, date1, function (error, response, body) {



        if (!error && response.statusCode === 200) {
            console.log("Response.statuscode" + response.statusCode)
            console.log(JSON.stringify(body))
            if (!(JSON.parse(body)[0])) {
                msg.say("There are no holidays, sorry!");
            }
            else {
                //build message Json result to send it to slack
                getHolidayMessage(body, holidayRequestType, response11, function (stringMessage) {


                    printLogs("stringMessage::" + stringMessage);

                    stringMessage = stringMessage + "]"
                    var messageBody = {
                        "text": "The holidays are:",
                        "attachments": [
                            {
                                "attachment_type": "default",
                                "text": " ",
                                "fallback": "ReferenceError",
                                "fields": stringMessage,
                                "color": "#F35A00"
                            }
                        ]
                    }
                    printLogs("messageBody" + messageBody)
                    var stringfy = JSON.stringify(messageBody);

                    printLogs("stringfy " + stringfy)
                    stringfy = stringfy.replace(/\\/g, "")
                    stringfy = stringfy.replace(/]\"/, "]")
                    stringfy = stringfy.replace(/\"\[/, "[")
                    stringfy = JSON.parse(stringfy)

                    msg.say(stringfy)
                })
            }
        } else msg.say("Sorry,there is a problem, please try later!")
    })

}



/**
 * Post vacation in the DB
 * 
 */
module.exports.sendVacationPostRequest = function sendVacationPostRequest(from, to, employee_id, email, type, comment, callback) {

    env.mRequests.getUserIdByEmail(email, function (error, response, Id) {
        console.log("::::" + "::" + email + "::" + Id)
        var vacationType = env.vacationType.getVacationTypeNum(type)
        var vacationBody = {
            "employee_id": Id,
            "from": from,
            "to": to,
            "type": vacationType,
            "comments": comment

        }
        vacationBody = JSON.stringify(vacationBody)
        console.log("sendVacationPostRequest: " + vacationBody)

        var uri = 'http://' + env.IP + '/api/v1/vacation'
        env.request({
            url: uri, //URL to hitDs
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': env.toffyHelper.general_remember_me + ";" + env.toffyHelper.general_session_id
            },

            body: vacationBody
            //Set the body as a stringcc
        }, function (error, response, body) {
            if (response.statusCode == 500) {
                callback(1000, 1000, 100)
            } else {

                var vacationId = (JSON.parse(body)).id;
                var managerApproval = (JSON.parse(body)).managerApproval
                console.log("JSON.stringify(managerApproval)" + JSON.stringify(managerApproval))

                callback(vacationId, managerApproval, (JSON.parse(body)).employee);

            }

        })


    });



}


function printLogs(msg) {
    console.log("msg:========>:" + msg)
}

module.exports.getNewSessionwithCookie = function getNewSessionwithCookie(email, callback) {
    var uri = 'http://' + env.IP + '/api/v1/employee/login'
    env.request({
        url: uri, //URL to hitDs
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: email
        //Set the body as a stringcc
    }, function (error, response, body) {
        console.log("response.statusCode " + response.statusCode)
        if (response.statusCode == 451 || response.statusCode == 500) {
            callback(2000, 2000)
        } else {
            console.log("response.headers)" + response.headers["set-cookie"])
            if (response.headers["set-cookie"] == undefined) {
                callback(env.toffyHelper.general_remember_me, env.toffyHelper.general_session_id)
            }
            else {
                var cookies = JSON.stringify((response.headers["set-cookie"])[1]);
                var arr = cookies.toString().split(";")
                res = arr[0].replace(/['"]+/g, '');
                var cookies1 = JSON.stringify((response.headers["set-cookie"])[0]);
                var arr1 = cookies1.toString().split(";")
                res1 = arr1[0].replace(/['"]+/g, '');

                callback(res, res1);
            }
        }



    });


}

//Function to ckeack if any manager take an action 
module.exports.isManagersTakeAnAction = function isManagersTakeAnAction(managerApproval, callback) {
    var flag = false
    var i = 0;
    var state = ""
    env.async.whilst(
        function () { return managerApproval[i]; },
        function (callback) {
            if (managerApproval[i].state != "Pending") {
                flag = true
                state = managerApproval[i].state
            }
            i++;
            setTimeout(callback, 500);

        },
        function (err) {
            callback(flag, state)
        });

}
/**
 * Genrate Holiday message based on type ,So when employee ask for all holidays or next number of holidays
 */
function getHolidayMessage(body, holidayRequestType, response, callback) {
    var max = ""

    var i = 0;
    var stringMessage = "["
    var obj = JSON.parse(body);
    var shareInfoLen = Object.keys(obj).length;

    if (holidayRequestType == 2 || holidayRequestType == 3) {
        if (holidayRequestType == 2)
            max = 1;
        else if (holidayRequestType == 3)
            max = response.result.parameters.number
        if (max > shareInfoLen) {
            max = shareInfoLen
        }
        while (i < max) {

            if (i > 0) {
                stringMessage = stringMessage + ","
            }
            if ((JSON.parse(body))[i].isExcluded == true) {


                env.dateHelper.converDateToWords((JSON.parse(body))[i].fromDate, (JSON.parse(body))[i].toDate, 1, function (fromDateWord, toDateWord) {



                    if ((JSON.parse(body))[i].fromDate == (JSON.parse(body))[i].toDate) {
                        stringMessage = stringMessage + "{" + "\"title\":" + "\"" + (JSON.parse(body))[i].name + "\"" + ",\"value\":" + "\"" + fromDateWord + "\"" + ",\"short\":true}"

                    } else {
                        stringMessage = stringMessage + "{" + "\"title\":" + "\"" + (JSON.parse(body))[i].name + "\"" + ",\"value\":" + "\"" + fromDateWord + " to " + toDateWord + "" + "\"" + ",\"short\":true}"

                    }
                })
            }
            i++;




        }
    } else {
        while ((JSON.parse(body)[i])) {

            if (i > 0) {
                stringMessage = stringMessage + ","
            }

            env.dateHelper.converDateToWords((JSON.parse(body))[i].fromDate, (JSON.parse(body))[i].toDate, 1, function (fromDateWord, toDateWord) {



                if ((JSON.parse(body))[i].fromDate == (JSON.parse(body))[i].toDate) {
                    stringMessage = stringMessage + "{" + "\"title\":" + "\"" + (JSON.parse(body))[i].name + "\"" + ",\"value\":" + "\"" + fromDateWord + "\"" + ",\"short\":true}"

                } else {
                    stringMessage = stringMessage + "{" + "\"title\":" + "\"" + (JSON.parse(body))[i].name + "\"" + ",\"value\":" + "\"" + fromDateWord + " to " + toDateWord + "" + "\"" + ",\"short\":true}"

                }
            })


            i++;



        }
    }
    callback(stringMessage)
}


//Check if the user is deactivited

module.exports.isActivated = function isActivated(email, callback) {
    printLogs("Getting roles ")
    var flag = true;
    env.toffyHelper.getNewSessionwithCookie(email, function (remember_me_cookie, session_Id) {
        if (remember_me_cookie == 2000) {
            callback(2000)
        } else {

            env.request({
                url: 'http://' + env.IP + '/api/v1/employee/roles', //URL to hitDs
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': remember_me_cookie + ";" + session_Id

                },
                body: email
                //Set the body as a stringcc
            }, function (error, response, body) {
                console.log("isActivated:" + JSON.stringify(body))

                if (JSON.parse(body).activated == false) {
                    console.log(JSON.stringify(body))
                    callback(false);
                } else
                    callback(true)

            })
        }
    })
}

