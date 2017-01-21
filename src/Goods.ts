// TypeScript file
class Goods extends egret.DisplayObjectContainer {

    private id: number;
    private icon;
    private armature;

    constructor(goodsID: number) {
        super();

        this.id = goodsID;

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

                let item = RES.getRes("items_json")["items"][self.id - 1];
                talk.setTalk(`恭喜你获得 ${item.name}`, () => {
                    packageList.addID(self.id);
                });
            }
        }, this);
    }
}