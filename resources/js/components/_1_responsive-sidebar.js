import { Util } from '../_util.js';

// File#: _1_responsive-sidebar
// Usage: codyhouse.co/license
(function() {
    var Sidebar = function(element) {
        this.element = element;
        this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.selectedTrigger = null;
        this.showClass = "sidebar--is-visible";
        this.staticClass = "sidebar--static";
        this.customStaticClass = "";
        this.readyClass = "sidebar--loaded";
        this.contentReadyClass = "sidebar-loaded:show";
        this.layout = false; // this will be static or mobile
        this.preventScrollEl = getPreventScrollEl(this);
        getCustomStaticClass(this); // custom classes for static version
        initSidebar(this);
    };

    function getPreventScrollEl(element) {
        var scrollEl = false;
        var querySelector = element.element.getAttribute('data-sidebar-prevent-scroll');
        if(querySelector) scrollEl = document.querySelector(querySelector);
        return scrollEl;
    };

    function getCustomStaticClass(element) {
        var customClasses = element.element.getAttribute('data-static-class');
        if(customClasses) element.customStaticClass = ' '+customClasses;
    };

    function initSidebar(sidebar) {
        initSidebarResize(sidebar); // handle changes in layout -> mobile to static and viceversa

        if ( sidebar.triggers ) { // open sidebar when clicking on trigger buttons - mobile layout only
            for(var i = 0; i < sidebar.triggers.length; i++) {
                sidebar.triggers[i].addEventListener('click', function(event) {
                    event.preventDefault();
                    toggleSidebar(sidebar, event.target);
                });
            }
        }

        // use the 'openSidebar' event to trigger the sidebar
        sidebar.element.addEventListener('openSidebar', function(event) {
            toggleSidebar(sidebar, event.detail);
        });
    };

    function toggleSidebar(sidebar, target) {
        if(Util.hasClass(sidebar.element, sidebar.showClass)) {
            sidebar.selectedTrigger = target;
            closeSidebar(sidebar);
            return;
        }
        sidebar.selectedTrigger = target;
        showSidebar(sidebar);
        initSidebarEvents(sidebar);
    };

    function showSidebar(sidebar) { // mobile layout only
        Util.addClass(sidebar.element, sidebar.showClass);
        getFocusableElements(sidebar);
        Util.moveFocus(sidebar.element);
        // change the overflow of the preventScrollEl
        if(sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = 'hidden';
    };

    function closeSidebar(sidebar) { // mobile layout only
        Util.removeClass(sidebar.element, sidebar.showClass);
        sidebar.firstFocusable = null;
        sidebar.lastFocusable = null;
        if(sidebar.selectedTrigger) sidebar.selectedTrigger.focus();
        sidebar.element.removeAttribute('tabindex');
        //remove listeners
        cancelSidebarEvents(sidebar);
        // change the overflow of the preventScrollEl
        if(sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = '';
    };

    function initSidebarEvents(sidebar) { // mobile layout only
        //add event listeners
        sidebar.element.addEventListener('keydown', handleEvent.bind(sidebar));
        sidebar.element.addEventListener('click', handleEvent.bind(sidebar));
    };

    function cancelSidebarEvents(sidebar) { // mobile layout only
        //remove event listeners
        sidebar.element.removeEventListener('keydown', handleEvent.bind(sidebar));
        sidebar.element.removeEventListener('click', handleEvent.bind(sidebar));
    };

    function handleEvent(event) { // mobile layout only
        switch(event.type) {
            case 'click': {
                initClick(this, event);
            }
            case 'keydown': {
                initKeyDown(this, event);
            }
        }
    };

    function initKeyDown(sidebar, event) { // mobile layout only
        if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
            //close sidebar window on esc
            closeSidebar(sidebar);
        } else if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
            //trap focus inside sidebar
            trapFocus(sidebar, event);
        }
    };

    function initClick(sidebar, event) { // mobile layout only
        //close sidebar when clicking on close button or sidebar bg layer
        if( !event.target.closest('.js-sidebar__close-btn') && !Util.hasClass(event.target, 'js-sidebar') ) return;
        event.preventDefault();
        closeSidebar(sidebar);
    };

    function trapFocus(sidebar, event) { // mobile layout only
        if( sidebar.firstFocusable == document.activeElement && event.shiftKey) {
            //on Shift+Tab -> focus last focusable element when focus moves out of sidebar
            event.preventDefault();
            sidebar.lastFocusable.focus();
        }
        if( sidebar.lastFocusable == document.activeElement && !event.shiftKey) {
            //on Tab -> focus first focusable element when focus moves out of sidebar
            event.preventDefault();
            sidebar.firstFocusable.focus();
        }
    };

    function initSidebarResize(sidebar) {
        // custom event emitted when window is resized - detect only if the sidebar--static@{breakpoint} class was added
        var beforeContent = getComputedStyle(sidebar.element, ':before').getPropertyValue('content');
        if(beforeContent && beforeContent !='' && beforeContent !='none') {
            checkSidebarLayout(sidebar);

            sidebar.element.addEventListener('update-sidebar', function(event){
                checkSidebarLayout(sidebar);
            });
        }
        // check if there a main element to show
        var mainContent = document.getElementsByClassName(sidebar.contentReadyClass);
        if(mainContent.length > 0) Util.removeClass(mainContent[0], sidebar.contentReadyClass);
        Util.addClass(sidebar.element, sidebar.readyClass);
    };

    function checkSidebarLayout(sidebar) {
        var layout = getComputedStyle(sidebar.element, ':before').getPropertyValue('content').replace(/\'|"/g, '');
        if(layout == sidebar.layout) return;
        sidebar.layout = layout;
        if(layout != 'static') Util.addClass(sidebar.element, 'hidden');
        Util.toggleClass(sidebar.element, sidebar.staticClass + sidebar.customStaticClass, layout == 'static');
        if(layout != 'static') setTimeout(function(){Util.removeClass(sidebar.element, 'hidden')});
        // reset element role
        (layout == 'static') ? sidebar.element.removeAttribute('role', 'alertdialog') :  sidebar.element.setAttribute('role', 'alertdialog');
        // reset mobile behaviour
        if(layout == 'static' && Util.hasClass(sidebar.element, sidebar.showClass)) closeSidebar(sidebar);
    };

    function getFocusableElements(sidebar) {
        //get all focusable elements inside the drawer
        var allFocusable = sidebar.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
        getFirstVisible(sidebar, allFocusable);
        getLastVisible(sidebar, allFocusable);
    };

    function getFirstVisible(sidebar, elements) {
        //get first visible focusable element inside the sidebar
        for(var i = 0; i < elements.length; i++) {
            if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
                sidebar.firstFocusable = elements[i];
                return true;
            }
        }
    };

    function getLastVisible(sidebar, elements) {
        //get last visible focusable element inside the sidebar
        for(var i = elements.length - 1; i >= 0; i--) {
            if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
                sidebar.lastFocusable = elements[i];
                return true;
            }
        }
    };

    window.Sidebar = Sidebar;

    //initialize the Sidebar objects
    var sidebar = document.getElementsByClassName('js-sidebar');
    if( sidebar.length > 0 ) {
        for( var i = 0; i < sidebar.length; i++) {
            (function(i){new Sidebar(sidebar[i]);})(i);
        }
        // switch from mobile to static layout
        var customEvent = new CustomEvent('update-sidebar');
        window.addEventListener('resize', function(event){
            (!window.requestAnimationFrame) ? setTimeout(function(){resetLayout();}, 250) : window.requestAnimationFrame(resetLayout);
        });

        (window.requestAnimationFrame) // init sidebar layout
            ? window.requestAnimationFrame(resetLayout)
            : resetLayout();

        function resetLayout() {
            for( var i = 0; i < sidebar.length; i++) {
                (function(i){sidebar[i].dispatchEvent(customEvent)})(i);
            };
        };
    }
}());
