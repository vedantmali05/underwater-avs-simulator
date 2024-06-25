/* ///////////////
    CONSTANTS DEFINITIONS
/////////////// */

export const STORAGE_KEYS = {
    inputs: "inputs",
    settings: "settings"
}

export const STATUS_HTTP_RESPONSE = {
    // Informational Responses (1xx)
    continue: 100,
    protocolSwitch: 101,
    processing: 102,
    // Successful Responses (2xx)
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    resetContent: 205,
    partialContent: 206,
    // Redirection Messages (3xx)
    multipleChoices: 300,
    movedPermanently: 301,
    found: 302,
    seeOther: 303,
    notModified: 304,
    temporaryRedirect: 307,
    permanentRedirect: 308, // Though not recommended, included for completeness
    // Client Error Responses (4xx)
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    requestTimeout: 408,
    conflict: 409,
    gone: 410,
    lengthRequired: 411,
    preconditionFailed: 412,
    payloadTooLarge: 413,
    uriTooLong: 414,
    unsupportedMediaType: 415,
    rangeNotSatisfiable: 416,
    expectationFailed: 417,
    // Server Error Responses (5xx)
    internalServerError: 500,
    badGateway: 502,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
    httpVersionNotSupported: 505,
}

// Input Status
export const UI_STATUS_FEEDBACK = {
    info: "info",
    success: "success",
    error: "error",
    warn: "warn"
}

// User THEME
export const UI_THEME = {
    light: 1,
    dark: 2
}

// UI Colors
export const UI_COLORS = {
    primary: {
        dark: "var(--clr-primary-dark)",
        base: "var(--clr-primary)",
        light: "var(--clr-primary-light)",
        hover: "var(--clr-primary-hover)",
        focus: "var(--clr-primary-focus)",
        gradient: "linear-gradient(90deg, var(--clr-primary-light), var(--clr-primary-dark))",
    },
    accent: {
        dark: "var(--clr-accent-dark)",
        base: "var(--clr-accent)",
        light: "var(--clr-accent-light)",
        hover: "var(--clr-accent-hover)",
        focus: "var(--clr-accent-focus)",
        gradient: "linear-gradient(-180deg, var(--clr-accent-light), var(--clr-accent-dark))",
    },
    black: {
        base: "var(--clr-black)",
        light: "var(--clr-black-light)",
    },
    white: "var(--clr-white)",
    grey: {
        text: "var(--clr-grey-text)",
        overlay: "var(--clr-grey-overlay)",
        divider: "var(--clr-grey-divider)",
        background: "var(--clr-grey-bg)",
        hover: "var(--clr-grey-hover)",
    },
    status: {
        info: {
            lightBackground: "var(--clr-status-info-light-bg)",
            darkBackground: "var(--clr-status-info-dark-bg)",
            lightText: "var(--clr-status-info-light-text)",
            darkText: "var(--clr-status-info-dark-text)",
        },
        success: {
            lightBackground: "var(--clr-status-success-light-bg)",
            darkBackground: "var(--clr-status-success-dark-bg)",
            lightText: "var(--clr-status-success-light-text)",
            darkText: "var(--clr-status-success-dark-text)",
        },
        warn: {
            lightBackground: "var(--clr-status-warn-light-bg)",
            darkBackground: "var(--clr-status-warn-dark-bg)",
            lightText: "var(--clr-status-warn-light-text)",
            darkText: "var(--clr-status-warn-dark-text)",
        },
        negative: {
            lightBackground: "var(--clr-status-negative-light-bg)",
            darkBackground: "var(--clr-status-negative-dark-bg)",
            lightText: "var(--clr-status-negative-light-text)",
            darkText: "var(--clr-status-negative-dark-text)",
        },
    },
};


// HTML UIs Classes
export const UI_CLASSES = {
    fieldset: "fieldset",
    info: "info",
    success: "success",
    error: "error",
    warn: "warn",
}

// HTML UI Size
export const UI_SIZE = {
    xs: "extra-small",
    s: "small",
    m: "medium",
    l: "large",
    xl: "extra-large",
}

// GRAPH
export const GRAPH_TYPE = {
    positional: "positional",
    spectrogram: "spectrogram",
    waveform: "waveform"
}

export const GRAPH_INDEX_ITEM_TYPE = {
    dot: "dot",
    icon: "icon",
    line: "line",
    dottedLine: "dottedLine"
}

/* ///////////////
    OTHER DATA
/////////////// */

// DATE AND TIME
export const TIME_WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const TIME_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];