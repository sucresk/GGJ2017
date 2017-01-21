class AssetManager
{
	public static BGS:string[] = [""]
	public constructor() 
	{

	}

	public static createBitmapByName(name:string, centerAnchor:boolean = true):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        if(centerAnchor)
		{
			result.anchorOffsetX = result.width / 2;
        	result.anchorOffsetY = result.height / 2;
		}
        
		result.scaleX = result.scaleY = 2;

        return result;
    }
}