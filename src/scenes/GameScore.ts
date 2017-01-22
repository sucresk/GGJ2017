class GameScore extends Scene
{

	public bg:egret.Bitmap;
	public txt:egret.TextField;

	public constructor() 
	{
		super();
		this.bg = AssetManager.createBitmapByName("gameScore_bg_png");
	}

	public init():void
	{
		
		this.bg.x = this.stage.stageWidth / 2;
		this.bg.y = this.stage.stageHeight / 2;
		this.addChild(this.bg);

		this.txt = new egret.TextField();
		var t:number = new Date().getTime() - userGameData.startTime;
		var m:number = Math.floor(t / 60000);
		console.log(userGameData.startTime, userGameData.suicideTime)
		var suicideTime:number = userGameData.suicideTime;
		var packageNum:number = userGameData.package.length;
		var packagePercent:number = Math.floor(packageNum / 16 * 100);

		var roleIds = [];
		for(let i:number = 0, len:number = userGameData.roles.length; i < len; i++)
		{
			let r = userGameData.roles[i];
			if(roleIds.indexOf(r.id) == -1)
			{
				roleIds.push(r.id);
			}
		}

		let roleNum:number = roleIds.length;
		let rolePercent:number = Math.floor(roleNum / 7 * 100);

		this.txt.text = "游戏时间： " + m + "分钟" + 
						"\n\n" + 
						"自杀次数： " + suicideTime + 
						"\n\n" + 
						"收集道具： " + packagePercent + "%" +
						"\n\n" + 
						"收集角色： " + rolePercent + "%";
		
		this.txt.x = 100;
		this.txt.size = 48;
		this.txt.y = 300;
		this.txt.multiline = true;
		this.txt.width = 400;
		this.addChild(this.txt);
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

		packageList.visible = false;
	}

	private onTouch(e:egret.TouchEvent):void
	{
		this.next("gameStart");
	}
}