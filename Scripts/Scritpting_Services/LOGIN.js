/*
 * Skrypt sluzacy do zalogowania uzytkownika i rozrozniania bledow logowania (ban, konto nieaktywne, brak konta)
 *
 */

if (event.request.method !== "POST") {
    throw new Error("Only HTTP POST is allowed on this service.");
}

var url = "user/session";
var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "&api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";
var options = null;

platform.api.post(url, event.request.payload, '', function (body, response) {
    if (response.statusCode == 200) {
        event.setResponse(JSON.parse(body), 200, 'application/json');
        //sprawdzenie aktywnej licencji
        url = host
            + "SIDM/_table/USERS"
            + "?filter=SYSTEM_ID%3D"
            + JSON.parse(body).id
            + apiKeyScript;
        platform.api.get(url, '', function (body, response) {
            if (response.statusCode == 200
                && JSON.parse(body).resource.length == 1
                && JSON.parse(body).resource[0].SERIAL_CODE_ID != null) {

                url = host
                    + "SIDM/_table/SERIAL_CODES"
                    + "?filter=ID%3D"
                    + JSON.parse(body).resource[0].SERIAL_CODE_ID
                    + ")"
                    + apiKeyScript;

                platform.api.get(url, '', function (body, response) {
                    if (response.statusCode == 200
                        && JSON.parse(body).resource.length == 1
                        && JSON.parse(body).resource[0].ACTIVE == true) {

                        event.response.content.LICENSE = true;
                        event.setResponse(event.response.content, 200, 'application/json');
                    } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 1
                        && JSON.parse(body).resource[0].ACTIVE == false) {
                        event.response.content.LICENSE = false;
                        event.setResponse(event.response.content, 200, 'application/json');
                    } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 0) {
                        event.response.content.LICENSE = false;
                        event.setResponse(event.response.content, 200, 'application/json');
                    } else {
                        event.setResponse({"errorType": "somethingWentWrogn"}, 500, 'application/json');
                    }
                });
            } else if (response.statusCode == 200
                && JSON.parse(body).resource.length == 1
                && JSON.parse(body).resource[0].SERIAL_CODE_ID == null) {
                event.response.content.LICENSE = false;
                event.setResponse(event.response.content, 200, 'application/json');
            } else {
                event.setResponse({"errorType": "userNotInTable"}, 404, 'application/json');
            }
        });
    } else {
        //sprawdzenie powodu niezalogowania
        url = host
            + "system/user?fields=last_login_date%2Cis_active%2Cconfirm_code&filter=email%3D"
            + event.request.payload.email
            + apiKeyScript;

        platform.api.get(url, '', function (body, response) {
            if (response.statusCode == 200
                && JSON.parse(body).resource.length == 1
                && JSON.parse(body).resource[0].is_active == 0) {

                event.setResponse({"errorType": "accountBanned"}, 403, 'application/json');

            } else if (response.statusCode == 200
                && JSON.parse(body).resource.length == 1
                && JSON.parse(body).resource[0].is_active == 1
                && JSON.parse(body).resource[0].confirm_code != "y"
                && JSON.parse(body).resource[0].last_login_date == null) {

                event.setResponse({"errorType": "accountNotActivated"}, 401, 'application/json');

            } else if (response.statusCode == 200 && JSON.parse(body).resource.length == 0) {

                event.setResponse({"errorType": "accountNotExist"}, 404, 'application/json');

            } else if (response.statusCode == 200) {

                event.setResponse({"errorType": "wrongPassword"}, 401, 'application/json');

            } else {

                event.setResponse({"errorType": "query_error"}, 500, 'application/json');

            }
        });
    }
});