var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";
if (event.request.method == "GET") {
    var url = host
        + "sidm/_table/CATEGORIES" +
        "?" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            var res = {
                "categories": JSON.parse(body).resource
            };
            event.setResponse(res, response.statusCode, 'applicaton/json');
        } else {
            event.setResponse({"errorType": "categoriesNotFound"}, 404, 'applicaton/json');
        }
    });
} else {
    throw new Error("Only HTTP GET is allowed on this service.");
}