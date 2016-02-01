(function () {
    'use strict';
    function GameStep(added, removed) {
        var that = this;
        that.added = added || [];
        that.removed = removed || [];
    }

    $.extend(GameStep.prototype, {
        adding: function (item) {
            var that = this;
            that.added.push.apply(that.added, arguments);
        },
        removing: function (item) {
            var that = this;
            that.removed.push.apply(that.removed, arguments);
        },
        reverse: function () {
            var that = this,
                queue;

            queue = that.added;
            that.added = that.removed;
            that.removed = queue;
            return that;
        }
    });
    window.GameStep = GameStep;
})();