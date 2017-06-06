var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";

if (event.request.method == "POST" && event.resource == "add") {
    url = host + "sidm/_table/COMMENTS" +
        "?" + apiKeyScript;
    platform.api.post(url, event.request.payload, '', function (body, response) {
        if (response.statusCode == 200) {
            var record = {
                "comment": JSON.parse(body).resource[0]
            };
            event.setResponse(record, response.statusCode, 'applicaton/json');
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "GET" && event.resource === "" && event.request.parameters.type == "namespace") {
    url = host + "sidm/_table/COMMENTS" +
        "?filter=(TYPE%3DNAMESPACE)AND(NAMESPACES_ID%3D" +
        event.request.parameters.id + ")" +
        "&related=USER" +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
            var record = {
                "comments": JSON.parse(body).resource
            };
            event.setResponse(record, response.statusCode, 'applicaton/json');
        } else if (response.statusCode == 200 && JSON.parse(body).resource.length === 0) {
            event.setResponse({"comments": []}, response.statusCode, 'applicaton/json');
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "GET" && event.resource === "" && event.request.parameters.type == "place") {
    url = host + "sidm/_table/COMMENTS" +
        "?filter=(TYPE%3DPLACE)AND(PLACES_ID%3D" +
        event.request.parameters.id + ")" +
        "&related=USER" +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
            var record = {
                "comments": JSON.parse(body).resource
            };
            event.setResponse(record, response.statusCode, 'applicaton/json');
        } else if (response.statusCode == 200 && JSON.parse(body).resource.length === 0) {
            event.setResponse({"comments": []}, response.statusCode, 'applicaton/json');
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (!(event.request.method == "GET" || event.request.method == "POST")) {
    throw new Error("Only HTTP POST and GET are allowed on this service.");
} else {
    throw new Error("Bad request");
}
