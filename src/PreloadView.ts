/**
 * Created by www on 2014/7/31.
 */
class PreloadView extends egret.Sprite {
    public constructor(){
        super();
        this.createView();
        //如果不加监听stage有可能报空
//        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage,this);
    }
    private textField:egret.TextField;
    private logo:egret.Bitmap;
    private progressBar:gameui.GameProgressBar;

    private createView():void {
        this.touchEnabled = false;
        this.touchChildren = false;
        this.textField = new egret.TextField();
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.textColor = 0xff0000;
        this.logo = fighter.createBitmapByName("logo_png");
        this.progressBar = new gameui.GameProgressBar("loadingbar_01_png","loadingbar_02_png",290,0,15,8,259,10,61,64);
        this.addChild(this.logo);
        fighter.moveToCenter(this.logo);
        this.addChild(this.progressBar);
        fighter.moveToCenter(this.progressBar);
        this.addChild(this.textField);
        fighter.moveToCenter(this.textField,0,60);
    }
//    private  onAddedToStage(event:egret.Event) {
//        this.textField.text = this.stage.stageHeight+"";
//
//    }

    public setProgress(current, total):void {
        this.textField.text = "游戏加载中..." + current + "/" + total;
        this.progressBar.setProgress(current,total);
    }

    public dispose():void{

    }
}