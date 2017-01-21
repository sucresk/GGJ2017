class GameLevel extends Scene
{
	public mainRole:Role;

	public constructor() 
	{
		super();
	}

	public init():void
	{
		var bg:egret.Bitmap = AssetManager.createBitmapByName("scene_1_png");
		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;
		this.addChild(bg);

		// this.touchEnabled = true;

		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.mainRole = Game.instance.roleManager.getRole("roshan");
		this.mainRole.x =100;
		this.mainRole.y = 200;
		this.addChild(this.mainRole);
		this.mainRole.walk(Role.LEFT);
	}

	private onTouch(e:egret.TouchEvent):void
	{
		// this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		// this.next("gameStart");
	}

	public tick(advancedTime:number):void
    {
        dragonBones.WorldClock.clock.advanceTime(-1);
    }
}