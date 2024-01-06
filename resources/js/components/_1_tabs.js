Util.addClass = function(el, className) {
    var classList = className.split(' ');
    el.classList.add(classList[0]);
    if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
    var classList = className.split(' ');
    el.classList.remove(classList[0]);
    if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.addClass = function(el, className) {
    var classList = className.split(' ');
    el.classList.add(classList[0]);
    if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
    if(bool) Util.addClass(el, className);
    else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

Util.hasClass = function(el, className) {
    return el.classList.contains(className);
};

Util.getChildrenByClassName = function(el, className) {
    var children = el.children,
        childrenByClass = [];
    for (var i = 0; i < children.length; i++) {
        if (Util.hasClass(children[i], className)) childrenByClass.push(children[i]);
    }
    return childrenByClass;
};

Util.getIndexInArray = function(array, el) {
    return Array.prototype.indexOf.call(array, el);
};


// File#: _1_tabs
// Usage: codyhouse.co/license
(function() {
    var Tab = function(element) {
        this.element = element;
        this.tabList = this.element.getElementsByClassName('js-tabs__controls')[0];
        this.listItems = this.tabList.getElementsByTagName('li');
        this.triggers = this.tabList.getElementsByTagName('a');
        this.panelsList = this.element.getElementsByClassName('js-tabs__panels')[0];
        this.panels = Util.getChildrenByClassName(this.panelsList, 'js-tabs__panel');
        this.hideClass = this.element.getAttribute('data-hide-panel-class') ? this.element.getAttribute('data-hide-panel-class') : 'hidden';
        this.customShowClass = this.element.getAttribute('data-show-panel-class') ? this.element.getAttribute('data-show-panel-class') : false;
        this.layout = this.element.getAttribute('data-tabs-layout') ? this.element.getAttribute('data-tabs-layout') : 'horizontal';
        // deep linking options
        this.deepLinkOn = this.element.getAttribute('data-deep-link') == 'on';
        // init tabs
        this.initTab();
    };

    Tab.prototype.initTab = function() {
        //set initial aria attributes
        this.tabList.setAttribute('role', 'tablist');
        Util.addClass(this.element, 'tabs--no-interaction');

        for( var i = 0; i < this.triggers.length; i++) {
            var bool = (i == 0),
                panelId = this.panels[i].getAttribute('id');
            this.listItems[i].setAttribute('role', 'presentation');
            Util.setAttributes(this.triggers[i], {'role': 'tab', 'aria-selected': bool, 'aria-controls': panelId, 'id': 'tab-'+panelId});
            Util.addClass(this.triggers[i], 'js-tabs__trigger');
            Util.setAttributes(this.panels[i], {'role': 'tabpanel', 'aria-labelledby': 'tab-'+panelId});
            Util.toggleClass(this.panels[i], this.hideClass, !bool);
            if(bool && this.customShowClass) Util.addClass(this.panels[i], this.customShowClass);

            if(!bool) this.triggers[i].setAttribute('tabindex', '-1');
        }

        //listen for Tab events
        this.initTabEvents();

        // check deep linking option
        this.initDeepLink();
    };

    Tab.prototype.initTabEvents = function() {
        var self = this;
        //click on a new tab -> select content
        this.tabList.addEventListener('click', function(event) {
            if( event.target.closest('.js-tabs__trigger') ) self.triggerTab(event.target.closest('.js-tabs__trigger'), event);
        });
        //arrow keys to navigate through tabs
        this.tabList.addEventListener('keydown', function(event) {
            ;
            if( !event.target.closest('.js-tabs__trigger') ) return;
            if( tabNavigateNext(event, self.layout) ) {
                event.preventDefault();
                self.selectNewTab('next');
            } else if( tabNavigatePrev(event, self.layout) ) {
                event.preventDefault();
                self.selectNewTab('prev');
            }
        });
    };

    Tab.prototype.selectNewTab = function(direction) {
        var selectedTab = this.tabList.querySelector('[aria-selected="true"]'),
            index = Util.getIndexInArray(this.triggers, selectedTab);
        index = (direction == 'next') ? index + 1 : index - 1;
        //make sure index is in the correct interval
        //-> from last element go to first using the right arrow, from first element go to last using the left arrow
        if(index < 0) index = this.listItems.length - 1;
        if(index >= this.listItems.length) index = 0;
        this.triggerTab(this.triggers[index]);
        this.triggers[index].focus();
    };

    Tab.prototype.triggerTab = function(tabTrigger, event) {
        var self = this;
        event && event.preventDefault();
        var index = Util.getIndexInArray(this.triggers, tabTrigger);
        //no need to do anything if tab was already selected
        if(this.triggers[index].getAttribute('aria-selected') == 'true') return;

        Util.removeClass(this.element, 'tabs--no-interaction');

        for( var i = 0; i < this.triggers.length; i++) {
            var bool = (i == index);
            Util.toggleClass(this.panels[i], this.hideClass, !bool);
            if(this.customShowClass) Util.toggleClass(this.panels[i], this.customShowClass, bool);
            this.triggers[i].setAttribute('aria-selected', bool);
            bool ? this.triggers[i].setAttribute('tabindex', '0') : this.triggers[i].setAttribute('tabindex', '-1');
        }

        // update url if deepLink is on
        if(this.deepLinkOn) {
            history.replaceState(null, '', '#'+tabTrigger.getAttribute('aria-controls'));
        }
    };

    Tab.prototype.initDeepLink = function() {
        if(!this.deepLinkOn) return;
        var hash = window.location.hash.substr(1);
        var self = this;
        if(!hash || hash == '') return;
        for(var i = 0; i < this.panels.length; i++) {
            if(this.panels[i].getAttribute('id') == hash) {
                this.triggerTab(this.triggers[i], false);
                setTimeout(function(){self.panels[i].scrollIntoView(true);});
                break;
            }
        };
    };

    function tabNavigateNext(event, layout) {
        if(layout == 'horizontal' && (event.keyCode && event.keyCode == 39 || event.key && event.key == 'ArrowRight')) {return true;}
        else if(layout == 'vertical' && (event.keyCode && event.keyCode == 40 || event.key && event.key == 'ArrowDown')) {return true;}
        else {return false;}
    };

    function tabNavigatePrev(event, layout) {
        if(layout == 'horizontal' && (event.keyCode && event.keyCode == 37 || event.key && event.key == 'ArrowLeft')) {return true;}
        else if(layout == 'vertical' && (event.keyCode && event.keyCode == 38 || event.key && event.key == 'ArrowUp')) {return true;}
        else {return false;}
    };

    window.Tab = Tab;

    //initialize the Tab objects
    var tabs = document.getElementsByClassName('js-tabs');
    if( tabs.length > 0 ) {
        for( var i = 0; i < tabs.length; i++) {
            (function(i){new Tab(tabs[i]);})(i);
        }
    }
}());
