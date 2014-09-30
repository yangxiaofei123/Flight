var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/11.
*/
var gamemain;
(function (gamemain) {
    var ControlLayer = (function (_super) {
        __extends(ControlLayer, _super);
        function ControlLayer() {
            _super.call(this);
            this._isPause = true;
            this.bg1 = fighter.createBitmapByName("gameworld1_json.game_pause_nor");
            this.bg1.x = 30;
            this.bg1.y = 30;
            this.addChild(this.bg1);
            this.bg1.touchEnabled = true;
            this.bg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gamePause, this);

            this._scoreLabel = new egret.TextField();
            this._scoreLabel.x = 100;
            this._scoreLabel.y = 40;
            this._scoreLabel.textColor = 0x000000;
            this._scoreLabel.text = "0";
            this.addChild(this._scoreLabel);
            this._score = 0;

            this._result = fighter.createBitmapByName("gameworld1_json.gameover");
            this.addChild(this._result);
            this._result.visible = false;
            this._resultLabel = new egret.TextField();
            this._resultLabel.x = 200;
            this._resultLabel.y = 350;
            this._resultLabel.textColor = 0x000000;
            this._resultLabel.text = "0";
            this.addChild(this._resultLabel);
            this._resultLabel.visible = false;

            this._play = fighter.createBitmapByName("gameworld1_json.btn_finish");
            this._play.touchEnabled = true;
            this._play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameReStart, this);
            this._play.x = 180;
            this._play.y = 400;
            this.addChild(this._play);
            this._play.visible = false;

            this._bomb = fighter.createBitmapByName("gameworld1_json.bomb");
            this._bomb.touchEnabled = true;
            this._bomb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useBomb, this);
            this._bomb.x = 30;
            this._bomb.y = fighter.GameUtil.stageH - this._bomb.height;
            this.addChild(this._bomb);
            this._bomb.visible = false;

            this._bombLabel = new egret.TextField();
            this._bombLabel.x = 110;
            this._bombLabel.y = fighter.GameUtil.stageH - 40;
            this._bombLabel.textColor = 0x000000;
            this._bombLabel.text = "0";
            this.addChild(this._bombLabel);
            this._bombLabel.visible = false;
            this._bomb_count = 0;
        }
        ControlLayer.prototype.gamePause = function (evt) {
            if (this._isPause) {
                gameworld.GameWorld.instance.pauseGame();
            } else {
                gameworld.GameWorld.instance.startGame();
            }
            this._isPause = !this._isPause;
        };

        ControlLayer.prototype.gameReStart = function (evt) {
            gameworld.GameWorld.instance.restartGame();
            this.resetScore();
            this.closeResult();
            // this.shareWeixin();
        };

        ControlLayer.prototype.shareWeixin = function () {
            WeixinApi.ready(function (api) {
                //                alert("WeixinAPI Ready!!");
                var info = new WeixinShareInfo();
                info.title = "HelloEgret";
                info.desc = "欢迎使用Egret";
                info.link = "www.egret-labs.org";

                api.shareToFriend(info);
                api.shareToTimeline(info);
                //                api.closeWindow();
            });
        };

        ControlLayer.prototype.useBomb = function (evt) {
            this._bomb_count--;
            this._bombLabel.text = this._bomb_count + "";
            gameworld.GameWorld.instance.clearAllEnemy();
            if (this._bomb_count <= 0) {
                this._bomb_count = 0;
                this._bomb.visible = false;
                this._bombLabel.visible = false;
            }
        };

        ControlLayer.prototype.showResult = function () {
            this._result.visible = true;
            this._resultLabel.visible = true;
            this._play.visible = true;
            this._resultLabel.text = this._score + "";
        };

        ControlLayer.prototype.closeResult = function () {
            this._result.visible = false;
            this._resultLabel.visible = false;
            this._play.visible = false;
        };

        ControlLayer.prototype.showScore = function (add) {
            this._score = this._score + add;
            this._scoreLabel.text = this._score + "";
            if (gameworld.GameWorld.instance.level == 1 && this._score >= 100000) {
                gameworld.GameWorld.instance.setLevel(2);
            } else if (gameworld.GameWorld.instance.level == 2 && this._score >= 301000) {
                gameworld.GameWorld.instance.setLevel(3);
            }
        };

        ControlLayer.prototype.resetScore = function () {
            this._score = 0;
            this._scoreLabel.text = "0";
            this._bomb.visible = false;
            this._bombLabel.visible = false;
            this._bomb_count = 0;
            this._bombLabel.text = this._bomb_count + "";
        };

        ControlLayer.prototype.getScore = function () {
            return this._score;
        };

        ControlLayer.prototype.showBigBomb = function () {
            this._bomb.visible = true;
            this._bombLabel.visible = true;
            this._bomb_count++;
            this._bombLabel.text = this._bomb_count + "";
        };
        return ControlLayer;
    })(egret.DisplayObjectContainer);
    gamemain.ControlLayer = ControlLayer;
    ControlLayer.prototype.__class__ = "gamemain.ControlLayer";
})(gamemain || (gamemain = {}));
