/**
 * Created by www on 2014/8/6.
 */
module gamemain {
    /*这里把gameword的功能写到了screen里面*/
    export class GameScreen extends gameworld.AScreen {
//        public static m_worldEntity:gameworld.GameWorld;
        private bg1:egret.Bitmap;
        private bg2:egret.Bitmap;
        private _speed:number = 50;
        private  sprite1:egret.Sprite;
        private beginPointX:number;
        private beginPointY:number;
        private touchBegin:boolean;
        private _bgheight:number;
        public constructor( parentScreen:gameworld.IScreenItem=null ) {
            super(parentScreen);

            this.bg1 = fighter.createBitmapByName("gameworld_json.background");
            this.bg1.y = fighter.GameUtil.stageH - this.bg1.height;
            this._bgheight = this.bg1.height;
            this.addChild(this.bg1);
            this.bg2 = fighter.createBitmapByName("gameworld_json.background");
            this.bg2.y = fighter.GameUtil.stageH -  this.bg1.height<<1 + 2;
            this.addChild(this.bg2);
            this.bg1.cacheAsBitmap = true;
            this.bg2.cacheAsBitmap = true;

            gameworld.GameWorld.instance.setBoundSize(fighter.GameUtil.stageW, fighter.GameUtil.stageH);

            this.addChild(gameworld.GameWorld.instance);
            gameworld.GameWorld.instance.start();
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
        }

        /**响应Touch*/
        private touchHandler(evt:egret.TouchEvent):void{
//            if(this.touchBegin == false) return;
//            var dx:number =  this.beginPointX -evt.localX;
//            var dy:number =  this.beginPointY -evt.localY;
//            var dx1:number = gameworld.PlayerPlane.instance.newPos.x + dx;
//            var dy1:number = gameworld.PlayerPlane.instance.newPos.y + dy;
                gameworld.PlayerPlane.instance.newPos.x =evt.localX;
                gameworld.PlayerPlane.instance.newPos.y =evt.localY;
        }


        public update( timePassed:number ):void
        {
            gameworld.GameWorld.instance.update(timePassed);
            this.bg1.y += this._speed* timePassed;
            this.bg2.y =this.bg1.y+  this._speed* timePassed-this._bgheight;
            if(this.bg1.y >= fighter.GameUtil.stageH){
                this.bg1.y = fighter.GameUtil.stageH - this._bgheight;
            }


        }
    }

}