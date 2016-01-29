(function () {
    'use strict';
    var maxColorsCount = 7;

    function LinesGame(options) {
        var that = this;
        that.options = verifyOptions(options);
        that.dashboard = new Matrix(that.options.size);
        that.freeCells = new Pool();

        for (var i = 0; i < that.options.size; i++) {
            for (var j = 0; j < that.options.size; j++) {
                that.freeCells.add(new Point(i, j));
            }
        }
        that.score = 0;
        that.addNewBalls();
    }
    $.extend(LinesGame.prototype, {
        addNewBalls: function () {
            var that = this,
                queue = [],
                count = that.options.ballsCount,
                newBalls = that.freeCells.getRandomPoints(count),
                colors = getColors(count, that.options.repeat);
            newBalls.forEach(function (item, index) {
                that.dashboard.setValue(item, colors[index]);
                queue = that.dashboard.remove(item, that.options.removingCount);
                that.freeCells.push.apply(that.freeCells, queue);
            });
        },
        moveBall: function (startPoint, endPoint) {
            var that = this,
                queue = [];
            if (that.dashboard.hasPath(startPoint, endPoint)) {
                that.dashboard.setValue(endPoint, that.dashboard.getValue(startPoint));
                that.dashboard.setValue(startPoint, undefined);
                that.freeCells.replace(endPoint, startPoint);
                queue = that.dashboard.remove(endPoint, that.options.removingCount);
                that.freeCells.push.apply(that.freeCells, queue);
                that.addNewBalls();
            }
        },
        gameOver: function () {
            var that = this;
            return that.freeCells.length == 0;
        }
    });
    function getColors(count, repeat) {
        var queue = [],
            color;
        while (queue.length < count) {
            color = Math.randomInt(maxColorsCount);
            if (repeat || queue.indexOf(color) < 0) {
                queue.push(color);
            }
        }
        return queue;
    }
    function verifyOptions(options) {
        var size = options.size,
            ballsCount = options.ballsCount,
            removingCount = options.removingCount;
        if (size < 4 || size > 10) {
            options.size = 9;
        }
        if (ballsCount < 3 || ballsCount > 7) {
            options.ballsCount = 3;
        }
        if (removingCount < 3 || removingCount > 5) {
            options.removingCount = 3;
        }
        return options;
    }
    window.LinesGame = LinesGame;
})();