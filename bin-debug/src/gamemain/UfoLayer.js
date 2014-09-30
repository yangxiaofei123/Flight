/**
* Created by www on 2014/8/13.
*/
var gamemain;
(function (gamemain) {
    var UfoLayer = (function () {
        function UfoLayer() {
            /**创建子弹的时间间隔*/
            this.ufo1Delay = 24000;
            this.ufo2Delay = 35000;
            this.ufodttime2 = 0;
            this.ufodttime1 = 0;
            this._start_spawn = false;
            //            this.ufo1Timer = new egret.Timer(this.ufo1Delay);
            //            this.ufo1Timer.addEventListener(egret.TimerEvent.TIMER,this.createUfo1,this);
            //            this.ufo2Timer = new egret.Timer(this.ufo2Delay);
            //            this.ufo2Timer.addEventListener(egret.TimerEvent.TIMER,this.createUfo2,this);
            var a_params = new gameworld.EntityParams();
            a_params.textureName = "ufo1";
            this.ufoEntity1 = new gameworld.Ufo(a_params);
            var width = this.ufoEntity1.textureWidth;
            this.minX1 = width >> 1;
            var maxX = fighter.GameUtil.stageW - this.minX1;
            this.rangeX1 = maxX - this.minX1;
            this.ufoEntity1.visible = false;
            this.bgwidth1 = width;

            var a_params2 = new gameworld.EntityParams();
            a_params2.textureName = "ufo2";
            this.ufoEntity2 = new gameworld.Ufo(a_params2);
            var width2 = this.ufoEntity2.textureWidth;
            this.minX2 = width2 >> 1;
            var maxX2 = fighter.GameUtil.stageW - this.minX2;
            this.rangeX2 = maxX2 - this.minX2;
            this.ufoEntity2.visible = false;
            this.bgwidth2 = width2;
        }
        /**开火*/
        UfoLayer.prototype.startSpawn = function () {
            this._start_spawn = true;
        };

        /**停火*/
        UfoLayer.prototype.stopSpawn = function () {
            this._start_spawn = false;
        };

        UfoLayer.prototype.restartGame = function () {
            this.startSpawn();
            this.ufodttime2 = 0;
            this.ufodttime1 = 0;
        };

        /**创建子弹*/
        UfoLayer.prototype.createUfo1 = function (evt) {
            var actualX = (Math.random() * this.rangeX1) + this.minX1;
            this.ufoEntity1.x = actualX;
            this.ufoEntity1.y = -this.bgwidth1 >> 1;
            this.ufoEntity1.newPos.x = actualX;
            this.ufoEntity1.newPos.y = -this.bgwidth1 >> 1;

            gameworld.GameWorld.instance.addEntityChild(this.ufoEntity1);

            //            GameScreen.m_worldEntity.addChild(b);
            this.ufoEntity1.visible = true;
        };

        UfoLayer.prototype.createUfo2 = function (evt) {
            var actualX = (Math.random() * this.rangeX2) + this.minX2;
            this.ufoEntity2.x = actualX;
            this.ufoEntity2.y = -this.bgwidth2 >> 1;
            this.ufoEntity2.newPos.x = actualX;
            this.ufoEntity2.newPos.y = -this.bgwidth2 >> 1;

            gameworld.GameWorld.instance.addEntityChild(this.ufoEntity2);

            //            GameScreen.m_worldEntity.addChild(b);
            this.ufoEntity2.visible = true;
        };

        UfoLayer.prototype.updateUfo = function (dt) {
            if (!this._start_spawn)
                return;
            this.ufodttime2 += dt;
            this.ufodttime1 += dt;
            this.ufodttime1 = Number(this.ufodttime1.toFixed(3));
            this.ufodttime2 = Number(this.ufodttime2.toFixed(3));
            if (this.ufodttime1 > 24) {
                this.ufodttime1 = 0;
                this.createUfo1(null);
            }
            if (this.ufodttime2 > 35) {
                this.ufodttime2 = 0;
                this.createUfo2(null);
            }
        };
        return UfoLayer;
    })();
    gamemain.UfoLayer = UfoLayer;
    UfoLayer.prototype.__class__ = "gamemain.UfoLayer";
})(gamemain || (gamemain = {}));
