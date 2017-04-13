var host = "http://graymanix.ovh/api/v2/";
var apiKeyScript = "api_key=486bcd2b0b7cc55fbc3c16f1aadf041686d9cf68ce726b55c7c4012bddaab0fe";

if (event.request.method == "GET" && event.resource == "place") {
    var url = host +
        "user/session?session_token=" +
        event.request.headers["x-dreamfactory-session-token"][0];
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            url = host +
                "sidm/_table/USERS?filter=SYSTEM_ID%3D" +
                JSON.parse(body).id +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    url = host +
                        "sidm/_table/PLACES" +
                        "?filter=OWNER_ID%3D" +
                        JSON.parse(body).resource[0].ID +
                        "&" + apiKeyScript;
                    platform.api.get(url, '', function (body, response) {
                        if (response.statusCode == 200) {
                            event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                        } else {
                            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                        }
                    });
                } else {
                    event.setResponse({
                        "error": {
                            "context": null,
                            "message": "User does not exists",
                            "code": 404
                        }
                    }, 404, 'application/json');
                }
            });
        } else {
            event.setResponse({
                "error": {
                    "context": null,
                    "message": "Session token does not exists",
                    "code": 404
                }
            }, 404, 'application/json');
        }
    });
} else if (event.request.method == "GET" && event.resource == "namespace") {
    var url = host +
        "user/session?session_token=" +
        event.request.headers["x-dreamfactory-session-token"][0];
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            url = host +
                "sidm/_table/USERS?filter=SYSTEM_ID%3D" +
                JSON.parse(body).id +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    url = host +
                        "sidm/_table/NAMESPACES" +
                        "?filter=OWNER_ID%3D" +
                        JSON.parse(body).resource[0].ID +
                        "&" + apiKeyScript;
                    platform.api.get(url, '', function (body, response) {
                        if (response.statusCode == 200) {
                            event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                        } else {
                            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                        }
                    });
                } else {
                    event.setResponse({
                        "error": {
                            "context": null,
                            "message": "User does not exists",
                            "code": 404
                        }
                    }, 404, 'application/json');
                }
            });
        } else {
            event.setResponse({
                "error": {
                    "context": null,
                    "message": "Session token does not exists",
                    "code": 404
                }
            }, 404, 'application/json');
        }
    });
} else if (event.request.method == "POST" && event.resource == "place/add") {
    var url = host +
        "user/session?session_token=" +
        event.request.headers["x-dreamfactory-session-token"][0];
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            url = host +
                "sidm/_table/USERS?filter=SYSTEM_ID%3D" +
                JSON.parse(body).id +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    url = host +
                        "sidm/_table/PLACES" +
                        "?fields=*" +
                        "&" + apiKeyScript;
                    event.request.payload.resource[0].OWNER_ID = JSON.parse(body).resource[0].ID;
                    platform.api.post(url, event.request.payload, '', function (body, response) {
                        if (response.statusCode == 200) {
                            event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                        } else {
                            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                        }
                    });
                } else {
                    event.setResponse({
                        "error": {
                            "context": null,
                            "message": "User does not exists",
                            "code": 404
                        }
                    }, 404, 'application/json');
                }
            });
        } else {
            event.setResponse({
                "error": {
                    "context": null,
                    "message": "Session token does not exists",
                    "code": 404
                }
            }, 404, 'application/json');
        }
    });
} else if (event.request.method == "POST" && event.resource == "namespace/add") {
    var url = host +
        "user/session?session_token=" +
        event.request.headers["x-dreamfactory-session-token"][0];
    platform.api.get(url, '', function (body, response) {
        if (response.statusCode == 200) {
            url = host +
                "sidm/_table/USERS?filter=SYSTEM_ID%3D" +
                JSON.parse(body).id +
                "&" + apiKeyScript;
            platform.api.get(url, '', function (body, response) {
                if (response.statusCode == 200) {
                    url = host +
                        "sidm/_table/NAMESPACES" +
                        "?fields=*" +
                        "&" + apiKeyScript;
                    event.request.payload.resource[0].OWNER_ID = JSON.parse(body).resource[0].ID;
                    platform.api.post(url, event.request.payload, '', function (body, response) {
                        if (response.statusCode == 200) {
                            event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                        } else {
                            event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                        }
                    });
                } else {
                    event.setResponse({
                        "error": {
                            "context": null,
                            "message": "User does not exists",
                            "code": 404
                        }
                    }, 404, 'application/json');
                }
            });
        } else {
            event.setResponse({
                "error": {
                    "context": null,
                    "message": "Session token does not exists",
                    "code": 404
                }
            }, 404, 'application/json');
        }
    });
} else if (event.request.method == "PATCH" && event.resource == "place/modify") {
    if (event.request.payload.resource[0].hasOwnProperty('ID') && event.request.payload.resource.length == 1) {
        var url = host +
            "user/session?session_token=" +
            event.request.headers["x-dreamfactory-session-token"][0];
        platform.api.get(url, '', function (body, response) {
            if (response.statusCode == 200) {
                url = host +
                    "sidm/_table/USERS?filter=SYSTEM_ID%3D" +
                    JSON.parse(body).id +
                    "&" + apiKeyScript;
                platform.api.get(url, '', function (body, response) {
                    if (response.statusCode == 200) {
                        var userId = JSON.parse(body).resource[0].ID;
                        url = host +
                            "sidm/_table/PLACES" +
                            "?filter=ID" +
                            event.request.payload.resource[0].ID +
                            "&" + apiKeyScript;
                        platform.api.get(url, '', function (body, response) {
                            if (response.statusCode == 200 && userId == JSON.parse(body).resource[0].OWNER_ID) {
                                url = host +
                                    "sidm/_table/PLACES" +
                                    "?" + apiKeyScript;
                                platform.api.patch(url, event.request.payload, '', function (body, response) {
                                    if (response.statusCode == 200) {
                                        event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                                    } else {
                                        event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                                    }
                                });
                            } else if (response.statusCode == 200) {
                                event.setResponse({"error": "user id mismatch"}, 400, 'applicaton/json');
                            } else {
                                event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                            }
                        });
                    } else {
                        event.setResponse({
                            "error": {
                                "context": null,
                                "message": "User does not exists",
                                "code": 404
                            }
                        }, 404, 'application/json');
                    }
                });
            } else {
                event.setResponse({
                    "error": {
                        "context": null,
                        "message": "Session token does not exists",
                        "code": 404
                    }
                }, 404, 'application/json');
            }
        });
    }
} else if (event.request.method == "PATCH" && event.resource == "namespace/modify") {
    if (event.request.payload.resource[0].hasOwnProperty('ID') && event.request.payload.resource.length == 1) {
        var url = host +
            "user/session?session_token=" +
            event.request.headers["x-dreamfactory-session-token"][0];
        platform.api.get(url, '', function (body, response) {
            if (response.statusCode == 200) {
                url = host +
                    "sidm/_table/USERS?filter=SYSTEM_ID%3D" +
                    JSON.parse(body).id +
                    "&" + apiKeyScript;
                platform.api.get(url, '', function (body, response) {
                    if (response.statusCode == 200) {
                        var userId = JSON.parse(body).resource[0].ID;
                        url = host +
                            "sidm/_table/NAMESPACES" +
                            "?filter=ID" +
                            event.request.payload.resource[0].ID +
                            "&" + apiKeyScript;
                        platform.api.get(url, '', function (body, response) {
                            if (response.statusCode == 200 && userId == JSON.parse(body).resource[0].OWNER_ID) {
                                url = host +
                                    "sidm/_table/NAMESPACES" +
                                    "?" + apiKeyScript;
                                platform.api.patch(url, event.request.payload, '', function (body, response) {
                                    if (response.statusCode == 200) {
                                        event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
                                    } else {
                                        event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                                    }
                                });
                            } else if (response.statusCode == 200) {
                                event.setResponse({"error": "user id mismatch"}, 400, 'applicaton/json');
                            } else {
                                event.setResponse(JSON.parse(body), JSON.parse(body).error.code, 'applicaton/json');
                            }
                        });
                    } else {
                        event.setResponse({
                            "error": {
                                "context": null,
                                "message": "User does not exists",
                                "code": 404
                            }
                        }, 404, 'application/json');
                    }
                });
            } else {
                event.setResponse({
                    "error": {
                        "context": null,
                        "message": "Session token does not exists",
                        "code": 404
                    }
                }, 404, 'application/json');
            }
        });
    }
} else if (event.request.method != "PATCH" && event.request.method != "POST" && event.request.method != "GET") {
    throw new Error("Only HTTP GET, PATCH and POST are allowed on this service.");
} else {
    throw new Error("Resource does not exist");
}