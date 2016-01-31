(function () {
    function GameHistory() {
        this.undone = [];
    }

    GameHistory.prototype = [];

    $.extend(GameHistory.prototype, {
        undoStep: function () {
            if (1 === this.length) {
                return;
            }
            var item = this.pop();
            item && this.undone.push(item);
        },
        redoStep: function () {
            var item = this.undone.pop();
            item && this.push(item);
        },
        addStep: function (step) {
            this.undone.length = 0;
            this.push(step);
        },
        lastStep: function () {
            return this[this.length - 1];
        }
    });
    
    window.GameHistory = GameHistory;
})();