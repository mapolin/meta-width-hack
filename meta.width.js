/*
    Usage:
        The script targets all <meta /> tags and looks for "name=viewport".
        If one with id="viewport-width" is present, it will use it as first choice and ignore all others.

        Once the tag is found it either replaces or appends: 
            if( "width=XXX" ) is present:
                content="width=[NUMBER,device-width] [, other content]" with
                content="width=MINIMUM_WIDTH [, other content]"
            else
                append "width=MINIMUM_WIDTH, " to the start
*/
// Change this to the minimum desired width you prefer
var MINIMUM_WIDTH = 640;

(function() {
    if(window.innerWidth < MINIMUM_WIDTH) {
        var tags = document.getElementById('viewport-width');
        function replace( element ) {
            if( element.getAttribute('content').match('width=') ) {
                var regex = ( element.getAttribute('content').indexOf(',') > -1 ) ? 
                    {end: ',', check: new RegExp(/^(width=[\s\S])(.*?),/)} : 
                    {end: '', check: new RegExp(/width=[\s\S]*/)};
                element.setAttribute('content', 
                    element.getAttribute('content').replace(regex.check, 'width=' + MINIMUM_WIDTH + regex.end)
                );
            }
            else {
                element.setAttribute('content', 
                    'width=' + MINIMUM_WIDTH + ', ' + element.getAttribute('content')
                );
            }
        }
        if( tags )
            if( tags.getAttribute('name') == 'viewport' )
                replace(tags);
        else {
            tags = document.getElementsByTagName('meta');
            for( var tag in tags ) {
                if( typeof tags[tag].getAttribute == 'function' )
                    if( tags[tag].getAttribute('name') == 'viewport' )
                        replace(tags[tag]);
            }
        }
    }
})();