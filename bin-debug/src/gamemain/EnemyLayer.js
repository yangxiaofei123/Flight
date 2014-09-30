/**
* Created by www on 2014/8/8.
*/
var gamemain;
(function (gamemain) {
    var EnemyLayer = (function () {
        function EnemyLayer() {
            this.cacheDict = {};
            this.enemy1_min = 0;
            this.enemy1_max = 0;
            this.enemy2_min = 0;
            this.enemy2_max = 0;
            this.enemy3_min = 0;
            this.enemy3_max = 0;
            this.enemy1dttime = 0;
            this.enemy2dttime = 0;
            this.enemy3dttime = 0;
            this._start_spawn = false;
            this._spawnRate1 = 0.500;
            this._spawnRate2 = 7.300;
            this._spawnRate3 = 13.000;
            this.cacheDict["enemy1"] = [];
            this.cacheDict["enemy2"] = [];
            this.cacheDict["enemy3_n1"] = [];

            this.enemy1_min = 200;
            this.enemy1_max = 400;

            this.enemy2_min = 133;
            this.enemy2_max = 267;

            this.enemy3_min = 100;
            this.enemy3_max = 200;
        }
        /**生产*/
        EnemyLayer.prototype.produce = function (textureName, life, score) {
            var dict = this.cacheDict[textureName];
            var enemy;
            if (dict.length > 0) {
                enemy = dict.pop();
            } else {
                var a_params = new gameworld.EntityParams();
                a_params.life = life;
                a_params.score = score;
                a_params.textureName = textureName;
                enemy = new gameworld.EnemyPlane(a_params);

                //                enemy.y = -enemy.textureHeight>>1;
                enemy.visible = false;
                gameworld.GameWorld.instance.addChild(enemy);
            }
            EnemyLayer.enemyDict[enemy.id] = enemy;
            return enemy;
        };

        /**回收*/
        EnemyLayer.prototype.reclaim = function (enemy, textureName) {
            var dict = this.cacheDict[textureName];
            if (dict.indexOf(enemy) == -1)
                dict.push(enemy);
            enemy.reborn();
            delete EnemyLayer.enemyDict[enemy.id];
        };

        EnemyLayer.prototype.getCount = function () {
            var dict = this.cacheDict["b1"];
            return dict.length;
        };

        /**开火*/
        EnemyLayer.prototype.startSpawn = function () {
            this._start_spawn = true;
        };

        /**停火*/
        EnemyLayer.prototype.stopSpawn = function () {
            this._start_spawn = false;
        };

        EnemyLayer.prototype.restartGame = function () {
            this.startSpawn();
            this.enemy1dttime = 0;
            this.enemy2dttime = 0;
            this.enemy3dttime = 0;
        };

        /**创建子弹*/
        EnemyLayer.prototype.createEnemy1 = function (evt) {
            var b = this.produce("enemy1", 1, 1000);
            var width = b.textureWidth;
            var minX = width >> 1;
            var maxX = fighter.GameUtil.stageW - minX;
            var rangeX = maxX - minX;
            var actualX = (Math.random() * rangeX) + minX;
            b.x = actualX;
            b.y = -width >> 1;
            b.newPos.x = actualX;
            b.newPos.y = -width >> 1;

            var rangeDuration = this.enemy1_max - this.enemy1_min;
            var actualDuration = (Math.random() * rangeDuration) + this.enemy1_min;

            b._speed = actualDuration;

            gameworld.GameWorld.instance.addEntityChild(b);

            //            GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
        };

        EnemyLayer.prototype.createEnemy2 = function (evt) {
            var b = this.produce("enemy2", 6, 6000);
            var width = b.textureWidth;
            var minX = width >> 1;
            var maxX = fighter.GameUtil.stageW - minX;
            var rangeX = maxX - minX;
            var actualX = (Math.random() * rangeX) + minX;
            b.x = actualX;
            b.y = -width >> 1;
            b.newPos.x = actualX;
            b.newPos.y = -width >> 1;

            var rangeDuration = this.enemy2_max - this.enemy2_min;
            var actualDuration = (Math.random() * rangeDuration) + this.enemy2_min;

            b._speed = actualDuration;

            gameworld.GameWorld.instance.addEntityChild(b);

            //            GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
        };

        EnemyLayer.prototype.createEnemy3 = function (evt) {
            var b = this.produce("enemy3_n1", 25, 30000);
            var width = b.textureWidth;
            var minX = width >> 1;
            var maxX = fighter.GameUtil.stageW - minX;
            var rangeX = maxX - minX;
            var actualX = (Math.random() * rangeX) + minX;
            b.x = actualX;
            b.y = -width;
            b.newPos.x = actualX;
            b.newPos.y = -width;

            var rangeDuration = this.enemy3_max - this.enemy3_min;
            var actualDuration = (Math.random() * rangeDuration) + this.enemy3_min;

            b._speed = actualDuration;
            b.visible = true;
            gameworld.GameWorld.instance.addEntityChild(b);
            //            GameScreen.m_worldEntity.addChild(b);
        };

        EnemyLayer.prototype.clearAllEnemy = function () {
        };

        EnemyLayer.prototype.updateEnemy = function (dt) {
            if (!this._start_spawn)
                return;
            this.enemy1dttime += dt;
            this.enemy2dttime += dt;
            this.enemy3dttime += dt;
            this.enemy1dttime = Number(this.enemy1dttime.toFixed(3));
            this.enemy2dttime = Number(this.enemy2dttime.toFixed(3));
            this.enemy3dttime = Number(this.enemy3dttime.toFixed(3));
            if (this.enemy1dttime > this._spawnRate1) {
                this.enemy1dttime = 0;
                this.createEnemy1(null);
            }
            if (this.enemy2dttime > this._spawnRate2) {
                this.enemy2dttime = 0;
                this.createEnemy2(null);
            }
            if (this.enemy3dttime > this._spawnRate3) {
                this.enemy3dttime = 0;
                this.createEnemy3(null);
            }
        };

        EnemyLayer.prototype.changeSpawnRate1 = function (rt) {
            if (typeof rt === "undefined") { rt = 0.500; }
            this._spawnRate1 = rt;
            this.enemy1dttime = 0;
        };

        EnemyLayer.prototype.changeSpawnRate2 = function (rt) {
            if (typeof rt === "undefined") { rt = 7.300; }
            this._spawnRate2 = rt;
            this.enemy1dttime = 0;
        };

        EnemyLayer.prototype.changeSpawnRate3 = function (rt) {
            if (typeof rt === "undefined") { rt = 13.000; }
            this._spawnRate3 = rt;
            this.enemy1dttime = 0;
        };

        Object.defineProperty(EnemyLayer, "instance", {
            /**
            * 获取SDK对象实例
            */
            get: function () {
                if (EnemyLayer._instance == null) {
                    EnemyLayer._instance = new EnemyLayer();
                }
                return EnemyLayer._instance;
            },
            enumerable: true,
            configurable: true
        });
        EnemyLayer.enemyDict = {};
        return EnemyLayer;
    })();
    gamemain.EnemyLayer = EnemyLayer;
    EnemyLayer.prototype.__class__ = "gamemain.EnemyLayer";
})(gamemain || (gamemain = {}));
