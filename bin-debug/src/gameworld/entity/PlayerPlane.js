var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/8.
*/
var gameworld;
(function (gameworld) {
    var PlayerPlane = (function (_super) {
        __extends(PlayerPlane, _super);
        function PlayerPlane(params) {
            _super.call(this, params);

            var data = RES.getRes("feiji_json");
            var texture = RES.getRes("feiji_png");
            this.player = new egret.MovieClip(new egret.DefaultMovieClipDelegate(data, texture)); //创建电影剪辑
            this.addChild(this.player); //添加到显示列表
            this.player.frameRate = 20; //设置动画的帧频
            this.player.gotoAndPlay("playerplane");

            //            var bg1 = fighter.createBitmapByName("gameworld_json.hero1");
            this.player.x = -this.player.width >> 1;
            this.player.y = -this.player.height >> 1;
            this.bgH = this.player.height;
            this.setBoundSize(30, 80);

            //            this.addChild(bg1);
            this.newPos.x = 225;
            this.newPos.y = fighter.GameUtil.stageH - this.bgH;

            //            bg1.cacheAsBitmap = true;
            //            bg1.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        }
        /**响应Touch*/
        PlayerPlane.prototype.touchHandler = function (evt) {
            //            if(this.touchBegin == false) return;
            //            var dx:number =  this.beginPointX -evt.localX;
            //            var dy:number =  this.beginPointY -evt.localY;
            //            var dx1:number = gameworld.PlayerPlane.instance.newPos.x + dx;
            //            var dy1:number = gameworld.PlayerPlane.instance.newPos.y + dy;
            gameworld.PlayerPlane.instance.newPos.x = evt.localX;
            gameworld.PlayerPlane.instance.newPos.y = evt.localY;
        };

        PlayerPlane.prototype.resetPosition = function () {
            this.player.gotoAndPlay("playerplane");
            this.newPos.x = 225;
            this.newPos.y = fighter.GameUtil.stageH - this.bgH;
        };

        Object.defineProperty(PlayerPlane, "instance", {
            /**
            * 获取SDK对象实例
            */
            get: function () {
                if (PlayerPlane._instance == null) {
                    var a_params = new gameworld.EntityParams();
                    PlayerPlane._instance = new PlayerPlane(a_params);
                }
                return PlayerPlane._instance;
            },
            enumerable: true,
            configurable: true
        });

        PlayerPlane.prototype.update = function (a_timePassed) {
            this.setInitialValues(a_timePassed);

            this.updatePosition(a_timePassed);
            //            this.updateEntityChildren(a_timePassed);
        };

        PlayerPlane.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        PlayerPlane.prototype.updatePosition = function (a_timePassed) {
            this.x = this.newPos.x;
            this.y = this.newPos.y;
        };

        PlayerPlane.prototype.boom = function () {
            console.log("gameover=======================");
            this.player.gotoAndPlay("playerboom");
            this.player.addEventListener("movie_over", this.gameover, this);
        };

        PlayerPlane.prototype.gameover = function () {
            gameworld.GameWorld.instance.showResult();
            this.player.removeEventListener("", this.gameover, this);
        };
        return PlayerPlane;
    })(gameworld.Entity);
    gameworld.PlayerPlane = PlayerPlane;
    PlayerPlane.prototype.__class__ = "gameworld.PlayerPlane";
})(gameworld || (gameworld = {}));
