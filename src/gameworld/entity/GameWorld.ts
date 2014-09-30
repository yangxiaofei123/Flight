/**
 * Created by www on 2014/8/8.
 */
module gameworld {

    export class GameWorld extends  Entity{
        private static _instance:GameWorld;
        public level:number
        public static score:number;
        private enemyL:gamemain.EnemyLayer;
        public bulletL:gamemain.BulletLayer;
        public controlL:gamemain.ControlLayer;
        private ufoL:gamemain.UfoLayer;
        public constructor(params:gameworld.EntityParams) {
            super(params);

            this.level = 1;
            this.addEntityChild(PlayerPlane.instance);
            this.addChild(PlayerPlane.instance);

            this.enemyL= gamemain.EnemyLayer.instance;
            this.enemyL.startSpawn();

            this.bulletL= gamemain.BulletLayer.instance;
//            this.bulletL.startFire();

            this.ufoL= new gamemain.UfoLayer();
            this.ufoL.startSpawn();

            this.controlL = new gamemain.ControlLayer();
            this.addChild(this.controlL);
        }

        public start():void
        {
            this.bulletL.init();
            this.addChild(this.ufoL.ufoEntity1);
            this.addChild(this.ufoL.ufoEntity2);
        }

        public update(a_timePassed:number):void
        {
            this.setInitialValues(a_timePassed);

            this.updateEntityChildren(a_timePassed);

            this.updatePosition(a_timePassed);

            this.ufoL.updateUfo(a_timePassed);
            this.enemyL.updateEnemy(a_timePassed);
        }
        public updatePosition(a_timePassed:number):void
        {
            for(var i in gamemain.EnemyLayer.enemyDict){
                var enemy:EnemyPlane = gamemain.EnemyLayer.enemyDict[i];
                for(var j in gamemain.BulletLayer.bulletDict){
                    var bullet:Bullet = gamemain.BulletLayer.bulletDict[j];
                    if(enemy.bounds.isOverlapping(bullet.bounds)){
                        if(enemy.life >1) {
                            enemy.deleteLife(bullet.power);
                            bullet.boom();
                        }else if(enemy.life<=1){
                            enemy.deleteLife(bullet.power);
                            enemy.boom();
                            bullet.boom();
                            this.controlL.showScore(enemy.score);
                        }
                    }
                }
                if(enemy.bounds.isOverlapping(PlayerPlane.instance.bounds)){
                    this.gameover();
                }
            }

        }

        public clearGameWorld():void
        {
            for(var i in gamemain.EnemyLayer.enemyDict){
                var enemy:EnemyPlane = gamemain.EnemyLayer.enemyDict[i];
                enemy.clearEnemy();
            }
            for(var j in gamemain.BulletLayer.bulletDict){
                var bullet:Bullet = gamemain.BulletLayer.bulletDict[j];
                bullet.clearBullet();
            }
            this.ufoL.ufoEntity1.clearUfo();
            this.ufoL.ufoEntity2.clearUfo();
//            PlayerPlane.instance.resetPosition();
//            this.controlL.resetScore();
        }

        public clearAllEnemy():void
        {
            for(var i in gamemain.EnemyLayer.enemyDict){
                var enemy:EnemyPlane = gamemain.EnemyLayer.enemyDict[i];
                enemy.clearEnemy();
            }
        }

        public gameover():void
        {
//            this.controlL.showResult();
            this.pauseGame();
            this.clearGameWorld();
            PlayerPlane.instance.boom();
        }

        public showResult():void
        {
            this.controlL.showResult();
//            this.controlL.resetScore();
        }

        //暂停游戏
        public pauseGame():void
        {
            Root.togglePause();
            this.enemyL.stopSpawn();
            this.bulletL.pauseMultFire();
            this.ufoL.stopSpawn();
        }
        //暂停后重新开始
        public startGame():void
        {
            Root.togglePause();
            this.enemyL.startSpawn();
            this.bulletL.pauseStartMFire();
            this.ufoL.startSpawn();
        }
        //在玩一次
        public restartGame():void
        {
            Root.togglePause();
            this.enemyL.restartGame();
            this.bulletL.startFire();
            this.ufoL.restartGame();
            this.setLevel(1);
            PlayerPlane.instance.resetPosition();
        }

        public setLevel(l:number):void
        {
            this.level = l;
            console.log(this.level)
            switch(l)
            {
                case 3:
                    this.enemyL.enemy1_min=250;
                    this.enemyL.enemy1_max=500;

                    this.enemyL.enemy2_min=190;
                    this.enemyL.enemy2_max=360;

                    this.enemyL.enemy3_min=160;
                    this.enemyL.enemy3_max=280;

                    this.enemyL.changeSpawnRate1(0.38);
                    this.enemyL.changeSpawnRate2(5.0);
                    this.enemyL.changeSpawnRate3(7.0);
                    break;
                case 2:
                    this.enemyL.enemy1_min=222;
                    this.enemyL.enemy1_max=445;

                    this.enemyL.enemy2_min=150;
                    this.enemyL.enemy2_max=310;

                    this.enemyL.enemy3_min=111;
                    this.enemyL.enemy3_max=222;

                    this.enemyL.changeSpawnRate1(0.4);
                    this.enemyL.changeSpawnRate2(6.3);
                    this.enemyL.changeSpawnRate3(11.0);
                    break;
                case 1:
                    this.enemyL.enemy1_min=200;
                    this.enemyL.enemy1_max=400;

                    this.enemyL.enemy2_min=133;
                    this.enemyL.enemy2_max=267;

                    this.enemyL.enemy3_min=100;
                    this.enemyL.enemy3_max=200;

                    this.enemyL.changeSpawnRate1();
                    this.enemyL.changeSpawnRate2();
                    this.enemyL.changeSpawnRate3();
                    break;
                default:
                    this.enemyL.enemy1_min=200;
                    this.enemyL.enemy1_max=400;

                    this.enemyL.enemy2_min=133;
                    this.enemyL.enemy2_max=267;

                    this.enemyL.enemy3_min=100;
                    this.enemyL.enemy3_max=200;

                    this.enemyL.changeSpawnRate1();
                    this.enemyL.changeSpawnRate2();
                    this.enemyL.changeSpawnRate3();
                    break;

            }
        }

        /**
         * 获取SDK对象实例
         */
        public static get instance():GameWorld
        {
            if (GameWorld._instance == null)
            {
                var a_params:EntityParams = new EntityParams();
                GameWorld._instance = new GameWorld(a_params);
            }
            return GameWorld._instance;
        }

    }

}