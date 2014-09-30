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
    var GameWorld = (function (_super) {
        __extends(GameWorld, _super);
        function GameWorld(params) {
            _super.call(this, params);

            this.level = 1;
            this.addEntityChild(gameworld.PlayerPlane.instance);
            this.addChild(gameworld.PlayerPlane.instance);

            this.enemyL = gamemain.EnemyLayer.instance;
            this.enemyL.startSpawn();

            this.bulletL = gamemain.BulletLayer.instance;

            //            this.bulletL.startFire();
            this.ufoL = new gamemain.UfoLayer();
            this.ufoL.startSpawn();

            this.controlL = new gamemain.ControlLayer();
            this.addChild(this.controlL);
        }
        GameWorld.prototype.start = function () {
            this.bulletL.init();
            this.addChild(this.ufoL.ufoEntity1);
            this.addChild(this.ufoL.ufoEntity2);
        };

        GameWorld.prototype.update = function (a_timePassed) {
            this.setInitialValues(a_timePassed);

            this.updateEntityChildren(a_timePassed);

            this.updatePosition(a_timePassed);

            this.ufoL.updateUfo(a_timePassed);
            this.enemyL.updateEnemy(a_timePassed);
        };
        GameWorld.prototype.updatePosition = function (a_timePassed) {
            for (var i in gamemain.EnemyLayer.enemyDict) {
                var enemy = gamemain.EnemyLayer.enemyDict[i];
                for (var j in gamemain.BulletLayer.bulletDict) {
                    var bullet = gamemain.BulletLayer.bulletDict[j];
                    if (enemy.bounds.isOverlapping(bullet.bounds)) {
                        if (enemy.life > 1) {
                            enemy.deleteLife(bullet.power);
                            bullet.boom();
                        } else if (enemy.life <= 1) {
                            enemy.deleteLife(bullet.power);
                            enemy.boom();
                            bullet.boom();
                            this.controlL.showScore(enemy.score);
                        }
                    }
                }
                if (enemy.bounds.isOverlapping(gameworld.PlayerPlane.instance.bounds)) {
                    this.gameover();
                }
            }
        };

        GameWorld.prototype.clearGameWorld = function () {
            for (var i in gamemain.EnemyLayer.enemyDict) {
                var enemy = gamemain.EnemyLayer.enemyDict[i];
                enemy.clearEnemy();
            }
            for (var j in gamemain.BulletLayer.bulletDict) {
                var bullet = gamemain.BulletLayer.bulletDict[j];
                bullet.clearBullet();
            }
            this.ufoL.ufoEntity1.clearUfo();
            this.ufoL.ufoEntity2.clearUfo();
            //            PlayerPlane.instance.resetPosition();
            //            this.controlL.resetScore();
        };

        GameWorld.prototype.clearAllEnemy = function () {
            for (var i in gamemain.EnemyLayer.enemyDict) {
                var enemy = gamemain.EnemyLayer.enemyDict[i];
                enemy.clearEnemy();
            }
        };

        GameWorld.prototype.gameover = function () {
            //            this.controlL.showResult();
            this.pauseGame();
            this.clearGameWorld();
            gameworld.PlayerPlane.instance.boom();
        };

        GameWorld.prototype.showResult = function () {
            this.controlL.showResult();
            //            this.controlL.resetScore();
        };

        //暂停游戏
        GameWorld.prototype.pauseGame = function () {
            gameworld.Root.togglePause();
            this.enemyL.stopSpawn();
            this.bulletL.pauseMultFire();
            this.ufoL.stopSpawn();
        };

        //暂停后重新开始
        GameWorld.prototype.startGame = function () {
            gameworld.Root.togglePause();
            this.enemyL.startSpawn();
            this.bulletL.pauseStartMFire();
            this.ufoL.startSpawn();
        };

        //在玩一次
        GameWorld.prototype.restartGame = function () {
            gameworld.Root.togglePause();
            this.enemyL.restartGame();
            this.bulletL.startFire();
            this.ufoL.restartGame();
            this.setLevel(1);
            gameworld.PlayerPlane.instance.resetPosition();
        };

        GameWorld.prototype.setLevel = function (l) {
            this.level = l;
            console.log(this.level);
            switch (l) {
                case 3:
                    this.enemyL.enemy1_min = 250;
                    this.enemyL.enemy1_max = 500;

                    this.enemyL.enemy2_min = 190;
                    this.enemyL.enemy2_max = 360;

                    this.enemyL.enemy3_min = 160;
                    this.enemyL.enemy3_max = 280;

                    this.enemyL.changeSpawnRate1(0.38);
                    this.enemyL.changeSpawnRate2(5.0);
                    this.enemyL.changeSpawnRate3(7.0);
                    break;
                case 2:
                    this.enemyL.enemy1_min = 222;
                    this.enemyL.enemy1_max = 445;

                    this.enemyL.enemy2_min = 150;
                    this.enemyL.enemy2_max = 310;

                    this.enemyL.enemy3_min = 111;
                    this.enemyL.enemy3_max = 222;

                    this.enemyL.changeSpawnRate1(0.4);
                    this.enemyL.changeSpawnRate2(6.3);
                    this.enemyL.changeSpawnRate3(11.0);
                    break;
                case 1:
                    this.enemyL.enemy1_min = 200;
                    this.enemyL.enemy1_max = 400;

                    this.enemyL.enemy2_min = 133;
                    this.enemyL.enemy2_max = 267;

                    this.enemyL.enemy3_min = 100;
                    this.enemyL.enemy3_max = 200;

                    this.enemyL.changeSpawnRate1();
                    this.enemyL.changeSpawnRate2();
                    this.enemyL.changeSpawnRate3();
                    break;
                default:
                    this.enemyL.enemy1_min = 200;
                    this.enemyL.enemy1_max = 400;

                    this.enemyL.enemy2_min = 133;
                    this.enemyL.enemy2_max = 267;

                    this.enemyL.enemy3_min = 100;
                    this.enemyL.enemy3_max = 200;

                    this.enemyL.changeSpawnRate1();
                    this.enemyL.changeSpawnRate2();
                    this.enemyL.changeSpawnRate3();
                    break;
            }
        };

        Object.defineProperty(GameWorld, "instance", {
            /**
            * 获取SDK对象实例
            */
            get: function () {
                if (GameWorld._instance == null) {
                    var a_params = new gameworld.EntityParams();
                    GameWorld._instance = new GameWorld(a_params);
                }
                return GameWorld._instance;
            },
            enumerable: true,
            configurable: true
        });
        return GameWorld;
    })(gameworld.Entity);
    gameworld.GameWorld = GameWorld;
    GameWorld.prototype.__class__ = "gameworld.GameWorld";
})(gameworld || (gameworld = {}));
