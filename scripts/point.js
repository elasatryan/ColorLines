(function () {
    'use strict';
    function Point(row, column) {
        this.row = +row || 0;
        this.column = +column || 0;
    }
    $.extend(Point.prototype, {
        top: function () {
            var that = this;

            return new Point(that.row, that.column - 1);
        },
        right: function () {
            var that = this;

            return new Point(that.row + 1, that.column);
        },
        bottom: function () {
            var that = this;

            return new Point(that.row, that.column + 1);
        },
        left: function () {
            var that = this;

            return new Point(that.row - 1, that.column);
        },
        topLeft: function () {
            var that = this;

            return new Point(that.row - 1, that.column - 1);
        },
        bottomLeft: function () {
            var that = this;

            return new Point(that.row + 1, that.column - 1);
        },
        topRight: function () {
            var that = this;

            return new Point(that.row - 1, that.column + 1);
        },
        bottomRight: function () {
            var that = this;

            return new Point(that.row + 1, that.column + 1);
        },
        equals: function (p) {
            var that = this;

            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    if (!that.equals(arguments[i])) {
                        return false;
                    }
                }
                return true;
            }
            return that.row === p.row && that.column === p.column;
        }
    });

    window.Point = Point;
})();