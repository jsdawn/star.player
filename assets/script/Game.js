cc.Class({
  extends: cc.Component,

  properties: {
    // 这个属性引用了星星预制资源
    starPrefab: {
      default: null,
      type: cc.Prefab
    },
    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,
    // 地面节点，用于确定星星生成的高度
    ground: {
      default: null,
      type: cc.Node
    },
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    player: {
      default: null,
      type: cc.Node
    },
    // score label 的引用
    scoreDisplay: {
      default: null,
      type: cc.Label
    }
  },

  onLoad: function() {
    // 变量 计时器
    this.timer = 0;
    this.starDuration = 0;
    // 获取地平面的 y 轴坐标
    this.groundY = this.ground.y + this.ground.height / 2;
    // 生成一个新的星星
    this.spawnNewStar();
    // 初始化计分
    this.score = 0;
  },

  // func 生成星星
  spawnNewStar: function() {
    // 使用给定的模板在场景中生成一个新节点
    var newStar = cc.instantiate(this.starPrefab);
    // 将新增的节点添加到 Canvas 节点下面
    this.node.addChild(newStar);
    // 为星星设置一个随机位置
    newStar.setPosition(this.getNewStarPosition());
    // 在星星组件上暂存 Game 对象的引用
    newStar.getComponent('Star').game = this;
    // 重置计时器，根据消失时间范围随机取一个值
    this.starDuration =
      this.minStarDuration +
      Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },
  // func 获取星星随机位置
  getNewStarPosition: function() {
    var randX = 0;
    // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
    var randY =
      this.groundY +
      Math.random() * this.player.getComponent('Player').jumpHeight +
      50;
    // 根据屏幕宽度，随机得到一个星星 x 坐标d
    var maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX;
    // 返回星星坐标
    return cc.v2(randX, randY);
  },
  // func 计分+1
  gainScore: function() {
    this.score += 1;
    // 更新 label 节点文字
    this.scoreDisplay.string = 'Score: ' + this.score;
  },
  // func 游戏失败
  gameOver: function() {
    this.player.stopAllActions();
    cc.director.loadScene('game');
  },

  start() {},

  update(dt) {
    // 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    if (this.timer > this.starDuration) {
      this.gameOver();
      return;
    }
    this.timer += dt;
  }
});
