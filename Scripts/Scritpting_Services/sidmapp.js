var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";
if (event.request.method == "POST" && event.resource == "user") {
    var url = host
        + "sidm/_table/FB_USERS" +
        "?fields=ID" +
        "&filter=EMAIL%3D" +
        event.request.payload.resource[0].EMAIL +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
            if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
                var res = {
                    "user": JSON.parse(body).resource[0]
                };
                event.setResponse(res, response.statusCode, 'applicaton/json');
            } else if (response.statusCode == 200) {
                url = host
                    + "sidm/_table/FB_USERS" +
                    "?fields=ID" +
                    "&" + apiKeyScript;
                platform.api.post(url, event.request.payload, '', function (body, response) {
                    if (response.statusCode == 200) {
                        var res = {
                            "user": JSON.parse(body).resource[0]
                        };
                        event.setResponse(res, response.statusCode, 'applicaton/json');
                    } else {
                        event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                    }
                });
            } else {
                event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
            }
        }
    );
}