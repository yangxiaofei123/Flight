var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameview;
(function (gameview) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(bgName, pgName, pgW, pgH, offX, offY) {
            if (typeof pgH === "undefined") { pgH = 0; }
            if (typeof offX === "undefined") { offX = 0; }
            if (typeof offY === "undefined") { offY = 0; }
            _super.call(this);
            this.createBar(bgName, pgName, pgW, pgH, offX, offY);
        }
        /**创建游戏场景*/
        ProgressBar.prototype.createBar = function (bgName, pgName, pgW, pgH, offX, offY) {
            this.pg = fighter.createBitmapByName(pgName);
            this.bg = fighter.createBitmapByName(bgName);
            this.addChild(this.pg);
            this.addChild(this.bg);
            this.pg.x = offX;
            this.pg.y = offY;
            this.pgW = pgW;

            //            this.pgH = pgH;
            this.setProgress(0, 1);
        };

        /*设置进度*/
        ProgressBar.prototype.setProgress = function (current, total) {
            this.pg.width = this.pgW * (current / total);
        };

        ProgressBar.prototype.dispose = function () {
        };
        return ProgressBar;
    })(egret.DisplayObjectContainer);
    gameview.ProgressBar = ProgressBar;
})(gameview || (gameview = {}));
