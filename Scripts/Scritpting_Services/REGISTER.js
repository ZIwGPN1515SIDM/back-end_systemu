/*
 * Skrypt sluzacy do rejestracji uzytkownika z uwzglednieniem sprawdzenia dlugosci nicku,
 * czy nick juz istnieje oraz czy mail juz jest zajety (customowe wiadomosci zwrotne)
 *
 */

if (event.request.method !== "POST") {
    throw new Error("Only HTTP POST is allowed on this service.");
}

var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";
var url = host + "system/user?filter=email%3D"
    + event.request.payload.email
    + "&" + apiKeyScript;

if (event.request.payload.name.length <= 3 || event.request.payload.name.length > 16) {
    event.setResponse({"errorType": "nick_wrong_length"}, 500, 'applicaton/json');
} else {
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
            event.setResponse({"errorType": "email_exists"}, 500, 'applicaton/json');
        } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 0) {
            var url = host + "system/user?filter=name%3D"
                + event.request.payload.name
                + "&" + apiKeyScript;

            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
                    event.setResponse({"errorType": "nick_exists"}, 500, 'applicaton/json');
                } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 0) {
                    platform.api.post(host + "user/register", event.request.payload, '',
                        function (body, response) {
                            if (response.statusCode == 200) {
                                event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                                url = host + "system/user?filter=name%3D"
                                    + event.request.payload.name
                                    + "&" + apiKeyScript;
                                platform.api.get(url, '', function (body, response) {
                                    if (response.statusCode == 200) {
                                        url = host
                                            + "sidm/_table/USERS?"
                                            + apiKeyScript;
                                        var record = {
                                            "resource": [
                                                {
                                                    "SYSTEM_ID": JSON.parse(body).resource[0].id
                                                }
                                            ]
                                        };
                                        platform.api.post(url, record, '', function (body, response) {
                                            if (response.statusCode != 200) {
                                                event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                                            }
                                        });
                                    }
                                });

                            } else {
                                event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                            }
                        });
                } else {
                    event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                }
            });

        } else {
            event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
        }
    });
}