var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
    var GameProgressBar = (function (_super) {
        __extends(GameProgressBar, _super);
        function GameProgressBar(bgName, pgName, pgW, pgH, x, y, w, h, offX, offY) {
            if (typeof pgH === "undefined") { pgH = 0; }
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            if (typeof w === "undefined") { w = 0; }
            if (typeof h === "undefined") { h = 0; }
            if (typeof offX === "undefined") { offX = 0; }
            if (typeof offY === "undefined") { offY = 0; }
            _super.call(this);
            this.createBar(bgName, pgName, pgW, pgH, x, y, w, h, offX, offY);
        }
        /**创建进度条*/
        GameProgressBar.prototype.createBar = function (bgName, pgName, pgW, pgH, x, y, w, h, offX, offY) {
            //竟然不能用mask，而且九宫格还得自己赋值，资源配置没有用
            this.pg = fighter.createGridBitmapByName(pgName, x, y, w, h);
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
        GameProgressBar.prototype.setProgress = function (current, total) {
            this.pg.width = this.pgW * (current / total);
        };

        GameProgressBar.prototype.dispose = function () {
        };
        return GameProgressBar;
    })(egret.DisplayObjectContainer);
    gameui.GameProgressBar = GameProgressBar;
    GameProgressBar.prototype.__class__ = "gameui.GameProgressBar";
})(gameui || (gameui = {}));
