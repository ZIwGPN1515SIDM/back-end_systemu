var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";

if (event.request.method == "GET" && event.request.parameters.type == "place") {
    var url = host +
        "sidm/_table/NAMESPACES" +
        "?filter=INSTANCE%3D" +
        event.request.parameters.namespace +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            var record = {
                "namespace": JSON.parse(body).resource[0]
            };
            url = host +
                "sidm/_table/NAMESPACES_PHOTOS" +
                "?fields=URL" +
                "&filter=NAMESPACE_ID%3D" +
                JSON.parse(body).resource[0].ID +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    record.namespacePhotos = JSON.parse(body).resource;
                    url = host
                        + "sidm/_table/PLACES?" +
                        "?filter=INSTANCE%3D" +
                        event.request.parameters.place +
                        "&" + apiKeyScript;
                    platform.api.get(url, '', function (body, response) {
                        if (response.statusCode == 200) {
                            record.place = JSON.parse(body).resource[0];
                            url = host
                                + "sidm/_table/PLACES_PHOTOS" +
                                "?fields=URL" +
                                "&filter=PLACE_ID%3D" +
                                JSON.parse(body).resource[0].ID +
                                "&" + apiKeyScript;
                            platform.api.get(url, '', function (body, response) {
                                if (response.statusCode == 200) {
                                    record.placePhotos = JSON.parse(body).resource;
                                    event.setResponse(record, response.statusCode, 'applicaton/json');
                                } else {
                                    event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                                }
                            });
                        } else {
                            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                        }
                    });
                } else {
                    event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                }
            });
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "GET" && event.request.parameters.type == "namespace") {

    var url = host +
        "sidm/_table/NAMESPACES" +
        "?filter=INSTANCE%3D" +
        event.request.parameters.namespace +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            var record = {
                "namespace": JSON.parse(body).resource[0]
            };
            url = host +
                "sidm/_table/NAMESPACES_PHOTOS" +
                "?fields=URL" +
                "&filter=NAMESPACE_ID%3D" +
                JSON.parse(body).resource[0].ID +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    record.namespacePhotos = JSON.parse(body).resource;
                    event.setResponse(record, response.statusCode, 'applicaton/json');
                } else {
                    event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                }
            });
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "POST" && event.request.parameters.type == "place") {
    //TODO
} else if (event.request.method == "POST" && event.request.parameters.type == "namespace") {
    //TODO
} else if (!(event.request.method == "POST" && event.request.parameters.type == "place")
    && !(event.request.method == "POST" && event.request.parameters.type == "namespace")
    && !(event.request.method == "GET" && event.request.parameters.type == "place")
    && !(event.request.method == "GET" && event.request.parameters.type == "namespace")) {
    throw new Error("Wrong type");
} else {
    throw new Error("Only HTTP GET and POST is allowed on this service.");
}