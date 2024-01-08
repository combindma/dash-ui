// File#: _1_tooltip
// Usage: codyhouse.co/license
(function() {
    var Tooltip = function(element) {
        this.element = element;
        this.tooltip = false;
        this.tooltipIntervalId = false;
        this.tooltipContent = this.element.getAttribute('title');
        this.tooltipPosition = (this.element.getAttribute('data-tooltip-position')) ? this.element.getAttribute('data-tooltip-position') : 'top';
        this.tooltipClasses = (this.element.getAttribute('data-tooltip-class')) ? this.element.getAttribute('data-tooltip-class') : false;
        this.tooltipId = 'js-tooltip-element'; // id of the tooltip element -> trigger will have the same aria-describedby attr
        // there are cases where you only need the aria-label -> SR do not need to read the tooltip content (e.g., footnotes)
        this.tooltipDescription = (this.element.getAttribute('data-tooltip-describedby') && this.element.getAttribute('data-tooltip-describedby') == 'false') ? false : true;

        this.tooltipDelay = this.element.getAttribute('data-tooltip-delay'); // show tooltip after a delay (in ms)
        if(!this.tooltipDelay) this.tooltipDelay = 300;
        this.tooltipDelta = parseInt(this.element.getAttribute('data-tooltip-gap')); // distance beetwen tooltip and trigger element (in px)
        if(isNaN(this.tooltipDelta)) this.tooltipDelta = 10;
        this.tooltipTriggerHover = false;
        // tooltp sticky option
        this.tooltipSticky = (this.tooltipClasses && this.tooltipClasses.indexOf('tooltip--sticky') > -1);
        this.tooltipHover = false;
        if(this.tooltipSticky) {
            this.tooltipHoverInterval = false;
        }
        // tooltip triangle - css variable to control its position
        this.tooltipTriangleVar = '--tooltip-triangle-translate';
        resetTooltipContent(this);
        initTooltip(this);
    };

    function resetTooltipContent(tooltip) {
        var htmlContent = tooltip.element.getAttribute('data-tooltip-title');
        if(htmlContent) {
            tooltip.tooltipContent = htmlContent;
        }
    };

    function initTooltip(tooltipObj) {
        // reset trigger element
        tooltipObj.element.removeAttribute('title');
        tooltipObj.element.setAttribute('tabindex', '0');
        // add event listeners
        tooltipObj.element.addEventListener('mouseenter', handleEvent.bind(tooltipObj));
        tooltipObj.element.addEventListener('focus', handleEvent.bind(tooltipObj));
    };

    function removeTooltipEvents(tooltipObj) {
        // remove event listeners
        tooltipObj.element.removeEventListener('mouseleave',  handleEvent.bind(tooltipObj));
        tooltipObj.element.removeEventListener('blur',  handleEvent.bind(tooltipObj));
    };

    function handleEvent(event) {
        // handle events
        switch(event.type) {
            case 'mouseenter':
            case 'focus':
                showTooltip(this, event);
                break;
            case 'mouseleave':
            case 'blur':
                checkTooltip(this);
                break;
            case 'newContent':
                changeTooltipContent(this, event);
                break;
        }
    };

    function showTooltip(tooltipObj, event) {
        // tooltip has already been triggered
        if(tooltipObj.tooltipIntervalId) return;
        tooltipObj.tooltipTriggerHover = true;
        // listen to close events
        tooltipObj.element.addEventListener('mouseleave', handleEvent.bind(tooltipObj));
        tooltipObj.element.addEventListener('blur', handleEvent.bind(tooltipObj));
        // custom event to reset tooltip content
        tooltipObj.element.addEventListener('newContent', handleEvent.bind(tooltipObj));

        // show tooltip with a delay
        tooltipObj.tooltipIntervalId = setTimeout(function(){
            createTooltip(tooltipObj);
        }, tooltipObj.tooltipDelay);
    };

    function createTooltip(tooltipObj) {
        tooltipObj.tooltip = document.getElementById(tooltipObj.tooltipId);

        if( !tooltipObj.tooltip ) { // tooltip element does not yet exist
            tooltipObj.tooltip = document.createElement('div');
            document.body.appendChild(tooltipObj.tooltip);
        }

        // remove data-reset attribute that is used when updating tooltip content (newContent custom event)
        tooltipObj.tooltip.removeAttribute('data-reset');

        // reset tooltip content/position
        Util.setAttributes(tooltipObj.tooltip, {'id': tooltipObj.tooltipId, 'class': 'tooltip tooltip--is-hidden js-tooltip', 'role': 'tooltip'});
        tooltipObj.tooltip.innerHTML = tooltipObj.tooltipContent;
        if(tooltipObj.tooltipDescription) tooltipObj.element.setAttribute('aria-describedby', tooltipObj.tooltipId);
        if(tooltipObj.tooltipClasses) Util.addClass(tooltipObj.tooltip, tooltipObj.tooltipClasses);
        if(tooltipObj.tooltipSticky) Util.addClass(tooltipObj.tooltip, 'tooltip--sticky');
        placeTooltip(tooltipObj);
        Util.removeClass(tooltipObj.tooltip, 'tooltip--is-hidden');

        // if tooltip is sticky, listen to mouse events
        if(!tooltipObj.tooltipSticky) return;
        tooltipObj.tooltip.addEventListener('mouseenter', function cb(){
            tooltipObj.tooltipHover = true;
            if(tooltipObj.tooltipHoverInterval) {
                clearInterval(tooltipObj.tooltipHoverInterval);
                tooltipObj.tooltipHoverInterval = false;
            }
            tooltipObj.tooltip.removeEventListener('mouseenter', cb);
            tooltipLeaveEvent(tooltipObj);
        });
    };

    function tooltipLeaveEvent(tooltipObj) {
        tooltipObj.tooltip.addEventListener('mouseleave', function cb(){
            tooltipObj.tooltipHover = false;
            tooltipObj.tooltip.removeEventListener('mouseleave', cb);
            hideTooltip(tooltipObj);
        });
    };

    function placeTooltip(tooltipObj) {
        // set top and left position of the tooltip according to the data-tooltip-position attr of the trigger
        var dimention = [tooltipObj.tooltip.offsetHeight, tooltipObj.tooltip.offsetWidth],
            positionTrigger = tooltipObj.element.getBoundingClientRect(),
            position = [],
            scrollY = window.scrollY || window.pageYOffset;

        position['top'] = [ (positionTrigger.top - dimention[0] - tooltipObj.tooltipDelta + scrollY), (positionTrigger.right/2 + positionTrigger.left/2 - dimention[1]/2)];
        position['bottom'] = [ (positionTrigger.bottom + tooltipObj.tooltipDelta + scrollY), (positionTrigger.right/2 + positionTrigger.left/2 - dimention[1]/2)];
        position['left'] = [(positionTrigger.top/2 + positionTrigger.bottom/2 - dimention[0]/2 + scrollY), positionTrigger.left - dimention[1] - tooltipObj.tooltipDelta];
        position['right'] = [(positionTrigger.top/2 + positionTrigger.bottom/2 - dimention[0]/2 + scrollY), positionTrigger.right + tooltipObj.tooltipDelta];

        var direction = tooltipObj.tooltipPosition;
        if( direction == 'top' && position['top'][0] < scrollY) direction = 'bottom';
        else if( direction == 'bottom' && position['bottom'][0] + tooltipObj.tooltipDelta + dimention[0] > scrollY + window.innerHeight) direction = 'top';
        else if( direction == 'left' && position['left'][1] < 0 )  direction = 'right';
        else if( direction == 'right' && position['right'][1] + dimention[1] > window.innerWidth ) direction = 'left';

        // reset tooltip triangle translate value
        tooltipObj.tooltip.style.setProperty(tooltipObj.tooltipTriangleVar, '0px');

        if(direction == 'top' || direction == 'bottom') {
            var deltaMarg = 5;
            if(position[direction][1] < 0 ) {
                position[direction][1] = deltaMarg;
                // make sure triangle is at the center of the tooltip trigger
                tooltipObj.tooltip.style.setProperty(tooltipObj.tooltipTriangleVar, (positionTrigger.left + 0.5*positionTrigger.width - 0.5*dimention[1] - deltaMarg)+'px');
            }
            if(position[direction][1] + dimention[1] > window.innerWidth ) {
                position[direction][1] = window.innerWidth - dimention[1] - deltaMarg;
                // make sure triangle is at the center of the tooltip trigger
                tooltipObj.tooltip.style.setProperty(tooltipObj.tooltipTriangleVar, (0.5*dimention[1] - (window.innerWidth - positionTrigger.right) - 0.5*positionTrigger.width + deltaMarg)+'px');
            }
        }
        tooltipObj.tooltip.style.top = position[direction][0]+'px';
        tooltipObj.tooltip.style.left = position[direction][1]+'px';
        Util.addClass(tooltipObj.tooltip, 'tooltip--'+direction);
    };

    function checkTooltip(tooltipObj) {
        tooltipObj.tooltipTriggerHover = false;
        if(!tooltipObj.tooltipSticky) hideTooltip(tooltipObj);
        else {
            if(tooltipObj.tooltipHover) return;
            if(tooltipObj.tooltipHoverInterval) return;
            tooltipObj.tooltipHoverInterval = setTimeout(function(){
                hideTooltip(tooltipObj);
                tooltipObj.tooltipHoverInterval = false;
            }, 300);
        }
    };

    function hideTooltip(tooltipObj) {
        if(tooltipObj.tooltipHover || tooltipObj.tooltipTriggerHover) return;
        clearInterval(tooltipObj.tooltipIntervalId);
        if(tooltipObj.tooltipHoverInterval) {
            clearInterval(tooltipObj.tooltipHoverInterval);
            tooltipObj.tooltipHoverInterval = false;
        }
        tooltipObj.tooltipIntervalId = false;
        if(!tooltipObj.tooltip) return;
        // hide tooltip
        removeTooltip(tooltipObj);
        // remove events
        removeTooltipEvents(tooltipObj);
    };

    function removeTooltip(tooltipObj) {
        if(tooltipObj.tooltipContent == tooltipObj.tooltip.innerHTML || tooltipObj.tooltip.getAttribute('data-reset') == 'on') {
            Util.addClass(tooltipObj.tooltip, 'tooltip--is-hidden');
            tooltipObj.tooltip.removeAttribute('data-reset');
        }
        if(tooltipObj.tooltipDescription) tooltipObj.element.removeAttribute('aria-describedby');
    };

    function changeTooltipContent(tooltipObj, event) {
        if(tooltipObj.tooltip && tooltipObj.tooltipTriggerHover && event.detail) {
            tooltipObj.tooltip.innerHTML = event.detail;
            tooltipObj.tooltip.setAttribute('data-reset', 'on');
            placeTooltip(tooltipObj);
        }
    };

    window.Tooltip = Tooltip;

    //initialize the Tooltip objects
    var tooltips = document.getElementsByClassName('js-tooltip-trigger');
    if( tooltips.length > 0 ) {
        for( var i = 0; i < tooltips.length; i++) {
            (function(i){new Tooltip(tooltips[i]);})(i);
        }
    }
}());
