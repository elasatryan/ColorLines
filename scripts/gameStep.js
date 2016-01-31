(function () {
    function GameStep(added, removed) {
        this.added = added || [];
        this.removed = removed || [];
    }

    $.extend(GameStep.prototype, {
        adding: function (item) {
            this.added.push.apply(this.added, arguments);
        },
        removing: function (item) {
            this.removed.push.apply(this.removed, arguments);
        },
        reverse: function () {
            var queue;

            queue = this.added;
            this.added = this.removed;
            this.removed = queue;
            return this;
        }
    });

    window.GameStep = GameStep;
})();