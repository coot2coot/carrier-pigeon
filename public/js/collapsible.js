/***********************************************
*   COLLAPSIBLE.JS
*   Use: to vertically collapse div onclick
************************************************/

$('.expand').bind('click', function() {
    var $this = $(this),
        height = $this.height(),
        prevHeight = $this.data('prevHeight');
    if (prevHeight) {
        height = prevHeight;
        $this.data('prevHeight', undefined);
    } else {
        $this.data('prevHeight', height);
        height += 500;
    }
    $this.animate({
        height: height
    },1000);
});