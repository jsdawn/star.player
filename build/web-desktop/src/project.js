window.__require=function t(e,i,c){function n(o,a){if(!i[o]){if(!e[o]){var r=o.split("/");if(r=r[r.length-1],!e[r]){var u="function"==typeof __require&&__require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+o+"'")}}var h=i[o]={exports:{}};e[o][0].call(h.exports,function(t){return n(e[o][1][t]||t)},h,h.exports,t,e,i,c)}return i[o].exports}for(var s="function"==typeof __require&&__require,o=0;o<c.length;o++)n(c[o]);return n}({Game:[function(t,e,i){"use strict";cc._RF.push(e,"a8691BXkfdPUKQMU5sRMRZ/","Game"),cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label}},onLoad:function(){this.timer=0,this.starDuration=0,this.groundY=this.ground.y+this.ground.height/2,this.spawnNewStar(),this.score=0},spawnNewStar:function(){var t=cc.instantiate(this.starPrefab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("Star").game=this,this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){var t,e=this.groundY+Math.random()*this.player.getComponent("Player").jumpHeight+50,i=this.node.width/2;return t=2*(Math.random()-.5)*i,cc.v2(t,e)},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score: "+this.score},gameOver:function(){this.player.stopAllActions(),cc.director.loadScene("game")},start:function(){},update:function(t){this.timer>this.starDuration?this.gameOver():this.timer+=t}}),cc._RF.pop()},{}],Player:[function(t,e,i){"use strict";cc._RF.push(e,"e155c4+o/dFhofExUaELAqx","Player"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,jumpAudio:{default:null,type:cc.AudioClip}},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(t,e,i))},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!0;break;case cc.macro.KEY.d:this.accRight=!0}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!1;break;case cc.macro.KEY.d:this.accRight=!1}},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},start:function(){},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t}}),cc._RF.pop()},{}],Star:[function(t,e,i){"use strict";cc._RF.push(e,"e64ecol7cBHjb67wX1ehFRp","Star"),cc.Class({extends:cc.Component,properties:{pickRadius:0},getPlayerDistance:function(){var t=this.game.player.getPosition();return this.node.position.sub(t).mag()},onPicked:function(){this.game.spawnNewStar(),this.game.gainScore(),this.node.destroy()},start:function(){},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e)}}}),cc._RF.pop()},{}]},{},["Game","Player","Star"]);