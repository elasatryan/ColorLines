// todo: change constructors to throw errors
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
         this.push.apply(this, arguments);
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