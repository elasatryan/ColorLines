(function () {
    'use strict';
    function GameHistory() {
        var that = this;
        that.undone = [];
    }

    GameHistory.prototype = [];
    $.extend(GameHistory.prototype, {
        undoStep: function () {
            var that = this,
                item = that.pop();

            if (1 === that.length) {
                return;
            }

            item && that.undone.push(item);
        },
        redoStep: function () {
            var that = this,
                item = that.undone.pop();

            item && that.push(item);
        },
        addStep: function (step) {
            var that = this;

            if (!step) {
                throw new Error('Invalid argument');
            }
            that.undone.length = 0;
            that.push(step);
        },
        lastStep: function () {
            var that = this;
            return that[that.length - 1];
        }
    });

    window.GameHistory = GameHistory;
})();