exports.messageData = function Message(status, message, data)
{
    var mess = {Status: status, Message: message, Data: data};

    return mess;
}

exports.message = function Message(status, message)
{
    var mess = {Status: status, Message: message};

    return mess;
}

exports.isJson = function IsJson(str)
{
    try
    {
        JSON.parse(str);
        return true;
    }
    catch(e)
    {
        return false;
    }
}

exports.isEmptyObject = function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}