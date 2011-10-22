
$(function() {
    resizeTextarea();
    var converter = new Showdown.converter();
    $('.write textarea').focus();
    $('.write').keyup(function(e) {
        $('.preview').html(converter.makeHtml($('.write textarea').val()));
    });
});

// After bones-document and http://james.padolsey.com/javascript/jquery-plugin-autoresize
// --------------------------------------------------------------------------------------
var resizeTextarea = function() {
    var textarea = $('.write textarea');
    var clone = (function(){
            return textarea.clone().removeAttr('id').removeAttr('name').css({
                position: 'absolute',
                top: 0,
                left: -9999,
                height: 0,
                minHeight: 0,
                width: textarea.css('width'),
                paddingTop: $.browser.msie ? 0 : textarea.css('paddingTop'),
                paddingRight: $.browser.msie ? 0 : textarea.css('paddingRight'),
                paddingBottom: $.browser.msie ? 0 : textarea.css('paddingBottom'),
                paddingLeft: $.browser.msie ? 0 : textarea.css('paddingLeft'),
                lineHeight: textarea.css('lineHeight'),
                textDecoration: textarea.css('textDecoration'),
                letterSpacing: textarea.css('letterSpacing')
            }).attr('tabIndex','-1').insertBefore(textarea);
        })(),
        updateSize = function() {
            // Update clone.
            clone.val($(this).val()).scrollTop(10000);
            // Find scrolling height of text in clone and update
            var height = clone.scrollTop();
            if (!$.browser.msie) {
                padding = textarea.css('padding-top');
                height += padding ? parseInt(padding.replace(/px$/, '')) : 0;
                padding = textarea.css('padding-bottom');
                height += padding ? parseInt(padding.replace(/px$/, '')) : 0;
            }
            // Add extra padding to the bottom of the textarea
            // to simulate an extra line.
            height += parseInt(clone.css('line-height').replace(/px$/, ''));

            $(this).height(height);
        };
    textarea
        .bind('keyup', updateSize)
        .bind('keydown', updateSize)
        .bind('change', updateSize);
    updateSize.call(textarea);
};
