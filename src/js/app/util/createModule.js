;(function(window, document, $, undefined) {

    var app = this;

    /**
     * Take an element and convert it and its contents into a module.
     *
     * This script expects the element to have a "data-module-type" attribute
     * specifying which module constructor to use.
     *
     * @param {HTMLElement} $element The containing element of the module.
     *
     * @return {object} The object representing the module.
     */

    app.createModule = function __createModule__($element) {
        var moduleTypes = $element.data('module-type').split(' ');
        var module = null;
        var modules = app.modules || {};
        var start = $.now();
        var end;

        moduleTypes.forEach(function(moduleType) {

            if (app[moduleType] && typeof app[moduleType] === 'function') {
                try {
                    module = new app[moduleType]($element);

                    // Store a reference of the module object on the element
                    $.data($element[0], moduleType, module);

                    end = $.now();

                    //console.log('─', moduleType, 'module loaded in', end - start, 'ms.');
                } catch (e) {
                    console.error('Attempted to initialize a', moduleType, 'module using', $element[0], 'but there was an error:', e);
                }

            } else {
                console.error('Module', moduleType, 'not found');
            }

            if (module) {
                if (modules[moduleType] === undefined) {
                    modules[moduleType] = [];
                }

                modules[moduleType].push(module);
            }
        });

        app.modules = modules;
    };

}).call(window.pintomold = window.pintomold || {}, window, document, window.jQuery);
