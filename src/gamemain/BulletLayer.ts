/**
 * Created by www on 2014/8/8.
 */
module gamemain {

    export class BulletLayer{
        private cacheDict:Object = {};
        public static bulletDict:Object = {};
        /**创建子弹的时间间隔*/
        private fireDelay:number;
        /**定时射*/
        private fireTimer:egret.Timer;
        private multifireTimer:egret.Timer;
        private static _instance:BulletLayer;
        private _pause:boolean = false;
        /**生产*/
        public produce(textureName:string):gameworld.Bullet {

            var dict:gameworld.Bullet[] = this.cacheDict[textureName];
            var bullet:gameworld.Bullet;
            if (dict.length > 0) {
                bullet = dict.pop();
            } else {
                var a_params:gameworld.EntityParams = new gameworld.EntityParams();
                a_params.textureName = textureName;
                bullet = new gameworld.Bullet(a_params);
                bullet.visible = false;
                gameworld.GameWorld.instance.addChild(bullet);
            }
            BulletLayer.bulletDict[bullet.id] = bullet;
            return bullet;
        }

        /**回收*/
        public reclaim(bullet:gameworld.Bullet, textureName:string):void {
            var dict:gameworld.Bullet[] = this.cacheDict[textureName];
            if (dict.indexOf(bullet) == -1)
                dict.push(bullet);
            delete BulletLayer.bulletDict[bullet.id];
        }

        public getCount():number {
            var dict:gameworld.Bullet[] = this.cacheDict["b1"];
            return dict.length;
        }
        public constructor(fireDelay:number) {

            this.cacheDict["bullet1"] = [];
            this.cacheDict["bullet2"] = [];
            this.fireDelay = fireDelay;
//            this.fireTimer = new egret.Timer(fireDelay,1);
//            this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
        }

        public init():void{
            this.startFire();
        }

        /**开火*/
        public startFire():void {
//            this.fireTimer.reset();
//            this.fireTimer.start();
            this.createBullet(null);
        }
        /**停火*/
        public stopFire():void {
            for(var j in BulletLayer.bulletDict){
                var bullet:gameworld.Bullet = BulletLayer.bulletDict[j];
                bullet.clearBullet();
            }
        }

        public startMultFire():void
        {
            if(this.multifireTimer == null){
                this.multifireTimer = new egret.Timer(this.fireDelay,50);
//                this.multifireTimer.addEventListener(egret.TimerEvent.TIMER,this.createMultBullet,this);
                this.multifireTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.changeFire,this);
                this.multifireTimer.start();
                this.createMultBullet(null);
                return;
            }
            this.multifireTimer.reset();
            this.multifireTimer.start();
            this.createMultBullet(null);
        }

        public pauseMultFire():void
        {
            if(this.multifireTimer != null &&this.multifireTimer.running) {
                this._pause = true;
                this.multifireTimer.stop();
            }
        }

        public pauseStartMFire():void
        {
            if(this._pause) {
                this.multifireTimer.start();
            }
        }

        public stopMultFire():void
        {
            this.stopFire();
            this.multifireTimer.stop();
        }

        public changeMultFire():void
        {
            this.stopFire();
            this.startMultFire();

        }

        public  changeFire(evt:egret.TimerEvent):void
        {
            this.stopMultFire();
//            this.startFire();
            this.createBullet(null);
        }

        /**创建子弹*/
        private createBullet(evt:egret.TimerEvent):void {
//            for(var i= 0; i<1;i++) {
                var b:gameworld.Bullet = this.produce("bullet1");
                var player:any = gameworld.PlayerPlane.instance;
                var px:number = player.x;
                var py:number = player.y-60;
                b.x = px;
                b.y = py;
                b.newPos.x = px;
                b.newPos.y = py;
                gameworld.GameWorld.instance.addEntityChild(b);
//                GameScreen.m_worldEntity.addChild(b);
                b.visible = true;
//            }

        }

        /**创建子弹*/
        private createMultBullet(evt:egret.TimerEvent):void {
//            for(var i= 0; i<2;i++) {
            var b:gameworld.Bullet = this.produce("bullet2");
            var player:any = gameworld.PlayerPlane.instance;
            var px:number = player.x;
            var py:number = player.y-60;
            b.x = px;
            b.y = py;
            b.newPos.x = px;
            b.newPos.y = py;
            gameworld.GameWorld.instance.addEntityChild(b);
//                GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
//            }

        }

        /**
         * 获取SDK对象实例
         */
        public static get instance():BulletLayer
        {
            if (BulletLayer._instance == null)
            {
                BulletLayer._instance = new BulletLayer(200);
            }
            return BulletLayer._instance;
        }


    }
}
