/**
 * Created by www on 2014/8/8.
 */
module gameworld {

    export class PlayerPlane extends  Entity{
        private static _instance:PlayerPlane;
        public bgH:number;
        private  player:egret.MovieClip;
        public constructor(params:gameworld.EntityParams) {

            super(params);

            var data = RES.getRes("feiji_json");//获取描述
            var texture = RES.getRes("feiji_png");//获取大图
            this.player = new egret.MovieClip(new egret.DefaultMovieClipDelegate(data,texture));//创建电影剪辑
            this.addChild(this.player);//添加到显示列表
            this.player.frameRate = 20;//设置动画的帧频
            this.player.gotoAndPlay("playerplane");


//            var bg1 = fighter.createBitmapByName("gameworld_json.hero1");
            this.player.x = -this.player.width>>1;
            this.player.y = -this.player.height>>1;
            this.bgH = this.player.height;
            this.setBoundSize(30,80);
//            this.addChild(bg1);
            this.newPos.x = 225;
            this.newPos.y = fighter.GameUtil.stageH -this.bgH ;
//            bg1.cacheAsBitmap = true;
//            bg1.touchEnabled = true;
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

        public resetPosition():void
        {
            this.player.gotoAndPlay("playerplane");
            this.newPos.x = 225;
            this.newPos.y = fighter.GameUtil.stageH -this.bgH  ;
        }

        /**
         * 获取SDK对象实例
         */
        public static get instance():PlayerPlane
        {
            if (PlayerPlane._instance == null)
            {
                var a_params:EntityParams = new EntityParams();
                PlayerPlane._instance = new PlayerPlane(a_params);
            }
            return PlayerPlane._instance;
        }



        public update(a_timePassed:number):void
        {
            this.setInitialValues(a_timePassed);

            this.updatePosition(a_timePassed);

//            this.updateEntityChildren(a_timePassed);
        }

        public dispose():void
        {
            super.dispose();
        }
        public updatePosition(a_timePassed:number):void
        {

            this.x = this.newPos.x;
            this.y = this.newPos.y;

        }

        public boom():void
        {
           console.log("gameover=======================");
            this.player.gotoAndPlay("playerboom");
            this.player.addEventListener("movie_over", this.gameover,this);
        }

        public gameover():void
        {
            gameworld.GameWorld.instance.showResult();
            this.player.removeEventListener("",this.gameover,this);
        }
    }

}