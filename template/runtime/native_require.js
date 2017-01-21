
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/dragonBones/dragonBones.js",
	"bin-debug/lion/scenes/Scene.js",
	"bin-debug/scenes/GameLevel.js",
	"bin-debug/DBManager.js",
	"bin-debug/Game.js",
	"bin-debug/Goods.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Quest.js",
	"bin-debug/Role.js",
	"bin-debug/RoleManager.js",
	"bin-debug/Talk.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/events/RoleEvent.js",
	"bin-debug/lion/core/BaseControl.js",
	"bin-debug/lion/core/Notification.js",
	"bin-debug/lion/core/SignBus.js",
	"bin-debug/lion/core/fsmachine/FSM.js",
	"bin-debug/lion/core/fsmachine/State.js",
	"bin-debug/lion/scenes/IScene.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/lion/scenes/SceneEvent.js",
	"bin-debug/lion/scenes/SceneManager.js",
	"bin-debug/package/Letter.js",
	"bin-debug/package/PackageIcon.js",
	"bin-debug/package/PackageList.js",
	"bin-debug/qr/QR8bitByte.js",
	"bin-debug/qr/QRBitBuffer.js",
	"bin-debug/qr/QRCode.js",
	"bin-debug/qr/QRCodeModel.js",
	"bin-debug/qr/QRErrorCorrectLevel.js",
	"bin-debug/qr/QRMaskPattern.js",
	"bin-debug/qr/QRMath.js",
	"bin-debug/qr/QRMode.js",
	"bin-debug/qr/QRPolynomial.js",
	"bin-debug/qr/QRRSBlock.js",
	"bin-debug/qr/QRUtil.js",
	"bin-debug/scenes/GameInfo.js",
	"bin-debug/AssetManager.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};