/**
* Created by www on 2014/8/8.
*/
var gamemain;
(function (gamemain) {
    var BulletLayer = (function () {
        function BulletLayer(fireDelay) {
            this.cacheDict = {};
            this._pause = false;
            this.cacheDict["bullet1"] = [];
            this.cacheDict["bullet2"] = [];
            this.fireDelay = fireDelay;
            //            this.fireTimer = new egret.Timer(fireDelay,1);
            //            this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
        }
        /**生产*/
        BulletLayer.prototype.produce = function (textureName) {
            var dict = this.cacheDict[textureName];
            var bullet;
            if (dict.length > 0) {
                bullet = dict.pop();
            } else {
                var a_params = new gameworld.EntityParams();
                a_params.textureName = textureName;
                bullet = new gameworld.Bullet(a_params);
                bullet.visible = false;
                gameworld.GameWorld.instance.addChild(bullet);
            }
            BulletLayer.bulletDict[bullet.id] = bullet;
            return bullet;
        };

        /**回收*/
        BulletLayer.prototype.reclaim = function (bullet, textureName) {
            var dict = this.cacheDict[textureName];
            if (dict.indexOf(bullet) == -1)
                dict.push(bullet);
            delete BulletLayer.bulletDict[bullet.id];
        };

        BulletLayer.prototype.getCount = function () {
            var dict = this.cacheDict["b1"];
            return dict.length;
        };

        BulletLayer.prototype.init = function () {
            this.startFire();
        };

        /**开火*/
        BulletLayer.prototype.startFire = function () {
            //            this.fireTimer.reset();
            //            this.fireTimer.start();
            this.createBullet(null);
        };

        /**停火*/
        BulletLayer.prototype.stopFire = function () {
            for (var j in BulletLayer.bulletDict) {
                var bullet = BulletLayer.bulletDict[j];
                bullet.clearBullet();
            }
        };

        BulletLayer.prototype.startMultFire = function () {
            if (this.multifireTimer == null) {
                this.multifireTimer = new egret.Timer(this.fireDelay, 50);

                //                this.multifireTimer.addEventListener(egret.TimerEvent.TIMER,this.createMultBullet,this);
                this.multifireTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.changeFire, this);
                this.multifireTimer.start();
                this.createMultBullet(null);
                return;
            }
            this.multifireTimer.reset();
            this.multifireTimer.start();
            this.createMultBullet(null);
        };

        BulletLayer.prototype.pauseMultFire = function () {
            if (this.multifireTimer != null && this.multifireTimer.running) {
                this._pause = true;
                this.multifireTimer.stop();
            }
        };

        BulletLayer.prototype.pauseStartMFire = function () {
            if (this._pause) {
                this.multifireTimer.start();
            }
        };

        BulletLayer.prototype.stopMultFire = function () {
            this.stopFire();
            this.multifireTimer.stop();
        };

        BulletLayer.prototype.changeMultFire = function () {
            this.stopFire();
            this.startMultFire();
        };

        BulletLayer.prototype.changeFire = function (evt) {
            this.stopMultFire();

            //            this.startFire();
            this.createBullet(null);
        };

        /**创建子弹*/
        BulletLayer.prototype.createBullet = function (evt) {
            //            for(var i= 0; i<1;i++) {
            var b = this.produce("bullet1");
            var player = gameworld.PlayerPlane.instance;
            var px = player.x;
            var py = player.y - 60;
            b.x = px;
            b.y = py;
            b.newPos.x = px;
            b.newPos.y = py;
            gameworld.GameWorld.instance.addEntityChild(b);

            //                GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
            //            }
        };

        /**创建子弹*/
        BulletLayer.prototype.createMultBullet = function (evt) {
            //            for(var i= 0; i<2;i++) {
            var b = this.produce("bullet2");
            var player = gameworld.PlayerPlane.instance;
            var px = player.x;
            var py = player.y - 60;
            b.x = px;
            b.y = py;
            b.newPos.x = px;
            b.newPos.y = py;
            gameworld.GameWorld.instance.addEntityChild(b);

            //                GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
            //            }
        };

        Object.defineProperty(BulletLayer, "instance", {
            /**
            * 获取SDK对象实例
            */
            get: function () {
                if (BulletLayer._instance == null) {
                    BulletLayer._instance = new BulletLayer(200);
                }
                return BulletLayer._instance;
            },
            enumerable: true,
            configurable: true
        });
        BulletLayer.bulletDict = {};
        return BulletLayer;
    })();
    gamemain.BulletLayer = BulletLayer;
    BulletLayer.prototype.__class__ = "gamemain.BulletLayer";
})(gamemain || (gamemain = {}));
