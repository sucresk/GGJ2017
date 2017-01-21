// TypeScript file
class Goods extends egret.DisplayObjectContainer {

    private id: number;
    private icon;
    private armature:dragonBones.Armature;


    private itemID:number;
    constructor(goodsID: number, itemID:number) {
        super();

        this.id = goodsID;
        this.itemID = itemID;

        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(): void {

        this.armature = DBManager.buildArmature("item" + this.id);
        this.icon = this.armature.display;
        this.icon.scaleX = 2;
        this.icon.scaleY = 2;
        dragonBones.WorldClock.clock.add(this.armature);
        this.addChild(this.icon);
        this.armature.animation.play("normal", 0);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
    }

    public dispose():void
    {
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        dragonBones.WorldClock.clock.remove(this.armature);
        this.armature.dispose();
    }
    private isHad: boolean = false;
    private onTapHandler(e: egret.TouchEvent): void {
        e.stopPropagation();

        this.armature.animation.play("found", 1);
        let self = this;
        this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, function f(e: dragonBones.AnimationEvent) {
            e.currentTarget.animation.play("normal");

            e.currentTarget.removeEventListener(dragonBones.AnimationEvent.COMPLETE, f, this);

            if (!self.isHad) {
                self.isHad = true;

                if(self.itemID > 0)
                {
                    if(userGameData.package.indexOf(self.itemID) == -1)
                    {
                        // let item = RES.getRes("items_json")["items"][self.itemID];
                        let item = Game.instance.getItemObj(self.itemID);
                        if(item)
                        {
                            talk.setTalk(`获得  ${item.name}`, () => {
                                
                                Game.instance.addPackageItem(self.itemID);
                                packageList.addID(self.itemID);
                            });
                        }
                    }   
                }   
            }
        }, this);
    }
}