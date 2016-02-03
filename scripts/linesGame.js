(function () {
    'use strict';
    var maxColorsCount = 7;

    function LinesGame(options) {
        var that = this;
        that.options = verifyOptions(options);
        var size = that.options.size;
        that.dashboard = new Matrix(size);
        that.freeCells = getInitialPool(size);
        that.history = new GameHistory();
        var step = new GameStep();
        addNewBalls(that, step);
        that.history.addStep(step);
    }

    $.extend(LinesGame.prototype, {
        moveBall: function (startPoint, endPoint) {
            var that = this;
            if (!that.dashboard.hasPath(startPoint, endPoint)) {
                return;
            }

            var step = new GameStep(),
                color = that.dashboard.getValue(startPoint);
            that.dashboard.setValue(endPoint, color);
            that.dashboard.setValue(startPoint, undefined);
            that.freeCells.replace(endPoint, startPoint);

            step.removing(new BallColor(startPoint, color));

            var itemsToRemove = that.dashboard.remove(endPoint, that.options.removingCount);
            step.removing.apply(step, pointsToBalls(itemsToRemove, color));

            if (!itemsToRemove) {
                step.adding(new BallColor(endPoint, color));
            }

            that.freeCells.add.apply(that.freeCells, itemsToRemove);

            addNewBalls(that, step);

            that.history.addStep(step);
            modifyMatrixByStep(that.dashboard, step);

        },
        gameOver: function () {
            var that = this;
            return 0 === that.freeCells.length;
        },
        undo: function () {
            var that = this,
                step = that.history.lastStep();
            return that.history.undoStep() && step.reverse();
        },
        redo: function () {
            var that = this;
            return that.history.redoStep() && that.history.lastStep();
        }
    });

    //this function returns random colors queue

    function verifyOptions(options) {
        var size = options.size,
            ballsCount = options.ballsCount,
            removingCount = options.removingCount;
        if (size < 5 || size > 10) {
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

    function getRandomColors(count, repeat) {
        var queue = [];
        while (queue.length < count) {
            var color = Math.randomInt(maxColorsCount);
            if (repeat || queue.indexOf(color) < 0) {
                queue.push(color);
            }
        }
        return queue;
    }
    function getInitialPool(size) {
        var pool = new Pool();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                pool.add(new Point(i, j));
            }
        }
        return pool;
    }

    function modifyMatrixByStep(matrix, step) {
        step.added.forEach(function (item) {
            matrix.setValue(item.point, item.color);
        });
        step.removed.forEach(function (item) {
            matrix.setValue(item.point, undefined);
        });
    }

    function addNewBalls(game, step) {
        var count = game.options.ballsCount,
            newBalls = game.freeCells.getRandomPoints(count),
            colors = getRandomColors(count, game.options.repeat);
        newBalls.forEach(function (item, index) {
            var color = colors[index];
            game.dashboard.setValue(item, color);
            var itemsToRemove = game.dashboard.remove(item, game.options.removingCount);
            game.freeCells.add.apply(game.freeCells, itemsToRemove);
            step.removing.apply(step, pointsToBalls(itemsToRemove, color));
            if (!itemsToRemove) {
                step.adding(new BallColor(item, color));
            }
        });
    }

    function pointsToBalls(pointArray, color) {
        return pointArray && pointArray.map(function (item) {
            return new BallColor(item, color);
        });
    }

    window.LinesGame = LinesGame;
})();