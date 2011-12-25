
$(function() {
    var converter = new Showdown.converter();
    $('.write textarea').focus();
    $('.write').keyup(function(e) {
        $('.preview').html(converter.makeHtml($('.write textarea').val()));
    });
    var repos = function(e) {
        var breaks = 0;
        try {
            breaks = $("#input")
                .val()
                .substr(
                    0,
                    $("#input").getCursorPosition()
                )
                .match(/\n\s*\n/g)
                .length;
        } catch(e) {}
        console.log(breaks);
    };
    $('#input').keyup(repos);
    $('#input').mouseup(repos);
});

// http://stackoverflow.com/questions/1891444/how-can-i-get-cursor-position-in-a-textarea
new function($) {
$.fn.getCursorPosition = function() {
    var pos = 0;
    var el = $(this).get(0);
    // IE Support
    if (document.selection) {
        el.focus();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
    }
    // Firefox support
    else if (el.selectionStart || el.selectionStart == '0')
        pos = el.selectionStart;

    return pos;
}
} (jQuery);
