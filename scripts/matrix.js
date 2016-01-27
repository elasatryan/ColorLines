(function () {
    'use strict';
    function Matrix(size) {
        var that = this;

        Array.call(that, size);
        that.size = size;

        for (var i = 0; i < that.size; i++) {
            that[i] = new Array(size);
        }
    }
    Matrix.prototype = [];
    $.extend(Matrix.prototype, {
        hasPath: function (startPoint, endPoint) {
            var that = this,
                queue = [startPoint],
                current,
                cloneMatrix = that.clone();

            while (queue.length) {
                current = queue.shift();

                var top = current.top(),
                    right = current.right(),
                    bottom = current.bottom(),
                    left = current.left();

                if ([left, right, top, bottom].some(function (item) {
                        return item.equals(endPoint);
                    })) {
                    return true;
                }
                if (cloneMatrix.hasPoint(left) && !cloneMatrix.getValue(left)) {
                    queue.push(left);
                    cloneMatrix.setValue(left, -1);
                }
                if (cloneMatrix.hasPoint(right) && !cloneMatrix.getValue(right)) {
                    queue.push(right);
                    cloneMatrix.setValue(right, -1);
                }
                if (cloneMatrix.hasPoint(top) && !cloneMatrix.getValue(top)) {
                    queue.push(top);
                    cloneMatrix.setValue(top, -1);
                }
                if (cloneMatrix.hasPoint(bottom) && !cloneMatrix.getValue(bottom)) {
                    queue.push(bottom);
                    cloneMatrix.setValue(bottom, -1);
                }
            }
            return false;
        },
        clone: function () {
            var that = this;

            var clone = new Matrix(that.size);
            for (var i = 0; i < that.size; i++) {
                for (var j = 0; j < that.size; j++) {
                    clone[i][j] = that[i][j];
                }
            }
            return clone;
        },
        hasPoint: function (point) {
            var that = this;

            return point.row >= 0 && point.row < that.size && point.column >= 0 && point.column < that.size;
        },
        getValue: function (point) {
            var that = this;

            if (that.hasPoint(point)) {
                return that[point.row][point.column];
            }
        },
        setValue: function (point, value) {
            var that = this;

            if (that.hasPoint(point)) {
                that[point.row][point.column] = value;
            }
        },
        remove: function (point, removeCount) {
            var that = this,
                queue = [];
            queue.push.apply(queue, horizontalRemovals(that, point, removeCount));
            queue.push.apply(queue, verticalRemovals(that, point, removeCount));
            queue.push.apply(queue, mainDiagonalRemovals(that, point, removeCount));
            queue.push.apply(queue, secondaryDiagonalRemovals(that, point, removeCount));

            queue.forEach(function (item) {
                that.setValue(item, undefined);
            });
            return queue;
        }
    });

    window.Matrix = Matrix;

    function horizontalRemovals(matrix, point, removeCount) {
        var leftPoint = point.left(),
            rightPoint = point.right(),
            value = matrix.getValue(point),
            queue = [point];

        while (matrix.hasPoint(leftPoint) && matrix.getValue(leftPoint) === value) {
            queue.push(leftPoint);
            leftPoint = leftPoint.left();
        }
        while (matrix.hasPoint(rightPoint) && matrix.getValue(rightPoint) === value) {
            queue.push(rightPoint);
            rightPoint = rightPoint.right();
        }
        return queue.length >= removeCount ? queue : null;
    }

    function verticalRemovals(matrix, point, removeCount) {
        var topPoint = point.top(),
            bottomPoint = point.bottom(),
            value = matrix.getValue(point),
            queue = [point];

        while (matrix.hasPoint(topPoint) && matrix.getValue(topPoint) === value) {
            queue.push(topPoint);
            topPoint = topPoint.top();
        }
        while (matrix.hasPoint(bottomPoint) && matrix.getValue(bottomPoint) === value) {
            queue.push(bottomPoint);
            bottomPoint = bottomPoint.bottom();
        }
        return queue.length >= removeCount ? queue : null;
    }

    function mainDiagonalRemovals(matrix, point, removeCount) {
        var topLeftPoint = point.topLeft(),
            bottomRightPoint = point.bottomRight(),
            value = matrix.getValue(point),
            queue = [point];

        while (matrix.hasPoint(topLeftPoint) && matrix.getValue(topLeftPoint) === value) {
            queue.push(topLeftPoint);
            topLeftPoint = topLeftPoint.topLeft();
        }
        while (matrix.hasPoint(bottomRightPoint) && matrix.getValue(bottomRightPoint) === value) {
            queue.push(bottomRightPoint);
            bottomRightPoint = bottomRightPoint.bottomRight();
        }
        return queue.length >= removeCount ? queue : null;
    }

    function secondaryDiagonalRemovals(matrix, point, removeCount) {
        var val = matrix.getValue(point),
            topRightPoint = point.topRight(),
            bottomLeftPoint = point.bottomLeft(),
            queue = [point];

        while (matrix.hasPoint(topRightPoint) && matrix.getValue(topRightPoint) === val) {
            queue.unshift(topRightPoint);
            topRightPoint = topRightPoint.topRight();
        }
        while (matrix.hasPoint(bottomLeftPoint) && matrix.getValue(bottomLeftPoint) === val) {
            queue.push(bottomLeftPoint);
            bottomLeftPoint = bottomLeftPoint.bottomLeft();
        }
        return queue.length >= removeCount ? queue : null;
    }

})();