class GameStart extends Scene
{

	public btnStart:egret.Bitmap;
	public btnLoad:egret.Bitmap;
	public btnInfo:egret.Bitmap;
	public bg:egret.Bitmap;

	public constructor() 
	{
		super();
		this.bg = AssetManager.createBitmapByName("gameStart_bg_png");

		this.btnStart = AssetManager.createBitmapByName("btnStart_png");
		

		this.btnLoad = AssetManager.createBitmapByName("btnLoad_png");
		

		this.btnInfo = AssetManager.createBitmapByName("btnInfo_png");
		

		this.btnStart.touchEnabled = true;
		this.btnLoad.touchEnabled = true;
		this.btnInfo.touchEnabled = true;
		
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchStart, this);
		this.btnLoad.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchLoad, this);
		this.btnInfo.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchInfo, this);
	}

	public init():void
	{
		
		this.bg.x = this.stage.stageWidth / 2;
		this.bg.y = this.stage.stageHeight / 2;
		this.addChild(this.bg);

		this.btnStart.x = this.stage.stageWidth / 2;
		this.btnStart.y = this.stage.stageHeight / 2;

		this.btnLoad.x = this.btnStart.x;
		this.btnLoad.y = this.btnStart.y + 200;

		this.btnInfo.x = this.btnStart.x;
		this.btnInfo.y = this.btnStart.y + 400;

		// this.touchEnabled = true;
		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

		

		this.addChild(this.btnStart);
		this.addChild(this.btnLoad);
		this.addChild(this.btnInfo);

		packageList.visible = false;
		
		console.log("game start")
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