var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";
if (event.request.method == "GET" && event.request.parameters.type == "namespace" && event.resource == "category") {
    var url = host
        + "sidm/_table/NAMESPACES" +
        "?fields=ID%2C%20DESCRIPTION%2C%20ADVERT%2C%20EVENT_CONTENT" +
        "%2C%20ADDED_ON%2C%20SUM_SCORE%2C%20COMMENTS_COUNT%2C%20GOOGLE_PLACE_ID%2C%20INSTANCE" +
        "%2C%20LATITUDE%2C%20LONGITUDE%2C%20NAME" +
        "&related=CATEGORY%2CNAMESPACES_PHOTOS" +
        "&filter=CATEGORY_ID%3D" +
        event.request.parameters.category +
        "&limit=" +
        event.request.parameters.limit +
        "&offset=" +
        event.request.parameters.offset +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
            var record = {
                "namespaces": JSON.parse(body).resource
            };
            event.setResponse(record, response.statusCode, 'applicaton/json');
        } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 0) {
            //event.setResponse({"errorType": "namespaceNotFound"}, 404, 'applicaton/json');
            event.setResponse({"namespaces": []}, response.statusCode, 'applicaton/json');
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "GET" && event.request.parameters.type == "place" && event.resource == "namespace") {
    var url = host
        + "sidm/_table/PLACES" +
        "?fields=ID%2C%20DESCRIPTION%2C%20ADVERT%2C%20EVENT_CONTENT" +
        "%2C%20ADDED_ON%2C%20SUM_SCORE%2C%20COMMENTS_COUNT%2C%20GOOGLE_PLACE_ID%2C%20INSTANCE%2C%20NAME" +
        "&related=PLACES_PHOTOS" +
        "&filter=NAMESPACE_ID%3D" +
        event.request.parameters.namespaceid +
        "&limit=" +
        event.request.parameters.limit +
        "&offset=" +
        event.request.parameters.offset +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
            var record = {
                "places": JSON.parse(body).resource
            };
            event.setResponse(record, response.statusCode, 'applicaton/json');
        } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 0) {
            //event.setResponse({"errorType": "placeNotFound"}, 404, 'applicaton/json');
            event.setResponse({"places": []}, response.statusCode, 'applicaton/json');
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "GET" && event.request.parameters.type == "namespace" && event.resource == "event") {
    var url = host +
        "sidm/_table/NAMESPACES" +
        "?fields=ID%2C%20NAME%2C%20EVENT_CONTENT%2C%20EVENT_END%2C%20EVENT_NAME" +
        "&filter=INSTANCE%3D" +
        event.request.parameters.namespace +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            var res = {
                "namespace": JSON.parse(body).resource[0]
            }
            url = host +
                "sidm/_table/PLACES" +
                "?fields=ID%2C%20NAME%2C%20EVENT_CONTENT%2C%20EVENT_END%2C%20EVENT_NAME" +
                "&filter=NAMESPACE_ID%3D" +
                JSON.parse(body).resource[0].ID +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    res.places = JSON.parse(body).resource;
                    event.setResponse(res, response.statusCode, 'applicaton/json');
                } else {
                    event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                }
            });
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "GET" && event.request.parameters.type == "place" && event.resource == "") {
    var url = host +
        "sidm/_table/NAMESPACES" +
        "?fields=ID%2C%20DESCRIPTION%2C%20ADVERT%2C%20EVENT_CONTENT%2C%20ADDED_ON" +
        "%2C%20SUM_SCORE%2C%20COMMENTS_COUNT%2C%20GOOGLE_PLACE_ID%2C%20INSTANCE" +
        "%2C%20LATITUDE%2C%20LONGITUDE%2C%20NAME" +
        "&related=CATEGORY%2CNAMESPACES_PHOTOS" +
        "&filter=INSTANCE%3D" +
        event.request.parameters.namespace +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            var record = {
                "namespace": JSON.parse(body).resource[0]
            };
            url = host
                + "sidm/_table/PLACES" +
                "?fields=ID%2C%20DESCRIPTION%2C%20ADVERT%2C%20EVENT_CONTENT%2C%20NAME" +
                "%2C%20ADDED_ON%2C%20SUM_SCORE%2C%20COMMENTS_COUNT%2C%20GOOGLE_PLACE_ID%2C%20INSTANCE" +
                "&related=PLACES_PHOTOS" +
                "&filter=INSTANCE%3D" +
                event.request.parameters.place +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    record.place = JSON.parse(body).resource[0];
                    event.setResponse(record, response.statusCode, 'applicaton/json');
                } else {
                    event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                }
            });
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (event.request.method == "GET" && event.request.parameters.type == "namespace" && event.resource == "") {

    var url = host +
        "sidm/_table/NAMESPACES" +
        "?fields=ID%2C%20DESCRIPTION%2C%20ADVERT%2C%20EVENT_CONTENT%2C%20ADDED_ON" +
        "%2C%20SUM_SCORE%2C%20COMMENTS_COUNT%2C%20GOOGLE_PLACE_ID%2C%20INSTANCE" +
        "%2C%20LATITUDE%2C%20LONGITUDE%2C%20NAME" +
        "&related=CATEGORY%2CNAMESPACES_PHOTOS" +
        "&filter=INSTANCE%3D" +
        event.request.parameters.namespace +
        "&" + apiKeyScript;
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            var record = {
                "namespace": JSON.parse(body).resource[0]
            };
            event.setResponse(record, response.statusCode, 'applicaton/json');
        } else {
            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
        }
    });
} else if (!(event.request.method == "GET" && event.request.parameters.type == "place")
    && !(event.request.method == "GET" && event.request.parameters.type == "namespace")) {
    throw new Error("Wrong type");
} else {
    throw new Error("Only HTTP GET is allowed on this service.");
}