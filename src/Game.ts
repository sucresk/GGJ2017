class Game extends eui.UILayer
{
    private static _instance:Game;
    public static get instance():Game
    {
        return Game._instance;
    }

    public roleManager:RoleManager;
    public random:Random;
    // public gameURL:string = "http://sucresk.github.io/ggj2017/index.html";
    public gameURL:string = "http://10.0.12.50:5334/index.html";
	public constructor() 
	{
		super();
        Game._instance = this;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.roleManager = new RoleManager();
        this.random = new Random(0, RES.getRes("random_png"));
        
	}

    public resetGame():void
    {
        this.clearData();
        this.initGameData();
        var rIdStr:string = this.GetQueryString("rid");
        var rid:number = parseFloat(rIdStr);
        if(rid >= 0 && rid <= 7)
        {
            this.addRole(rid);
        }
    }
    public loadGame():void
    {
        this.load();
        this.initGameData();
        var rIdStr:string = this.GetQueryString("rid");
        var rid:number = parseFloat(rIdStr);
        if(rid >= 0 && rid <= 7)
        {
            this.addRole(rid);
        }

        this.loadPackage();
    }
    private GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)
        {
            return  decodeURI(r[2]); 
        } 
        return null;
    }

    private addRole(rid:number):void
    {
        var roleId = roleDefine[rid];
        if(roleId)
        {
            if(userGameData.roles.length < 7)
            {
              userGameData.roles.push({id:roleId});
             this.save();
            }
        }  
    }
    public clearData():void
    {
        egret.localStorage.clear();
    }
    public save():void
    {
        var data:string = JSON.stringify(userGameData);
        egret.localStorage.setItem("uuuData",data);
    }
    public load():void
    {
        var data:string = egret.localStorage.getItem("uuuData");
        var dataJson:any = JSON.parse(data);
        userGameData = dataJson;
    }
    private initGameData():void
	{
		if(userGameData == null)
		{
			userGameData = {};
			var roleIndex = Game.instance.random.Int(roleDefine.length);
			userGameData.mainRole = roleDefine[roleIndex];
			userGameData.package = [];
			userGameData.roles = [];
            this.save();
		}
        
	}

    public addPackageItem(itemID:number):void
    {
        userGameData.package.push(itemID);
        this.save();
    }

    public loadPackage():void
    {
        if(userGameData.package)
        {
            for(let i:number = 0, len:number = userGameData.package.length; i < len; i++)
            {
                packageList.addID(userGameData.package[i]);
            }
        }
    }
    public getItemObj(id:number):any
    {
        var items = RES.getRes("items_json")["items"];
        for(let i:number =0 , len = items.length; i < len; i++ )
        {
            if(items[i].id == id)
            {
                return items[i];
            }
        }
        return null;
    }
    
	private onAdded(e:egret.Event):void
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.init();
    }

    private pageLayer:egret.DisplayObjectContainer;

	private init():void
    {
        console.log("this is a new game!");
        this.initDB();

        this.pageLayer = new egret.DisplayObjectContainer();
        this.addChild(this.pageLayer);

        packageList = new PackageList();
        this.addChild(packageList);
         packageList.bottom = 0;

         talk = new Talk();
         this.addChild(talk);
         talk.visible = false;

         letter = new Letter();
         this.addChild(letter);
         letter.visible = false;

        var sceneManager:SceneManager = new SceneManager(this.pageLayer);
        
        sceneManager.registerScene("gameInfo", new GameInfo());
        sceneManager.registerScene("gameLevel", new GameLevel());
        sceneManager.registerScene("gameStart", new GameStart());
        sceneManager.registerScene("gameEnd1", new GameEnd1());
        sceneManager.registerScene("gameEnd2", new GameEnd2());
        sceneManager.setCurSceneByName("gameStart");
        sceneManager.startTick();

        

        //  suicideConfim = new Confirm();
        //  this.addChild(suicideConfim);
        //  suicideConfim.visible = false;

    }

    private initDB():void
    {
        DBManager.addData("items_ske_json","items_tex_json","items_tex_png")
        //DBManager.addData("bubbles_json","texture2_json","texture2_png")
        //DBManager.addData("questAnim_json","texture3_json","texture3_png")
    }


}