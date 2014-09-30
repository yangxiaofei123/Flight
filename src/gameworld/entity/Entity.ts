/**
 * Created by www on 2014/8/7.
 */
module gameworld {

    export class Entity extends egret.DisplayObjectContainer {
        _stepSize:number;
        _entityParent:Entity;

        private static m_nextID:number = 0;
        private m_scale:number;
        private m_id:string;
        private m_entityMap:Object = {}


        public newPos:gameworld.Vector2D;
        public actualPos:gameworld.Vector2D;
        public rotation:number;
        public radius:number;
        public bounds:gameworld.AABBox;
        public constructor(params:gameworld.EntityParams) {
            super();
            this.actualPos = new gameworld.Vector2D();
            this.newPos = this.actualPos.copy();

            this.radius =params.radius;
            this.rotation = params.rotation;
            this.entityscale = params.scale;


            if (params.id == null) {
                this.m_id = "" + Entity.m_nextID++;
            }
            else {
                this.m_id = params.id;
            }

            this.entityparent = (params.parent);
        }

        public setBoundSize(width:number,height:number){
            this.bounds = new gameworld.AABBox(this.actualPos, width, height);
        }

        public update(a_timePassed:number):void {
            this.setInitialValues(a_timePassed);

            this.updateEntityChildren(a_timePassed);
        }

        public get entityscale():number {
            return this.m_scale;
        }

        public set entityscale(a_value:number) {
            this.m_scale = a_value;
        }

        public get id():string {
            return this.m_id;
        }

        public get entityparent():Entity {
            return this._entityParent;
        }
//
        public set entityparent(a_value:Entity) {
            if (this._entityParent !=null )
            {// if parent exists
                this._entityParent.removeEntityChild(this.id);
            }

            this._entityParent = a_value;

            if (this._entityParent && this._entityParent.getEntityChildByID(this.m_id) == null) // if parent is not null and does not contain this entity
                this._entityParent.addEntityChild(this);

        }

        public addEntityChild(a_entity:Entity):void {
            if (this.m_entityMap[ a_entity.id ] != null) {
//                throw new Error("<Entity> There is an entity with this id already. Ensure ids are unique.");
                return;
            }

            this.m_entityMap[ a_entity.id ] = a_entity;
            a_entity.entityparent = this;
        }

        public removeEntityChild(a_id:string):void {

            if (<Entity><any>( this.m_entityMap[ a_id ] ) == null) {
//                throw new Error("<Entity> There was no entity with a matching id.");
                return;
            }
//            console.log("remove:++"+a_id+this.m_entityMap[ a_id ]);
            this.m_entityMap[ a_id ]._entityParent = null;
            delete this.m_entityMap[ a_id ];
//            this.m_entityMap[ a_id ] = null;
        }

        public clearEntityChildren(a_classType:any = null):void {

            for(var i in this.m_entityMap){
                var entity:Entity = this.m_entityMap [i];
                if (a_classType) {
                    if (!( entity instanceof a_classType )) {
                        continue;
                    }
                }
                delete this.m_entityMap[ entity.id ];
//                this.m_entityMap[ entity.id ] = null;
                entity.entityparent = null;
            }
        }

        public getEntityChildByID(a_id:string):Entity {
            return <Entity><any>(this.m_entityMap[ a_id ] );
        }

        public getEntityChildren():Array<Entity> {
            var tempArray:Array<Entity> = [];

            for(var i in this.m_entityMap){
                var entity:Entity = this.m_entityMap [i];
                tempArray.push(entity);
            }

            return tempArray;
        }

        public updateEntityChildren(a_timePassed:number):void {
            for(var i1 in this.m_entityMap){
                var entity:Entity = this.m_entityMap[i1];
//                console.log(i1+"---"+entity);
                entity.update(a_timePassed);
            }

        }


        public setInitialValues(a_timePassed:number = 0):void {
            this._stepSize = a_timePassed;
            this.actualPos.x = this.newPos.x;
            this.actualPos.y = this.newPos.y;

            // .. Update bounds ...
            this.bounds.center.x = this.actualPos.x;
            this.bounds.center.y = this.actualPos.y;
            this.bounds.left = this.bounds.center.x - this.bounds.halfWidth;
            this.bounds.right = this.bounds.center.x + this.bounds.halfWidth;
            this.bounds.top = this.bounds.center.y - this.bounds.halfHeight;
            this.bounds.bottom = this.bounds.center.y + this.bounds.halfHeight;
            this.bounds.topLeft.x = this.bounds.left;
            this.bounds.topLeft.y = this.bounds.top;
            this.bounds.bottomRight.x = this.bounds.right;
            this.bounds.bottomRight.y = this.bounds.bottom;
            this.bounds.topRight.x = this.bounds.right;
            this.bounds.topRight.y = this.bounds.top;
            this.bounds.bottomLeft.x = this.bounds.left;
            this.bounds.bottomLeft.y = this.bounds.bottom;
        }

        public dispose():void {
            this.newPos = null;
            this.actualPos = null;
            this.bounds = null;

            for(var i1 in this.m_entityMap){
                var entity:Entity = this.m_entityMap  [i1];
                delete this.m_entityMap[ entity.id ];
//                this.m_entityMap[ entity.id ] = null;
                entity.dispose();
            }

            this.m_entityMap = null;


            this.entityparent = null;

        }

    }


}