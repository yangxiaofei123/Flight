/**
 * Created by www on 2014/8/1.
 */
module gameui

{
    export class GameButton extends egret.gui.Skin{

        public constructor(){
            super();
            this.states = ["up","down","disabled"];
        }
        private static _skinParts:Array<string> = ["labelDisplay"];

        public get skinParts():Array<string>{
            return GameButton._skinParts;
        }
        /**
         * [SkinPart]
         */
        public labelDisplay:egret.gui.Label;

        private uiAsset:egret.gui.UIAsset;

        public createChildren():void{
            super.createChildren();
            this.uiAsset = new egret.gui.UIAsset();
            this.addElement(this.uiAsset);

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
                    this.uiAsset.source = "button-up";
                    break;
                case "down":
                    this.uiAsset.source = "button-down";
                    break;
                case "disabled":
                    this.uiAsset.source = "button-disabled";
                    break;
            }
        }
    }
}