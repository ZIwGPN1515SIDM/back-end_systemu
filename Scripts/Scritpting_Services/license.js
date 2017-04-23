var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";

if (event.request.method == "POST" && event.resource == "add") {
    var url = host + "sidm/_table/SERIAL_CODES" +
        "?filter=CODE%3D" +
        event.request.payload.resource[0].CODE +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200 && JSON.parse(body).resource.length > 0 && JSON.parse(body).resource[0].ACTIVE == true) {
            url = host + "sidm/_table/USERS" +
                "?" + apiKeyScript;

            var req = {
                "resource": [
                    {
                        "ID": event.request.payload.resource[0].USERSID,
                        "SERIAL_CODE_ID": JSON.parse(body).resource[0].ID
                    }
                ]
            };
            platform.api.patch(url, req, '', function (body, response) {
                if (response.statusCode == 200){
                    event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                } else{
                    event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                }
            });
        } else if (response.statusCode == 200) {
            event.setResponse({"error": "codeNotExists"}, 404, 'applicaton/json');
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else {
    throw new Error("Only HTTP POST is allowed on this service.");
}
