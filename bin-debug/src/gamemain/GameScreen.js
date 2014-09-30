var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/6.
*/
var gamemain;
(function (gamemain) {
    /*这里把gameword的功能写到了screen里面*/
    var GameScreen = (function (_super) {
        __extends(GameScreen, _super);
        function GameScreen(parentScreen) {
            if (typeof parentScreen === "undefined") { parentScreen = null; }
            _super.call(this, parentScreen);
            this._speed = 50;

            this.bg1 = fighter.createBitmapByName("gameworld_json.background");
            this.bg1.y = fighter.GameUtil.stageH - this.bg1.height;
            this._bgheight = this.bg1.height;
            this.addChild(this.bg1);
            this.bg2 = fighter.createBitmapByName("gameworld_json.background");
            this.bg2.y = fighter.GameUtil.stageH - this.bg1.height << 1 + 2;
            this.addChild(this.bg2);
            this.bg1.cacheAsBitmap = true;
            this.bg2.cacheAsBitmap = true;

            gameworld.GameWorld.instance.setBoundSize(fighter.GameUtil.stageW, fighter.GameUtil.stageH);

            this.addChild(gameworld.GameWorld.instance);
            gameworld.GameWorld.instance.start();
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        }
        /**响应Touch*/
        GameScreen.prototype.touchHandler = function (evt) {
            //            if(this.touchBegin == false) return;
            //            var dx:number =  this.beginPointX -evt.localX;
            //            var dy:number =  this.beginPointY -evt.localY;
            //            var dx1:number = gameworld.PlayerPlane.instance.newPos.x + dx;
            //            var dy1:number = gameworld.PlayerPlane.instance.newPos.y + dy;
            gameworld.PlayerPlane.instance.newPos.x = evt.localX;
            gameworld.PlayerPlane.instance.newPos.y = evt.localY;
        };

        GameScreen.prototype.update = function (timePassed) {
            gameworld.GameWorld.instance.update(timePassed);
            this.bg1.y += this._speed * timePassed;
            this.bg2.y = this.bg1.y + this._speed * timePassed - this._bgheight;
            if (this.bg1.y >= fighter.GameUtil.stageH) {
                this.bg1.y = fighter.GameUtil.stageH - this._bgheight;
            }
        };
        return GameScreen;
    })(gameworld.AScreen);
    gamemain.GameScreen = GameScreen;
    GameScreen.prototype.__class__ = "gamemain.GameScreen";
})(gamemain || (gamemain = {}));
