class Role extends egret.Sprite
{
    public static LEFT:string = "left";
    public static RIGHT:string = "right";
    public static FRONT:string = "front";
    public static BACK:string = "back";

    public armature:dragonBones.Armature;
    public name:string;
    private _scale:number;

    private talk:Talk;
    public constructor(name:string = "man1", scale:number = 1)
    {
        super();
        this.name = name;
        this._scale = scale;
        console.log("name armature",name);
        var skeletonData = RES.getRes(name + "_ske_json");
        var textureData = RES.getRes(name + "_tex_json");
        var texture = RES.getRes(name + "_tex_png");
        
        var factory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        
        this.armature = factory.buildArmature(name);
        var armatureDisplay = this.armature.display;
        armatureDisplay.scaleX = this._scale * 2;
        armatureDisplay.scaleY = this._scale * 2;
        dragonBones.WorldClock.clock.add(this.armature);
        this.addChild(armatureDisplay);


        this.talk = new Talk();
        // this.addChild(this.talk);
        this.talk.y = armatureDisplay.y - armatureDisplay.height;

        this.talk.setTalk("asdflafa\nasfafa\nasdfasfasfdasfa");

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTalk, this);
    }

    private onTalk(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        
        if (this.talk.parent) {
            return;
        }
        this.addChild(this.talk);

        egret.setTimeout(()=> {
            this.removeChild(this.talk);
        }, this, 3000);
    }
    
    private _roleX : number;
    public get roleX() : number {
        return this._roleX;
    }
    public set roleX(v : number) {
        this._roleX = v;

        this.x = this._roleX * GameLevel.STEP;
    }

    
    private _roleY : number;
    public get roleY() : number {
        return this._roleY;
    }
    public set roleY(v : number) {
        this._roleY = v;

        this.y = this._roleY * GameLevel.STEP;
    }
    
    public addStep(endX:number, endY:number):boolean {
        if (this.roleX < endX) {
			this.roleX++;

			this.walk(Role.RIGHT);
            return true;
		}
		else if (this.roleX > endX) {
			this.roleX--;

			this.walk(Role.LEFT);
            return true;
		}
		else {
			if (this.roleY <  endY) {
				this.roleY++;

				this.walk(Role.FRONT);
            return true;
			}
			else if (this.roleY > endY) {
				this.roleY--;

				this.walk(Role.BACK);
            return true;
			}
		}
        return false;
    }
    
    private lastDirect:string;
    private dbType:string;
    public stand(direct:string):void
    {   
        if (direct == this.lastDirect && this.dbType == "stand") {
            return;
        }
        this.lastDirect = direct;
        this.dbType = "stand";
        this.play("stand_" + direct);
    }

    public walk(direct:string):void
    {
        if (direct == this.lastDirect && this.dbType == "walk") {
            return;
        }
        this.lastDirect = direct;
        this.dbType = "walk";
        this.play("walk_" + direct);
    }

    public play(name:string):void
    {
         this.armature.animation.play(name,0);
    }
    public gotoAndStop(name:string, pos:number):void
    {
         this.armature.animation.gotoAndStop(name,pos);
    }
    
    public get totleTime():number
    {
        return this.armature.animation.lastAnimationState.totalTime;
    }
    public remove():void
    {
        dragonBones.WorldClock.clock.remove(this.armature);
    }
}