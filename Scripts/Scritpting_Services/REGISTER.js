/*
 * Skrypt sluzacy do rejestracji uzytkownika z uwzglednieniem sprawdzenia dlugosci nicku,
 * czy nick juz istnieje oraz czy mail juz jest zajety (customowe wiadomosci zwrotne)
 *
 */

if (event.request.method !== "POST") {
    throw new Error("Only HTTP POST is allowed on this service.");
}

var url = "http://graymanix.ovh/api/v2/system/user?filter=email%3D"
    + event.request.payload.email
    + "&api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";

if (event.request.payload.name.length <= 3 || event.request.payload.name.length > 16) {
    event.setResponse({"errorType": "nick_wrong_length"}, 500, 'applicaton/json');
} else {
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            if (JSON.parse(body).resource.length > 0) {
                event.setResponse({"errorType": "email_exists"}, 500, 'applicaton/json');
            } else {

                var url = "http://graymanix.ovh/api/v2/system/user?filter=name%3D"
                    + event.request.payload.name
                    + "&api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";

                platform.api.get(url, '', function (body, response) {
                    if (response.statusCode == 200 && JSON.parse(body).resource.length > 0) {
                        event.setResponse({"errorType": "nick_exists"}, 500, 'applicaton/json');
                    } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 0) {
                        platform.api.post("http://graymanix.ovh/api/v2/user/register", event.request.payload, '',
                            function (body, response) {
                                event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                            })
                    } else {
                        event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                    }
                });
            }
        } else {
            event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
        }
    });
}