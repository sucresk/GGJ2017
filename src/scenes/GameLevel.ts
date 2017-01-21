var roleDefine = ["roshan", "aziraphale","devil","e10sprite","fey","redskull","sithjester"];
var sceneDefine = ["scene1_png", "scene2_png","scene3_png","scene4_png","scene5_png","scene6_png","scene7_png","scene8_png"];
var letterDefine = [1, 2,3,4,5,6,7];
var codeSegmentDefine = [9, 10,11,12,13,14,15];
var goodsDefine=[1,2,3,4,5,6,7];

var CODE_ID = 8;
var userGameData:any;
class GameLevel extends Scene {
	public mainRole: Role;

	private gap:number = 8;

	static STEP:number = 8;

	private _goods:Goods[] = [];

	public constructor() {
		super();
	}

	private roleContainer:egret.DisplayObjectContainer;

	private goodsContainer:egret.DisplayObjectContainer;

	private initGoods():void {
		

		// for (let i:number = 0; i < 15; i++) {
		// 	let goods:Goods = new Goods(i % 7 + 1, i + 1);
		// 	this.roleContainer.addChild(goods);
		// 	goods.x = Math.random() * (this.stage.width  - 100) + 50;
		// 	goods.y = Math.random() * (this.stage.height - 360) + 50;
		// }
		for(let i = 0, len = this._sceneData.goods.length; i < len; i++)
		{
			let goodObj = this._sceneData.goods[i];
			let goods:Goods = new Goods(goodObj.id, goodObj.itemID);
			goods.x = goodObj.x;
			// goods.x = Math.random() * (this.stage.width  - 100) + 50
			goods.y = goodObj.y;
			this._goods.push(goods);
			// goods.y = Math.random() * (this.stage.height - 360) + 50;
			this.roleContainer.addChild(goods);
		}
	}

	private endX: number = 25;
	private endY: number = 50;
	private bg:egret.Bitmap;
	private btnSuicide:egret.Bitmap;

	public init(): void {
		
		// this.roleContainer = new egret.DisplayObjectContainer();
		// this.addChild(this.roleContainer);

		

		this.initGameData();
		this.initSceneData();

		
		this.initScene();
		this.initGoods();
		this.initRole();

		this.btnSuicide = AssetManager.createBitmapByName("suicide_png");
		this.btnSuicide.scaleX = this.btnSuicide.scaleY = 1;
		this.btnSuicide.x = 50;
		this.btnSuicide.y = 50;
		this.addChild(this.btnSuicide);
		this.btnSuicide.touchEnabled = true;
		this.btnSuicide.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchSuicide, this);
		
		// this.touchEnabled = true;
		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);	

		this.initListener();
	}

	private onTouchSuicide():void
	{
		// suicideConfim.setContent("你确定要自杀么？");
		var self = this;
		talk.setTalk("自杀",()=>{
			self.suicide();
		});
	}

	private clearScene():void
	{
		for(let i:number = 0, len:number = this._goods.length; i < len; i++)
		{
			var g:Goods = this._goods[i];
			if(g && g.parent)
			{
				g.parent.removeChild(g);
				g.dispose();
			}
		}
	}
	private suicide():void
	{
		this.initSceneData();
		this.clearScene();
		this.initScene();
		this.roleContainer.removeChildren();
		this.initGoods();
		this.resetRole();
	}
	private initGameData():void
	{
		if(userGameData == null)
		{
			userGameData = {};
			var roleIndex = Game.instance.random.Int(roleDefine.length);
			userGameData.mainRole = roleDefine[roleIndex];
			userGameData.package = [];
		}
	}
	private initSceneData():void
	{
		this._sceneData = {};
		let bgIndex = Game.instance.random.Int(sceneDefine.length);
		this._sceneData.bg = sceneDefine[bgIndex];
		let letterIndex = Game.instance.random.Int(letterDefine.length);
		this._sceneData.letterID = letterDefine[letterIndex];
		let codeSIndex = Game.instance.random.Int(codeSegmentDefine.length)
		this._sceneData.codeSegmentID = codeSegmentDefine[codeSIndex];
		if(userGameData.codeID != CODE_ID)
		{
			this._sceneData.codeID = CODE_ID;
		}

		var goodsNum = Game.instance.random.Int(4,7);
		this._sceneData.goods = [];
		for(let i = 0; i < goodsNum; i++)
		{
			var goodsObj:any = {};
			goodsObj.id = Game.instance.random.Int(goodsDefine.length);
			var a = Game.instance.random.Next();
			goodsObj.x = a* (this.stage.stageWidth  - 100) + 50;
			a= Game.instance.random.Next();
			goodsObj.y = a * (this.stage.stageHeight - 360) + 50;
			goodsObj.itemID = -1;
			this._sceneData.goods.push(goodsObj);
		}
		this._sceneData.goods[0].itemID = this._sceneData.letterID;
		this._sceneData.goods[1].itemID = this._sceneData.codeSegmentID;
		if(this._sceneData.codeID != null)
		{
			this._sceneData.goods[2].itemID = this._sceneData.codeID;
		}
	}

	private initScene():void
	{

		this.bg = AssetManager.createBitmapByName(this._sceneData.bg);
		this.bg.x = this.stage.stageWidth / 2;
		this.bg.y = this.stage.stageHeight / 2;
		this.addChild(this.bg);
		this.roleContainer = new egret.DisplayObjectContainer();
		this.addChild(this.roleContainer);
	}
	private initRole():void
	{
		this.mainRole = Game.instance.roleManager.getRole(userGameData.mainRole);
		this.resetRole();
	}

	private resetRole():void
	{
		this.mainRole.roleX = this.endX;
		this.mainRole.roleY = this.endY;
		this.roleContainer.addChild(this.mainRole);
		this.mainRole.stand(Role.FRONT);

		if(userGameData.roles && userGameData.roles.length > 0)
		{
			for (let i: number = 0, len:number = userGameData.roles.length; i < len; i++) 
			{
				var roleObj:any = userGameData.roles[i];
				let role = Game.instance.roleManager.getRole(roleObj.id);
				this.roleContainer.addChild(role);
				this.mainRole.walk(Role.LEFT);
				role.roleX = this.mainRole.roleX + (i + 1) * this.gap;
				role.roleY = this.mainRole.roleY;
				this.rolePositions.push({x:this.mainRole.roleX + i * this.gap, y : this.mainRole.roleY});
				this.roles.push(role);
			}
		}
	}

	private _sceneData:any;
	private roles: Role[] = [];

	private rolePositions: { x: number, y: number }[] = [];

	private onTouch(e: egret.TouchEvent): void {
		// this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		// this.next("gameStart");
	}

	private walkCount:number = 0;
	public tick(advancedTime: number): void {
		dragonBones.WorldClock.clock.advanceTime(-1);

		let moveType = this.mainRole.addStep(this.endX, this.endY);
		if (moveType > 0) {
			for (let i: number = 0; i < this.roles.length; i++) {
				this.roles[i].addStep(this.rolePositions[i].x, this.rolePositions[i].y);
			}

			this.walkCount++;
			if (this.walkCount == this.gap) {
				this.rolePositions[0] = {x: this.mainRole.roleX, y : this.mainRole.roleY};

				for (let i: number = 1; i < this.roles.length; i++) {
					this.rolePositions[i] = {x : this.roles[i - 1].roleX, y : this.roles[i - 1].roleY};
				}

				this.walkCount = 0;
			}

			this.roleSort();

			if (moveType == 2) {
				this.mainRole.stand(this.mainRole.direct);

				for (let i: number = 0; i < this.roles.length; i++) {
					this.roles[i].stand(this.roles[i].direct);
				}
			}
		}

	}

	private roleSort():void {
		this.roleContainer.$children.sort((a, b):number => {
			return a.y < b.y ? -1 : 1;
		})
	}

	private initListener(): void {
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}
	private onClickHandler(e: egret.TouchEvent): void {
		this.endX = Math.round(e.stageX / GameLevel.STEP);
		this.endY = Math.round(e.stageY / GameLevel.STEP);
	}

}