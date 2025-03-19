export class Util {
    /* class manipulation functions */
    static hasClass = function(el, className) {
        return el.classList.contains(className);
    };

    static addClass = function(el, className) {
        var classList = className.split(' ');
        el.classList.add(classList[0]);
        if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
    };

    static removeClass = function(el, className) {
        var classList = className.split(' ');
        el.classList.remove(classList[0]);
        if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
    };

    static toggleClass = function(el, className, bool) {
        if(bool) Util.addClass(el, className);
        else Util.removeClass(el, className);
    };

    static setAttributes = function(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };

    /* DOM manipulation */
    static getChildrenByClassName = function(el, className) {
        var children = el.children,
            childrenByClass = [];
        for (var i = 0; i < children.length; i++) {
            if (Util.hasClass(children[i], className)) childrenByClass.push(children[i]);
        }
        return childrenByClass;
    };

    static is = function(elem, selector) {
        if(selector.nodeType){
            return elem === selector;
        }

        var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
            length = qa.length;

        while(length--){
            if(qa[length] === elem){
                return true;
            }
        }

        return false;
    };

    /* Animate height of an element */
    static setHeight = function(start, to, element, duration, cb, timeFunction) {
        var change = to - start,
            currentTime = null;

        var animateHeight = function(timestamp){
            if (!currentTime) currentTime = timestamp;
            var progress = timestamp - currentTime;
            if(progress > duration) progress = duration;
            var val = parseInt((progress/duration)*change + start);
            if(timeFunction) {
                val = Math[timeFunction](progress, start, to - start, duration);
            }
            element.style.height = val+"px";
            if(progress < duration) {
                window.requestAnimationFrame(animateHeight);
            } else {
                if(cb) cb();
            }
        };

        //set the height of the element before starting animation -> fix bug on Safari
        element.style.height = start+"px";
        window.requestAnimationFrame(animateHeight);
    };

    /* Smooth Scroll */
    static scrollTo = function(final, duration, cb, scrollEl) {
        var element = scrollEl || window;
        var start = element.scrollTop || document.documentElement.scrollTop,
            currentTime = null;

        if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;

        var animateScroll = function(timestamp){
            if (!currentTime) currentTime = timestamp;
            var progress = timestamp - currentTime;
            if(progress > duration) progress = duration;
            var val = Math.easeInOutQuad(progress, start, final-start, duration);
            element.scrollTo(0, val);
            if(progress < duration) {
                window.requestAnimationFrame(animateScroll);
            } else {
                cb && cb();
            }
        };

        window.requestAnimationFrame(animateScroll);
    };

    /* Move Focus */
    static moveFocus = function (element) {
        if( !element ) element = document.getElementsByTagName("body")[0];
        element.focus();
        if (document.activeElement !== element) {
            element.setAttribute('tabindex','-1');
            element.focus();
        }
    };

    /* Misc */

    static getIndexInArray = function(array, el) {
        return Array.prototype.indexOf.call(array, el);
    };

    static cssSupports = function(property, value) {
        return CSS.supports(property, value);
    };

    // merge a set of user options into plugin defaults
    // https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
    static extend = function() {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for ( var prop in obj ) {
                if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                    // If deep merge and property is an object, merge properties
                    if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                        extended[prop] = extend( true, extended[prop], obj[prop] );
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for ( ; i < length; i++ ) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    // Check if Reduced Motion is enabled
    static osHasReducedMotion = function() {
        if(!window.matchMedia) return false;
        var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
        if(matchMediaObj) return matchMediaObj.matches;
        return false; // return false if not supported
    };
}
