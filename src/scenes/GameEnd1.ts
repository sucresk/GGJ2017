class GameEnd1 extends Scene
{

	public txt:egret.TextField;

	public constructor() 
	{
		super();
	}

	public init():void
	{
		var bg:egret.Bitmap = AssetManager.createBitmapByName("gameEnd_bad_png");
		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;
		this.addChild(bg);

		// this.txt = new egret.TextField();
		// this.txt.y = 400;
		// this.txt.text = "艾德突然出现，偷袭你成功，将你杀死后，\n艾德从梦境逃离，你被抛进迷失域，无法逃离。\n点击任意地方重新开始";
		// this.addChild(this.txt);
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

		packageList.visible = false;
	}

	private onTouch(e:egret.TouchEvent):void
	{
		this.next("gameStart");
	}
}