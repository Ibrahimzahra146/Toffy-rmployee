/**
 * 
 */
module.exports.helpMessageBody = function helpMessageBody(fields, actions) {
    var messageBody = {
        "text": "",
        "attachments": [
            {

                "pretext": "You can use on of the following expressions to engage with me:",
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
            "title": "Time off tomorrow ",
            "value": "",
            "short": false
        },
        {
            "title": "Time off or vacation from 3 may to 5 may ",
            "value": "",
            "short": false
        },
        {
            "title": "I want a vacation or time off tomorrow or next Monday  ",
            "value": "",
            "short": false
        },
        {
            "title": "I am sick today or i was sick yesterday ",
            "value": "",
            "short": false
        },
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
        ,
        {
            "title": "Family death today or yesterday ",
            "value": "",
            "short": false
        }

        ,
        {
            "title": "Show holidays or next holidays ",
            "value": "",
            "short": false
        }
        ,
        {
            "title": "Show time off submission rules ",
            "value": "",
            "short": false
        }
        ,
        {
            "title": "Work from home today or WFH from 5 May to 8 May ",
            "value": "",
            "short": false
        }
        ,
        {
            "title": "Tutorial video https://www.screencast.com/t/pPR0xftK",
            "value": "",
            "short": false
        }
    ]

exports.staticHelpFields = staticHelpFields;
/**
 * stats profile history actions
 */
var statsProfileHistoryActions = [
    {
        "name": 'Show_stats',
        "text": "Show stats",
        // "style": "primary",
        "type": "button",
        "value": ""
    }, {
        "name": 'Show_profile',
        "text": "Show profile",
        // "style": "primary",
        "type": "button",
        "value": ""
    },
    {
        "name": 'Show_history',
        "text": "Show history",
        //"style": "primary",
        "type": "button",
        "value": ""
    }
]
exports.statsProfileHistoryActions = statsProfileHistoryActions
/**
 * Time off help menu
 */
var timeOffPredefinedActions = [
    {
        "name": 'time_off_today',
        "text": "Time off today",
        // "style": "primary",
        "type": "button",
        "value": ""
    }, {
        "name": 'time_off_tomorrow',
        "text": "Time off tomorrow",
        // "style": "primary",
        "type": "button",
        "value": ""
    },
    {
        "name": 'sick_today',
        "text": "I am sick today",
        //"style": "primary",
        "type": "button",
        "value": ""
    }
    ,
    {
        "name": 'sick_tomorrow',
        "text": "I am sick tomorrow",
        //"style": "primary",
        "type": "button",
        "value": ""
    }

]
exports.timeOffPredefinedActions = timeOffPredefinedActions