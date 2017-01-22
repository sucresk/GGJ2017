class GameInfo extends Scene
{


	public constructor() 
	{
		super();
	}

	public init():void
	{
		var bg:egret.Bitmap = AssetManager.createBitmapByName("gameInfo_bg_png");
		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;
		this.addChild(bg);

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		console.log("game info")

		packageList.visible = false;
	}

	private onTouch(e:egret.TouchEvent):void
	{
		this.next("gameStart");
	}
}