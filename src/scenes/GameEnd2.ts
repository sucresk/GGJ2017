class GameEnd2 extends Scene
{

	public txt:egret.TextField;

	public constructor() 
	{
		super();
	}

	public init():void
	{
		var bg:egret.Bitmap = AssetManager.createBitmapByName("scene1_png");
		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;
		this.addChild(bg);

		this.txt = new egret.TextField();
		this.txt.multiline = true;
		this.txt.width = 400;
		this.txt.y = 400;
		this.txt.text = "艾德突然出现，想偷袭你，但你的重要道具圣光盾保护了你，你从梦境逃离，艾德被抛进迷失域，无法逃离。\n点击任意地方重新开始";
		this.addChild(this.txt);
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
	}

	private onTouch(e:egret.TouchEvent):void
	{
		this.next("gameStart");
	}
}