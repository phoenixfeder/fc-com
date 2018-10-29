
export const jsonProperty = {
    "backend" : {
        "ip":"localhost",
        "port":"8080"
    },
    "frontend" : {
        "ip":"localhost",
        "port":"3000"
    }
};

export var backendBaseURL = 'http://' + jsonProperty.backend.ip + ':' + jsonProperty.backend.port;