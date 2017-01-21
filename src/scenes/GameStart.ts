class GameStart extends Scene
{

	public btnStart:egret.Bitmap;
	public btnLoad:egret.Bitmap;
	public btnInfo:egret.Bitmap;

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

		// this.touchEnabled = true;
		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

		this.btnStart = AssetManager.createBitmapByName("suicide_png");
		this.btnStart.x = this.stage.stageWidth / 2;
		this.btnStart.y = this.stage.stageHeight / 2;

		this.btnLoad = AssetManager.createBitmapByName("suicide_png");
		this.btnLoad.x = this.btnStart.x;
		this.btnLoad.y = this.btnStart.y + 100;

		this.btnInfo = AssetManager.createBitmapByName("suicide_png");
		this.btnInfo.x = this.btnStart.x;
		this.btnInfo.y = this.btnStart.y + 200;

		this.addChild(this.btnStart);
		this.addChild(this.btnLoad);
		this.addChild(this.btnInfo);

		this.btnStart.touchEnabled = true;
		this.btnLoad.touchEnabled = true;
		this.btnInfo.touchEnabled = true;
		
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchStart, this);
		this.btnLoad.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchLoad, this);
		this.btnInfo.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchInfo, this);
	}

	private onTouchInfo(e:egret.TouchEvent):void
	{
		this.next("gameInfo");
	}
	private onTouchLoad(e:egret.TouchEvent):void
	{
		Game.instance.loadGame();
		this.next("gameLevel");
	}

	private onTouchStart(e:egret.TouchEvent):void
	{
		Game.instance.resetGame();
		this.next("gameLevel");
	}
}