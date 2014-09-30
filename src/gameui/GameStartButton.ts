/**
 * Created by www on 2014/8/1.
 */
/**
 * Created by www on 2014/8/1.
 */
module gameui

{
    export class GameStartButton extends egret.gui.Skin{

        public constructor(){
            super();
            this.states = ["up","down","disabled"];
        }
        private static _skinParts:Array<string> = ["labelDisplay"];

        public get skinParts():Array<string>{
            return GameStartButton._skinParts;
        }
        /**
         * [SkinPart]
         */
        public labelDisplay:egret.gui.Label;

        private upSkin:egret.gui.UIAsset;
        private downSkin:egret.gui.UIAsset;
        private disabledSkin:egret.gui.UIAsset;


        public createChildren():void{
            super.createChildren();
            this.upSkin = new egret.gui.UIAsset();
            this.upSkin.source = "imagesheet_json.bigdown";
            this.addElement(this.upSkin);

            this.downSkin = new egret.gui.UIAsset();
            this.downSkin.source = "imagesheet_json.bigdown";
            this.downSkin.scaleX = this.downSkin.scaleY = 1.1;
            this.addElement(this.downSkin);

            this.disabledSkin = new egret.gui.UIAsset();
            this.disabledSkin.source = "imagesheet_json.bigdown";
            this.addElement(this.disabledSkin);

            this.labelDisplay = new egret.gui.Label();
            this.labelDisplay.maxDisplayedLines = 1;
            this.labelDisplay.size = 20;
            this.labelDisplay.fontFamily = "Tahoma";
            this.labelDisplay.textColor = 0x1a1815;
            this.labelDisplay.left = 10;
            this.labelDisplay.right = 10;
            this.labelDisplay.top = 10;
            this.labelDisplay.bottom = 10;
            this.labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
            this.labelDisplay.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addElement(this.labelDisplay);
        }

        public commitCurrentState():void{
            super.commitCurrentState();
            switch (this.currentState){
                case "up":
                    this.upSkin.visible = true;
                    this.disabledSkin.visible = false;
                    this.downSkin.visible = false;
                    break;
                case "down":
                    this.downSkin.visible = true;
                    this.disabledSkin.visible = false;
                    this.upSkin.visible = false;
                    break;
                case "disabled":
                    this.disabledSkin.visible = true;
                    this.downSkin.visible = false;
                    this.upSkin.visible = false;
                    break;
            }
        }
    }
}