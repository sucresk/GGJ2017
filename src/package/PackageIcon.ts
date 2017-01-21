class PackageIcon extends eui.ItemRenderer implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	
	private _name : string;
	public get name() : string {
		return this._name;
	}
	public set name(v : string) {
		this._name = v;
	}
	
	
}