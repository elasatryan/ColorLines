(function () {
    'use strict';
    function GameHistory() {
        var that = this;
        that.undone = [];
    }

    GameHistory.prototype = [];
    $.extend(GameHistory.prototype, {
        undoStep: function () {
            var that = this;
            if (1 === that.length) {
                return null;
            }
            that.undone.push(that.pop());

            return that;
        },
        redoStep: function () {
            var that = this,
                item = that.undone.pop();
            return item && (that.push(item) || that);
        },
        addStep: function (step) {
            var that = this;
            if (!step) {
                throw new Error('Invalid argument');
            }
            that.undone.length = 0;
            that.push(step);

            return that;
        },
        lastStep: function () {
            var that = this;
            return that[that.length - 1];
        }
        //todo: score
    });

    window.GameHistory = GameHistory;
})();