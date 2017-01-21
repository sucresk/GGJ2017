class GameLevel extends Scene {
	public mainRole: Role;

	private gap:number = 8;

	static STEP:number = 8;

	public constructor() {
		super();
	}

	private roleContainer:egret.DisplayObjectContainer;

	private goodsContainer:egret.DisplayObjectContainer;

	private initGoods():void {
		for (let i:number = 0; i < 15; i++) {
			let goods:Goods = new Goods(i % 7 + 1, i + 1);
			this.goodsContainer.addChild(goods);
			goods.x = Math.random() * (this.stage.width  - 100) + 50;
			goods.y = Math.random() * (this.stage.height - 360) + 50;
		}
	}

	private endX: number = 25;
	private endY: number = 50;
	public init(): void {
		var bg: egret.Bitmap = AssetManager.createBitmapByName("scene_1_png");
		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;
		this.addChild(bg);

		this.goodsContainer = new egret.DisplayObjectContainer();
		this.addChild(this.goodsContainer);
		this.initGoods();

		this.roleContainer = new egret.DisplayObjectContainer();
		this.addChild(this.roleContainer);
		// this.touchEnabled = true;

		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.mainRole = Game.instance.roleManager.getRole("roshan");
		this.mainRole.roleX = this.endX;
		this.mainRole.roleY = this.endY;
		this.roleContainer.addChild(this.mainRole);
		this.mainRole.walk(Role.LEFT);

		for (let i: number = 0; i < 4; i++) {
			let role = Game.instance.roleManager.getRole("roshan");
			this.roleContainer.addChild(role);
			this.mainRole.walk(Role.LEFT);
			role.roleX = this.mainRole.roleX + (i + 1) * this.gap;
			role.roleY = this.mainRole.roleY;

			this.rolePositions.push({x:this.mainRole.roleX + i * this.gap, y : this.mainRole.roleY});

			this.roles.push(role);
		}

		this.initListener();
	}

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