;(function(window, document, $, _) {

    var app = this;

    app.observers = {};

    app.noop = function() {
        return '';
    };

    app.triggeredEvents = [];

    /**
     * Trigger an event and alert all observers of the event
     *
     * @param {string} eventType The type of the event to trigger.
     * @param {object} eventOptions An object with relevant named parameters
     *
     * @return The pubsub object.
     */
    app.trigger = function __trigger__(eventType, eventOptions, context, callback) {
        // Use a timeout to allow for events to be asynchronous
        setTimeout(function() {
            var observers = app.observers[eventType];
            var i;

            if (observers) {
                i = observers.length;

                while (i--) {
                    if (typeof observers[i] === 'function') {
                        observers[i].call(context, eventOptions);
                    }
                }
            }

            if (callback) {
                callback();
            }
        }, 0);

        app.triggeredEvents = _.union(app.triggeredEvents, [eventType]);

        return app;
    };

    /**
     * Subscribe to an event. Callback will be called and passed any
     * eventOptions when the event is triggered.
     *
     * @param {string} eventType The type of event to subscribe to.
     * @param {function} callback The function called when even triggered
     *
     * @return {Object} The pubsub object.
     */
    app.subscribe = function __subscribe__(eventType, callback) {
        var observers = app.observers;

        if (!(eventType in observers)) {
            observers[eventType] = [];
        }

        observers[eventType].push(callback);

        return app;
    };

    /**
     * Unsubscribe from an event.
     *
     * @param {string} eventType name of event subscribed to
     * @param {function} handler Function that is currently subscribed (optional)
     *
     * @return {Object} The pubsub object.
     */
    app.unsubscribe = function __unsubscribe__(eventType, handler) {
        var observers = app.observers[eventType];
        var i;

        if (observers && observers.length) {
            i = observers.length;

            while (i--) {
                if (!handler || observers[i] === handler) {
                    observers.splice(i, 1);
                }
            }
        }

        return app;
    };

    /**
     * Subscribe to an event then unsubscribe after the event is triggered once.
     *
     * @param {string} eventType The type of event to subscribe to.
     * @param {function} callback To be called when the event is triggered.
     *
     * @return {Object} The pubsub object.
     */
    app.once = function __once__(eventType, callback) {
        var wrappedCallback = function(eventOptions) {
            callback(eventOptions);
            app.unsubscribe(eventType, wrappedCallback);
        };

        this.subscribe(eventType, wrappedCallback);

        return app;
    };

}).call(window.pintomold = window.pintomold || {}, window, document, window.jQuery, window._);
