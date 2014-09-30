/**
 * Created by www on 2014/8/8.
 */
module gamemain {

    export class EnemyLayer{
        private cacheDict:Object = {};


        public enemy1_min:number = 0;
        public enemy1_max:number = 0;

        public enemy2_min:number = 0;
        public enemy2_max:number = 0;

        public enemy3_min:number = 0;
        public enemy3_max:number = 0;

        private static _instance:EnemyLayer;

        private enemy1dttime:number=0;
        private enemy2dttime:number=0;
        private enemy3dttime:number=0;
        private _start_spawn:boolean= false;

        private _spawnRate1:number=0.500;
        private _spawnRate2:number=7.300;
        private _spawnRate3:number=13.000;


        public static enemyDict:Object = {};
        /**生产*/
        public produce(textureName:string,life:number,score:number):gameworld.EnemyPlane {
            var dict:gameworld.EnemyPlane[] = this.cacheDict[textureName];
            var enemy:gameworld.EnemyPlane;
            if (dict.length > 0) {
                enemy = dict.pop();
            } else {
                var a_params:gameworld.EntityParams = new gameworld.EntityParams();
                a_params.life = life;
                a_params.score= score;
                a_params.textureName = textureName;
                enemy = new gameworld.EnemyPlane(a_params);
//                enemy.y = -enemy.textureHeight>>1;
                enemy.visible = false;
                gameworld.GameWorld.instance.addChild(enemy);
            }
            EnemyLayer.enemyDict[enemy.id] = enemy;
            return enemy;
        }

        /**回收*/
        public reclaim(enemy:gameworld.EnemyPlane, textureName:string):void {
            var dict:gameworld.EnemyPlane[] = this.cacheDict[textureName];
            if (dict.indexOf(enemy) == -1)
                dict.push(enemy);
            enemy.reborn();
            delete EnemyLayer.enemyDict[enemy.id];
        }

        public getCount():number {
            var dict:gameworld.EnemyPlane[] =this.cacheDict["b1"];
            return dict.length;
        }
        public constructor() {
            this.cacheDict["enemy1"] = [];
            this.cacheDict["enemy2"] = [];
            this.cacheDict["enemy3_n1"] = [];

            this.enemy1_min=200;
            this.enemy1_max=400;

            this.enemy2_min=133;
            this.enemy2_max=267;

            this.enemy3_min=100;
            this.enemy3_max=200;
        }

        /**开火*/
        public startSpawn():void {
            this._start_spawn = true;
        }
        /**停火*/
        public stopSpawn():void {
            this._start_spawn = false;
        }

        public restartGame():void
        {
            this.startSpawn();
            this.enemy1dttime =0;
            this.enemy2dttime = 0;
            this.enemy3dttime = 0;
        }

        /**创建子弹*/
        private createEnemy1(evt:egret.TimerEvent):void {
            var b:gameworld.EnemyPlane = this.produce("enemy1",1,1000);
            var width:number = b.textureWidth;
            var minX:number=width>>1;
            var maxX:number=fighter.GameUtil.stageW - minX;
            var rangeX:number=maxX-minX;
            var actualX:number=(Math.random()*rangeX)+minX;
            b.x = actualX;
            b.y = -width>>1;
            b.newPos.x = actualX;
            b.newPos.y = -width>>1;


            var  rangeDuration=this.enemy1_max-this.enemy1_min;
            var actualDuration=(Math.random()*rangeDuration)+this.enemy1_min;

            b._speed = actualDuration;

            gameworld.GameWorld.instance.addEntityChild(b);
//            GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
        }

        private createEnemy2(evt:egret.TimerEvent):void {
            var b:gameworld.EnemyPlane = this.produce("enemy2",6,6000);
            var width:number = b.textureWidth;
            var minX:number=width>>1;
            var maxX:number=fighter.GameUtil.stageW - minX;
            var rangeX:number=maxX-minX;
            var actualX:number=(Math.random()*rangeX)+minX;
            b.x = actualX;
            b.y = -width>>1;
            b.newPos.x = actualX;
            b.newPos.y = -width>>1;

            var  rangeDuration=this.enemy2_max-this.enemy2_min;
            var actualDuration=(Math.random()*rangeDuration)+this.enemy2_min;

            b._speed = actualDuration;

            gameworld.GameWorld.instance.addEntityChild(b);
//            GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
        }

        private createEnemy3(evt:egret.TimerEvent):void {
            var b:gameworld.EnemyPlane = this.produce("enemy3_n1",25,30000);
            var width:number = b.textureWidth;
            var minX:number=width>>1;
            var maxX:number=fighter.GameUtil.stageW - minX;
            var rangeX:number=maxX-minX;
            var actualX:number=(Math.random()*rangeX)+minX;
            b.x = actualX;
            b.y = -width;
            b.newPos.x = actualX;
            b.newPos.y = -width;

            var  rangeDuration=this.enemy3_max-this.enemy3_min;
            var actualDuration=(Math.random()*rangeDuration)+this.enemy3_min;

            b._speed = actualDuration;
            b.visible = true;
            gameworld.GameWorld.instance.addEntityChild(b);
//            GameScreen.m_worldEntity.addChild(b);

        }

        public clearAllEnemy():void
        {

        }

        public updateEnemy(dt:number):void
        {
            if(!this._start_spawn) return;
            this.enemy1dttime +=dt;
            this.enemy2dttime+=dt;
            this.enemy3dttime+=dt;
            this.enemy1dttime=Number(this.enemy1dttime.toFixed(3));
            this.enemy2dttime=Number(this.enemy2dttime.toFixed(3));
            this.enemy3dttime=Number(this.enemy3dttime.toFixed(3));
            if(this.enemy1dttime >this._spawnRate1){
                this.enemy1dttime = 0;
                this.createEnemy1(null);
            }
            if(this.enemy2dttime >this._spawnRate2){
                this.enemy2dttime = 0;
                this.createEnemy2(null);
            }
            if(this.enemy3dttime >this._spawnRate3){
                this.enemy3dttime = 0;
                this.createEnemy3(null);
            }
        }

        public changeSpawnRate1(rt:number =0.500):void
        {
            this._spawnRate1 = rt;
            this.enemy1dttime = 0;
        }

        public changeSpawnRate2(rt:number = 7.300):void
        {
            this._spawnRate2 = rt;
            this.enemy1dttime = 0;
        }

        public changeSpawnRate3(rt:number = 13.000):void
        {
            this._spawnRate3 = rt;
            this.enemy1dttime = 0;
        }

        /**
         * 获取SDK对象实例
         */
        public static get instance():EnemyLayer
        {
            if (EnemyLayer._instance == null)
            {
                EnemyLayer._instance = new EnemyLayer();
            }
            return EnemyLayer._instance;
        }

    }
}
