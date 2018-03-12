



var getParametersForRequest = (idMethod, extraParameters)  => {

    extraParameters_size = (_.size(extraParameters));

    buildInputBase();

    if (extraParameters_size > 0) {
        $.extend(arrayParameters, extraParameters);
    }
    strToConvert = arrayParameters;
    strToConvert = JSON.stringify(strToConvert);
    var bytesArray = strToConvert;
    return bytesArray;
}


var getLocalUrl = (request) => {

    return request.protocol + '://' + request.get('host') + request.originalUrl;

}


module.exports = {
    getParametersForRequest,
    getLocalUrl
}