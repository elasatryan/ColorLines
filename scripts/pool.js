function Pool() {

}
Pool.prototype = [];

$.extend(Pool.prototype, {
    replace: function (replacePoint, replaceWith) {
        // todo: optimize
        for (var i = 0; i < this.length; i++) {
            if (this[i].equals(replacePoint)) {
                this.splice(i, 1, replaceWith);
            }
        }
    },
    add: function (point) {
        // todo: optimize
        for (var i = 0; i < arguments.length; i++) {
            this.push(arguments[i]);
        }
    },
    getPoint: function (index) {
        var that = this;
        return that.splice(index, 1)[0];
    },
    getRandomPoints: function (pointsCount) {
        var queue = [],
            that = this;
        for (var i = 0; i < pointsCount && that.length; i++) {
            queue.push(that.getPoint(Math.randomInt(that.length)));
        }
        return queue;
    }
})