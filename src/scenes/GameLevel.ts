class GameLevel extends Scene {
	public mainRole: Role;

	public constructor() {
		super();
	}

	private roleContainer:egret.DisplayObjectContainer;
	public init(): void {
		var bg: egret.Bitmap = AssetManager.createBitmapByName("scene_1_png");
		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;
		this.addChild(bg);

		this.roleContainer = new egret.DisplayObjectContainer();
		this.addChild(this.roleContainer);
		// this.touchEnabled = true;

		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.mainRole = Game.instance.roleManager.getRole("roshan");
		this.mainRole.roleX = 25;
		this.mainRole.roleY = 50;
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

	private gap:number = 8;s
	private roles: Role[] = [];

	private rolePositions: { x: number, y: number }[] = [];

	private onTouch(e: egret.TouchEvent): void {
		// this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		// this.next("gameStart");
	}

	private walkCount:number = 0;
	public tick(advancedTime: number): void {
		dragonBones.WorldClock.clock.advanceTime(-1);

		let isMove = this.mainRole.addStep(this.endX, this.endY);
		if (isMove) {
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

	private step: number = 4;

	private endX: number;
	private endY: number;
	private onClickHandler(e: egret.TouchEvent): void {
		this.endX = Math.round(e.stageX / this.step);
		this.endY = Math.round(e.stageY / this.step);
	}

}