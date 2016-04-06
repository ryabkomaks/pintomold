;(function() {

    var app = this;

    app.COOKIES = {
        LOGGED_IN: 'pintomold.loggedIn',
        COMPARE_LIST: 'pintomold.compareList'
    };

    app.EVENTS = {
        LOG_IN: 'logIn',
        LOG_OUT: 'logOut'
    };

    app.SESSION_VARS = {
        IS_WIDE_BANNER_CLOSED: 'isWideBannerClosed'
    };

    app.LOCAL_STORAGE = {
        SHIPPING_CONSIGNMENT_ADDRESSES: 'shippingConsignmentAddresses'
    };

}).call(window.pintomold = window.pintomold || {});
