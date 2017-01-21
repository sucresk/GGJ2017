class PackageList extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public packageBtn:eui.Button;
	public group:eui.Group;


	private ac:eui.ArrayCollection;// = new eui.ArrayCollection();
	protected childrenCreated(): void {
		super.childrenCreated();

		this.ac.removeAll();


		this.group.y = this.height - 355 + 270;

		this.packageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	private isShow:boolean = false;
	private onClickHandler(e:egret.TouchEvent):void {
		if (!this.isShow) {
			egret.Tween.get(this.group).to({y:this.height - 355}, 300);
		}
		else {
			egret.Tween.get(this.group).to({y:this.height - 355 + 270}, 300);
		}

		this.isShow = !this.isShow;
	}

	addID(packageID:number):void {
		this.ac.addItem({id:packageID});
	}
}

var packageList:PackageList;