 $.fn.stick = function(handler) {
     var $cur = this,
         offsetTop = $cur.offset().top,
         offsetLeft = $cur.offset().left,
         $curWidth = $cur.width();

     // onChange = handler || function() {};

     var $clone = $cur.clone().insertBefore($cur).css('opacity', 0).hide();

     $(window).on('scroll', function() {
         if ($(this).scrollTop() >= offsetTop) {
             if (!isFixed()) {
                 setFix();
                 // onChange.call($cur);
             }
         } else {
             if (isFixed()) {
                 removeFix();
             }
         }

     });

     function isFixed() {
         return !!$cur.data('isFixed');
     }

     function setFix() {
         $cur.data('isFixed', true);
         $cur.css({
             position: 'fixed',
             top: 0,
             left: offsetLeft,
             width: $curWidth,
             margin: 0,
             'z-index': 1000
         });
         $clone.show();
     }

     function removeFix() {
         $cur.data('isFixed', false);
         $cur.removeAttr('style');
         $clone.hide();
     }

 };
