(function() {
  var $,
    __hasProp = {}.hasOwnProperty;

  $ = jQuery;

  $.fn.extend({
    wodry: function(config) {
      var animations, settings, _base, _base1, _base2;
      if (config == null) {
        config = {};
      }
      settings = $.extend({}, config);
      if (settings.separator == null) {
        settings.separator = '|';
      }
      if (settings.delay == null) {
        settings.delay = 2000;
      }
      if (settings.animationDuration == null) {
        settings.animationDuration = 500;
      }
      if (settings.animation == null) {
        settings.animation = 'rotateY';
      }
      if (settings.callback == null) {
        settings.callback = function() {};
      }
      if (settings.shift == null) {
        settings.shift = {};
      }
      if ((_base = settings.shift).x == null) {
        _base.x = 0;
      }
      if ((_base1 = settings.shift).y == null) {
        _base1.y = 0;
      }
      if ((_base2 = settings.shift).z == null) {
        _base2.z = 0;
      }
      animations = {
        rotateY: {
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotateY(180deg)",
          action: {
            transform: " rotateY(180deg)",
            transition: " " + settings.animationDuration + "ms"
          }
        },
        rotateX: {
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotateX(180deg)",
          action: {
            transform: " rotateX(180deg)",
            transition: " " + settings.animationDuration + "ms"
          }
        },
        rotateAll: {
          isCoplex: true,
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotateX(180deg) rotateY(180deg)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotateX(180deg) rotateY(180deg)",
          action: {
            transform: " rotateX(180deg) rotateY(180deg)",
            transition: " " + settings.animationDuration + "ms"
          }
        },
        scaleX: {
          isCoplex: true,
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) scaleX(0.1)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) scaleX(0.1)",
          action: {
            transform: " scaleX(10)",
            transition: " " + settings.animationDuration + "ms"
          }
        },
        scaleY: {
          isCoplex: true,
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) scaleY(0.1)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) scaleY(0.1)",
          action: {
            transform: " scaleY(10)",
            transition: " " + settings.animationDuration + "ms"
          }
        },
        scaleAll: {
          isCoplex: true,
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) scaleY(0.1) slaleX(0.1)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) scaleY(0.1) scaleX(0.1)",
          action: {
            transform: " scaleY(10) scaleX(10)",
            transition: " " + settings.animationDuration + "ms"
          }
        },
        anticlockwise: {
          isCoplex: true,
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotate3d(100,40,-80,180deg)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotate3d(100,40,-80,180deg)",
          action: {
            transform: " rotate3d(100,40,-80,180deg)",
            transition: " " + settings.animationDuration + "ms"
          }
        },
        clockwise: {
          isCoplex: true,
          front_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotate3d(40,100,80,180deg)",
          back_transform: "translate3d(" + settings.shift.x + "px," + settings.shift.y + "px," + settings.shift.z + "px) rotate3d(40,100,80,180deg)",
          action: {
            transform: " rotate3d(40,100,80,180deg)",
            transition: " " + settings.animationDuration + "ms"
          }
        }
      };
      return this.each(function() {
        var animate, array, flip, flip_container, prefixer;
        flip_container = $(this);
        array = [];
        $.each(flip_container.text().split(settings.separator), function(key, value) {
          return array.push(value);
        });
        flip_container.text(array[0]);
        prefixer = function(properties, values) {
          var i, moz, o, propHash, property, result, value, webkit, _i, _len, _ref;
          result = {};
          propHash = {};
          for (_i = 0, _len = properties.length; _i < _len; _i++) {
            property = properties[_i];
            i = properties.indexOf(property);
            propHash[property] = values[i];
          }
          if (properties.length === values.length) {
            for (property in propHash) {
              if (!__hasProp.call(propHash, property)) continue;
              value = propHash[property];
              _ref = ["-webkit-" + property, "-moz-" + property, "-o-" + property], webkit = _ref[0], moz = _ref[1], o = _ref[2];
              result[webkit] = value;
              result[moz] = value;
              result[o] = value;
              result[property] = value;
            }
            return result;
          }
        };
        animate = function(animation, container, currentText, nextText) {
          container.html("");
          $("<span class='front-face'>" + currentText + "</span>").appendTo(container);
          $("." + container.context.className + " .front-face").css(prefixer(["transform"], [animation.front_transform]));
          $("<span class='back-face'>" + nextText + "</span>").appendTo(container);
          $("." + container.context.className + " .back-face").css(prefixer(["transform"], [animation.back_transform]));
          container.wrapInner("<span class='adjecting' />").find(".adjecting").hide().show().css(prefixer(["transform", "transition"], [animation.action.transform, animation.action.transition]));
          if (animation.isCoplex) {
            return setTimeout(function() {
              return $("." + container.context.className + " .front-face").remove();
            }, 1);
          }
        };
        flip = function() {
          var back_text_index, front_text;
          if (flip_container.find(".back-face").length > 0) {
            flip_container.html(flip_container.find(".back-face").html());
          }
          front_text = flip_container.text();
          back_text_index = $.inArray(front_text, array);
          if ((back_text_index + 1) === array.length) {
            back_text_index = -1;
          }
          return animate(animations[settings.animation], flip_container, front_text, array[back_text_index + 1]);
        };
        return setInterval(function() {
          flip();
          return settings.callback();
        }, settings.delay + settings.animationDuration);
      });
    }
  });

}).call(this);
