/**
 * Created by www on 2014/8/13.
 */
module gamemain {

    export class UfoLayer{
        /**创建子弹的时间间隔*/
        private ufo1Delay:number = 24000;
        private ufo2Delay:number = 35000;

        /**定时射*/
        private ufo1Timer:egret.Timer;
        private ufo2Timer:egret.Timer;

//        private static _instance:UfoLayer;
        public ufoEntity1:gameworld.Ufo;
        public ufoEntity2:gameworld.Ufo;

        private minX1:number;
        private rangeX1:number;

        private minX2:number;
        private rangeX2:number;

        private bgwidth1:number;
        private bgwidth2:number;

        private ufodttime2:number=0;
        private ufodttime1:number=0;

        private _start_spawn:boolean= false;

        public constructor() {
//            this.ufo1Timer = new egret.Timer(this.ufo1Delay);
//            this.ufo1Timer.addEventListener(egret.TimerEvent.TIMER,this.createUfo1,this);
//            this.ufo2Timer = new egret.Timer(this.ufo2Delay);
//            this.ufo2Timer.addEventListener(egret.TimerEvent.TIMER,this.createUfo2,this);

            var a_params:gameworld.EntityParams = new gameworld.EntityParams();
            a_params.textureName = "ufo1";
            this.ufoEntity1 = new gameworld.Ufo(a_params);
            var width:number = this.ufoEntity1.textureWidth;
            this.minX1 =width>>1;
            var maxX:number=fighter.GameUtil.stageW - this.minX1;
            this.rangeX1=maxX-this.minX1;
            this.ufoEntity1.visible = false;
            this.bgwidth1 = width;

            var a_params2:gameworld.EntityParams = new gameworld.EntityParams();
            a_params2.textureName = "ufo2";
            this.ufoEntity2 = new gameworld.Ufo(a_params2);
            var width2:number = this.ufoEntity2.textureWidth;
            this.minX2 =width2>>1;
            var maxX2:number=fighter.GameUtil.stageW - this.minX2;
            this.rangeX2=maxX2-this.minX2;
            this.ufoEntity2.visible = false;
            this.bgwidth2 = width2;


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
            this.ufodttime2 =0;
            this.ufodttime1 = 0;

        }

        /**创建子弹*/
        private createUfo1(evt:egret.TimerEvent):void {

            var actualX:number=(Math.random()*this.rangeX1)+this.minX1;
            this.ufoEntity1.x = actualX;
            this.ufoEntity1.y = -this.bgwidth1>>1;
            this.ufoEntity1.newPos.x = actualX;
            this.ufoEntity1.newPos.y = -this.bgwidth1>>1;

            gameworld.GameWorld.instance.addEntityChild(this.ufoEntity1);
//            GameScreen.m_worldEntity.addChild(b);
            this.ufoEntity1.visible = true;
        }

        private createUfo2(evt:egret.TimerEvent):void {

            var actualX:number=(Math.random()*this.rangeX2)+this.minX2;
            this.ufoEntity2.x = actualX;
            this.ufoEntity2.y = -this.bgwidth2>>1;
            this.ufoEntity2.newPos.x = actualX;
            this.ufoEntity2.newPos.y = -this.bgwidth2>>1;

            gameworld.GameWorld.instance.addEntityChild(this.ufoEntity2);
//            GameScreen.m_worldEntity.addChild(b);
            this.ufoEntity2.visible = true;
        }


        public updateUfo(dt:number):void
        {
            if(!this._start_spawn) return;
            this.ufodttime2 +=dt;
            this.ufodttime1+=dt;
            this.ufodttime1=Number(this.ufodttime1.toFixed(3));
            this.ufodttime2=Number(this.ufodttime2.toFixed(3));
            if(this.ufodttime1 >24){
                this.ufodttime1 = 0;
                this.createUfo1(null);
            }
            if(this.ufodttime2 >35){
                this.ufodttime2 = 0;
                this.createUfo2(null);
            }

        }


//        /**
//         * 获取SDK对象实例
//         */
//        public static get instance():UfoLayer
//        {
//            if (UfoLayer._instance == null)
//            {
//                UfoLayer._instance = new UfoLayer();
//            }
//            return UfoLayer._instance;
//        }

    }
}