var pintomold = pintomold || {};

// Avoid `console` errors in browsers that lack a console.
;(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

pintomold.utils = {
    //
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    //
    debounce: function (func, wait, immediate) {
        var timeout;
        
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    , poll: function (fn, callback, errback, timeout, interval) {
        var endTime = Number(new Date()) + (timeout || 2000);
        interval = interval || 100;

        (function p() {
                // If the condition is met, we're done! 
                if(fn()) {
                    callback();
                }
                // If the condition isn't met but the timeout hasn't elapsed, go again
                else if (Number(new Date()) < endTime) {
                    setTimeout(p, interval);
                }
                // Didn't match and too much time, reject!
                else {
                    errback(new Error('timed out for ' + fn + ': ' + arguments));
                }
        })();
    }

    , once: function (fn, context) { 
        var result;

        return function() { 
            if(fn) {
                result = fn.apply(context || this, arguments);
                fn = null;
            }

            return result;
        };
    }

    , loadFonts: function(){

        "use strict";
        // once cached, the css file is stored on the client forever unless
        // the URL below is changed. Any change will invalidate the cache
        var css_href = './index_files/web-fonts.css';
        
        // a simple event handler wrapper
        function on(el, ev, callback) {
            if (el.addEventListener) {
                el.addEventListener(ev, callback, false);
            } else if (el.attachEvent) {
                el.attachEvent("on" + ev, callback);
            }
        }
        // if we have the fonts in localStorage or if we've cached them using the native batrowser cache
        if ((window.localStorage && localStorage.font_css_cache) || document.cookie.indexOf('font_css_cache') > -1){
            // just use the cached version
            injectFontsStylesheet();
        } else {
            // otherwise, don't block the loading of the page; wait until it's done.
             on(window, "load", injectFontsStylesheet);
        }
        // quick way to determine whether a css file has been cached locally
        function fileIsCached(href) {
            return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href);
        }
        // time to get the actual css file
        function injectFontsStylesheet() {
        // if this is an older browser
        if (!window.localStorage || !window.XMLHttpRequest) {
            var stylesheet = document.createElement('link');
            stylesheet.href = css_href;
            stylesheet.rel = 'stylesheet';
            stylesheet.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(stylesheet);
            // just use the native browser cache
            // this requires a good expires header on the server
            document.cookie = "font_css_cache";
            // if this isn't an old browser
        } else {
            // use the cached version if we already have it
            if (fileIsCached(css_href)) {
                injectRawStyle(localStorage.font_css_cache);
                // otherwise, load it with ajax
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", css_href, true);
                // cater for IE8 which does not support addEventListener or attachEvent on XMLHttpRequest
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        // once we have the content, quickly inject the css rules
                        injectRawStyle(xhr.responseText);
                        // and cache the text content for further use
                        // notice that this overwrites anything that might have already been previously cached
                        localStorage.font_css_cache = xhr.responseText;
                        localStorage.font_css_cache_file = css_href;
                    }
                };
                xhr.send();
            }
        }
        }
        // this is the simple utitily that injects the cached or loaded css text
        function injectRawStyle(text) {
            var style = document.createElement('style');
            // cater for IE8 which doesn't support style.innerHTML
            style.setAttribute("type", "text/css");
            if (style.styleSheet) {
                style.styleSheet.cssText = text;
            } else {
                style.innerHTML = text;
            }
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        
    }

}

