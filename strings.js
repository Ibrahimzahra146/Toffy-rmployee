/**
 * 
 */
const stringFile = require('./strings.js')
const env = require('./Public/configrations.js')
/**Deactivated message */
const deactivatedMsg = "Your account has been deactivated. You are not allowed to use the system.";
exports.deactivatedMsg = deactivatedMsg
//
const sickMessageAfterConfirmation = "Sick time off request has been submitted to your managers and HR admin.\n You may be asked to submit a sick report, I will inform you about this. "
exports.sickMessageAfterConfirmation = sickMessageAfterConfirmation
//message after cancelation for already rejected vacation
const message_after_cancelation_rejected_timeoff = "No need to cancel since its already rejected from your approvals."
exports.message_after_cancelation_rejected_timeoff = message_after_cancelation_rejected_timeoff
//message when employee cancel request but managers already tak an actions
const message_already_action_from_manager = "Sorry ,you can't cancel your time off request ,since your managers take an action.Please contact them"
exports.message_already_action_from_manager = message_already_action_from_manager
//
var pretext = "Hey! I am here to help you folks :-) Just start engaging with me by using the following expressions:"
exports.pretext = pretext
var submission_rules_pretext = "First of all, we recommend you to review the submission rules in order to understand how the system works.:"
exports.submission_rules_pretext = submission_rules_pretext
var leave_pretext = "If you want to take a time off or leave"
exports.leave_pretext = leave_pretext
var sick_pretext = "If you want to take a sick vacation or sick leave"
exports.sick_pretext = sick_pretext
var upload_report_pretxt = "In case you want to upload a sick report for any taken sick vacation"
exports.upload_report_pretxt = upload_report_pretxt
var sick_rules_pretext = "To review the sick submission rules and how it could be converted into personal vacation, please review the rules."
exports.sick_rules_pretext = sick_rules_pretext
var death_pretext = "In case you have a family death "
exports.death_pretext = death_pretext
var statsProfileHistory_pretext = "In case you want to check your profile or balance or history "
exports.statsProfileHistory_pretext = statsProfileHistory_pretext
var pending_pretext = "In case you want to check your pending time off requests or want to cancel a vacation "
exports.pending_pretext = pending_pretext
var holiday_pretext = "In case you want to see the official holidays"
exports.holiday_pretext = holiday_pretext
var WFH_pretext = "In case you want to work from home "
exports.WFH_pretext = WFH_pretext
var maternity_pretext = "If you want to take a maternity vacation "
exports.maternity_pretext = maternity_pretext
var wedding_pretext = "If you want to take a wedding vacation "
exports.wedding_pretext = wedding_pretext
var paternity_pretext = "If you want to take a paternity vacation "
exports.paternity_pretext = paternity_pretext
var haj_pretext = "If you want to take Haj vacation"
exports.haj_pretext = haj_pretext






//Holiday nodtice 
var holiday_notice = "\n ( Note: Any official holiday will not be deducted from your time off request.)"
exports.holiday_notice = holiday_notice
//paternity message
var paternity_message = "Congratulations on your baby’s paternity"
exports.paternity_message = paternity_message
//maternity message
var maternity_message = "Congratulations! a great joy is coming. Many best wishes,"
exports.maternity_message = maternity_message
//death message
var death_message = "Sorry about your loss, our deepest condolences,"
exports.death_message = death_message
//Wedding message
var wedding_message = "Congratulations on your marriage,"
exports.wedding_message = wedding_message
// work from home message
var WFH_message = "Okay, you asked to work from home"
exports.WFH_message = WFH_message
var server_error = "Oops! Server has encountered an internal error.Please try again."
exports.server_error = server_error



/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
//sick report on click


//personal message after confirmation
module.exports.personalMessageAfterConfirmation = function (fromDate, toDate) {
    var message = "Your request ( " + fromDate + " to " + toDate + " ) has been submitted and is awaiting your managers approval."
    return message;
}


//upload_sick_report button
module.exports.uploadSickReportButton = function uploadSickReportButton(email, vacationId, fromDate, toDate, messageFB) {
    var message = {
        "name": "upload_sick_report",
        "text": "Upload sick report ",
        "type": "button",
        "value": email + ";" + vacationId + ";" + fromDate + ";" + toDate + ";" + messageFB
    }
    return message;
}


//upload sick report message on click
module.exports.upload_sick_report_messsage = function upload_sick_report_messsage(messageFB, vacationId) {
    var message = messageFB + "\n<http://46.43.71.50:19090/sick-report?vId=" + vacationId + "|Upload your sick report>"
    return message;
}


//cancel button for any time off  
module.exports.cancelationButton = function cancelationButton(email, vacationId, managerApproval, fromDate, toDate, type, uploadSickReportButton, messageFB) {
    var message = {
        "text": "",
        "attachments": [
            {
                "text": messageFB,
                "callback_id": 'cancel_request',
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": 'cancel',
                        "text": "Cancel Request",
                        "style": "danger",
                        "type": "button",
                        "value": email + ";" + vacationId + ";" + JSON.stringify(managerApproval) + ";" + fromDate + ";" + toDate + ";" + type

                    }, uploadSickReportButton
                ]
            }
        ]
    }
    return message;
}

//message after cancel vacation
module.exports.messageAfterCancelation = function messageAfterCancelation(type, fromDate, toDate) {
    var message = "Your " + type + " time off request from ( " + fromDate + "-" + toDate + " ) has been canceled"
    return message;
}


/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
module.exports.helpMessageBody = function helpMessageBody(fields, actions, pretext) {
    var messageBody = {
        "text": "",

        "attachments": [
            {
                "callback_id": 'preDefinedHelp',
                "attachment_type": "default",
                "pretext": pretext,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "fields": fields,
                "actions": actions


            }
        ]
    }
    return messageBody;
}

var staticHelpFields =
    [




        {
            "title": "I want a maternity time off from 20 May",
            "value": "",
            "short": false
        }
        ,
        {
            "title": "Paternity time off on 10 May",
            "value": "",
            "short": false
        },
        {
            "title": "Marriage vacation on 10 May",
            "value": "",
            "short": false
        }
        ,
        {
            "title": "Haj vacation on 10 June ",
            "value": "",
            "short": false
        }
    ]

exports.staticHelpFields = staticHelpFields;
/**
 * stats profile history actions
 */
var employeeCommands = [
    {
        "name": 'helpMenu',
        "text": "Upload sick report",
        // "style": "primary",
        "type": "button",
        "value": "Upload"
    },
    {
        "name": 'helpMenu',
        "text": "Cancel vacation",
        //"style": "primary",
        "type": "button",
        "value": "Cancel vacation"
    }
]
exports.employeeCommands = employeeCommands
//
var uploadReportActions = [
    {
        "name": 'helpMenu',
        "text": "Upload sick report",
        // "style": "primary",
        "type": "button",
        "value": "Upload"
    }
]
//
exports.uploadReportActions = uploadReportActions
/**
 * Time off help menu
 */
exports.staticHelpFields = staticHelpFields;
/**
 * stats profile history actions
 */
var statsProfileHistoryActions = [
    {
        "name": 'helpMenu',
        "text": "Show stats",
        // "style": "primary",
        "type": "button",
        "value": "Show stats"
    }, {
        "name": 'helpMenu',
        "text": "Show profile",
        // "style": "primary",
        "type": "button",
        "value": "Show profile"
    },
    {
        "name": 'helpMenu',
        "text": "Show history",
        //"style": "primary",
        "type": "button",
        "value": "Show history"
    },

]
exports.statsProfileHistoryActions = statsProfileHistoryActions

//sick buttons
var sickActions = [
    {
        "name": 'helpMenu',
        "text": "I am sick today",
        // "style": "primary",
        "type": "button",
        "value": "I am sick today"
    }, {
        "name": 'helpMenu',
        "text": "Sick vacation from/ to/",
        // "style": "primary",
        "type": "button",
        "value": "Sick"
    },
    {
        "name": 'helpMenu',
        "text": "Sick leave today from/ to/",
        //"style": "primary",
        "type": "button",
        "value": "sick"
    },
    ,
]
exports.sickActions = sickActions
var timeOffPredefinedActions = [
    {
        "name": 'helpMenu',
        "text": "Time off tomorrow",
        // "style": "primary",
        "type": "button",
        "value": "Time off tomorrow"
    }, {
        "name": 'helpMenu',
        "text": "Time off from/ to",
        // "style": "primary",
        "type": "button",
        "value": "Time off "
    },
    {
        "name": 'helpMenu',
        "text": "leave today at /",
        //"style": "primary",
        "type": "button",
        "value": "leave"
    }, {
        "name": 'helpMenu',
        "text": "Leave today from/ to/",
        //"style": "primary",
        "type": "button",
        "value": "leave"
    }


]
exports.timeOffPredefinedActions = timeOffPredefinedActions
//

/**
 * 
 */
var WfhActions = [
    {
        "name": "helpMenu",
        "text": "WFH today",
        // "style": "primary",
        "type": "button",
        "value": "WFH today"
    }, {
        "name": 'helpMenu',
        "text": "WFH tomorrow",
        // "style": "primary",
        "type": "button",
        "value": "WFH tomorrow"
    }

]
exports.WfhActions = WfhActions
var CancelVacationActions = [

    {
        "name": 'helpMenu',
        "text": "Show pending",
        // "style": "primary",
        "type": "button",
        "value": "Show pending"
    },
    {
        "name": 'helpMenu',
        "text": "Cancel vacation",
        // "style": "primary",
        "type": "button",
        "value": "Show pending"
    },

]
exports.CancelVacationActions = CancelVacationActions
var FamilyDeathActions = [
    {
        "name": "helpMenu",
        "text": "Family death today",
        // "style": "primary",
        "type": "button",
        "value": "Family death today"
    }, {
        "name": 'helpMenu',
        "text": "Family death yesterday",
        // "style": "primary",
        "type": "button",
        "value": "Family death yesterday"
    }

]
exports.FamilyDeathActions = FamilyDeathActions;
/**
 * 
 */
var holidayAction = [
    {
        "name": "helpMenu",
        "text": "Show holidays",
        // "style": "primary",
        "type": "button",
        "value": "Show holidays"
    }, {
        "name": 'helpMenu',
        "text": "Show next holiday",
        // "style": "primary",
        "type": "button",
        "value": "Show next holiday"
    }

]

/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
exports.holidayAction = holidayAction;
/**
 * 
 */
var rulesAction = [
    {
        "name": "helpMenu",
        "text": "Submission rules",
        // "style": "primary",
        "type": "button",
        "value": "Submission rules"
    },

]
module.exports.rulesAction = rulesAction

/*


*/
var sickRulesActions = [
    {
        "name": "helpMenu",
        "text": "Sick rules",
        // "style": "primary",
        "type": "button",
        "value": "Sick rules"
    },

]
module.exports.sickRulesActions = sickRulesActions

/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
var fromDateToDate = [
    {
        "name": "fromDateToDate",
        "text": "time off from/ to/",
        // "style": "primary",
        "type": "button",
        "value": "Submission rules"
    },

]
module.exports.fromDateToDate = fromDateToDate


/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
var maternityActions = [
    {
        "name": "Maternity vacation from/ to/",
        "text": "Maternity vacation from/ to/",
        // "style": "primary",
        "type": "button",
        "value": "Maternity vacation from/ to/"
    },
    {
        "name": "Maternity vacation from /",
        "text": "Maternity vacation from /",
        // "style": "primary",
        "type": "button",
        "value": "Maternity vacation"
    },

]
module.exports.maternityActions = maternityActions
/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
var weddingyActions = [
    {
        "name": "Wedding vacation on date",
        "text": "Wedding vacation on date",
        // "style": "primary",
        "type": "button",
        "value": "Wedding vacation on date"
    },

]
module.exports.weddingyActions = weddingyActions
module.exports.commentFieldInManagerMessageFunction = function commentFieldInManagerMessageFunction(comment) {
    var commentFieldInManagerMessage = ""
    if (comment != "") {
        commentFieldInManagerMessage = {
            "title": "Comment",
            "value": comment,
            "short": true
        }
    }
    return commentFieldInManagerMessage;
}
/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
var paternityActions = [
    {
        "name": "Paternity vacation today",
        "text": "Paternity vacation today",
        // "style": "primary",
        "type": "button",
        "value": "Paternity vacation"
    },
    {
        "name": "Paternity vacation on date ",
        "text": "Paternity vacation on date ",
        // "style": "primary",
        "type": "button",
        "value": "Paternity vacation"
    },

]
module.exports.paternityActions = paternityActions
/******************
 * 
 * */
var hajActions = [
    {
        "name": "Haj vacation on date",
        "text": "Haj vacation on date",
        // "style": "primary",
        "type": "button",
        "value": "haj vacation"
    }

]
module.exports.hajActions = hajActions
/******************
/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
module.exports.dont_detuct_button_Function = function dont_detuct_button_Function(userEmail, vacationId, approvalId, managerEmail, startDate, endDate, type, workingDays, ImageUrl) {
    var dont_detuct_button = {
        "name": "dont_detuct",
        "text": "Don’t Deduct ",
        "type": "button",
        "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl
    }

    return dont_detuct_button;
}


/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
module.exports.Slack_Channel_Function = function Slack_Channel_Function(managerChannelId, slackUserId, teamId) {
    var message12 = {
        'type': 'message',
        'channel': managerChannelId,
        user: slackUserId,
        text: 'what is my name',
        team: teamId,
        event: 'direct_message',
        as_user: false

    }
    return message12;
}

/******************
 * 
 * 
 * 
 * 
 * 
 * 
 *****************/
module.exports.sendVacationToManagerFunction = function sendVacationToManagerFunction(comment, ImageUrl, userEmail, startDate, workingDays, endDate, type, approver2State, vacationId, approvalId, managerEmail, managerApprovalMessage, YourActionMessage) {
    console.log("sendVacationToManagerFunction" + managerApprovalMessage)
    var reject_with_comment_button = {
        "name": "reject_with_comment",
        "text": "Reject with comment",
        "style": "danger",
        "type": "button",
        "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl + ";" + "Pending" + ";" + "Pending" + ";" + "Pending"
    }
    //  managerApprovalMessage = JSON.parse(managerApprovalMessage)

    var dont_detuct_button = stringFile.dont_detuct_button_Function(userEmail, vacationId, approvalId, managerEmail, startDate, endDate, type, workingDays, ImageUrl);

    var actions_based_on_type = dont_detuct_button
    if (type == "WFH") {
        actions_based_on_type = ""
        reject_with_comment_button = ""
    }
    if (type == "sick") {

        reject_with_comment_button = ""
        actions_based_on_type = {
            "name": "accept_with_report",
            "text": "Accept with report",

            "type": "button",
            "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl
        }
    }
    var commentFieldInManagerMessage = stringFile.commentFieldInManagerMessageFunction(comment);
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
                        "title": "Type",
                        "value": type,
                        "short": true
                    }, YourActionMessage,
                    managerApprovalMessage,
                    commentFieldInManagerMessage,

                    {
                        "title": "Final state",
                        "value": "PendingManagerApproval :thinking_face:",
                        "short": false
                    }
                ],
                "actions": [
                    {
                        "name": "confirm",
                        "text": "Accept",
                        "style": "primary",
                        "type": "button",
                        "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl + ";" + "Pending" + ";" + "Pending" + ";" + "Pending"
                    }, actions_based_on_type,
                    {
                        "name": "reject",
                        "text": "Reject",
                        "style": "danger",
                        "type": "button",
                        "value": userEmail + ";" + vacationId + ";" + approvalId + ";" + managerEmail + ";employee" + ";" + startDate + ";" + endDate + ";" + type + ";" + workingDays + ";" + ImageUrl + ";" + "Pending" + ";" + "Pending" + ";" + "Pending"
                    }, reject_with_comment_button,

                    {
                        "name": "check_state",
                        "text": ":arrows_counterclockwise:",

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
    console.log("stringfy1122" + stringfy)
    // stringfy = stringfy.replace(/\\/, "")
    // stringfy = JSON.parse(stringfy)


    return JSON.parse(stringfy);
}
//HR notification on sick  vacation
module.exports.sendNotificationToHrOnSick = function sendNotificationToHrOnSick(comment, ImageUrl, userEmail, startDate, workingDays, endDate, type, approver2State, vacationId, approvalId, managerEmail) {
    var commentFieldInManagerMessage = stringFile.commentFieldInManagerMessageFunction(comment);
    var messageBody = {
        "text": "",
        "attachments": [
            {
                "attachment_type": "default",
                "callback_id": "manager_confirm_reject",
                "text": userEmail + " has requested a sick time off from  " + startDate + " to " + endDate,
                "fallback": "ReferenceError",


            }
        ]
    }
    return messageBody;
}
//One day left message 
module.exports.oneDayLeftSickJsonMessage = function oneDayLeftSickJsonMessage(messageFB, email, vacationId, fromDateWord, toDateWord) {
    var message = {
        "text": "",
        "attachments": [
            {
                "text": messageFB,
                "callback_id": 'cancel_request',
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "upload_sick_report",
                        "text": "Upload sick report ",
                        "type": "button",
                        "value": email + ";" + vacationId + ";" + fromDateWord + ";" + toDateWord + ";" + messageFB

                    }
                ]
            }
        ]
    }
    return message
}
//Pending vacation message
module.exports.pendingVacationMessage = function pendingVacationMessage(email, vacationId, managerApproval, fromDate, toDate, type, fromDateWord, toDateWord) {
    console.log(type)
    console.log(fromDateWord)
    console.log(toDateWord)
    var type1 = env.vacationType.getVacationType(type)

    var message = {
        "text": "*" + type1 + "*",
        "attachments": [
            {
                "text": "",
                "callback_id": 'cancel_request',
                "color": "#3AA3E3",
                "attachment_type": "default",
                "fields": [
                    {
                        "title": "From date",
                        "value": fromDateWord,
                        "short": true
                    },
                    {
                        "title": "To date",
                        "value": toDateWord,
                        "short": true

                    }
                ],
                "actions": [
                    {
                        "name": 'cancel',
                        "text": "Cancel Request",
                        "style": "danger",
                        "type": "button",
                        "value": email + ";" + vacationId + ";" + JSON.stringify(managerApproval) + ";" + fromDateWord + ";" + toDateWord + ";" + type1

                    }
                ]
            }
        ]
    }
    return message;
}
//Upload sick vacation message 
module.exports.sickNeedReportMessage = function sickNeedReportMessage(email, vacationId, fromDate, toDate, fromDateWord, toDateWord) {
    console.log(fromDateWord)
    console.log(toDateWord)
    //  var type1 = env.vacationType.getVacationType(type)
    var messageFB = "Sick vacation from " + fromDateWord + " to " + toDateWord

    var message = {
        "text": "",
        "attachments": [
            {
                "text": "",
                "callback_id": 'cancel_request',
                "color": "#3AA3E3",
                "attachment_type": "default",
                "fields": [
                    {
                        "title": "From date",
                        "value": fromDateWord,
                        "short": true
                    },
                    {
                        "title": "To date",
                        "value": toDateWord,
                        "short": true

                    }
                ],
                "actions": [
                    {
                        "name": "upload_sick_report",
                        "text": "Upload sick report ",
                        "type": "button",
                        "value": email + ";" + vacationId + ";" + fromDate + ";" + toDate + ";" + messageFB
                    }
                ]
            }
        ]
    }
    return message;
}
//One dat left info message 
module.exports.oneDayLeftInfoMessage = function oneDayLeftInfoMessage(fromDateWord, toDateWord) {
    var message = "[Reminder] You have one day left to submit a sick report for your vacation from ( " + fromDateWord + " to " + toDateWord + " ). Otherwise it will be considered as personal vacation."
    return message
}
/**
 * Np approvers message
 */
/**
 * 
 * 
 * 
 */
module.exports.sick_report_link = function sick_report_link(vacationId) {
    var sick_report = "<http://46.43.71.50:19090/reports?vId=" + vacationId + "|link>"
    return sick_report;
}
var noApproversMessage = "You dont have any approver right now "
exports.noApproversMessage = noApproversMessage

/**
 * 
 * 
 * history message
 */
module.exports.historyMessage = function historyMessage(userEmail, startDate,
    workingDays, endDate, type,
    managerApprovalMessage, vacationState, sickConvertedToPersonal, sickReport, vacationId) {
    var sick_report_field = ""

    console.log("sickReport" + sickReport)
    if (sickReport == 1) {
        sick_report_field =
            {
                "title": "Sick report ",
                "value": env.stringFile.sick_report_link(vacationId),
                "short": false

            }
    }
    var sickConvertedToPersonalEmoji = ""
    var sickConvertedToPersonalMsg = ""

    if (sickConvertedToPersonal == true) {
        sickConvertedToPersonalEmoji = ":small_blue_diamond: "

        sickConvertedToPersonalMsg = "(Converted from sick )."
    }
    var color = "#439FE0"
    if (vacationState == "Rejected") {
        color = "danger"
    } else if (vacationState == "Approved") {
        color = "good"
    }
    var type1 = env.vacationType.getVacationType(type)

    //"#3AA3E3"//blue

    var messageBody = {
        "text": "",
        "attachments": [
            {
                "attachment_type": "default",
                "callback_id": "manager_confirm_reject",
                "text": "",
                "color": color,
                "fallback": "ReferenceError",
                "fields": [
                    {
                        "title": "From",
                        "value": startDate,
                        "short": true
                    },
                    {
                        "title": "Days/Time ",
                        "value": parseFloat(workingDays).toFixed(2) + " week/s",
                        "short": true
                    },
                    {
                        "title": "to",
                        "value": endDate,
                        "short": true
                    },
                    {
                        "title": "Type",
                        "value": sickConvertedToPersonalEmoji + "" + type1 + " " + sickConvertedToPersonalMsg,
                        "short": true
                    },
                    managerApprovalMessage,
                    sick_report_field,



                    {
                        "title": "Final state",
                        "value": vacationState,
                        "short": false
                    }
                ],

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
    console.log("stringfy1122" + stringfy)
    // stringfy = stringfy.replace(/\\/, "")
    // stringfy = JSON.parse(stringfy)


    return JSON.parse(stringfy);
}