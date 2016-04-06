;(function(window, document, $, Modernizr, _){
	var app = this;

	// Configs and 3rd-party libs to be initialized BEFORE app modules are loaded
	var beforeModules = function beforeModules() {}

	// Configs and 3rd-party libs to be initialized AFTER app modules are loaded
    var afterModules = function afterModules() {}

	/**
     * Bootstrap the app, and initialize the appropriate modules.
     *
     * @return {Object} app
     */

    app.start = function __start__() {
        app.modules = app.modules || {};

        beforeModules();

        // Instantiate all modules
        var moduleElements = $('[data-module-type]');

        moduleElements.each(function() {
            var $module = $(this);

            _.merge(app.modules, app.createModule($module));
        });

        afterModules();

        // Overwrite the start function so that it cannot be called again.
        // If it is called again, log the attempt to console.
        app.start = function() {
            if (console && console.trace) {
                console.trace();
            }

            console.log('Warning: Attempting to run start function more than once!');
        };

        return app;
    };

    // Lights, Camera, Action!
    jQuery(app.start);


}).call(window.pintomold = window.pintomold || {}, window, document, window.jQuery, window.Modernizr, window._);