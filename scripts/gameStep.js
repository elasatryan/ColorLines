(function () {
    function Step() {

    }

    $.extend(Step.prototype, {
        adding: function () {
            var that = this,
                queue = [];
        },
        removing: function () {
            var that = this;
        }
    });

    window.Step = Step;
})();