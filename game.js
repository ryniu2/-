(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const canvas = $("#game");
  const ctx = canvas.getContext("2d");
  const overlay = $("#overlay");
  const rolePreview = $("#rolePreview");
  const startBtn = $("#startBtn");
  const rerollBtn = $("#rerollBtn");
  const howBtn = $("#howBtn");
  const refreshSkillsBtn = $("#refreshSkillsBtn");
  const toast = $("#toast");
  const modalActions = $(".modal-actions");
  const upgradeChoices = $("#upgradeChoices");
  const ultBtn = $("#ultBtn");
  const fullscreenBtn = $("#fullscreenBtn");
  const fullscreenText = $("#fullscreenText");
  const pauseBtn = $("#pauseBtn");
  const pauseText = $("#pauseText");
  const restartBtn = $("#restartBtn");
  const restartText = $("#restartText");
  const uiToggleBtn = $("#uiToggleBtn");
  const uiToggleText = $("#uiToggleText");
  const dodgeBtn = $("#dodgeBtn");
  const dodgeText = $("#dodgeText");
  const joystick = $("#joystick");
  const joystickStick = $("#joystickStick");

  const ui = {
    kicker: $("#overlayKicker"),
    title: $("#overlayTitle"),
    text: $("#overlayText"),
    avatar: $("#hudAvatar"),
    role: $("#hudRoleName"),
    cls: $("#hudRoleClass"),
    hp: $("#hpFill"),
    xp: $("#xpFill"),
    lv: $("#levelText"),
    st: $("#stageText"),
    xpText: $("#xpText"),
    gold: $("#goldText"),
    kills: $("#killText"),
    skillIcon: $("#roleSkillIcon"),
    skillTitle: $("#roleSkillTitle"),
    skillInfo: $("#roleSkillInfo"),
    swordTitle: $("#swordTitle"),
    swordInfo: $("#swordInfo"),
    bossTitle: $("#bossTitle"),
    bossInfo: $("#bossInfo"),
    status: $("#statusPill"),
    preAvatar: $("#previewAvatar"),
    preName: $("#previewName"),
    preClass: $("#previewClass"),
    preSkill: $("#previewSkill"),
    ultText: $("#ultText"),
  };

  const avatarFiles = [
    "微信图片_2026-06-12_152805_757.jpg",
    "微信图片_2026-06-12_152819_102.jpg",
    "微信图片_2026-06-12_152830_238.jpg",
    "微信图片_2026-06-12_152837_686.jpg",
    "微信图片_2026-06-12_152844_854.jpg",
    "微信图片_2026-06-12_152851_293.jpg",
    "微信图片_2026-06-12_152856_974.jpg",
    "微信图片_2026-06-12_152918_437.jpg",
    "微信图片_2026-06-12_152926_805.jpg",
    "微信图片_2026-06-12_152934_190.jpg",
    "微信图片_2026-06-12_152939_110.jpg",
    "微信图片_2026-06-12_152944_389.jpg",
    "微信图片_2026-06-12_152950_495.jpg",
    "微信图片_2026-06-12_153001_383.jpg",
    "微信图片_2026-06-12_155149_114.jpg",
    "微信图片_2026-06-12_155155_930.jpg",
    "微信图片_2026-06-12_155201_699.jpg",
    "微信图片_2026-06-12_155206_085.jpg",
    "微信图片_2026-06-12_155211_747.jpg",
    "微信图片_2026-06-12_155217_931.jpg",
    "微信图片_2026-06-12_155222_995.jpg",
    "微信图片_2026-06-12_155227_331.jpg",
    "微信图片_2026-06-12_204429_972.jpg",
  ];

  const attackStyles = [
    { name: "均线剑阵", mode: "orbit", shape: "blade", icon: "剑", power: 1.05, text: "剑气环绕切割，稳定清近身怪。", intro: "近身环绕型，操作简单，适合边走边贴边清怪。" },
    { name: "涨停弹夹", mode: "shot", shape: "bullet", icon: "板", power: 0.78, cd: 0.34, volley: 2, text: "短冷却扫射，第三次命中触发涨停连击。", intro: "中距离扫射型，攻速高但需要保持走位距离。" },
    { name: "定投盾波", mode: "pulse", shape: "shield", icon: "投", power: 0.78, cd: 1.08, range: 132, text: "周期性释放护盾冲击波，命中时补充护盾。", intro: "防守脉冲型，靠护盾和范围波稳住阵地。" },
    { name: "红阳喷火", mode: "flame", shape: "flame", icon: "K", power: 0.5, cd: 0.34, range: 270, spread: 0.78, burn: 1, text: "朝最近怪喷出扇形火焰，持续点燃。", intro: "扇形喷火型，近中距离很强，站位方向很重要。" },
    { name: "网格地雷", mode: "mine", shape: "mine", icon: "格", power: 0.92, cd: 0.9, splash: 82, text: "脚下布置网格雷，怪物踩中后范围爆炸。", intro: "陷阱控场型，边退边埋雷，适合拉扯怪群。" },
    { name: "传闻光束", mode: "beam", shape: "laser", icon: "讯", power: 0.92, cd: 0.82, range: 760, pierce: 6, text: "锁定最近目标发出穿透光束。", intro: "直线穿透型，能打队列和消息面怪，吃站位角度。" },
    { name: "情绪火花", mode: "orbit", shape: "spark", icon: "热", power: 0.98, text: "人气火花高速环绕，连击越顺越热。", intro: "高速环绕型，连杀滚雪球，越打越快。" },
    { name: "回撤回旋镖", mode: "boomerang", shape: "boomerang", icon: "波", power: 0.96, cd: 0.86, pierce: 5, text: "甩出回旋镖，飞出后折返造成二次路径压制。", intro: "回旋路径型，横向拉扯能让回旋镖多穿几只怪。" },
    { name: "安全边际震波", mode: "pulse", shape: "shield", icon: "值", power: 0.72, cd: 1.14, range: 145, text: "厚血量角色释放稳健震波，越肉越有输出。", intro: "坦克震波型，伤害稳定、容错高，适合新手稳扎稳打。" },
    { name: "低吸匕首", mode: "orbit", shape: "dagger", icon: "吸", power: 1.02, text: "贴身匕首高速旋切，残血目标会被收割。", intro: "近身斩杀型，风险高但清残血和冲怪很爽。" },
    { name: "仓位回旋牌", mode: "boomerang", shape: "plate", icon: "仓", power: 0.88, cd: 0.8, pierce: 6, volley: 2, text: "飞牌往返切割，命中节奏触发再平衡回血。", intro: "回旋续航型，靠飞牌往返和分仓回血打持久战。" },
    { name: "股息钱袋雷", mode: "mine", shape: "coin", icon: "息", power: 0.76, cd: 0.82, splash: 72, text: "落下股息钱袋，怪物靠近时爆成经验和回血节奏。", intro: "收益陷阱型，清怪偏稳，击杀回血和掉落收益更好。" },
    { name: "盘口狙击", mode: "shot", shape: "sniper", icon: "盘", power: 1.34, cd: 1.05, pierce: 3, text: "低频高伤狙击弹，首击穿透最大血量。", intro: "低频狙击型，单发很痛，前期需要耐心拉开距离。" },
    { name: "复盘追踪镖", mode: "homing", shape: "dart", icon: "探", power: 0.82, cd: 0.56, volley: 2, pierce: 1, text: "飞镖会轻微追踪目标，持续叠弱点标记。", intro: "追踪标记型，单体和 Boss 稳定，清海量小怪偏慢。" },
    { name: "热点榴弹", mode: "grenade", shape: "grenade", icon: "题", power: 1.08, cd: 1.08, splash: 96, text: "抛射榴弹，命中或落地后范围爆炸。", intro: "范围爆破型，聚怪后收益很高，空旷单体略慢。" },
    { name: "期权回钩爪", mode: "boomerang", shape: "claw", icon: "猫", power: 0.92, cd: 0.76, pierce: 4, text: "猫爪飞出再回钩，暴击时收益更大。", intro: "暴击回旋型，路线刁钻，低血量护盾能兜底。" },
    { name: "龙头喷焰", mode: "flame", shape: "dragon", icon: "龙", power: 0.58, cd: 0.4, range: 300, spread: 0.62, burn: 1, text: "喷出龙形火舌，连杀越高首击越痛。", intro: "窄角喷焰型，方向压制强，适合滚雪球。" },
    { name: "指数贯穿光", mode: "beam", shape: "laser", icon: "指", power: 0.86, cd: 0.72, range: 820, pierce: 8, text: "指数光束贯穿一整条直线，关卡越高越强。", intro: "长线穿透型，横向走位找角度能一束清排队怪。" },
    { name: "国债羽毛", mode: "shot", shape: "feather", icon: "鸽", power: 0.7, cd: 0.48, volley: 2, text: "羽毛稳健连射，命中提供回血护盾。", intro: "稳健连射型，伤害不爆炸但恢复和容错优秀。" },
    { name: "锦鲤追星弹", mode: "homing", shape: "koi", icon: "鲤", power: 0.82, cd: 0.64, volley: 2, text: "星弹追踪目标，概率中签三倍暴击。", intro: "追踪暴击型，下限稳定，上限看运气。" },
    { name: "熔断回旋镖", mode: "boomerang", shape: "shuriken", icon: "忍", power: 0.9, cd: 0.62, volley: 2, pierce: 4, text: "手里剑飞出折返，闪避成功会强化下次伤害。", intro: "机动回旋型，闪避越熟练，爆发越稳定。" },
    { name: "牛角震荡", mode: "pulse", shape: "horn", icon: "牛", power: 0.92, cd: 1.0, range: 136, text: "牛角冲击波震开周围怪物，牛气越高越强。", intro: "成长震波型，前期稳，等级和牛气起来后压场。" },
    { name: "AI追踪芯片", mode: "homing", shape: "chip", icon: "AI", power: 0.86, cd: 0.56, volley: 2, pierce: 2, text: "芯片自动追踪，元素分支越多算法校准越痛。", intro: "追踪成长型，适合多元素路线，成型后泛用性强。" },
  ];

  const roleBaseStats = {
    blade: { hp: 114, atk: 16 },
    combo: { hp: 108, atk: 16 },
    shield: { hp: 122, atk: 15 },
    burn: { hp: 112, atk: 16 },
    grid: { hp: 116, atk: 15 },
    crit: { hp: 108, atk: 16 },
    hot: { hp: 110, atk: 16 },
    counter: { hp: 118, atk: 16 },
    value: { hp: 126, atk: 15 },
    execute: { hp: 108, atk: 17 },
    rebalance: { hp: 120, atk: 15 },
    dividend: { hp: 116, atk: 15 },
    pierce: { hp: 110, atk: 16 },
    mark: { hp: 112, atk: 16 },
    blast: { hp: 110, atk: 16 },
    option: { hp: 106, atk: 17 },
    dragon: { hp: 112, atk: 16 },
    index: { hp: 114, atk: 16 },
    bond: { hp: 124, atk: 14 },
    ipo: { hp: 108, atk: 16 },
    dodge: { hp: 108, atk: 16 },
    bull: { hp: 116, atk: 15 },
    ai: { hp: 110, atk: 16 },
  };

  const roles = [
    ["均线剑客", "技术面门徒", "剑", "#f7d66f", "均线剑气", "随等级强化剑气数量和伤害，环绕切割怪物。", "blade"],
    ["打板游侠", "连板猎手", "板", "#ff415f", "涨停连击", "每 3 次命中触发爆发，并短暂定住怪物。", "combo"],
    ["定投术士", "基金信徒", "投", "#72f0ce", "定投护盾", "命中叠护盾，升级补仓，越打越稳。", "shield"],
    ["K线法师", "蜡烛图学徒", "K", "#ff7b36", "红阳绿阴", "红阳灼烧，绿阴回血。", "burn"],
    ["网格书生", "量化半仙", "格", "#62dbff", "网格挂单", "高血量低吸增伤，低血量高抛回血。", "grid"],
    ["消息猎人", "题材雷达", "讯", "#d9a7ff", "传闻雷达", "概率识破小作文暴击，克消息面怪。", "crit"],
    ["情绪舞者", "人气冲浪者", "热", "#ffb23f", "人气共振", "连续命中叠人气，伤害持续升温。", "hot"],
    ["波段侠", "回撤掌控者", "波", "#48c0ff", "回撤反击", "受到的回撤会转成下次伤害。", "counter"],
    ["价值老炮", "安全边际派", "值", "#f2c86b", "安全边际", "血厚减伤，把本金转成稳定输出。", "value"],
    ["低吸刺客", "恐慌收割者", "吸", "#a2ff72", "恐慌低吸", "怪物低血量时追加斩杀伤害。", "execute"],
    ["仓位管家", "风控执行官", "仓", "#7de0a8", "分仓再平衡", "减伤，每 4 次命中回血加盾。", "rebalance"],
    ["分红牧师", "股息收集者", "息", "#f7e38d", "股息复利", "击杀回血，概率额外经验。", "dividend"],
    ["盘口枪手", "买卖盘狙击手", "盘", "#8fe7ff", "委买穿刺", "每个怪第一击穿透最大血量。", "pierce"],
    ["复盘侦探", "错题本专家", "探", "#d8d2ff", "弱点标记", "同一怪越打标记越高，专克 Boss。", "mark"],
    ["题材船长", "热点航海家", "题", "#ff986b", "热点炮击", "每 4 次命中触发范围爆炸。", "blast"],
    ["期权猫", "对冲夜行者", "猫", "#fcb1ff", "保护性认沽", "高暴击，低血量自动补盾。", "option"],
    ["龙回头", "反包信徒", "龙", "#ffcf4a", "龙头反包", "连杀越高，新怪首击越痛。", "dragon"],
    ["指数骑士", "Beta 冲锋兵", "指", "#7aa8ff", "指数冲锋", "关卡越高越强，打 Boss 额外增伤。", "index"],
    ["国债鸽", "稳健防守者", "鸽", "#c9f7d1", "无风险利息", "持续回血加盾，承伤更低。", "bond"],
    ["新股锦鲤", "中签欧皇", "鲤", "#ff8fc2", "中签暴击", "概率三倍暴击，中奖击杀多经验。", "ipo"],
    ["熔断忍者", "止损身法师", "忍", "#b8f7ff", "熔断闪避", "概率闪避，攒手里剑下次打出。", "dodge"],
    ["大牛之种", "未来股神", "牛", "#ffdd72", "牛气复利", "升级永久加牛气，10 级节点爆发。", "bull"],
    ["AI操盘手", "量化觉醒者", "AI", "#72f0ce", "算力复盘", "每 6 次命中触发算法校准，元素分支越多伤害越高。", "ai"],
  ].map((r, i) => {
    const type = r[6];
    const stats = roleBaseStats[type] || { hp: 114, atk: 16 };
    return {
      name: r[0],
      cls: r[1],
      badge: r[2],
      color: r[3],
      skill: r[4],
      desc: r[5],
      type,
      attack: attackStyles[i],
      avatar: avatarFiles[i],
      hp: stats.hp,
      atk: stats.atk,
      guide: attackStyles[i]?.intro || "均衡作战，升级后逐渐形成流派。",
    };
  });

  const destinyBook = {
    blade: { name: "技术派", bias: ["sword", "lightning"], text: "飞剑和雷电出现率提高，开局自带穿透。" },
    combo: { name: "打板客", bias: ["fire", "lightning"], text: "暴击略高，连击流派更容易成型。" },
    shield: { name: "定投派", bias: ["rain", "ice"], text: "开局护盾更厚，回血和控制分支更容易出现。" },
    burn: { name: "K线火法", bias: ["fire", "storm"], text: "燃烧更容易成型，火风焚风路线更顺。" },
    grid: { name: "网格交易", bias: ["ice", "storm"], text: "射程更大，控制和风暴分支更容易出现。" },
    crit: { name: "消息猎手", bias: ["lightning", "ice"], text: "克制消息面怪，雷冰爆破路线更顺。" },
    hot: { name: "情绪龙头", bias: ["fire", "storm"], text: "移动更快，连杀越顺越适合火风压场。" },
    counter: { name: "波段反击", bias: ["ice", "storm"], text: "受伤后更容易反打，冰风控制路线更稳。" },
    value: { name: "价值投资", bias: ["rain", "ice"], text: "生命更高、承伤更低，适合稳健续航。" },
    execute: { name: "低吸收割", bias: ["sword", "fire"], text: "斩杀更强，飞剑和火焰适合清残血。" },
    rebalance: { name: "仓位管理", bias: ["rain", "storm"], text: "护盾收益高，雨风续航和拉扯更强。" },
    dividend: { name: "股息复利", bias: ["rain", "ice"], text: "击杀回血并偶尔生金币，雨系收益更高。" },
    pierce: { name: "盘口穿透", bias: ["lightning", "sword"], text: "开局穿透更高，雷剑路线更容易成型。" },
    mark: { name: "复盘专家", bias: ["lightning", "ice"], text: "专精 Boss 标记，冰雷路线适合打机制战。" },
    blast: { name: "题材爆破", bias: ["fire", "storm"], text: "爆炸范围更大，火风群伤路线更强。" },
    option: { name: "期权对冲", bias: ["lightning", "sword"], text: "暴击更高，低血量时护盾更可靠。" },
    dragon: { name: "龙头反包", bias: ["fire", "sword"], text: "连杀收益高，炎剑路线适合滚雪球。" },
    index: { name: "指数增强", bias: ["lightning", "sword"], text: "关卡越高越强，适合雷剑穿透。" },
    bond: { name: "债券防守", bias: ["rain", "ice"], text: "回血护盾稳定，容错率最高。" },
    ipo: { name: "新股锦鲤", bias: ["lightning", "rain"], text: "开局金币更多，暴击和掉落更看脸。" },
    dodge: { name: "止损身法", bias: ["storm", "sword"], text: "闪避冷却更短，风剑拉扯更舒服。" },
    bull: { name: "牛气复利", bias: ["fire", "storm"], text: "升级成长更高，后期爆发更强。" },
    ai: { name: "量化觉醒", bias: ["lightning", "ice", "fire"], text: "元素越多越强，技能树更容易多线成型。" },
  };

  roles.forEach((role) => { role.destiny = destinyBook[role.type] || { name: "散户命格", bias: [], text: "均衡成长，没有明显短板。" }; });

  const marketEvents = {
    bullMarket: { title: "牛市来了", short: "牛市", color: "#ffdc72", duration: 22, text: "经验和金币提高，但怪物刷新也更凶。" },
    blackSwan: { title: "黑天鹅事件", short: "黑天鹅", color: "#d8d2ff", duration: 18, text: "地图随机出现灾难红圈，躲开就能继续收割。" },
    hotMoney: { title: "游资进场", short: "游资", color: "#f7d66f", duration: 20, text: "金币怪大量出现，抓住机会补充资金。" },
    wash: { title: "主力洗盘", short: "洗盘", color: "#ff986b", duration: 22, text: "怪物更快、压力更高，但金币收益也提升。" },
    mutual: { title: "韭菜互助会", short: "互助", color: "#72f0ce", duration: 16, text: "持续回血加盾，是喘息和反打窗口。" },
    regulation: { title: "监管出手", short: "监管", color: "#9ee8ff", duration: 18, text: "弹幕被压制，远程怪和特效怪短暂失速。" },
    limitDown: { title: "天地板", short: "天地板", color: "#ff415f", duration: 16, text: "危险线从边缘扫过，横向走位和闪避很关键。" },
  };

  const mobs = [
    ["追涨小妖", "追", "情绪面", "#e14b3b", 1, 1, 1],
    ["割肉幽灵", "割", "心理面", "#8267d6", 0.9, 1.2, 0.9],
    ["利空乌鸦", "空", "消息面", "#39465f", 0.85, 1.35, 0.85],
    ["跳水鱼", "跌", "盘口面", "#2aa66d", 1.05, 1.05, 1],
    ["高开低走兽", "套", "技术面", "#d06b34", 1.15, 0.95, 1.08],
    ["量能枯竭蝠", "缩", "量能面", "#4d748a", 0.75, 1.45, 0.8],
    ["黑嘴讲师", "嘴", "消息面", "#8b3452", 1.18, 0.9, 1.1],
    ["杠杆螃蟹", "杠", "风险面", "#b64347", 1.35, 0.75, 1.3],
    ["套牢石头人", "牢", "心理面", "#665c55", 1.75, 0.55, 1.35],
    ["震荡虫群", "震", "盘口面", "#c59342", 0.7, 1.55, 0.75],
    ["冲刺猛兽", "冲", "冲刺面", "#ff6c32", 1.1, 1.38, 1.05],
    ["特效妖姬", "效", "特效面", "#d9a7ff", 0.95, 1.08, 0.9],
    ["回血庄家", "愈", "恢复面", "#23c878", 1.28, 0.72, 1.1],
  ];

  const bosses = [
    ["韭菜收割机", "镰", "#ff415f", "先学会活下来，再谈翻倍。", "旋转镰刀"],
    ["黑嘴荐股王", "嘴", "#b14486", "真正的消息，通常轮不到你最后知道。", "小作文弹幕"],
    ["高位站岗巨像", "岗", "#ff7a34", "买入前先想好卖错了怎么办。", "高位砸盘"],
    ["杠杆爆仓兽", "爆", "#d92f3f", "仓位是散户的生命条。", "爆仓冲撞"],
    ["熊市寒潮龙", "熊", "#3f78b8", "熊市里，现金也是一种攻击力。", "熊市寒潮"],
    ["量化镰刀主宰", "量", "#72f0ce", "恭喜，你已经能穿越牛熊。", "量化矩阵"],
  ];

  const bossRewards = [
    { name: "镰刀残影", desc: "环绕体/连射 +1，命中频率提升。", apply: (p) => { p.mods.count += 1; p.mods.hitCd *= 0.92; } },
    { name: "小作文反制", desc: "暴击率 +10%，总伤害 +8%。", apply: (p) => { p.mods.crit += 0.1; p.mods.dmg *= 1.08; stat(p, false); } },
    { name: "套牢石墙", desc: "最大本金 +15%，立刻获得厚护盾。", apply: (p) => { p.mods.hp *= 1.15; stat(p, false); shield(p.maxHp * 0.45); } },
    { name: "爆仓反冲", desc: "大招冷却 -18%，总伤害 +8%。", apply: (p) => { shortenUltimateCooldown(p, 0.82); p.mods.dmg *= 1.08; stat(p, false); } },
    { name: "熊市寒意", desc: "你的所有攻击附带减速，投射物穿透 +1。", apply: (p) => { p.mods.frost += 1; p.mods.pierce += 1; } },
    { name: "量化矩阵", desc: "环绕体/连射 +1，冷却 -10%，穿透 +2。", apply: (p) => { p.mods.count += 1; p.mods.cooldown *= 0.9; p.mods.pierce += 2; } },
  ];

  const stageThemes = [
    { name: "新手交易大厅", core: "#201923", mid: "#11151d", edge: "#06080d", line: "#ffb23f", accent: "#ff415f", glow: "#ffb23f" },
    { name: "消息迷雾街", core: "#1d1430", mid: "#121426", edge: "#070710", line: "#d9a7ff", accent: "#b14486", glow: "#d9a7ff" },
    { name: "高位站岗台", core: "#29180e", mid: "#171615", edge: "#070706", line: "#ff7a34", accent: "#ffdc72", glow: "#ff7a34" },
    { name: "杠杆爆仓湾", core: "#2a1015", mid: "#171018", edge: "#080509", line: "#ff415f", accent: "#d92f3f", glow: "#ff415f" },
    { name: "熊市寒潮谷", core: "#0e2236", mid: "#0b1624", edge: "#04070d", line: "#9ee8ff", accent: "#3f78b8", glow: "#9ee8ff" },
    { name: "量化矩阵城", core: "#092923", mid: "#08181b", edge: "#030707", line: "#72f0ce", accent: "#5fdcff", glow: "#72f0ce" },
  ];

  const elementBranches = {
    fire: { label: "燃烧", color: "#ff6b32", max: 6, perks: ["点燃", "灼烧加深", "炎爆", "火幕扩散", "熔毁护甲", "赤焰主宰"] },
    ice: { label: "冰冻", color: "#9ee8ff", max: 6, perks: ["冰霜减速", "冻结", "碎冰增伤", "寒潮扩散", "冰牢", "永冻"] },
    lightning: { label: "雷电", color: "#f7d66f", max: 6, perks: ["跳电", "连锁", "麻痹", "雷暴", "过载", "天罚"] },
    storm: { label: "暴风", color: "#b8f7ff", max: 6, perks: ["击退", "旋风", "风眼爆破", "推线", "风墙", "风暴核心"] },
    rain: { label: "骤雨", color: "#62dbff", max: 6, perks: ["回血", "经验雨", "护盾雨", "暴雨连绵", "雨幕续航", "复苏洪流"] },
    sword: { label: "飞剑", color: "#72f0ce", max: 6, perks: ["外圈飞剑", "剑阵扩容", "剑气穿刺", "双层剑阵", "追击飞剑", "万剑归宗"] },
  };

  const branchEvolutions = {
    fire: { 3: ["炎爆扩散", "燃烧有概率爆炸，清杂更快。"], 5: ["烈焰领域", "角色周围持续灼烧，贴脸怪会被融化。"] },
    ice: { 3: ["碎冰增伤", "冻结和减速目标会受到额外冰裂伤害。"], 5: ["极寒领域", "近身怪物持续减速并偶尔冻结。"] },
    lightning: { 3: ["连锁雷弧", "雷电跳跃次数和麻痹概率提高。"], 5: ["天雷落点", "周期性劈向最近目标并连锁导电。"] },
    storm: { 3: ["风眼爆破", "暴风击退后更容易触发小范围爆破。"], 5: ["风暴核心", "周围形成风暴眼，吸附并撕裂怪群。"] },
    rain: { 3: ["护盾雨", "命中回血时有概率补护盾。"], 5: ["复苏洪流", "周期性回血、加盾，并落下经验金币。"] },
    sword: { 3: ["剑气穿刺", "飞剑伤害提高，命中冷却缩短。"], 5: ["万剑归宗", "周期性召唤剑雨斩击全场。"] },
  };

  const taunts = {
    "追涨小妖": ["还追吗？山顶风大吧！", "红了你才来，绿了你就慌？", "冲动是最贵的手续费！"],
    "割肉幽灵": ["割在最低点，熟练得让人心疼。", "手一抖，本金没有。", "你不是止损，你是投降。"],
    "利空乌鸦": ["小作文一来，你就破防？", "消息都传到你这了，还敢信？", "听风就是雨，账户就下雨。"],
    "跳水鱼": ["噗通！欢迎来深水区。", "盘中跳一下，你心态就没了？", "别眨眼，我还会再跳。"],
    "高开低走兽": ["早盘的笑容，尾盘还你眼泪。", "高开是礼貌，低走是实力。", "站岗姿势很标准。"],
    "量能枯竭蝠": ["没量还硬冲？", "缩量阴跌，专治嘴硬。", "你的耐心成交量不足。"],
    "黑嘴讲师": ["老师说了，满仓干！", "金股不金，韭菜很青。", "听课不要钱，亏钱另算。"],
    "杠杆螃蟹": ["杠杆一开，亲人两行泪。", "满融满仓？我就喜欢你这样。", "爆仓不是意外，是流程。"],
    "套牢石头人": ["别动，我帮你长期持有。", "成本线？那是回忆线。", "越套越有感情。"],
    "震荡虫群": ["上不去，下不来，急不急？", "我不杀你，我磨你。", "来回震，震到你割。"],
    "冲刺猛兽": ["我可不是慢慢跌，我是直接砸脸！", "别站直线，我要冲了。", "追高的人，最怕急跌。"],
    "特效妖姬": ["花里胡哨也是风险。", "看见特效就上头？", "眩光一闪，你的节奏没了。"],
    "回血庄家": ["你打得快，我回得更快。", "队友别慌，资金回流了。", "想清场？先处理我。"],
    Boss: ["这一课，市场替你收费。", "散户，先交学费。", "你以为这是回调？这是考试。", "牛熊轮回，不信眼泪。"],
  };

  const upgradePool = [
    { icon: "攻", name: "满仓进攻", desc: "所有攻击伤害 +15%。", apply: (p) => { p.mods.dmg *= 1.15; stat(p, false); } },
    { icon: "环", name: "多一层火力", desc: "环绕体或连射数量 +1。", apply: (p) => { p.mods.count += 1; } },
    { icon: "距", name: "扩大射程", desc: "环绕半径、爆炸范围、投射物体积 +16%。", apply: (p) => { p.mods.range *= 1.16; } },
    { icon: "速", name: "抢跑开盘", desc: "移动速度 +10%，攻击冷却 -8%。", apply: (p) => { p.speed *= 1.1; p.mods.cooldown *= 0.92; } },
    { icon: "血", name: "本金加厚", desc: "最大本金 +20%，并立即回血。", apply: (p) => { p.mods.hp *= 1.2; stat(p, false); heal(p.maxHp * 0.35); } },
    { icon: "盾", name: "仓位护盾", desc: "立刻获得大量护盾，后续护盾收益 +20%。", apply: (p) => { p.mods.shield *= 1.2; shield(p.maxHp * 0.35); } },
    { icon: "息", name: "复利回血", desc: "每秒缓慢恢复本金。", apply: (p) => { p.mods.regen += 2.2; } },
    { icon: "暴", name: "龙虎榜暴击", desc: "暴击率 +8%，暴击造成 1.8 倍伤害。", apply: (p) => { p.mods.crit += 0.08; } },
    { icon: "穿", name: "穿透委买", desc: "投射物穿透 +1，环绕命中冷却更短。", apply: (p) => { p.mods.pierce += 1; p.mods.hitCd *= 0.86; } },
    { icon: "大", name: "大招快充", desc: "大招冷却 -18%，当前倒计时同步缩短但不会直接跳过。", apply: (p) => { shortenUltimateCooldown(p, 0.82); } },
    { icon: "火", branch: "fire", name: "元素树：燃烧", desc: "攻击附带燃烧；与暴风组合会触发焚风增伤。", apply: (p) => { p.mods.fire = Math.min(elementBranches.fire.max, p.mods.fire + 1); } },
    { icon: "冰", branch: "ice", name: "元素树：冰冻", desc: "攻击附带冰霜减速；与雷电/骤雨组合会触发冻结反应。", apply: (p) => { p.mods.ice = Math.min(elementBranches.ice.max, p.mods.ice + 1); p.mods.frost += 1; } },
    { icon: "雷", branch: "lightning", name: "元素树：雷电", desc: "攻击有概率链式跳电；打冰冻目标时雷电伤害翻倍。", apply: (p) => { p.mods.lightning = Math.min(elementBranches.lightning.max, p.mods.lightning + 1); } },
    { icon: "风", branch: "storm", name: "元素树：暴风", desc: "攻击推开怪物并制造风暴；与燃烧组合会触发焚风。", apply: (p) => { p.mods.storm = Math.min(elementBranches.storm.max, p.mods.storm + 1); p.mods.range *= 1.06; } },
    { icon: "雨", branch: "rain", name: "元素树：骤雨", desc: "命中回血并落下经验雨；与冰冻组合会触发寒雨冻结。", apply: (p) => { p.mods.rain = Math.min(elementBranches.rain.max, p.mods.rain + 1); p.mods.regen += 0.7; } },
    { icon: "剑", branch: "sword", name: "副武器：飞剑", desc: "解锁外圈飞剑；只有选择后才会出现，高阶形成剑阵。", apply: (p) => { p.mods.sword = Math.min(elementBranches.sword.max, p.mods.sword + 1); } },
  ];

  const keys = new Set();
  const imgs = new Map();
  let w = 0;
  let h = 0;
  let screenW = 0;
  let screenH = 0;
  let viewScale = 1;
  let dpr = 1;
  let last = 0;
  let toastTime = 0;
  let id = 0;

  const S = {
    mode: "menu",
    t: 0,
    run: 0,
    spawn: 0,
    stage: 1,
    kills: 0,
    eliteKills: 0,
    dropsCollected: 0,
    bestStreak: 0,
    nextStreakReward: 12,
    eliteClock: 0,
    nextElite: 18,
    shake: 0,
    pulse: 0,
    streakFlash: 0,
    angle: 0,
    swordAngle: 0,
    bossActive: false,
    bossDone: false,
    transition: null,
    pendingUpgrades: 0,
    upgradeRefreshes: 0,
    currentUpgrades: [],
    shopClock: 0,
    nextShop: 42,
    shopOffers: [],
    event: null,
    eventClock: 0,
    nextEvent: 36,
    eventCount: 0,
    deathCause: null,
    banner: null,
    role: null,
    p: null,
    monsters: [],
    shots: [],
    enemyShots: [],
    drops: [],
    parts: [],
    beams: [],
    hazards: [],
    texts: [],
    pointer: { active: false, x: 0, y: 0 },
    joystick: { active: false, dx: 0, dy: 0, pointerId: null },
    lastMove: { x: 1, y: 0 },
  };

  const rnd = (a, b) => Math.random() * (b - a) + a;
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const touchDevice = () => navigator.maxTouchPoints > 0 || (typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches);
  const SKILL_INTERVAL = 2;
  const REFRESH_BASE_COST = 6;
  const REFRESH_COST_STEP = 2;
  const xpNeed = (lv) => 4 + Math.floor(lv * 1.75 + Math.pow(lv, 1.08));
  const src = (r) => `avatar/${encodeURIComponent(r.avatar)}`;

  function img(r) {
    const s = src(r);
    if (!imgs.has(s)) {
      const im = new Image();
      im.src = s;
      imgs.set(s, im);
    }
    return imgs.get(s);
  }

  function makePlayer(role) {
    const p = {
      role,
      destiny: role.destiny,
      x: w / 2,
      y: h / 2,
      r: 23,
      lv: 1,
      xp: 0,
      next: xpNeed(1),
      gold: 0,
      hp: 1,
      maxHp: 1,
      shield: 0,
      atk: 1,
      speed: 258,
      hit: 0,
      streak: 0,
      combo: 0,
      drawdown: 0,
      stars: 0,
      bull: role.type === "bull" ? 1 : 0,
      jackpot: false,
      buffCrit: 0,
      destinyCd: 0,
      destinyStacks: 0,
      hurt: 0,
      passive: 0,
      fireCd: 0,
      ultCd: 0,
      dodgeCd: 0,
      dodgeTime: 0,
      dodgeVx: 0,
      dodgeVy: 0,
      invuln: 0,
      slow: 0,
      bossSkills: [],
      evolved: {},
      evoCd: {
        fire: 0,
        ice: 0,
        lightning: 0,
        storm: 0,
        rain: 0,
        sword: 0,
      },
      mods: {
        dmg: 1,
        hp: 1,
        range: 1,
        cooldown: 1,
        count: 0,
        shield: 1,
        regen: 0,
        crit: 0,
        pierce: 0,
        hitCd: 1,
        ult: 1,
        frost: 0,
        sword: 0,
        fire: 0,
        ice: 0,
        lightning: 0,
        storm: 0,
        rain: 0,
      },
    };
    applyDestinyStart(p);
    stat(p, true);
    applyDestinyAfterStat(p);
    return p;
  }

  function applyDestinyStart(p) {
    const t = p.role.type;
    if (t === "blade") { p.mods.pierce += 1; p.mods.hitCd *= 0.94; }
    if (t === "combo") { p.mods.crit += 0.03; p.mods.cooldown *= 0.96; }
    if (t === "shield") { p.mods.shield *= 1.18; p.mods.hp *= 1.06; }
    if (t === "burn") { p.mods.fire = 1; }
    if (t === "grid") { p.mods.range *= 1.1; p.speed *= 0.97; }
    if (t === "crit") { p.mods.crit += 0.05; }
    if (t === "hot") { p.speed *= 1.06; p.mods.cooldown *= 0.97; }
    if (t === "counter") { p.mods.hp *= 1.08; }
    if (t === "value") { p.mods.hp *= 1.18; p.speed *= 0.96; }
    if (t === "execute") { p.mods.dmg *= 1.06; }
    if (t === "rebalance") { p.mods.shield *= 1.14; p.mods.regen += 0.6; }
    if (t === "dividend") { p.mods.regen += 0.8; }
    if (t === "pierce") { p.mods.pierce += 2; }
    if (t === "mark") { p.mods.crit += 0.03; }
    if (t === "blast") { p.mods.range *= 1.08; }
    if (t === "option") { p.mods.crit += 0.07; p.mods.hp *= 0.94; }
    if (t === "dragon") { p.mods.dmg *= 1.04; }
    if (t === "index") { p.mods.pierce += 1; p.mods.dmg *= 1.03; }
    if (t === "bond") { p.mods.hp *= 1.12; p.mods.regen += 1.1; p.speed *= 0.94; }
    if (t === "ipo") { p.mods.crit += 0.035; }
    if (t === "dodge") { p.speed *= 1.08; }
    if (t === "bull") { p.mods.hp *= 1.06; p.mods.dmg *= 1.04; }
    if (t === "ai") { p.mods.cooldown *= 0.96; p.mods.pierce += 1; }
  }

  function applyDestinyAfterStat(p) {
    const t = p.role.type;
    const addStartShield = (amount) => { p.shield = clamp(p.shield + amount * p.mods.shield, 0, p.maxHp * 0.75 + p.lv * 9); };
    if (t === "shield") addStartShield(p.maxHp * 0.22);
    if (t === "value") addStartShield(p.maxHp * 0.12);
    if (t === "rebalance") addStartShield(p.maxHp * 0.16);
    if (t === "bond") addStartShield(p.maxHp * 0.2);
    if (t === "ipo") p.gold += 5;
    if (t === "dividend") p.gold += 2;
    if (t === "dodge") p.dodgeCd = 0;
  }

  function stat(p, full) {
    const old = p.maxHp || 0;
    p.maxHp = Math.floor((p.role.hp + p.lv * 10 + S.stage * 7 + p.bull * 2) * p.mods.hp);
    p.atk = Math.floor((p.role.atk + p.lv * 4.2 + S.stage * 2 + p.bull * 0.5) * p.mods.dmg);
    p.hp = full ? p.maxHp : clamp(p.hp + Math.max(0, p.maxHp - old), 0, p.maxHp);
  }

  function reroll() {
    S.role = pick(roles);
    if (S.mode !== "playing") S.p = makePlayer(S.role);
    ui.preAvatar.src = src(S.role);
    ui.avatar.src = src(S.role);
    ui.preName.textContent = S.role.name;
    ui.preClass.textContent = `${S.role.cls} · 命格：${S.role.destiny.name}`;
    ui.preSkill.textContent = `${S.role.attack.name}｜本金 ${S.role.hp} / 火力 ${S.role.atk}｜玩法：${S.role.guide}｜${S.role.skill}：${S.role.desc}｜${S.role.destiny.text}`;
    sync();
  }

  function start() {
    S.mode = "playing";
    S.t = 0;
    S.run = 0;
    S.spawn = 0;
    S.stage = 1;
    S.kills = 0;
    S.eliteKills = 0;
    S.dropsCollected = 0;
    S.bestStreak = 0;
    S.nextStreakReward = 12;
    S.eliteClock = 0;
    S.nextElite = 18;
    S.shake = 0;
    S.pulse = 0;
    S.streakFlash = 0;
    S.angle = 0;
    S.swordAngle = 0;
    S.bossActive = false;
    S.bossDone = false;
    S.transition = null;
    S.pendingUpgrades = 0;
    S.upgradeRefreshes = 0;
    S.currentUpgrades = [];
    S.shopClock = 0;
    S.nextShop = 42;
    S.shopOffers = [];
    S.event = null;
    S.eventClock = 0;
    S.nextEvent = 36;
    S.eventCount = 0;
    S.deathCause = null;
    S.banner = null;
    S.monsters = [];
    S.shots = [];
    S.enemyShots = [];
    S.drops = [];
    S.parts = [];
    S.beams = [];
    S.hazards = [];
    S.texts = [];
    S.p = makePlayer(S.role || pick(roles));
    S.p.x = w / 2;
    S.p.y = h / 2;
    overlay.classList.add("is-hidden");
    rerollBtn.style.display = "none";
    ui.status.textContent = "战斗中";
    for (let i = 0; i < 7; i++) spawnMonster(true);
    say(`${S.p.role.name} 入市`);
    updateQuickControls();
    sync();
  }

  function show(title, text, kicker = "复盘", showRole = true, btn = "开始游戏") {
    upgradeChoices.innerHTML = "";
    upgradeChoices.style.display = "none";
    if (refreshSkillsBtn) refreshSkillsBtn.style.display = "none";
    modalActions.style.display = "flex";
    if (howBtn) howBtn.style.display = "inline-block";
    ui.title.textContent = title;
    ui.text.textContent = text;
    ui.kicker.textContent = kicker;
    rolePreview.style.display = showRole ? "grid" : "none";
    startBtn.textContent = btn;
    overlay.classList.remove("is-hidden");
    updateQuickControls();
  }

  function upgradeWeight(u) {
    if (!S.p) return 1;
    let weight = 1;
    const bias = S.p.role.destiny?.bias || [];
    if (u.branch) {
      const lv = S.p.mods[u.branch] || 0;
      if (bias.includes(u.branch)) weight += 5;
      if (lv === 2 || lv === 4) weight += 2.4;
      if (S.p.role.type === "ai" && lv === 0) weight += 1.7;
      if (S.p.role.type === "bull" && (u.branch === "fire" || u.branch === "storm")) weight += 1.2;
    } else {
      if (S.p.role.type === "value" && (u.icon === "血" || u.icon === "盾" || u.icon === "息")) weight += 2.3;
      if (S.p.role.type === "option" && u.icon === "暴") weight += 2.5;
      if (S.p.role.type === "dodge" && u.icon === "速") weight += 2.3;
      if (S.p.role.type === "pierce" && u.icon === "穿") weight += 2.5;
      if (S.p.role.type === "blast" && u.icon === "距") weight += 2.2;
    }
    return weight;
  }

  function pullWeightedUpgrade(pool) {
    const total = pool.reduce((sum, item) => sum + upgradeWeight(item), 0);
    let roll = rnd(0, total || 1);
    for (let i = 0; i < pool.length; i++) {
      roll -= upgradeWeight(pool[i]);
      if (roll <= 0) return pool.splice(i, 1)[0];
    }
    return pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
  }

  function pickUpgrades() {
    const pool = upgradePool.filter((u) => {
      if (!u.branch || !S.p) return true;
      const branch = elementBranches[u.branch];
      return !branch || (S.p.mods[u.branch] || 0) < branch.max;
    });
    const options = [];
    const branchPool = pool.filter((u) => u.branch);
    if (branchPool.length && Math.random() < 0.78) {
      const u = pullWeightedUpgrade(branchPool);
      options.push(u);
      pool.splice(pool.indexOf(u), 1);
    }
    while (options.length < 3 && pool.length) {
      options.push(pullWeightedUpgrade(pool));
    }
    return options;
  }

  function upgradeTitle(u) {
    if (!u.branch || !S.p) return `${u.icon} ${u.name}`;
    const lv = S.p.mods[u.branch] || 0;
    const branch = elementBranches[u.branch];
    return `${u.icon} ${u.name} Lv.${lv}→${Math.min(branch.max, lv + 1)}`;
  }

  function upgradeDesc(u) {
    if (!u.branch || !S.p) return u.desc;
    const lv = S.p.mods[u.branch] || 0;
    const branch = elementBranches[u.branch];
    const perk = branch.perks[Math.min(branch.perks.length - 1, lv)] || branch.label;
    const next = Math.min(branch.max, lv + 1);
    const evo = branchEvolutions[u.branch]?.[next];
    return `${u.desc} 下一层：${perk}。${evo ? ` 解锁进化：${evo[0]}。` : ""}`;
  }

  function refreshCost() {
    return REFRESH_BASE_COST + S.upgradeRefreshes * REFRESH_COST_STEP;
  }

  function renderUpgradeChoices() {
    upgradeChoices.innerHTML = S.currentUpgrades.map((u, i) => `
      <button class="upgrade-card" type="button" data-upgrade="${i}">
        <b>${upgradeTitle(u)}</b>
        <span>${upgradeDesc(u)}</span>
      </button>
    `).join("");
    if (!refreshSkillsBtn || !S.p) return;
    const cost = refreshCost();
    const gold = S.p.gold || 0;
    refreshSkillsBtn.style.display = "inline-flex";
    refreshSkillsBtn.disabled = gold < cost;
    refreshSkillsBtn.textContent = gold >= cost
      ? `花 ${cost} 金币刷新技能树（持有 ${gold}）`
      : `金币不足：刷新需要 ${cost}（持有 ${gold}）`;
  }

  function upgradeToast(u) {
    if (!u.branch || !S.p) return u.name;
    const branch = elementBranches[u.branch];
    return `${branch.label} Lv.${S.p.mods[u.branch] || 0}`;
  }

  function applyEvolutionBonus(branch, tier) {
    const p = S.p;
    if (!p) return;
    if (branch === "fire") {
      p.mods.dmg *= tier === 5 ? 1.07 : 1.04;
      if (tier === 5) p.mods.range *= 1.08;
    } else if (branch === "ice") {
      p.mods.frost += tier === 5 ? 2 : 1;
      shield(p.maxHp * (tier === 5 ? 0.18 : 0.1));
    } else if (branch === "lightning") {
      p.mods.crit += tier === 5 ? 0.06 : 0.03;
      p.mods.pierce += tier === 5 ? 2 : 1;
    } else if (branch === "storm") {
      p.speed *= tier === 5 ? 1.06 : 1.035;
      p.mods.range *= tier === 5 ? 1.08 : 1.04;
    } else if (branch === "rain") {
      p.mods.regen += tier === 5 ? 1.8 : 0.9;
      heal(p.maxHp * (tier === 5 ? 0.28 : 0.14));
    } else if (branch === "sword") {
      p.mods.hitCd *= tier === 5 ? 0.86 : 0.92;
      p.mods.pierce += tier === 5 ? 2 : 1;
    }
    stat(p, false);
  }

  function unlockBranchEvolution(branch, tier) {
    const p = S.p;
    const evo = branchEvolutions[branch]?.[tier];
    if (!p || !evo || p.evolved[`${branch}${tier}`]) return;
    p.evolved[`${branch}${tier}`] = true;
    applyEvolutionBonus(branch, tier);
    const info = elementBranches[branch];
    S.shake = Math.max(S.shake, tier === 5 ? 0.72 : 0.42);
    S.pulse = 1;
    particles(p.x, p.y, tier === 5 ? 96 : 62, info.color, tier === 5 ? 410 : 310);
    float(p.x, p.y - 86, `${tier === 5 ? "终极进化" : "技能进化"}：${evo[0]}`, info.color, 1.65);
    showRunBanner(`${tier === 5 ? "终极进化" : "技能进化"}：${evo[0]}`, evo[1], info.color, tier === 5 ? 2.2 : 1.7);
    say(`${evo[0]} 解锁`);
  }

  function checkBranchEvolution(branch, before, after) {
    if (!branch || after <= before) return;
    if (before < 3 && after >= 3) unlockBranchEvolution(branch, 3);
    if (before < 5 && after >= 5) unlockBranchEvolution(branch, 5);
  }

  function flowSummary(p, elements) {
    const combos = [
      p.mods.fire && p.mods.storm ? "焚风" : "",
      p.mods.ice && p.mods.lightning ? "冰雷爆破" : "",
      p.mods.ice && p.mods.rain ? "寒雨控制" : "",
      p.mods.sword && p.mods.lightning ? "雷剑" : "",
      p.mods.sword && p.mods.fire ? "炎剑" : "",
    ].filter(Boolean);
    const ultimates = Object.keys(branchEvolutions)
      .filter((key) => p.evolved[`${key}5`])
      .map((key) => branchEvolutions[key][5][0]);
    if (ultimates.length) return `终极：${ultimates.slice(-2).join(" / ")}。组合：${combos.join(" / ") || "未成型"}。当前：${elements || "未选择"}`;
    return `元素：${elements || "未选择"}。组合：${combos.join(" / ") || "未成型"}。`;
  }

  function openUpgrade() {
    if (S.pendingUpgrades <= 0 || !S.p || S.mode === "gameover") return;
    S.mode = "upgrade";
    S.upgradeRefreshes = 0;
    S.currentUpgrades = pickUpgrades();
    ui.status.textContent = "选择强化";
    ui.kicker.textContent = `等级 ${S.p.lv} · 每 ${SKILL_INTERVAL} 级技能树`;
    ui.title.textContent = "升级选择";
    ui.text.textContent = "选择一个本局强化。金币可以刷新当前三选一；可走火、冰、雷、风、雨、飞剑等技能树分支，也能强化伤害、生存或大招节奏。";
    rolePreview.style.display = "none";
    modalActions.style.display = "none";
    upgradeChoices.style.display = "grid";
    renderUpgradeChoices();
    overlay.classList.remove("is-hidden");
    updateQuickControls();
  }

  function refreshUpgrades() {
    if (S.mode !== "upgrade" || !S.p) return;
    const cost = refreshCost();
    if ((S.p.gold || 0) < cost) {
      say(`金币不足，刷新需要 ${cost}`);
      renderUpgradeChoices();
      return;
    }
    S.p.gold -= cost;
    S.upgradeRefreshes += 1;
    S.currentUpgrades = pickUpgrades();
    particles(S.p.x, S.p.y, 26, "#f7d66f", 230);
    float(S.p.x, S.p.y - 62, `-${cost} 金币刷新`, "#f7d66f", 0.9);
    say("技能树已刷新");
    renderUpgradeChoices();
    sync();
  }

  function chooseUpgrade(index) {
    const upgrade = S.currentUpgrades[index];
    if (!upgrade || !S.p) return;
    const before = upgrade.branch ? (S.p.mods[upgrade.branch] || 0) : 0;
    upgrade.apply(S.p);
    const after = upgrade.branch ? (S.p.mods[upgrade.branch] || 0) : before;
    checkBranchEvolution(upgrade.branch, before, after);
    S.pendingUpgrades -= 1;
    say(upgradeToast(upgrade));
    sync();
    if (S.pendingUpgrades > 0) {
      openUpgrade();
      return;
    }
    S.mode = "playing";
    S.currentUpgrades = [];
    upgradeChoices.innerHTML = "";
    upgradeChoices.style.display = "none";
    if (refreshSkillsBtn) refreshSkillsBtn.style.display = "none";
    modalActions.style.display = "flex";
    overlay.classList.add("is-hidden");
    ui.status.textContent = "战斗中";
    sync();
    updateQuickControls();
  }

  function shopPool() {
    return [
      {
        icon: "血",
        name: "急救补仓",
        cost: () => 7 + S.stage * 2,
        desc: "立刻恢复大量本金，并获得一层应急护盾。",
        buy: (p) => { heal(p.maxHp * 0.48); shield(p.maxHp * 0.18); },
      },
      {
        icon: "经",
        name: "内幕经验",
        cost: () => 9 + S.stage * 2,
        desc: "立刻获得一大段经验，可能直接触发升级选择。",
        buy: (p) => { addXp(Math.ceil(p.next * 0.62), p.x, p.y); },
      },
      {
        icon: "大",
        name: "大招快充",
        cost: () => 8 + S.stage,
        desc: "清空大招冷却，并额外降低一点后续大招冷却。",
        buy: (p) => { setUltimateCooldown(p, 0); p.mods.ult *= 0.95; },
      },
      {
        icon: "闪",
        name: "游资身法课",
        cost: () => 8 + Math.floor(S.p.lv / 2),
        desc: "移动速度小幅提升，闪避立刻冷却完成。",
        buy: (p) => { p.speed *= 1.055; p.dodgeCd = 0; particles(p.x, p.y, 34, "#72f0ce", 260); },
      },
      {
        icon: "研",
        name: "定向研报",
        cost: () => 13 + S.stage * 2,
        desc: "随机提升一个未满级的元素/飞剑分支，直接推进流派成型。",
        buy: (p) => {
          const keys = ["fire", "ice", "lightning", "storm", "rain", "sword"].filter((key) => p.mods[key] < elementBranches[key].max);
          const branch = pick(keys.length ? keys : ["fire"]);
          const before = p.mods[branch] || 0;
          p.mods[branch] = Math.min(elementBranches[branch].max, before + 1);
          if (branch === "ice") p.mods.frost += 1;
          if (branch === "storm") p.mods.range *= 1.04;
          if (branch === "rain") p.mods.regen += 0.5;
          checkBranchEvolution(branch, before, p.mods[branch]);
          float(p.x, p.y - 70, `研报：${elementBranches[branch].label}+1`, elementBranches[branch].color, 1.2);
        },
      },
      {
        icon: "赌",
        name: "梭哈宝箱",
        cost: () => 6 + S.stage,
        desc: "高风险宝箱：可能获得金币/强化，也可能立刻招来精英怪。",
        buy: (p) => {
          if (Math.random() < 0.58) {
            const reward = 8 + S.stage * 2;
            addGold(reward, p.x, p.y - 24);
            p.mods.crit += 0.04;
            float(p.x, p.y - 82, "宝箱大赚：暴击提升", "#ffdc72", 1.2);
          } else {
            spawnEliteMonster();
            float(p.x, p.y - 82, "宝箱翻车：精英进场", "#ff415f", 1.2);
          }
        },
      },
      {
        icon: "贷",
        name: "融资贷款",
        cost: () => 0,
        desc: "无需金币，立即获得一笔资金；代价是下一波精英更快来。",
        buy: (p) => {
          addGold(14 + S.stage * 3, p.x, p.y - 20);
          S.eliteClock = Math.max(S.nextElite - 4, S.eliteClock);
          S.nextElite = Math.max(6, S.nextElite - 8);
          float(p.x, p.y - 82, "融资到账，风险逼近", "#ff415f", 1.2);
        },
      },
    ];
  }

  function pickShopOffers() {
    const pool = shopPool();
    const offers = [];
    while (offers.length < 3 && pool.length) {
      const index = Math.floor(Math.random() * pool.length);
      offers.push(pool.splice(index, 1)[0]);
    }
    return offers;
  }

  function shopCost(offer) {
    return typeof offer.cost === "function" ? offer.cost() : offer.cost;
  }

  function renderShopOffers() {
    const gold = S.p?.gold || 0;
    upgradeChoices.innerHTML = S.shopOffers.map((offer, i) => {
      const cost = shopCost(offer);
      const disabled = gold < cost ? "disabled" : "";
      const price = cost > 0 ? `${cost} 金币` : "免费但有代价";
      return `
        <button class="upgrade-card shop-card" type="button" data-shop="${i}" ${disabled}>
          <b>${offer.icon} ${offer.name}</b>
          <span>${offer.desc}<br>价格：${price}｜持有：${gold}</span>
        </button>
      `;
    }).join("");
  }

  function openShop() {
    if (!S.p || S.mode !== "playing" || S.bossActive || S.transition || S.pendingUpgrades > 0) return false;
    S.mode = "shop";
    S.shopClock = 0;
    S.nextShop = rnd(52, 78) - Math.min(12, S.stage * 2);
    S.shopOffers = pickShopOffers();
    ui.status.textContent = "黑市开张";
    ui.kicker.textContent = `黑市商人 · 持有 ${S.p.gold || 0} 金币`;
    ui.title.textContent = "黑市开张";
    ui.text.textContent = "金币现在能买补给、经验、大招、定向流派，也能赌宝箱或融资贷款。每次黑市只能选一项，也可以直接离开。";
    rolePreview.style.display = "none";
    modalActions.style.display = "flex";
    if (refreshSkillsBtn) refreshSkillsBtn.style.display = "none";
    if (rerollBtn) rerollBtn.style.display = "none";
    if (howBtn) howBtn.style.display = "none";
    startBtn.textContent = "离开黑市";
    upgradeChoices.style.display = "grid";
    renderShopOffers();
    overlay.classList.remove("is-hidden");
    say("黑市商人出现");
    updateQuickControls();
    return true;
  }

  function closeShop() {
    S.shopOffers = [];
    upgradeChoices.innerHTML = "";
    upgradeChoices.style.display = "none";
    modalActions.style.display = "flex";
    if (howBtn) howBtn.style.display = "inline-block";
    if (refreshSkillsBtn) refreshSkillsBtn.style.display = "none";
    if (S.pendingUpgrades > 0) {
      S.mode = "playing";
      openUpgrade();
      return;
    }
    S.mode = "playing";
    ui.status.textContent = "战斗中";
    overlay.classList.add("is-hidden");
    updateQuickControls();
    sync();
  }

  function buyShopOffer(index) {
    if (S.mode !== "shop" || !S.p) return;
    const offer = S.shopOffers[index];
    if (!offer) return;
    const cost = shopCost(offer);
    if ((S.p.gold || 0) < cost) {
      say(`金币不足，还差 ${cost - (S.p.gold || 0)}`);
      renderShopOffers();
      return;
    }
    S.p.gold -= cost;
    offer.buy(S.p);
    particles(S.p.x, S.p.y, 36, cost > 0 ? "#f7d66f" : "#ff415f", 260);
    say(`${offer.name} 已购买`);
    sync();
    closeShop();
  }

  function market(dt) {
    if (!S.p || S.event || S.bossActive || S.transition || S.pendingUpgrades > 0 || S.p.lv < 3) return false;
    S.shopClock += dt;
    if (S.shopClock >= S.nextShop) return openShop();
    return false;
  }

  function activeEvent(type) {
    return S.event && S.event.type === type && S.event.time > 0;
  }

  function eventList() {
    return Object.keys(marketEvents);
  }

  function startMarketEvent(type = pick(eventList())) {
    const config = marketEvents[type] || marketEvents.bullMarket;
    S.event = {
      type,
      title: config.title,
      short: config.short,
      color: config.color,
      text: config.text,
      time: config.duration,
      duration: config.duration,
      tick: 0,
    };
    S.eventClock = 0;
    S.eventCount++;
    S.nextEvent = rnd(46, 72) - Math.min(10, S.stage * 1.2);
    S.shake = Math.max(S.shake, 0.28);
    say(config.title);
    float(S.p.x, S.p.y - 90, `市场事件：${config.title}`, config.color, 1.6);
    particles(S.p.x, S.p.y, 54, config.color, 300);

    if (type === "mutual") {
      heal(S.p.maxHp * 0.22);
      shield(S.p.maxHp * 0.2);
    } else if (type === "hotMoney") {
      for (let i = 0; i < 3; i++) spawnMonster(false, "gold");
    } else if (type === "regulation") {
      S.enemyShots = [];
      for (const m of S.monsters) {
        if (!m.dead && !m.boss && (m.aiType === "ranged" || m.tag === "消息面" || m.tag === "特效面")) {
          m.slow = Math.max(m.slow, 2.2);
          m.stun = Math.max(m.stun, 0.28);
        }
      }
    } else if (type === "wash") {
      for (let i = 0; i < 2; i++) spawnMonster(false, Math.random() < 0.5 ? "charger" : "bomber");
    }
  }

  function endMarketEvent() {
    if (!S.event) return;
    float(S.p.x, S.p.y - 78, `${S.event.title} 结束`, S.event.color, 1.1);
    S.event = null;
  }

  function randomHazardNearPlayer(label, color, radius, dmg, slow = false) {
    const x = clamp(S.p.x + rnd(-220, 220), 30, w - 30);
    const y = clamp(S.p.y + rnd(-150, 150), 30, h - 30);
    addHazard({
      type: "circle",
      x,
      y,
      r: radius,
      warn: 0.78,
      life: 0.22,
      color,
      dmg,
      label,
      slow,
      boss: { x, y, color, boss: false },
    });
  }

  function sideSweepHazard() {
    const vertical = Math.random() < 0.5;
    const fromEnd = Math.random() < 0.5;
    const x = vertical ? rnd(w * 0.18, w * 0.82) : (fromEnd ? w - 8 : 8);
    const y = vertical ? (fromEnd ? h - 8 : 8) : rnd(h * 0.2, h * 0.8);
    addHazard({
      type: "line",
      x,
      y,
      angle: vertical ? (fromEnd ? -Math.PI / 2 : Math.PI / 2) : (fromEnd ? Math.PI : 0),
      length: vertical ? h : w,
      width: 24,
      warn: 0.72,
      life: 0.22,
      color: "#ff415f",
      dmg: 26 + S.stage * 8 + S.p.lv * 1.4,
      label: "天地板",
      boss: { x, y, color: "#ff415f", boss: false },
    });
  }

  function updateMarketEvent(dt) {
    if (!S.p || S.bossActive || S.transition || S.pendingUpgrades > 0 || S.mode !== "playing") return;
    if (!S.event) {
      if (S.p.lv < 4) return;
      S.eventClock += dt;
      if (S.eventClock >= S.nextEvent) startMarketEvent();
      return;
    }

    S.event.time -= dt;
    S.event.tick -= dt;
    if (S.event.time <= 0) {
      endMarketEvent();
      return;
    }
    if (S.event.tick > 0) return;

    if (S.event.type === "blackSwan") {
      S.event.tick = 2.1;
      randomHazardNearPlayer("黑天鹅", "#d8d2ff", 74 + S.stage * 5, 24 + S.stage * 8 + S.p.lv * 1.6, true);
    } else if (S.event.type === "hotMoney") {
      S.event.tick = 3.1;
      spawnMonster(false, "gold");
      if (Math.random() < 0.42) spawnMonster(false, "gold");
    } else if (S.event.type === "mutual") {
      S.event.tick = 2;
      heal(8 + S.p.lv * 1.2);
      shield(8 + S.p.lv * 1.1);
      particles(S.p.x, S.p.y, 14, "#72f0ce", 170);
    } else if (S.event.type === "regulation") {
      S.event.tick = 2.8;
      S.enemyShots.splice(0, Math.ceil(S.enemyShots.length * 0.55));
      for (const m of S.monsters) {
        if (!m.dead && !m.boss && (m.aiType === "ranged" || m.tag === "消息面" || m.tag === "特效面")) {
          m.slow = Math.max(m.slow, 1.5);
        }
      }
      float(S.p.x, S.p.y - 62, "监管压制弹幕", "#9ee8ff", 0.8);
    } else if (S.event.type === "limitDown") {
      S.event.tick = 2.2;
      sideSweepHazard();
    } else if (S.event.type === "wash") {
      S.event.tick = 4.4;
      spawnMonster(false, Math.random() < 0.55 ? "charger" : "bomber");
      randomHazardNearPlayer("洗盘震荡", "#ff986b", 56 + S.stage * 3, 15 + S.stage * 5, false);
    } else if (S.event.type === "bullMarket") {
      S.event.tick = 4.6;
      spawnMonster(false);
      spawnDrop("exp", clamp(S.p.x + rnd(-180, 180), 20, w - 20), clamp(S.p.y + rnd(-120, 120), 20, h - 20), 1);
      if (Math.random() < 0.45) addGold(1, S.p.x + rnd(-40, 40), S.p.y - 40);
    }
  }

  function pause() {
    if (S.mode === "playing") {
      S.mode = "paused";
      ui.status.textContent = "已暂停";
      show("暂停复盘", "按 P 继续，或点击按钮重新开始。", "暂停", false, "继续游戏");
      sync();
    } else if (S.mode === "paused") {
      S.mode = "playing";
      ui.status.textContent = "战斗中";
      overlay.classList.add("is-hidden");
      sync();
      updateQuickControls();
    }
  }

  function gameover() {
    S.mode = "gameover";
    ui.status.textContent = "本金归零";
    rerollBtn.style.display = "inline-block";
    const title = getRunTitle();
    const skills = S.p.bossSkills.length ? S.p.bossSkills.join("、") : "暂无";
    const death = S.deathCause || makeDeathCause({ type: "market", label: "本金归零", damage: 0 });
    ui.preAvatar.src = src(S.p.role);
    ui.preName.textContent = `${title} · ${death.title}`;
    ui.preClass.textContent = `${S.p.role.name} · ${S.p.role.destiny.name} · ${death.kind}`;
    ui.preSkill.textContent = `死因：${death.detail}｜复盘：${death.review}｜警示：${death.warning}｜存活 ${formatTime(S.run)}｜等级 ${S.p.lv}｜第 ${S.stage} 关｜击杀 ${S.kills}｜最高连杀 ${S.bestStreak}｜金币 ${S.p.gold || 0}｜精英 ${S.eliteKills}｜拾取 ${S.dropsCollected}｜事件 ${S.eventCount} 次｜Boss 技能：${skills}｜${death.quote.text} —— ${death.quote.by}`;
    show("本金归零", `死因复盘：${death.detail}。${death.warning}`, "结算 · 死因复盘", true, "再来一局");
    updateQuickControls();
  }

  function getRunTitle() {
    if (S.stage >= 6) return "穿越牛熊者";
    if (S.stage >= 4) return "仓位管理大师";
    if (S.eliteKills >= 5) return "精英猎手";
    if (S.kills >= 120) return "短线打板王";
    if (S.p.lv >= 20) return "能看懂K线的人";
    return "不再是新韭菜";
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function investorQuotes() {
    return [
      { by: "巴菲特", text: "别人贪婪时谨慎，别人恐惧时冷静。" },
      { by: "芒格", text: "反过来想，问题会更清楚。" },
      { by: "格雷厄姆", text: "安全边际，是投资的核心。" },
      { by: "彼得·林奇", text: "不懂的东西，不要轻易下重注。" },
      { by: "利弗莫尔", text: "市场永远不会错，错的是判断。" },
      { by: "邓普顿", text: "最危险的话是：这次不同。" },
    ];
  }

  function deathLessonFor(key) {
    const lessons = [
      {
        match: ["杠杆", "爆仓", "融资", "天地板"],
        title: "杠杆爆仓",
        kind: "仓位风险",
        warning: "杠杆会把一次判断错误放大成出局，永远先算最坏情况。",
        review: "降低融资冲动，保留现金和闪避空间，不要让一波回撤决定整局。",
      },
      {
        match: ["追涨", "高开", "高位", "冲锋", "涨停", "打板"],
        title: "追高被套",
        kind: "追高风险",
        warning: "追高前先写好止损位，没有撤退计划就不是进攻。",
        review: "别在怪物冲脸时硬贪输出，先横向拉开距离再找反击窗口。",
      },
      {
        match: ["割肉", "恐慌", "跳水", "回撤"],
        title: "恐慌割肉",
        kind: "情绪风险",
        warning: "恐慌时最容易把波动当趋势，先确认风险变化再动手。",
        review: "被连续贴脸后要优先保命，护盾、回血和闪避比贪伤害更重要。",
      },
      {
        match: ["消息", "黑嘴", "小作文", "传闻", "利空", "监管", "黑天鹅"],
        title: "消息面误伤",
        kind: "消息风险",
        warning: "越刺激的消息，越要降低仓位、验证来源、等待市场确认。",
        review: "遇到弹幕、红圈、突发事件时先躲机制，再考虑输出。",
      },
      {
        match: ["套牢", "震荡", "护盾", "石头", "量能"],
        title: "震荡耗死",
        kind: "耐心风险",
        warning: "震荡最怕重仓硬扛，分批、止损和等待同样是操作。",
        review: "被磨血时说明输出或续航不足，下局可以补护盾、回血或范围技能。",
      },
    ];
    return lessons.find((lesson) => lesson.match.some((word) => key.includes(word))) || {
      title: "风险失控",
      kind: "综合风险",
      warning: "活下来才有复利，任何时候都不要把自己逼到没有选择。",
      review: "死亡前通常是走位空间被压缩，下局优先清边、留闪避、别站红圈。",
    };
  }

  function makeDeathCause({ type = "market", source = null, label = "", damage = 0 } = {}) {
    const sourceName = label || source?.bossSkill || source?.typeLabel || source?.baseName || source?.name || "市场风险";
    const key = `${sourceName}${source?.tag || ""}${source?.aiType || ""}${source?.name || ""}`;
    const lesson = deathLessonFor(key);
    const dmgText = damage > 0 ? `，最后一击亏损 ${Math.round(damage)}` : "";
    const by = source?.boss ? "Boss" : type === "hazard" ? "危险区域" : type === "projectile" ? "弹幕" : source?.typeLabel || source?.tag || "怪物";
    return {
      title: lesson.title,
      kind: lesson.kind,
      detail: `被「${sourceName}」收割（来源：${by}${dmgText}）`,
      review: lesson.review,
      warning: lesson.warning,
      quote: pick(investorQuotes()),
    };
  }

  function recordDeathCause(info) {
    S.deathCause = makeDeathCause(info);
  }

  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    toastTime = 1.7;
  }

  function showRunBanner(title, sub = "", color = "#ffdc72", duration = 1.8) {
    S.banner = { title, sub, color, time: duration, duration };
  }

  function breakStreak(label = "回撤") {
    const p = S.p;
    if (!p || p.streak <= 0) return;
    if (p.streak >= 12) float(p.x, p.y - 58, `${label}，连杀 ${p.streak} 中断`, "#ffb8c5", 1.1);
    p.streak = 0;
    S.nextStreakReward = 12;
  }

  function handleStreakReward(x, y) {
    const p = S.p;
    if (!p) return;
    S.bestStreak = Math.max(S.bestStreak, p.streak);
    if (p.streak < S.nextStreakReward) return;
    const milestone = S.nextStreakReward;
    const gold = 2 + Math.floor(milestone / 18);
    const ultCharge = 2.2 + milestone / 24;
    addGold(gold, x, y - 28);
    shield(5 + milestone * 0.45 + p.lv * 0.55);
    setUltimateCooldown(p, p.ultCd - ultCharge);
    p.buffCrit = Math.max(p.buffCrit, 2.2 + milestone / 28);
    S.streakFlash = 1.6;
    S.shake = Math.max(S.shake, 0.16);
    particles(p.x, p.y, 34, "#ffdc72", 260);
    float(p.x, p.y - 82, `连杀 ${p.streak}：奖励到手`, "#ffdc72", 1.15);
    say(`连杀 ${p.streak}！金币、护盾和大招充能`);
    S.nextStreakReward += milestone < 36 ? 12 : 20;
  }

  function updateQuickControls() {
    document.body.dataset.mode = S.mode;
    if (!pauseBtn || !restartBtn) return;
    const canPause = S.mode === "playing" || S.mode === "paused";
    pauseBtn.disabled = !canPause;
    if (pauseText) {
      pauseText.textContent = S.mode === "paused" ? "继续" : S.mode === "upgrade" ? "选择中" : S.mode === "shop" ? "黑市中" : "暂停";
    }
    if (restartText) {
      restartText.textContent = S.mode === "menu" ? "开始" : S.mode === "gameover" ? "再来" : "重开";
    }
    if (uiToggleText) {
      uiToggleText.textContent = document.body.classList.contains("ui-hidden") ? "显示UI" : "隐藏UI";
    }
  }

  function fullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  }

  function isIOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function isStandaloneApp() {
    return window.navigator.standalone || (typeof matchMedia === "function" && matchMedia("(display-mode: standalone)").matches);
  }

  function setImmersiveMode(active) {
    document.body.classList.toggle("immersive-mode", active);
    updateFullscreenLabel();
    setTimeout(resize, 80);
  }

  function updateFullscreenLabel() {
    if (!fullscreenBtn) return;
    const active = Boolean(fullscreenElement()) || document.body.classList.contains("immersive-mode");
    fullscreenBtn.classList.toggle("is-active", active);
    fullscreenBtn.setAttribute("aria-label", active ? "退出全屏" : "进入全屏");
    if (fullscreenText) fullscreenText.textContent = active ? "退出全屏" : "全屏";
  }

  async function toggleFullscreen() {
    if (!fullscreenBtn) return;
    try {
      if (document.body.classList.contains("immersive-mode") && !fullscreenElement()) {
        setImmersiveMode(false);
        return;
      }
      if (fullscreenElement()) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        setImmersiveMode(false);
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen({ navigationUI: "hide" });
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else {
        setImmersiveMode(true);
        say(isIOSDevice() && !isStandaloneApp() ? "iPhone浏览器只能沉浸显示，添加到主屏幕后更像全屏" : "已进入沉浸显示");
      }
      if (screen.orientation?.lock && fullscreenElement()) screen.orientation.lock("landscape").catch(() => {});
    } catch (err) {
      setImmersiveMode(true);
      say(isIOSDevice() ? "iPhone浏览器限制网页真全屏，已改用沉浸显示" : "点一下页面后再试全屏");
    }
    updateFullscreenLabel();
    setTimeout(resize, 120);
  }

  function mobileArenaScale(sw, sh) {
    if (!touchDevice() || sw <= sh || sh > 560 || sw > 1180) return 1;
    return clamp(560 / Math.max(1, sh), 1, 1.52);
  }

  function setPointerFromEvent(e) {
    S.pointer.x = e.clientX * viewScale;
    S.pointer.y = e.clientY * viewScale;
  }

  function scaleActor(actor, sx, sy) {
    if (!actor) return;
    if (Number.isFinite(actor.x)) actor.x *= sx;
    if (Number.isFinite(actor.y)) actor.y *= sy;
  }

  function scaleWorld(sx, sy) {
    scaleActor(S.p, sx, sy);
    [S.monsters, S.shots, S.enemyShots, S.drops, S.parts, S.texts].forEach((list) => {
      for (const item of list) scaleActor(item, sx, sy);
    });
    for (const beam of S.beams) {
      beam.x1 *= sx;
      beam.x2 *= sx;
      beam.y1 *= sy;
      beam.y2 *= sy;
    }
    const avg = (sx + sy) / 2;
    for (const hazard of S.hazards) {
      scaleActor(hazard, sx, sy);
      if (Number.isFinite(hazard.r)) hazard.r *= avg;
      if (Number.isFinite(hazard.inner)) hazard.inner *= avg;
      if (Number.isFinite(hazard.width)) hazard.width *= avg;
      if (Number.isFinite(hazard.length)) hazard.length *= avg;
    }
  }

  function toggleGameUi() {
    document.body.classList.toggle("ui-hidden");
    updateQuickControls();
  }

  function resetJoystick() {
    S.joystick.active = false;
    S.joystick.dx = 0;
    S.joystick.dy = 0;
    S.joystick.pointerId = null;
    if (joystickStick) joystickStick.style.transform = "translate(-50%, -50%)";
  }

  function updateJoystick(e) {
    if (!joystick) return;
    const rect = joystick.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const max = rect.width * 0.32;
    const rawX = e.clientX - cx;
    const rawY = e.clientY - cy;
    const len = Math.hypot(rawX, rawY);
    const limited = len > max ? max / len : 1;
    const sx = rawX * limited;
    const sy = rawY * limited;
    S.joystick.dx = len > 8 ? rawX / Math.max(len, 1) : 0;
    S.joystick.dy = len > 8 ? rawY / Math.max(len, 1) : 0;
    if (joystickStick) joystickStick.style.transform = `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px))`;
  }

  function dodge() {
    const p = S.p;
    if (!p || S.mode !== "playing" || p.dodgeCd > 0) return;
    const dx = S.joystick.active && Math.hypot(S.joystick.dx, S.joystick.dy) > 0.1 ? S.joystick.dx : S.lastMove.x;
    const dy = S.joystick.active && Math.hypot(S.joystick.dx, S.joystick.dy) > 0.1 ? S.joystick.dy : S.lastMove.y;
    const len = Math.max(0.001, Math.hypot(dx, dy));
    const speed = 820 + p.lv * 8;
    p.dodgeVx = dx / len * speed;
    p.dodgeVy = dy / len * speed;
    p.dodgeTime = 0.18;
    p.invuln = 0.42;
    p.dodgeCd = Math.max(2.2, 4.8 - p.lv * 0.035);
    S.shake = Math.max(S.shake, 0.18);
    particles(p.x, p.y, 26, "#72f0ce", 260);
    float(p.x, p.y - 44, "闪避", "#72f0ce", 0.55);
    sync();
  }

  function targetLv() {
    return S.stage * 10;
  }

  function themeFor(stage = S.stage) {
    return stageThemes[(stage - 1) % stageThemes.length];
  }

  function difficultyScale() {
    const time = Math.min(900, S.run);
    const level = S.p ? S.p.lv : 1;
    const pressure = 1 + S.stage * 0.08 + level * 0.018 + time * 0.0035 + S.kills * 0.0012;
    const scale = {
      hp: Math.min(4.2, pressure),
      dmg: Math.min(3.6, 0.9 + pressure * 0.78),
      speed: Math.min(2.15, 0.92 + pressure * 0.16),
      spawn: Math.min(2.8, pressure),
    };
    if (activeEvent("bullMarket")) scale.spawn *= 1.22;
    if (activeEvent("wash")) {
      scale.speed *= 1.18;
      scale.spawn *= 1.28;
    }
    if (activeEvent("regulation")) {
      scale.speed *= 0.9;
      scale.spawn *= 0.86;
    }
    return scale;
  }

  function chooseWeighted(options) {
    const total = options.reduce((sum, item) => sum + Math.max(0, item.weight), 0);
    let roll = rnd(0, total || 1);
    for (const item of options) {
      roll -= Math.max(0, item.weight);
      if (roll <= 0) return item.type;
    }
    return options[0]?.type || "normal";
  }

  function chooseMonsterArchetype(initial = false) {
    if (initial || S.bossActive) return "normal";
    const p = S.p;
    const pressure = S.stage + p.lv * 0.32 + S.run / 60;
    const goldHunters = S.monsters.filter((m) => !m.dead && m.aiType === "gold").length;
    const options = [
      { type: "normal", weight: Math.max(36, 86 - pressure * 4.2) },
      { type: "charger", weight: p.lv >= 3 ? 8 + pressure * (activeEvent("wash") ? 1.7 : 1.1) : 0 },
      { type: "ranged", weight: p.lv >= 4 ? 7 + pressure * 0.95 : 0 },
      { type: "bomber", weight: p.lv >= 5 ? 6 + pressure * (activeEvent("blackSwan") ? 1.25 : 0.9) : 0 },
      { type: "splitter", weight: p.lv >= 6 ? 5 + pressure * 0.75 : 0 },
      { type: "shield", weight: p.lv >= 8 ? 4 + pressure * 0.65 : 0 },
      { type: "gold", weight: S.run > 24 && goldHunters < (activeEvent("hotMoney") ? 4 : 1) ? (activeEvent("hotMoney") ? 22 : 5) + S.stage * 0.8 : 0 },
    ];
    return chooseWeighted(options);
  }

  function applyMonsterArchetype(m, type) {
    m.aiType = type;
    m.typeLabel = "";
    if (type === "charger") {
      m.name = `冲锋${m.name}`;
      m.badge = "冲";
      m.typeLabel = "冲锋";
      m.color = "#ff6c32";
      m.hp *= 1.12;
      m.maxHp = m.hp;
      m.speed *= 1.08;
      m.chargeWarn = 0;
      m.chargeCd = rnd(1.0, 2.0);
    } else if (type === "ranged") {
      m.name = `远程${m.name}`;
      m.badge = "射";
      m.typeLabel = "远程";
      m.color = "#d9a7ff";
      m.hp *= 0.82;
      m.maxHp = m.hp;
      m.speed *= 0.82;
      m.shootCd = rnd(0.8, 1.7);
      m.keepRange = 250 + rnd(-25, 45);
    } else if (type === "bomber") {
      m.name = `爆仓${m.name}`;
      m.badge = "爆";
      m.typeLabel = "自爆";
      m.color = "#ff415f";
      m.hp *= 0.78;
      m.maxHp = m.hp;
      m.speed *= 1.28;
      m.explodeRadius = 82 + S.stage * 4;
      m.explodeArmed = true;
    } else if (type === "splitter") {
      m.name = `分裂${m.name}`;
      m.badge = "裂";
      m.typeLabel = "分裂";
      m.color = "#62dbff";
      m.hp *= 1.18;
      m.maxHp = m.hp;
      m.speed *= 0.92;
      m.splitCount = 2 + Math.min(2, Math.floor(S.stage / 3));
    } else if (type === "shield") {
      m.name = `护盾${m.name}`;
      m.badge = "盾";
      m.typeLabel = "护盾";
      m.color = "#7aa8ff";
      m.hp *= 1.55;
      m.maxHp = m.hp;
      m.speed *= 0.72;
      m.shieldGuard = true;
    } else if (type === "gold") {
      m.name = "游资金币怪";
      m.badge = "金";
      m.tag = "游资面";
      m.typeLabel = "金币";
      m.color = "#f7d66f";
      m.hp *= 0.72;
      m.maxHp = m.hp;
      m.speed *= 1.55;
      m.dmg *= 0.15;
      m.r *= 0.9;
      m.goldValue = 8 + S.stage * 2 + Math.floor(S.p.lv / 3);
      m.flee = true;
    }
  }

  function spawnMonster(initial = false, forcedType = null) {
    const p = S.p;
    const m = pick(mobs);
    const side = Math.floor(rnd(0, 4));
    const margin = initial ? rnd(120, 280) : 64;
    let x = side === 1 ? w + margin : side === 3 ? -margin : rnd(0, w);
    let y = side === 0 ? -margin : side === 2 ? h + margin : rnd(0, h);
    if (initial) {
      const a = rnd(0, Math.PI * 2);
      const r = rnd(220, Math.max(260, Math.min(w, h) * 0.45));
      x = p.x + Math.cos(a) * r;
      y = p.y + Math.sin(a) * r;
    }
    const diff = difficultyScale();
    const hp = (34 + p.lv * 8.6 + S.stage * 16 + S.run * 0.42) * m[4] * diff.hp;
    const monster = {
      id: ++id,
      name: m[0],
      badge: m[1],
      tag: m[2],
      color: m[3],
      x,
      y,
      r: rnd(14, 18) * m[6],
      hp,
      maxHp: hp,
      speed: (rnd(54, 78) + p.lv * 2.4 + S.stage * 2.6) * m[5] * diff.speed,
      dmg: (10 + p.lv * 1.55 + S.stage * 3.2 + S.run * 0.035) * m[6] * diff.dmg,
      wobble: rnd(0, 7),
      rc: 0,
      sc: 0,
      touch: rnd(0.05, 0.5),
      specialCd: rnd(1.2, 3.5),
      burn: 0,
      burnT: 0,
      stun: 0,
      slow: 0,
      flash: 0,
      mark: 0,
      first: true,
      dragon: true,
      dead: false,
      boss: false,
    };
    applyMonsterArchetype(monster, forcedType || chooseMonsterArchetype(initial));
    S.monsters.push(monster);
  }

  function spawnEliteMonster() {
    const p = S.p;
    const m = pick(mobs);
    const side = Math.floor(rnd(0, 4));
    const margin = 90;
    let x = side === 1 ? w + margin : side === 3 ? -margin : rnd(0, w);
    let y = side === 0 ? -margin : side === 2 ? h + margin : rnd(0, h);
    const diff = difficultyScale();
    const hp = (230 + p.lv * 30 + S.stage * 96 + S.run * 0.8) * m[4] * diff.hp;
    S.monsters.push({
      id: ++id,
      name: `${m[0]}·精英`,
      baseName: m[0],
      badge: m[1],
      tag: m[2],
      color: m[3],
      x,
      y,
      r: rnd(22, 28) * m[6],
      hp,
      maxHp: hp,
      speed: (50 + p.lv * 2.25 + S.stage * 5) * m[5] * diff.speed,
      dmg: (18 + p.lv * 1.95 + S.stage * 5.2) * m[6] * diff.dmg,
      wobble: rnd(0, 7),
      rc: 0,
      sc: 0,
      touch: 0.35,
      specialCd: 1.2,
      eliteCd: 1.8,
      burn: 0,
      burnT: 0,
      stun: 0,
      slow: 0,
      flash: 0,
      mark: 0,
      first: true,
      dragon: true,
      dead: false,
      boss: false,
      elite: true,
    });
    say("精英怪入场");
  }

  function spawnBoss() {
    const kind = ((S.stage - 1) % bosses.length) + 1;
    const b = bosses[kind - 1] || [`牛熊轮回 ${S.stage}`, "轮", "#ffb23f", "市场永远有新剧本。", "牛熊轮回"];
    const side = Math.floor(rnd(0, 4));
    const margin = 110;
    let x = side === 1 ? w + margin : side === 3 ? -margin : rnd(w * 0.15, w * 0.85);
    let y = side === 0 ? -margin : side === 2 ? h + margin : rnd(h * 0.15, h * 0.85);
    const diff = difficultyScale();
    const hp = Math.floor((2600 + S.stage * 1250 + S.stage * S.stage * 360 + S.p.lv * 135) * diff.hp);
    S.bossActive = true;
    S.bossDone = true;
    S.shake = 0.8;
    const boss = {
      id: ++id,
      name: b[0],
      badge: b[1],
      tag: "Boss",
      color: b[2],
      x,
      y,
      r: 48 + S.stage * 3,
      hp,
      maxHp: hp,
      speed: (56 + S.stage * 7) * diff.speed,
      dmg: (32 + S.stage * 13 + S.p.lv * 2.1) * diff.dmg,
      wobble: rnd(0, 7),
      rc: 0,
      sc: 0,
      touch: 0.3,
      skillCd: 1.25,
      skillCd2: 5.5,
      bossKind: kind,
      bossTier: S.stage,
      bossSkill: b[4],
      barrierMax: hp * (0.2 + Math.min(0.18, S.stage * 0.018)),
      barrier: hp * (0.12 + Math.min(0.18, S.stage * 0.02)),
      pulseCd: 2.6,
      phase70: false,
      phase35: false,
      charge: 0,
      chargeVx: 0,
      chargeVy: 0,
      enraged: false,
      burn: 0,
      burnT: 0,
      stun: 0,
      slow: 0,
      flash: 0,
      mark: 0,
      first: true,
      dragon: true,
      dead: false,
      boss: true,
    };
    S.monsters.push(boss);
    bossEntranceTaunt(boss, b[3]);
  }

  function bossEntranceTaunt(boss, quote) {
    say(`第 ${S.stage} 关 Boss：${boss.name}`);
    float(boss.x, boss.y + boss.r + 38, `“${quote}”`, "#ffdc72", 2.2);
    float(S.p.x, S.p.y - 80, `${boss.bossSkill} 来袭`, boss.color, 1.7);
    boss.taunt = 2.6;
    particles(S.p.x, S.p.y, 80, boss.color, 280);
  }

  function orbitStats() {
    const p = S.p;
    const r = p.role;
    const style = r.attack;
    let count = Math.min(7, 2 + Math.floor((p.lv - 1) / 4));
    let dmg = (p.atk + p.lv * 2.6) * (style.power || 1);
    let radius = 13 + Math.min(8, p.lv * 0.45);
    let orbit = 62 + Math.min(52, p.lv * 2.6);
    let speed = 2.35 + p.lv * 0.04;
    let shape = style.shape || "orb";
    let mode = style.mode || "orbit";

    if (mode !== "orbit") {
      const volleyGrowth = mode === "grenade" || mode === "pulse" || mode === "flame" || mode === "beam" ? 12 : 8;
      const volley = (style.volley || 1) + Math.floor((p.lv - 1) / volleyGrowth) + p.mods.count;
      const baseRange = style.range || (mode === "beam" ? 760 : mode === "flame" ? 260 : mode === "pulse" ? 135 : 620);
      const baseSpeed = mode === "grenade" ? 335 : mode === "boomerang" ? 455 : mode === "homing" ? 520 : shape === "laser" ? 760 : shape === "cannon" ? 390 : 560;
      return {
        mode,
        icon: style.icon || r.badge,
        label: style.name,
        color: r.color,
        shape,
        count: volley,
        dmg,
        radius: (shape === "grenade" || shape === "cannon" ? 12 + Math.floor(p.lv / 7) : mode === "mine" ? 15 : 7 + Math.floor(p.lv / 10)) * p.mods.range,
        speed: baseSpeed + p.lv * (mode === "grenade" ? 4 : 7),
        cooldown: Math.max(0.16, ((style.cd || 0.7) - p.lv * 0.016) * p.mods.cooldown),
        pierce: (style.pierce || 1) + Math.floor(p.lv / 12) + p.mods.pierce,
        splash: ((style.splash || 0) + (style.splash ? p.lv * 2 : 0)) * p.mods.range,
        range: (baseRange + p.lv * (mode === "beam" ? 6 : mode === "pulse" ? 2.8 : 4)) * p.mods.range,
        spread: style.spread || 0.7,
        slow: !!style.slow,
        burn: !!style.burn,
        text: style.text,
        intro: style.intro,
      };
    }

    if (shape === "blade") { count = Math.min(10, 2 + Math.floor(p.lv / 5)); speed += 0.18; }
    if (shape === "fire") { count = Math.min(9, 2 + Math.floor(p.lv / 4)); radius += 2; }
    if (shape === "shield" || shape === "coin") { radius += 3; dmg *= 0.9; }
    if (shape === "dagger" || shape === "claw") { speed += 0.45; orbit -= 4; }
    if (shape === "horn") { orbit += 8; dmg += p.bull * 2.5; }
    if (r.type === "combo") { count = 3 + Math.floor(p.lv / 8); speed += 0.3; }
    if (r.type === "shield") { count = 3 + Math.floor(p.lv / 6); dmg *= 0.9; }
    if (r.type === "grid" || r.type === "rebalance") { count = 4 + Math.floor(p.lv / 9); }
    if (r.type === "hot") { count = Math.min(9, 3 + Math.floor(p.lv / 4)); speed += 0.35; }
    if (r.type === "bond") { dmg *= 0.78; radius += 3; }
    if (r.type === "bull") dmg += p.bull * 2.5;
    count += p.mods.count;
    radius *= p.mods.range;
    orbit *= p.mods.range;
    return { mode, icon: style.icon || r.badge, label: style.name, color: r.color, count, dmg, radius, orbit, speed, shape, burn: !!style.burn, text: style.text, intro: style.intro };
  }

  function swordStats() {
    const p = S.p;
    if (!p || p.mods.sword <= 0) return { on: false, count: 0 };
    const evolved = p.evolved || {};
    return {
      on: true,
      lv: p.mods.sword,
      count: Math.min(evolved.sword5 ? 12 : 8, p.mods.sword + Math.floor(p.lv / 8) + (evolved.sword5 ? 2 : 0)),
      dmg: (24 + p.lv * 5.5 + S.stage * 4 + p.mods.sword * 12) * (evolved.sword3 ? 1.16 : 1),
      orbit: (108 + Math.min(58, p.lv * 2.4) + (evolved.sword5 ? 24 : 0)) * p.mods.range,
      speed: 1.75 + p.lv * 0.028 + p.mods.sword * 0.08 + (evolved.sword3 ? 0.12 : 0),
    };
  }

  function roleHit(m, base) {
    const p = S.p;
    let d = base;
    p.hit++;
    const t = p.role.type;
    if (p.role.attack?.burn) {
      m.burn = Math.max(m.burn, 7 + p.lv * 1.8);
      m.burnT = Math.max(m.burnT, 1.4);
      markElementFx(m, "fire", 1 + Math.floor(p.lv / 10), 1.2);
    }
    if (p.mods.frost > 0) {
      m.slow = Math.max(m.slow, (0.9 + p.mods.frost * 0.25) * (m.boss ? 0.45 : 1));
      markElementFx(m, "ice", p.mods.frost, 0.85);
    }
    if (t === "combo" && p.hit % 3 === 0) { d *= 2.35; m.stun = 0.38; float(m.x, m.y - m.r, "涨停连击", "#ffdc72"); }
    if (t === "shield") { shield(3 + p.lv * 0.75); d += p.shield * 0.035; }
    if (t === "burn") { if (p.hit % 2) { m.burn = 10 + p.lv * 2.4; m.burnT = 1.8; markElementFx(m, "fire", 1 + Math.floor(p.lv / 8), 1.5); } else heal(3 + p.lv); }
    if (t === "grid") { if (m.hp / m.maxHp > 0.5) d += m.maxHp * 0.045; else heal(4 + S.stage); }
    if (t === "crit" && (Math.random() < 0.22 || m.tag === "消息面")) d *= 2.1;
    if (t === "hot") { p.combo = Math.min(18, p.combo + 1); d *= 1 + Math.min(0.78, p.combo * 0.035); }
    if (t === "counter" && p.drawdown > 0) { d += p.drawdown; p.drawdown = 0; }
    if (t === "value") d += p.maxHp * 0.025;
    if (t === "execute" && m.hp / m.maxHp < 0.45) d += m.maxHp * 0.13;
    if (t === "rebalance" && p.hit % 4 === 0) { heal(p.maxHp * 0.045); shield(p.maxHp * 0.045); d += p.atk * 0.42; }
    if (t === "pierce" && m.first) { m.first = false; d += m.maxHp * (m.boss ? 0.12 : 0.22); }
    if (t === "mark") { m.mark++; d += p.atk * 0.16 * m.mark; }
    if (t === "blast" && p.hit % 4 === 0) blast(m.x, m.y, 96, p.atk * 1.05 + S.stage * 18);
    if (t === "option" && Math.random() < 0.25) d *= 1.95;
    if (t === "dragon" && m.dragon && p.streak > 0) { m.dragon = false; d += p.atk * Math.min(1.35, 0.35 + p.streak * 0.045); }
    if (t === "index") d += p.atk * (0.1 * S.stage + (m.boss ? 0.45 : 0));
    if (t === "bond") { heal(2 + p.lv * 0.35); shield(2 + p.lv * 0.35); }
    if (t === "ipo" && Math.random() < 0.14) { d *= 3; p.jackpot = true; float(m.x, m.y - m.r, "中签暴击", "#ff8fc2"); }
    if (t === "dodge" && p.stars > 0) { d += p.stars * p.atk * 0.55; p.stars = 0; }
    if (t === "bull") { d += p.bull * 2.5; if (p.lv % 10 === 0) d += p.atk * 0.9 + p.bull * 4; }
    if (t === "ai") {
      const elem = ["fire", "ice", "lightning", "storm", "rain"].reduce((sum, key) => sum + (p.mods[key] > 0 ? 1 : 0), 0);
      d *= 1.06 + elem * 0.055;
      if (p.hit % 6 === 0) {
        const bonus = p.atk * (0.65 + elem * 0.18);
        damage(m, bonus, "element");
        markElementFx(m, elem >= 3 ? "iceLightning" : "lightning", 1 + elem, 0.75);
        zap(p.x, p.y, m.x, m.y, "#72f0ce", 0.16, 3);
        float(m.x, m.y - m.r - 16, "算法校准", "#72f0ce", 0.75);
      }
    }
    if (m.dead) return Math.max(1, d);
    d *= applyElementEffects(m, d);
    const critChance = p.mods.crit + (p.buffCrit > 0 ? 0.25 : 0);
    if (critChance > 0 && Math.random() < critChance) {
      d *= 1.8;
      float(m.x, m.y - m.r - 12, "暴击", "#ffdc72");
    }
    return Math.max(1, d);
  }

  function applyElementEffects(m, baseDamage) {
    const p = S.p;
    const bossResist = m.boss ? 0.45 : 1;
    const eliteBoost = m.elite ? 0.82 : 1;
    let hitMult = 1;
    if (p.mods.fire > 0) {
      const lv = p.mods.fire;
      m.burn = Math.max(m.burn, (8 + p.lv * 1.5 + lv * 6) * (m.boss ? 0.58 : 1));
      m.burnT = Math.max(m.burnT, 1.5 + lv * 0.28);
      markElementFx(m, "fire", lv, Math.min(2.4, 1.2 + lv * 0.22));
      if (Math.random() < Math.min(0.42, 0.08 * lv)) particles(m.x, m.y, 10 + lv * 2, "#ff6b32", 150);
      if (lv >= 3 && Math.random() < Math.min(0.28, (p.evolved.fire3 ? 0.048 : 0.035) * lv)) {
        blast(m.x, m.y, 38 + lv * (p.evolved.fire3 ? 12 : 9), baseDamage * (m.boss ? 0.14 : 0.28));
        markElementFx(m, "fire", lv + 1, 1.4);
        float(m.x, m.y - m.r - 12, "炎爆", "#ff6b32", 0.7);
      }
    }

    if (p.mods.fire > 0 && p.mods.storm > 0) {
      const fireLv = p.mods.fire;
      const stormLv = p.mods.storm;
      const bonus = Math.min(0.65, 0.22 + (fireLv + stormLv) * 0.045);
      hitMult *= 1 + bonus;
      markElementFx(m, "fireStorm", fireLv + stormLv, 0.9);
      if (canReact(m, "fireStorm", 0.55)) {
        const burst = baseDamage * bonus * (m.boss ? 0.5 : 0.85);
        damage(m, burst, "element");
        particles(m.x, m.y, 26 + fireLv * 2, "#ff8a32", 260);
        float(m.x, m.y - m.r - 18, `焚风 +${Math.round(bonus * 100)}%`, "#ff986b", 0.8);
      }
    }

    if (p.mods.ice > 0) {
      const lv = p.mods.ice;
      m.slow = Math.max(m.slow, (1 + lv * 0.35) * bossResist);
      markElementFx(m, "ice", lv, 1.2 + lv * 0.12);
      if (Math.random() < Math.min(m.boss ? 0.1 : 0.34, 0.055 * lv * eliteBoost)) {
        m.stun = Math.max(m.stun, m.boss ? 0.14 : 0.28 + lv * 0.025);
        markElementFx(m, "ice", lv + 1, 1.5);
        float(m.x, m.y - m.r - 10, "冻结", "#9ee8ff", 0.7);
      }
      if (lv >= 3 && (m.stun > 0 || m.slow > 0) && Math.random() < (p.evolved.ice3 ? 0.105 : 0.08) * lv) {
        damage(m, baseDamage * (m.boss ? 0.05 : 0.1) * lv, "element");
        particles(m.x, m.y, 12, "#bdf7ff", 180);
      }
    }

    if (p.mods.rain > 0 && p.mods.ice > 0) {
      const lv = p.mods.rain + p.mods.ice;
      const freezeTime = (m.boss ? 0.12 : 0.32) + Math.min(m.boss ? 0.08 : 0.24, lv * 0.018);
      m.slow = Math.max(m.slow, (1.4 + lv * 0.06) * bossResist);
      m.stun = Math.max(m.stun, freezeTime);
      markElementFx(m, "rainFreeze", lv, 1.25);
      if (canReact(m, "rainFreeze", 0.7)) {
        const base = baseDamage * (0.16 + lv * 0.018) * (m.boss ? 0.45 : 1);
        damage(m, base * 2, "element");
        particles(m.x, m.y, 22 + lv, "#9ee8ff", 220);
        float(m.x, m.y - m.r - 20, "寒雨冻结 x2", "#9ee8ff", 0.85);
      }
    }

    if (p.mods.lightning > 0 && Math.random() < Math.min(0.38, 0.13 + p.mods.lightning * 0.055)) {
      const lv = p.mods.lightning;
      let jumps = Math.min(p.evolved.lightning5 ? 10 : 7, 1 + lv + (p.evolved.lightning3 ? 1 : 0));
      const frozenTarget = isIced(m);
      const lightningMult = frozenTarget ? 2 : 1;
      markElementFx(m, "lightning", lv, 0.55 + lv * 0.07);
      if (frozenTarget) {
        markElementFx(m, "iceLightning", lv + (p.mods.ice || p.mods.frost || 1), 0.9);
        if (canReact(m, "iceLightning", 0.45)) {
          damage(m, baseDamage * (0.1 + lv * 0.035) * lightningMult, "element");
          particles(m.x, m.y, 18 + lv, "#f7d66f", 260);
          float(m.x, m.y - m.r - 18, "雷碎冰 x2", "#f7d66f", 0.8);
        }
      }
      zap(p.x, p.y, m.x, m.y, "#f7d66f", 0.13, 2 + lv * 0.35);
      for (const other of S.monsters) {
        if (jumps <= 0) break;
        if (!other.dead && other !== m && Math.hypot(other.x - m.x, other.y - m.y) < 150 + lv * 18) {
          const chainMult = isIced(other) ? 2 : lightningMult;
          damage(other, baseDamage * (0.22 + lv * 0.045) * chainMult, "element");
          if ((lv >= 4 || p.evolved.lightning3) && !other.boss && Math.random() < 0.18) other.stun = Math.max(other.stun, 0.16);
          markElementFx(other, "lightning", lv, 0.6);
          if (chainMult > 1) {
            markElementFx(other, "iceLightning", lv, 0.75);
            if (canReact(other, "iceLightningChain", 0.55)) float(other.x, other.y - other.r - 14, "导电 x2", "#f7d66f", 0.65);
          }
          zap(m.x, m.y, other.x, other.y, "#f7d66f", 0.16, 2 + lv * 0.35);
          particles(other.x, other.y, 8, "#f7d66f", 190);
          jumps--;
        }
      }
    }
    if (p.mods.storm > 0) {
      const lv = p.mods.storm;
      const dx = m.x - p.x;
      const dy = m.y - p.y;
      const len = Math.max(1, Math.hypot(dx, dy));
      const push = (5 + lv * 3) * (m.boss ? 0.22 : 1);
      m.x += dx / len * push;
      m.y += dy / len * push;
      markElementFx(m, "storm", lv, 0.75 + lv * 0.08);
      if (lv >= 3 && Math.random() < Math.min(0.4, (p.evolved.storm3 ? 0.09 : 0.07) * lv)) m.stun = Math.max(m.stun, m.boss ? 0.08 : 0.2);
      if (Math.random() < Math.min(0.48, (p.evolved.storm3 ? 0.105 : 0.08) * lv)) blast(m.x, m.y, 42 + lv * 12, baseDamage * (m.boss ? 0.1 : 0.25));
    }
    if (p.mods.rain > 0) {
      const lv = p.mods.rain;
      heal(0.7 + lv * 0.58);
      markElementFx(m, "rain", lv, 0.95 + lv * 0.09);
      if (lv >= 3 && Math.random() < (p.evolved.rain3 ? 0.065 : 0.04) * lv) shield(2 + lv * 1.4);
      if (Math.random() < Math.min(0.22, 0.03 * lv)) spawnDrop("exp", m.x + rnd(-16, 16), m.y + rnd(-16, 16), 1);
    }
    return hitMult;
  }

  function damage(m, amount, kind = "role") {
    if (m.dead) return;
    let d = kind === "burn" ? Math.max(0, amount) : Math.floor(Math.max(1, amount));
    if (m.boss) {
      const reduction = Math.max(0.48, 0.76 - S.stage * 0.018);
      if (kind === "burn") {
        d *= Math.max(0.26, reduction * 0.42);
      } else {
        d *= kind === "ultimate" ? reduction * 0.9 : reduction;
      }
      if (kind !== "burn" && m.barrier > 0) {
        const blocked = Math.min(m.barrier, d);
        m.barrier -= blocked;
        d -= blocked;
        if (blocked > 20 && Math.random() < 0.35) float(m.x, m.y - m.r - 18, "Boss护盾", "#72f0ce", 0.55);
        if (d <= 0) return;
      }
      if (kind !== "burn") d = Math.floor(Math.max(1, d));
    }
    if (m.shieldGuard && kind !== "burn" && kind !== "ultimate") {
      d = Math.max(1, d * (kind === "blast" ? 0.82 : 0.62));
      if (Math.random() < 0.18) float(m.x, m.y - m.r - 16, "护盾减伤", "#7aa8ff", 0.55);
    }
    m.hp -= d;
    m.flash = 0.08;
    S.shake = Math.max(S.shake, kind === "sword" ? 0.12 : 0.06);
    if (kind !== "burn") particles(m.x, m.y, kind === "sword" ? 6 : 4, kind === "sword" ? "#72f0ce" : S.p.role.color, kind === "sword" ? 170 : 130);
    if (kind !== "burn" && (d >= 25 || m.boss || Math.random() < 0.25)) float(m.x, m.y - m.r, `-${Math.round(d)}`, kind === "sword" ? "#72f0ce" : "#ffdc72");
    if (m.hp <= 0) kill(m);
  }

  function blast(x, y, r, d) {
    particles(x, y, 30, "#ff986b", 260);
    S.monsters.forEach((m) => {
      if (!m.dead && Math.hypot(m.x - x, m.y - y) < r + m.r) damage(m, d, "blast");
    });
  }

  function explodeMonster(m, contact = false) {
    if (!m.explodeArmed) return;
    m.explodeArmed = false;
    particles(m.x, m.y, 48, "#ff415f", 340);
    float(m.x, m.y - m.r - 18, contact ? "爆仓贴脸！" : "爆仓爆炸", "#ff415f", 0.85);
    if (Math.hypot(S.p.x - m.x, S.p.y - m.y) < m.explodeRadius + S.p.r) {
      bossDamage(m.dmg * (contact ? 1.15 : 0.72), m, "爆仓冲击");
    }
    for (const other of S.monsters) {
      if (!other.dead && other !== m && !other.boss && Math.hypot(other.x - m.x, other.y - m.y) < m.explodeRadius + other.r) {
        damage(other, m.dmg * 0.65, "blast");
      }
    }
    m.dead = true;
  }

  function spawnSplitMinions(m) {
    const count = m.splitCount || 2;
    const hp = Math.max(12, m.maxHp * 0.18);
    for (let i = 0; i < count; i++) {
      const a = rnd(0, Math.PI * 2);
      S.monsters.push({
        id: ++id,
        name: "分裂碎片",
        baseName: m.baseName || m.name,
        badge: "碎",
        tag: "分裂面",
        color: "#62dbff",
        x: clamp(m.x + Math.cos(a) * rnd(18, 36), 18, w - 18),
        y: clamp(m.y + Math.sin(a) * rnd(18, 36), 18, h - 18),
        r: Math.max(10, m.r * 0.62),
        hp,
        maxHp: hp,
        speed: m.speed * 1.18,
        dmg: m.dmg * 0.48,
        wobble: rnd(0, 7),
        rc: 0,
        sc: 0,
        touch: 0.3,
        specialCd: rnd(1.6, 3.2),
        burn: 0,
        burnT: 0,
        stun: 0,
        slow: 0,
        flash: 0,
        mark: 0,
        first: true,
        dragon: true,
        dead: false,
        boss: false,
        aiType: "normal",
        splitChild: true,
      });
    }
    particles(m.x, m.y, 28, "#62dbff", 240);
    float(m.x, m.y - m.r - 18, `分裂 x${count}`, "#62dbff", 0.8);
  }

  function kill(m) {
    if (m.dead) return;
    const p = S.p;
    m.dead = true;
    particles(m.x, m.y, m.boss ? 70 : 22, m.color, m.boss ? 320 : 220);
    p.streak++;
    S.bestStreak = Math.max(S.bestStreak, p.streak);
    if (m.boss) {
      const old = S.stage;
      S.bossActive = false;
      S.bossDone = false;
      S.stage++;
      stat(p, false);
      heal(p.maxHp * 0.55);
      shield(p.maxHp * 0.25);
      const rewardName = grantBossSkill(old);
      startStageTransition(old, S.stage, rewardName);
      addXp(5 + old * 2, m.x, m.y);
      addGold(18 + old * 4, m.x, m.y - 22);
      say(`击败 Boss，获得 ${rewardName}`);
      float(m.x, m.y - 70, `第 ${old} 关突破`, "#ffdc72", 1.4);
      return;
    }
    if (m.aiType === "bomber" && m.explodeArmed) explodeMonster(m, false);
    if (m.aiType === "splitter" && !m.splitChild) spawnSplitMinions(m);
    if (m.elite && (m.baseName || "").includes("杠杆")) {
      particles(m.x, m.y, 46, "#ff415f", 320);
      if (Math.hypot(S.p.x - m.x, S.p.y - m.y) < 140) bossDamage(m.dmg * 0.9, m, "精英爆仓");
    }
    S.kills++;
    if (m.elite) S.eliteKills++;
    handleStreakReward(m.x, m.y);
    let xp = 1;
    if (m.elite) xp += 2;
    if (p.role.type === "dividend") { heal(p.maxHp * 0.045); if (Math.random() < 0.45) xp++; }
    if (p.role.type === "ipo" && p.jackpot) { xp++; p.jackpot = false; }
    addXp(xp, m.x, m.y);
    addGold(m.goldValue || (m.elite ? 4 : 1), m.x, m.y - 16);
    destinyOnKill(m);
    dropLoot(m);
    float(m.x, m.y - m.r, `+${xp} 经验`, "#72f0ce");
  }

  function grantBossSkill(stage) {
    const reward = bossRewards[(stage - 1) % bossRewards.length];
    if (!reward) return "神秘技能";
    reward.apply(S.p);
    S.p.bossSkills.push(reward.name);
    particles(S.p.x, S.p.y, 90, "#ffdc72", 360);
    float(S.p.x, S.p.y - 92, `获得 Boss 技能：${reward.name}`, "#ffdc72", 2);
    showRunBanner(`Boss 技能：${reward.name}`, reward.desc, "#ffdc72", 2.2);
    return reward.name;
  }

  function startStageTransition(from, to, rewardName) {
    const nextTheme = themeFor(to);
    S.transition = { from, to, rewardName, time: 0, duration: 3.2, theme: nextTheme };
    S.monsters = [];
    S.shots = [];
    S.enemyShots = [];
    S.beams = [];
    S.hazards = [];
    S.spawn = 0;
    S.shake = Math.max(S.shake, 0.9);
    particles(S.p.x, S.p.y, 120, nextTheme.glow, 430);
  }

  function dropLoot(m) {
    const elite = !!m.elite;
    if (elite || Math.random() < 0.55) spawnDrop("exp", m.x, m.y, elite ? 3 : 1);
    if (elite || Math.random() < 0.08) spawnDrop("heal", m.x + rnd(-12, 12), m.y + rnd(-12, 12), 1);
    if (elite || Math.random() < 0.1) spawnDrop("shield", m.x + rnd(-14, 14), m.y + rnd(-14, 14), 1);
    if (elite && Math.random() < 0.65) spawnDrop(Math.random() < 0.55 ? "crit" : "ult", m.x + rnd(-18, 18), m.y + rnd(-18, 18), 1);
  }

  function spawnDrop(type, x, y, value = 1) {
    const config = {
      exp: ["经", "#72f0ce"],
      heal: ["血", "#ff6c32"],
      shield: ["盾", "#7aa8ff"],
      crit: ["暴", "#d9a7ff"],
      ult: ["大", "#ffdc72"],
    }[type] || ["?", "#fff2d6"];
    S.drops.push({
      type,
      x,
      y,
      value,
      icon: config[0],
      color: config[1],
      r: type === "exp" ? 8 : 12,
      life: 14,
      vx: rnd(-45, 45),
      vy: rnd(-45, 45),
    });
  }

  function addXp(n, x, y) {
    const p = S.p;
    if (activeEvent("bullMarket")) n *= 1.45;
    if (activeEvent("mutual")) n *= 1.08;
    p.xp += n;
    while (p.xp >= p.next) {
      p.xp -= p.next;
      levelUp(x, y);
    }
  }

  function addGold(n, x, y) {
    if (!S.p || n <= 0) return;
    if (activeEvent("bullMarket")) n = Math.ceil(n * 1.35);
    if (activeEvent("hotMoney")) n = Math.ceil(n * 1.6);
    if (activeEvent("wash")) n = Math.ceil(n * 1.25);
    S.p.gold += n;
    const fx = x == null ? S.p.x : x;
    const fy = y == null ? S.p.y : y;
    float(fx, fy - 18, `+${n} 金币`, "#f7d66f", 0.75);
    sync();
  }

  function levelUp(x, y) {
    const p = S.p;
    p.lv++;
    p.next = xpNeed(p.lv);
    p.speed += 3.5;
    if (p.role.type === "bull") p.bull += 1 + Math.floor(p.lv / 5);
    stat(p, false);
    destinyOnLevel(p);
    heal(34 + p.lv * 4);
    if (p.role.type === "shield") shield(p.maxHp * 0.18);
    S.pulse = 1;
    S.shake = 0.35;
    particles(p.x, p.y, 52, "#ffdc72", 310);
    float(x || p.x, (y || p.y) - 30, "升级！", "#ffdc72");
    const canPickSkill = p.lv % SKILL_INTERVAL === 0;
    if (canPickSkill) {
      S.pendingUpgrades += 1;
      say(p.lv >= targetLv() && !S.bossDone ? `等级 ${p.lv}！Boss 解锁，选择技能树` : `等级 ${p.lv}！技能树选择`);
      if (S.mode === "playing" && !S.transition) openUpgrade();
    } else {
      say(p.lv >= targetLv() && !S.bossDone ? `等级 ${p.lv}！Boss 解锁` : `等级 ${p.lv}！`);
    }
  }

  function heal(n) {
    const dampen = Math.max(0.55, 1 - (difficultyScale().hp - 1) * 0.08);
    S.p.hp = Math.min(S.p.maxHp, S.p.hp + n * dampen);
  }

  function destinyOnLevel(p) {
    const t = p.role.type;
    if (t === "value") shield(p.maxHp * 0.08);
    if (t === "bond") shield(p.maxHp * 0.1);
    if (t === "ipo" && Math.random() < 0.36) addGold(2, p.x, p.y - 26);
    if (t === "bull") {
      p.bull += 1;
      stat(p, false);
      if (p.lv % 5 === 0) {
        p.mods.dmg *= 1.025;
        stat(p, false);
        float(p.x, p.y - 76, "牛气复利", "#ffdd72", 1);
      }
    }
    if (t === "ai" && p.lv % 4 === 0) {
      const branches = ["fire", "ice", "lightning", "storm", "rain", "sword"].filter((key) => p.mods[key] > 0).length;
      if (branches >= 2) {
        p.mods.dmg *= 1.015;
        p.mods.cooldown *= 0.985;
        float(p.x, p.y - 76, "量化调参", "#72f0ce", 1);
      }
    }
  }

  function destinyOnKill(m) {
    const p = S.p;
    const t = p.role.type;
    if (t === "dividend" && Math.random() < 0.16) addGold(1, m.x, m.y - 34);
    if (t === "ipo" && p.jackpot && Math.random() < 0.5) addGold(1, m.x, m.y - 34);
    if (t === "hot" && p.streak > 0 && p.streak % 18 === 0) {
      p.buffCrit = Math.max(p.buffCrit, 4);
      float(p.x, p.y - 64, "情绪高潮：暴击", "#ffb23f", 1);
    }
    if (t === "dragon" && p.streak > 0 && p.streak % 12 === 0) {
      heal(p.maxHp * 0.035);
      p.buffCrit = Math.max(p.buffCrit, 2.5);
      float(p.x, p.y - 64, "龙头反包", "#ffcf4a", 1);
    }
    if (t === "execute" && m.hp <= 0 && Math.random() < 0.12) addGold(1, m.x, m.y - 34);
    if (t === "mark" && m.boss) p.buffCrit = Math.max(p.buffCrit, 6);
  }

  function destinyPulse(p) {
    const t = p.role.type;
    if (t === "shield") shield(2.5 + p.lv * 0.35);
    if (t === "value") { heal(1.2 + p.lv * 0.12); shield(1.8 + p.lv * 0.22); }
    if (t === "rebalance" && p.hp / p.maxHp < 0.62) shield(2.5 + p.lv * 0.28);
    if (t === "counter" && p.drawdown > 0) shield(Math.min(18 + p.lv, p.drawdown * 0.08));
    if (t === "dividend" && Math.random() < 0.09) addGold(1, p.x + rnd(-20, 20), p.y - 36);
    if (t === "ipo" && Math.random() < 0.07) addGold(1, p.x + rnd(-20, 20), p.y - 36);
    if (t === "dodge") p.dodgeCd = Math.max(0, p.dodgeCd - 0.35);
    if (t === "grid" && p.hp / p.maxHp < 0.5) heal(2 + S.stage * 0.4);
    if (t === "crit" && S.monsters.some((m) => !m.dead && m.tag === "消息面")) p.buffCrit = Math.max(p.buffCrit, 1.4);
    if (t === "index" && S.bossActive) shield(2 + S.stage * 0.8);
    if (t === "ai") {
      const branches = ["fire", "ice", "lightning", "storm", "rain", "sword"].filter((key) => p.mods[key] > 0).length;
      if (branches >= 3) shield(2 + branches);
    }
  }

  function shield(n) {
    S.p.shield = clamp(S.p.shield + n * S.p.mods.shield, 0, S.p.maxHp * 0.75 + S.p.lv * 9);
  }

  function hitPlayer(m) {
    const p = S.p;
    if (p.invuln > 0) {
      float(p.x, p.y - 40, "闪避成功", "#72f0ce", 0.55);
      return;
    }
    let d = m.dmg;
    if (p.role.type === "value") d *= m.boss ? 0.78 : 0.66;
    if (p.role.type === "rebalance") d *= 0.78;
    if (p.role.type === "bond") d *= 0.68;
    if (p.role.type === "option" && p.hp / p.maxHp < 0.42) { d *= 0.72; shield(p.maxHp * 0.08); }
    if (p.role.type === "dodge" && Math.random() < Math.min(0.38, 0.18 + p.lv * 0.006)) {
      p.stars++;
      float(p.x, p.y - 40, "熔断闪避", "#b8f7ff");
      particles(p.x, p.y, 14, "#b8f7ff", 200);
      return;
    }
    const s = Math.min(p.shield, d);
    p.shield -= s;
    d -= s;
    if (d > 0) {
      p.hp = Math.max(0, p.hp - d);
      p.hurt = 0.36;
      S.shake = Math.max(S.shake, m.boss ? 0.5 : 0.24);
      particles(p.x, p.y, 12, "#ff415f", 170);
      float(p.x, p.y - p.r, `-${Math.round(d)}`, "#ff6c32");
      monsterTaunt(m);
      if (p.role.type === "counter") p.drawdown += Math.floor(d * 0.85);
      breakStreak("回撤");
    }
    if (p.hp <= 0) {
      recordDeathCause({ type: "touch", source: m, label: m.boss ? m.name : (m.typeLabel || m.baseName || m.name), damage: d });
      gameover();
    }
  }

  function monsterTaunt(m) {
    if (m.taunt > 0) return;
    const lines = m.boss ? taunts.Boss : (taunts[m.baseName || m.name] || ["韭菜味儿真浓。", "这一下，够你复盘一晚。", "别急，市场还没收盘。"]);
    const text = pick(lines);
    m.taunt = m.boss ? 2.4 : 3.2;
    float(m.x, m.y - m.r - 28, `“${text}”`, m.boss ? "#ffdc72" : "#ffb8c5", m.boss ? 1.8 : 1.45);
    if (m.boss) say(text);
  }

  function bossDamage(amount, boss, label, slow = false) {
    const p = S.p;
    if (p.invuln > 0) {
      float(p.x, p.y - 40, "闪避成功", "#72f0ce", 0.55);
      return;
    }
    let d = amount;
    if (p.role.type === "value") d *= 0.78;
    if (p.role.type === "rebalance") d *= 0.82;
    if (p.role.type === "bond") d *= 0.7;
    const blocked = Math.min(p.shield, d);
    p.shield -= blocked;
    d -= blocked;
    if (slow) p.slow = Math.max(p.slow, 1.8);
    if (d > 0) {
      p.hp = Math.max(0, p.hp - d);
      p.hurt = 0.36;
      S.shake = Math.max(S.shake, 0.38);
      particles(p.x, p.y, 14, boss.color || "#ff415f", 190);
      float(p.x, p.y - p.r, `${label} -${Math.round(d)}`, boss.color || "#ff6c32");
      if (boss.boss) monsterTaunt(boss);
      breakStreak(label);
    } else if (blocked > 0) {
      float(p.x, p.y - p.r, "护盾挡下技能", "#72f0ce");
    }
    if (p.hp <= 0) {
      recordDeathCause({ type: boss.boss ? "boss" : "hazard", source: boss, label, damage: d });
      gameover();
    }
  }

  function addHazard(config) {
    const warn = config.warn ?? 0.75;
    const life = config.life ?? 0.24;
    S.hazards.push({
      id: ++id,
      type: config.type || "circle",
      x: config.x,
      y: config.y,
      r: config.r || 80,
      inner: config.inner || 0,
      angle: config.angle || 0,
      spread: config.spread || Math.PI / 3,
      width: config.width || 24,
      length: config.length || 220,
      warn,
      maxWarn: warn,
      life,
      maxLife: life,
      fired: false,
      color: config.color || "#ff415f",
      dmg: config.dmg || 0,
      label: config.label || "危险区域",
      slow: !!config.slow,
      boss: config.boss || { x: config.x, y: config.y, color: config.color, boss: false },
      onFire: config.onFire,
    });
  }

  function angleDiff(a, b) {
    return Math.atan2(Math.sin(a - b), Math.cos(a - b));
  }

  function playerInHazard(h) {
    const p = S.p;
    if (!p) return false;
    const dx = p.x - h.x;
    const dy = p.y - h.y;
    const d = Math.hypot(dx, dy);
    if (h.type === "ring") return d <= h.r + p.r && d >= Math.max(0, h.inner - p.r);
    if (h.type === "line") {
      const ux = Math.cos(h.angle);
      const uy = Math.sin(h.angle);
      const along = dx * ux + dy * uy;
      const side = Math.abs(dx * -uy + dy * ux);
      return along >= -p.r && along <= h.length + p.r && side <= h.width + p.r * 0.55;
    }
    if (h.type === "cone") {
      const a = Math.atan2(dy, dx);
      return d <= h.r + p.r && Math.abs(angleDiff(a, h.angle)) <= h.spread / 2;
    }
    return d <= h.r + p.r;
  }

  function fireHazard(h) {
    if (h.fired) return;
    h.fired = true;
    h.warn = 0;
    S.shake = Math.max(S.shake, h.dmg > 0 ? 0.34 : 0.16);
    particles(h.x, h.y, h.type === "line" ? 18 : 38, h.color, h.type === "line" ? 220 : 300);
    if (h.dmg > 0 && playerInHazard(h)) bossDamage(h.dmg, h.boss, h.label, h.slow);
    if (typeof h.onFire === "function") h.onFire(h);
  }

  function updateHazards(dt) {
    for (const h of S.hazards) {
      if (h.warn > 0) {
        h.warn -= dt;
        if (h.warn <= 0) fireHazard(h);
      } else {
        h.life -= dt;
      }
    }
    S.hazards = S.hazards.filter((h) => h.warn > 0 || h.life > 0);
  }

  function spawnEnemyShot(x, y, angle, speed, radius, dmg, color, life, label, shape = "orb") {
    S.enemyShots.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: radius,
      dmg,
      color,
      life,
      label,
      shape,
      angle,
    });
  }

  function particles(x, y, n, color, speed) {
    for (let i = 0; i < n; i++) {
      const a = rnd(0, Math.PI * 2);
      const v = rnd(speed * 0.25, speed);
      const life = rnd(0.32, 0.74);
      S.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life, max: life, size: rnd(2, 6), color });
    }
  }

  function markElementFx(m, type, lv, life = 0.85) {
    if (!m || m.dead) return;
    m.fx = m.fx || {};
    const current = m.fx[type] || {};
    m.fx[type] = {
      t: Math.max(current.t || 0, life),
      max: Math.max(current.max || life, life),
      lv: Math.max(current.lv || 0, lv || 1),
      seed: current.seed ?? rnd(0, 1000),
    };
  }

  function tickElementFx(m, dt) {
    if (m.fx) {
      for (const key of Object.keys(m.fx)) {
        m.fx[key].t -= dt;
        if (m.fx[key].t <= 0) delete m.fx[key];
      }
    }
    if (m.reactCd) {
      for (const key of Object.keys(m.reactCd)) {
        m.reactCd[key] -= dt;
        if (m.reactCd[key] <= 0) delete m.reactCd[key];
      }
    }
  }

  function canReact(m, type, cd) {
    m.reactCd = m.reactCd || {};
    if ((m.reactCd[type] || 0) > 0) return false;
    m.reactCd[type] = cd;
    return true;
  }

  function isIced(m) {
    return m.stun > 0 || m.slow > 0 || !!getFx(m, "ice") || !!getFx(m, "rainFreeze");
  }

  function zap(x1, y1, x2, y2, color = "#f7d66f", life = 0.18, width = 3) {
    S.beams.push({ x1, y1, x2, y2, color, life, max: life, width, seed: rnd(0, 1000) });
  }

  function float(x, y, text, color = "#ffdc72", life = 0.82) {
    S.texts.push({ x, y, text, color, life, max: life, vy: -42 });
  }

  function tickEvolutionCooldowns(p, dt) {
    if (!p?.evoCd) return;
    for (const key of Object.keys(p.evoCd)) p.evoCd[key] = Math.max(0, p.evoCd[key] - dt);
  }

  function swordComboHit(m, sw) {
    const p = S.p;
    if (!p || m.dead) return;
    if (p.mods.fire > 0) {
      const lv = p.mods.fire + p.mods.sword;
      m.burn = Math.max(m.burn, 9 + p.lv * 1.7 + lv * 4);
      m.burnT = Math.max(m.burnT, 1.5 + lv * 0.12);
      markElementFx(m, "fire", lv, 1.1);
      if (p.evolved.fire5 && canReact(m, "fireSword", 0.55)) {
        damage(m, sw.dmg * 0.24, "element");
        float(m.x, m.y - m.r - 16, "炎剑灼斩", "#ff986b", 0.65);
      }
    }
    if (p.mods.lightning > 0 && canReact(m, "lightningSword", p.evolved.sword5 ? 0.32 : 0.48)) {
      const lv = p.mods.lightning + p.mods.sword;
      markElementFx(m, "lightning", lv, 0.6);
      zap(p.x, p.y, m.x, m.y, "#72f0ce", 0.16, 2.5);
      damage(m, sw.dmg * (0.22 + lv * 0.018), "element");
      let jumps = p.evolved.lightning5 ? 3 : 1;
      for (const other of S.monsters) {
        if (jumps <= 0) break;
        if (!other.dead && other !== m && Math.hypot(other.x - m.x, other.y - m.y) < 155 + lv * 8) {
          damage(other, sw.dmg * 0.18, "element");
          markElementFx(other, "lightning", lv, 0.45);
          zap(m.x, m.y, other.x, other.y, "#72f0ce", 0.14, 2);
          jumps--;
        }
      }
      float(m.x, m.y - m.r - 18, "雷剑导电", "#72f0ce", 0.65);
    }
  }

  function evolutionAuras(dt) {
    const p = S.p;
    if (!p?.evolved) return;
    tickEvolutionCooldowns(p, dt);

    if (p.evolved.fire5 && p.evoCd.fire <= 0) {
      p.evoCd.fire = 0.48;
      const radius = (145 + p.mods.fire * 15) * p.mods.range;
      for (const m of S.monsters) {
        if (!m.dead && Math.hypot(m.x - p.x, m.y - p.y) < radius + m.r) {
          m.burn = Math.max(m.burn, 16 + p.lv * 1.8 + p.mods.fire * 6);
          m.burnT = Math.max(m.burnT, 1.4);
          markElementFx(m, "fire", p.mods.fire + 1, 1.0);
          damage(m, p.atk * (0.22 + p.mods.fire * 0.025), "element");
        }
      }
      if (Math.random() < 0.36) particles(p.x, p.y, 14, "#ff6b32", 180);
    }

    if (p.evolved.ice5 && p.evoCd.ice <= 0) {
      p.evoCd.ice = 0.62;
      const radius = (170 + p.mods.ice * 13) * p.mods.range;
      for (const m of S.monsters) {
        if (!m.dead && Math.hypot(m.x - p.x, m.y - p.y) < radius + m.r) {
          m.slow = Math.max(m.slow, m.boss ? 0.5 : 1.25);
          if (!m.boss && Math.random() < 0.1 + p.mods.ice * 0.025) m.stun = Math.max(m.stun, 0.24);
          markElementFx(m, "ice", p.mods.ice + 1, 1.0);
        }
      }
    }

    if (p.evolved.lightning5 && p.evoCd.lightning <= 0) {
      p.evoCd.lightning = 1.15;
      const target = nearestEnemy(1200);
      if (target) {
        damage(target, p.atk * (0.9 + p.mods.lightning * 0.16), "element");
        markElementFx(target, "lightning", p.mods.lightning + 2, 0.85);
        zap(p.x, p.y - 180, target.x, target.y, "#f7d66f", 0.22, 4);
        let jumps = 4;
        for (const other of S.monsters) {
          if (jumps <= 0) break;
          if (!other.dead && other !== target && Math.hypot(other.x - target.x, other.y - target.y) < 210) {
            damage(other, p.atk * (0.34 + p.mods.lightning * 0.04), "element");
            markElementFx(other, "lightning", p.mods.lightning + 1, 0.65);
            zap(target.x, target.y, other.x, other.y, "#f7d66f", 0.17, 2.5);
            jumps--;
          }
        }
        float(target.x, target.y - target.r - 22, "天雷落点", "#f7d66f", 0.8);
      }
    }

    if (p.evolved.storm5 && p.evoCd.storm <= 0) {
      p.evoCd.storm = 0.42;
      const radius = (205 + p.mods.storm * 12) * p.mods.range;
      for (const m of S.monsters) {
        if (m.dead) continue;
        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const len = Math.max(1, Math.hypot(dx, dy));
        if (len < radius + m.r) {
          const pull = m.boss ? 2.2 : 8.5;
          m.x += dx / len * pull;
          m.y += dy / len * pull;
          m.slow = Math.max(m.slow, m.boss ? 0.22 : 0.7);
          markElementFx(m, "storm", p.mods.storm + 1, 0.7);
          if (canReact(m, "stormCore", 0.5)) damage(m, p.atk * (0.18 + p.mods.storm * 0.03), "element");
        }
      }
    }

    if (p.evolved.rain5 && p.evoCd.rain <= 0) {
      p.evoCd.rain = 1.05;
      heal(5 + p.lv * 0.8 + p.mods.rain * 2);
      shield(4 + p.mods.rain * 1.6);
      const x = clamp(p.x + rnd(-150, 150), 20, w - 20);
      const y = clamp(p.y + rnd(-105, 105), 20, h - 20);
      spawnDrop(Math.random() < 0.74 ? "exp" : "shield", x, y, 1);
      if (Math.random() < 0.28) addGold(1, x, y - 12);
      particles(x, y, 10, "#62dbff", 160);
    }

    if (p.evolved.sword5 && p.evoCd.sword <= 0) {
      p.evoCd.sword = 1.35;
      let hits = 0;
      for (const m of [...S.monsters].sort((a, b) => dist(p, a) - dist(p, b))) {
        if (hits >= 6) break;
        if (!m.dead && dist(p, m) < 760) {
          damage(m, 32 + p.lv * 6 + p.mods.sword * 18, "sword");
          zap(p.x + rnd(-60, 60), p.y - 160, m.x, m.y, "#72f0ce", 0.16, 3);
          hits++;
        }
      }
      if (hits) float(p.x, p.y - 72, "万剑归宗", "#72f0ce", 0.9);
    }
  }

  function update(dt) {
    S.t += dt;
    if (S.mode !== "playing") {
      updateFx(dt);
      return;
    }
    if (S.transition) {
      S.transition.time += dt;
      updateFx(dt);
      sync();
      if (S.transition.time >= S.transition.duration) {
        const next = S.transition.to;
        S.transition = null;
        say(`进入第 ${next} 关：${themeFor(next).name}`);
        if (S.pendingUpgrades > 0) openUpgrade();
      }
      return;
    }
    S.run += dt;
    updateMarketEvent(dt);
    if (market(dt)) return;
    move(dt);
    updateHazards(dt);
    updateDrops(dt);
    passive(dt);
    spawn(dt);
    bossSkills(dt);
    monsters(dt);
    skills(dt);
    shots(dt);
    enemyShots(dt);
    updateFx(dt);
    sync();
  }

  function move(dt) {
    const p = S.p;
    let mx = 0, my = 0;
    p.dodgeCd = Math.max(0, p.dodgeCd - dt);
    p.invuln = Math.max(0, p.invuln - dt);
    if (p.dodgeTime > 0) {
      p.x += p.dodgeVx * dt;
      p.y += p.dodgeVy * dt;
      p.dodgeTime = Math.max(0, p.dodgeTime - dt);
      p.x = clamp(p.x, p.r + 10, w - p.r - 10);
      p.y = clamp(p.y, p.r + 10, h - p.r - 10);
      p.hurt = Math.max(0, p.hurt - dt);
      return;
    }
    if (keys.has("KeyW") || keys.has("ArrowUp")) my--;
    if (keys.has("KeyS") || keys.has("ArrowDown")) my++;
    if (keys.has("KeyA") || keys.has("ArrowLeft")) mx--;
    if (keys.has("KeyD") || keys.has("ArrowRight")) mx++;
    if (S.joystick.active) {
      mx += S.joystick.dx;
      my += S.joystick.dy;
    } else if (S.pointer.active) {
      const dx = S.pointer.x - p.x, dy = S.pointer.y - p.y, l = Math.hypot(dx, dy);
      if (l > 18) { mx += dx / l; my += dy / l; }
    }
    const l = Math.hypot(mx, my);
    p.slow = Math.max(0, p.slow - dt);
    const slowRate = p.slow > 0 ? 0.56 : 1;
    if (l) {
      S.lastMove.x = mx / l;
      S.lastMove.y = my / l;
      p.x += S.lastMove.x * p.speed * slowRate * dt;
      p.y += S.lastMove.y * p.speed * slowRate * dt;
    }
    p.x = clamp(p.x, p.r + 10, w - p.r - 10);
    p.y = clamp(p.y, p.r + 10, h - p.r - 10);
    p.hurt = Math.max(0, p.hurt - dt);
    p.combo = Math.max(0, p.combo - dt * 0.2);
  }

  function updateDrops(dt) {
    const p = S.p;
    for (const d of S.drops) {
      d.life -= dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.vx *= 0.9;
      d.vy *= 0.9;
      const dx = p.x - d.x;
      const dy = p.y - d.y;
      const l = Math.hypot(dx, dy);
      const magnet = 135 + p.lv * 2.2;
      if (l < magnet && l > 0.01) {
        const pull = (1 - l / magnet) * 520;
        d.x += dx / l * pull * dt;
        d.y += dy / l * pull * dt;
      }
      if (l < p.r + d.r + 8) {
        applyDrop(d);
        d.life = 0;
      }
    }
    S.drops = S.drops.filter((d) => d.life > 0);
  }

  function applyDrop(d) {
    S.dropsCollected++;
    if (d.type === "exp") {
      addXp(d.value, d.x, d.y);
      float(d.x, d.y - 14, `+${d.value} 经验`, "#72f0ce");
    } else if (d.type === "heal") {
      heal(S.p.maxHp * 0.18);
      float(d.x, d.y - 14, "回血", "#ff6c32");
    } else if (d.type === "shield") {
      shield(S.p.maxHp * 0.22);
      float(d.x, d.y - 14, "护盾", "#7aa8ff");
    } else if (d.type === "crit") {
      S.p.buffCrit = Math.max(S.p.buffCrit, 10);
      float(d.x, d.y - 14, "暴击药水", "#d9a7ff");
      say("暴击率临时提升");
    } else if (d.type === "ult") {
      setUltimateCooldown(S.p, S.p.ultCd - 8);
      float(d.x, d.y - 14, "大招充能", "#ffdc72");
      say("大招充能");
    }
    particles(d.x, d.y, 12, d.color, 160);
  }

  function passive(dt) {
    const p = S.p;
    p.passive += dt;
    setUltimateCooldown(p, p.ultCd - dt);
    p.buffCrit = Math.max(0, p.buffCrit - dt);
    if (p.passive > 1) {
      if (p.role.type === "bond") { heal(4 + p.lv * 0.8); shield(5 + p.lv * 0.9); }
      destinyPulse(p);
      if (p.mods.regen > 0) heal(p.mods.regen);
      p.passive = 0;
    }
    if (p.role.type === "option" && p.hp / p.maxHp < 0.36 && p.shield < p.maxHp * 0.18) shield(p.maxHp * 0.22);
  }

  function spawn(dt) {
    const diff = difficultyScale();
    if (S.p.lv >= targetLv() && !S.bossActive && !S.bossDone) {
      spawnBoss();
      return;
    }
    if (!S.bossActive) {
      S.eliteClock += dt;
      if (S.eliteClock >= S.nextElite) {
        spawnEliteMonster();
        S.eliteClock = 0;
        S.nextElite = Math.max(8, 24 - S.stage * 1.8 - S.p.lv * 0.12 + rnd(-3, 4));
      }
    }
    const every = S.bossActive
      ? Math.max(0.34, (1.35 - S.stage * 0.055) / diff.spawn)
      : Math.max(0.13, (1.0 - S.p.lv * 0.035 - S.run * 0.0018) / diff.spawn);
    S.spawn += dt;
    while (S.spawn >= every) {
      const maxMonsters = S.bossActive
        ? Math.min(72, 30 + S.stage * 5 + Math.floor(S.run / 45))
        : Math.min(96, 46 + S.stage * 7 + Math.floor(S.p.lv / 2));
      if (S.monsters.length < maxMonsters) spawnMonster();
      S.spawn -= every;
    }
  }

  function bossSkills(dt) {
    for (const m of S.monsters) {
      if (!m.boss || m.dead) continue;
      m.skillCd -= dt;
      m.skillCd2 -= dt;
      m.pulseCd = Math.max(0, (m.pulseCd || 0) - dt);
      m.barrierMax = m.barrierMax || m.maxHp * 0.22;
      if (m.barrier < m.barrierMax && m.hp / m.maxHp < 0.92) {
        const regenRate = (m.enraged ? 0.022 : 0.012) * m.barrierMax;
        m.barrier = Math.min(m.barrierMax, m.barrier + regenRate * dt);
      }

      if (!m.enraged && m.hp / m.maxHp < 0.45) {
        m.enraged = true;
        m.speed *= 1.18;
        m.dmg *= 1.18;
        m.skillCd = 0.35;
        S.shake = Math.max(S.shake, 0.7);
        say(`${m.name} 进入狂暴`);
        float(m.x, m.y - m.r - 45, "狂暴：难度提升", "#ff415f", 1.5);
      }

      if (!m.phase70 && m.hp / m.maxHp < 0.7) {
        m.phase70 = true;
        m.barrier = Math.min(m.barrierMax, m.barrier + m.maxHp * 0.1);
        spawnBossMinions(m, 3 + Math.floor(m.bossTier / 2));
        castBossSkill(m);
        float(m.x, m.y - m.r - 52, "阶段二：护盾重启", "#72f0ce", 1.2);
      }

      if (!m.phase35 && m.hp / m.maxHp < 0.35) {
        m.phase35 = true;
        m.barrier = Math.min(m.barrierMax, m.barrier + m.maxHp * 0.18);
        spawnBossMinions(m, 5 + Math.floor(m.bossTier / 2));
        m.skillCd = 0.1;
        m.skillCd2 = 1.2;
        float(m.x, m.y - m.r - 52, "终局阶段：全力收割", "#ff415f", 1.2);
      }

      if (m.pulseCd <= 0) {
        bossAuraPulse(m);
        m.pulseCd = Math.max(2.0, 4.7 - m.bossTier * 0.15 - (m.enraged ? 0.75 : 0));
      }

      if (m.skillCd <= 0) {
        castBossSkill(m);
        m.skillCd = bossSkillCooldown(m);
      }

      if (m.skillCd2 <= 0) {
        spawnBossMinions(m, Math.min(6, 1 + Math.floor(m.bossTier / 2)));
        m.skillCd2 = Math.max(4.2, 8.2 - m.bossTier * 0.28);
      }
    }
  }

  function bossSkillCooldown(m) {
    const base = [0, 2.8, 2.55, 3.15, 3.4, 3.25, 2.25][m.bossKind] || 2.6;
    return Math.max(1.15, base - m.bossTier * 0.08 - (m.enraged ? 0.45 : 0));
  }

  function castBossSkill(m) {
    if (m.bossKind === 1) scytheRing(m);
    else if (m.bossKind === 2) essayBarrage(m);
    else if (m.bossKind === 3) highSmash(m);
    else if (m.bossKind === 4) marginCharge(m);
    else if (m.bossKind === 5) bearFreeze(m);
    else quantGrid(m);
  }

  function bossAuraPulse(m) {
    const d = Math.hypot(S.p.x - m.x, S.p.y - m.y);
    const radius = 128 + m.bossTier * 10;
    if (m.bossKind === 1 || m.bossKind === 3) {
      float(m.x, m.y - m.r - 30, "市场威压", m.color, 0.75);
      addHazard({
        type: "circle",
        x: m.x,
        y: m.y,
        r: radius + m.r,
        warn: 0.42,
        life: 0.18,
        color: m.color,
        dmg: m.dmg * 0.48,
        label: "市场威压",
        boss: m,
      });
    } else if (m.bossKind === 2 || m.bossKind === 6) {
      const base = Math.atan2(S.p.y - m.y, S.p.x - m.x);
      for (let i = -1; i <= 1; i++) {
        spawnEnemyShot(m.x, m.y, base + i * 0.22, 285 + m.bossTier * 12, 7, m.dmg * 0.36, m.color, 2.4, "压迫弹幕", m.bossKind === 6 ? "laser" : "paper");
      }
    } else if (m.bossKind === 4) {
      if (d < 260) {
        const a = Math.atan2(S.p.y - m.y, S.p.x - m.x);
        float(m.x, m.y - m.r - 30, "二次爆仓冲刺", "#ff415f", 0.75);
        addHazard({
          type: "line",
          x: m.x,
          y: m.y,
          angle: a,
          length: 380,
          width: 20,
          warn: 0.42,
          life: 0.16,
          color: "#ff415f",
          dmg: m.dmg * 0.42,
          label: "二次爆仓冲刺",
          boss: m,
          onFire: () => {
            if (m.dead) return;
            m.chargeVx = Math.cos(a) * (360 + m.bossTier * 20);
            m.chargeVy = Math.sin(a) * (360 + m.bossTier * 20);
            m.charge = 0.42;
          },
        });
      }
    } else if (m.bossKind === 5) {
      addHazard({
        type: "circle",
        x: m.x,
        y: m.y,
        r: 250,
        warn: 0.48,
        life: 0.2,
        color: "#9ee8ff",
        dmg: m.dmg * 0.38,
        label: "寒潮余波",
        slow: true,
        boss: m,
      });
    }
  }

  function scytheRing(m) {
    const radius = 150 + m.bossTier * 14;
    float(m.x, m.y - m.r - 28, "旋转镰刀！", "#ffdc72", 0.9);
    addHazard({
      type: "ring",
      x: m.x,
      y: m.y,
      inner: Math.max(35, m.r * 0.8),
      r: radius,
      warn: 0.72,
      life: 0.26,
      color: "#ffdc72",
      dmg: m.dmg * 1.25,
      label: "旋转镰刀",
      boss: m,
    });
  }

  function essayBarrage(m) {
    const count = Math.min(20, 7 + m.bossTier * 2);
    const base = Math.atan2(S.p.y - m.y, S.p.x - m.x);
    float(m.x, m.y - m.r - 28, "小作文弹幕！", "#ffb8c5", 0.9);
    addHazard({
      type: "cone",
      x: m.x,
      y: m.y,
      r: 420 + m.bossTier * 16,
      angle: base,
      spread: 1.35,
      warn: 0.52,
      life: 0.16,
      color: "#ffb8c5",
      dmg: 0,
      label: "小作文弹幕",
      boss: m,
      onFire: () => {
        if (m.dead) return;
        for (let i = 0; i < count; i++) {
          const spread = (i / Math.max(1, count - 1) - 0.5) * 1.25;
          spawnEnemyShot(m.x, m.y, base + spread, 235 + m.bossTier * 16, 8, m.dmg * 0.58, m.color, 3.1, "小作文", "paper");
        }
      },
    });
  }

  function highSmash(m) {
    const x = S.p.x + rnd(-30, 30);
    const y = S.p.y + rnd(-30, 30);
    const radius = 84 + m.bossTier * 7;
    float(x, y - 20, "高位砸盘！", "#ff986b", 0.95);
    addHazard({
      type: "circle",
      x,
      y,
      r: radius,
      warn: 0.86,
      life: 0.22,
      color: "#ff986b",
      dmg: m.dmg * 1.55,
      label: "高位砸盘",
      boss: m,
      onFire: () => {
        if (!m.dead) spawnBossMinions(m, 1 + Math.floor(m.bossTier / 3), 8);
      },
    });
  }

  function marginCharge(m) {
    const a = Math.atan2(S.p.y - m.y, S.p.x - m.x);
    const speed = 430 + m.bossTier * 24;
    float(m.x, m.y - m.r - 28, "爆仓冲撞！", "#ff415f", 0.9);
    addHazard({
      type: "line",
      x: m.x,
      y: m.y,
      angle: a,
      length: 520 + m.bossTier * 18,
      width: 28,
      warn: 0.62,
      life: 0.18,
      color: "#ff415f",
      dmg: m.dmg * 0.72,
      label: "爆仓冲撞",
      boss: m,
      onFire: () => {
        if (m.dead) return;
        m.chargeVx = Math.cos(a) * speed;
        m.chargeVy = Math.sin(a) * speed;
        m.charge = 0.7 + Math.min(0.35, m.bossTier * 0.03);
      },
    });
  }

  function bearFreeze(m) {
    const radius = 210 + m.bossTier * 16;
    float(m.x, m.y - m.r - 28, "熊市寒潮！", "#9ee8ff", 1);
    addHazard({
      type: "circle",
      x: m.x,
      y: m.y,
      r: radius,
      warn: 0.78,
      life: 0.28,
      color: "#9ee8ff",
      dmg: m.dmg * 1.1,
      label: "熊市寒潮",
      slow: true,
      boss: m,
      onFire: () => { if (!m.dead) S.p.slow = Math.max(S.p.slow, 1.2); },
    });
  }

  function quantGrid(m) {
    const count = Math.min(16, 6 + m.bossTier);
    float(m.x, m.y - m.r - 28, "量化矩阵！", "#72f0ce", 0.9);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + S.t * 0.2;
      addHazard({
        type: "line",
        x: m.x,
        y: m.y,
        angle: a,
        length: Math.max(w, h) * 0.9,
        width: 12,
        warn: 0.5,
        life: 0.16,
        color: "#72f0ce",
        dmg: m.dmg * 0.62,
        label: "量化矩阵",
        boss: m,
      });
    }
  }

  function spawnBossMinions(boss, count, forcedIndex = null) {
    for (let i = 0; i < count; i++) {
      const index = forcedIndex ?? (boss.bossKind === 2 ? 6 : boss.bossKind === 4 ? 7 : boss.bossKind === 5 ? 5 : Math.floor(rnd(0, mobs.length)));
      const tpl = mobs[index % mobs.length];
      const a = rnd(0, Math.PI * 2);
      const r = boss.r + rnd(70, 130);
      const diff = difficultyScale();
      const hp = (88 + S.p.lv * 7 + boss.bossTier * 32) * tpl[4] * diff.hp;
      S.monsters.push({
        id: ++id,
        name: tpl[0],
        badge: tpl[1],
        tag: tpl[2],
        color: tpl[3],
        x: clamp(boss.x + Math.cos(a) * r, 20, w - 20),
        y: clamp(boss.y + Math.sin(a) * r, 20, h - 20),
        r: rnd(13, 17) * tpl[6],
        hp,
        maxHp: hp,
        speed: (66 + S.p.lv * 1.8 + boss.bossTier * 4.8) * tpl[5] * diff.speed,
        dmg: (12 + S.p.lv * 1.1 + boss.bossTier * 3.8) * tpl[6] * diff.dmg,
        wobble: rnd(0, 7),
        rc: 0,
        sc: 0,
        touch: 0.5,
        specialCd: rnd(1.4, 3.4),
        burn: 0,
        burnT: 0,
        stun: 0,
        slow: 0,
        flash: 0,
        mark: 0,
        first: true,
        dragon: true,
        dead: false,
        boss: false,
      });
    }
  }

  function castMonsterSkill(m) {
    const base = m.baseName || m.name;
    if (m.tag === "冲刺面" || base.includes("冲刺") || base.includes("跳水")) {
      const a = Math.atan2(S.p.y - m.y, S.p.x - m.x);
      m.chargeVx = Math.cos(a) * (300 + S.stage * 16 + S.p.lv * 4);
      m.chargeVy = Math.sin(a) * (300 + S.stage * 16 + S.p.lv * 4);
      m.charge = 0.38;
      float(m.x, m.y - m.r - 18, "冲刺", "#ff986b", 0.65);
    } else if (m.tag === "特效面" || base.includes("特效")) {
      const roll = Math.random();
      if (roll < 0.34) {
        S.p.slow = Math.max(S.p.slow, 1.2);
        float(S.p.x, S.p.y - 42, "眩光减速", "#d9a7ff", 0.75);
      } else if (roll < 0.67) {
        spawnEnemyShot(m.x, m.y, Math.atan2(S.p.y - m.y, S.p.x - m.x), 260, 9, m.dmg * 0.52, m.color, 2.4, "特效弹", "orb");
      } else {
        particles(m.x, m.y, 28, m.color, 220);
        if (Math.hypot(S.p.x - m.x, S.p.y - m.y) < 115) bossDamage(m.dmg * 0.55, m, "特效爆闪", true);
      }
    } else if (m.tag === "恢复面" || base.includes("回血")) {
      let healed = 0;
      for (const other of S.monsters) {
        if (!other.dead && other !== m && !other.boss && Math.hypot(other.x - m.x, other.y - m.y) < 170) {
          other.hp = Math.min(other.maxHp, other.hp + other.maxHp * 0.12);
          healed++;
        }
      }
      m.hp = Math.min(m.maxHp, m.hp + m.maxHp * 0.18);
      particles(m.x, m.y, 24, "#23c878", 190);
      if (healed > 0) float(m.x, m.y - m.r - 18, `恢复 ${healed}`, "#72f0ce", 0.8);
    } else if (m.tag === "消息面" && Math.random() < 0.45) {
      const a = Math.atan2(S.p.y - m.y, S.p.x - m.x);
      spawnEnemyShot(m.x, m.y, a, 235, 7, m.dmg * 0.42, m.color, 2.5, "小作文", "paper");
    }
  }

  function castEliteSkill(m) {
    const base = m.baseName || m.name;
    if (m.tag === "消息面") {
      const a = Math.atan2(S.p.y - m.y, S.p.x - m.x);
      for (let i = -1; i <= 1; i++) {
        spawnEnemyShot(m.x, m.y, a + i * 0.18, 245, 7, m.dmg * 0.42, m.color, 2.5, "精英小作文", "paper");
      }
      float(m.x, m.y - m.r - 22, "精英弹幕", "#ffb8c5", 0.8);
    } else if (base.includes("跳水")) {
      const a = Math.atan2(S.p.y - m.y, S.p.x - m.x);
      m.chargeVx = Math.cos(a) * (360 + S.stage * 18);
      m.chargeVy = Math.sin(a) * (360 + S.stage * 18);
      m.charge = 0.45;
      float(m.x, m.y - m.r - 22, "跳水冲刺", "#9ee8ff", 0.8);
    } else if (base.includes("套牢")) {
      if (Math.hypot(S.p.x - m.x, S.p.y - m.y) < 180) {
        S.p.slow = Math.max(S.p.slow, 1.4);
        float(S.p.x, S.p.y - 42, "套牢减速", "#ffdc72", 0.8);
      }
    } else if (base.includes("杠杆")) {
      particles(m.x, m.y, 24, m.color, 220);
      if (Math.hypot(S.p.x - m.x, S.p.y - m.y) < 130) bossDamage(m.dmg * 0.7, m, "杠杆震荡");
    } else {
      m.stun = Math.max(0, m.stun - 0.2);
      m.speed *= 1.01;
      particles(m.x, m.y, 16, m.color, 180);
    }
  }

  function moveMonster(m, dx, dy, speed, dt) {
    const len = Math.max(0.001, Math.hypot(dx, dy));
    m.x = clamp(m.x + dx / len * speed * dt, m.r, w - m.r);
    m.y = clamp(m.y + dy / len * speed * dt, m.r, h - m.r);
  }

  function specialMonsterUpdate(m, dt) {
    if (!m.aiType || m.aiType === "normal" || m.boss || m.stun > 0) return false;
    const p = S.p;
    const dx = p.x - m.x;
    const dy = p.y - m.y;
    const d = Math.max(0.001, Math.hypot(dx, dy));
    const slowRate = m.slow > 0 ? 0.42 : 1;

    if (m.aiType === "gold") {
      moveMonster(m, -dx, -dy, m.speed * slowRate, dt);
      return true;
    }

    if (m.aiType === "bomber") {
      if (d < (m.explodeRadius || 86) * 0.72) {
        explodeMonster(m, true);
        return true;
      }
      return false;
    }

    if (m.aiType === "ranged") {
      m.shootCd = Math.max(0, (m.shootCd || 0) - dt);
      const range = m.keepRange || 260;
      if (d < range * 0.72) {
        moveMonster(m, -dx, -dy, m.speed * 1.1 * slowRate, dt);
      } else if (d > range * 1.18) {
        moveMonster(m, dx, dy, m.speed * 0.72 * slowRate, dt);
      } else {
        moveMonster(m, -dy, dx, m.speed * 0.42 * slowRate, dt);
      }
      if (m.shootCd <= 0) {
        const base = Math.atan2(dy, dx);
        const spread = S.stage >= 3 ? 0.16 : 0;
        spawnEnemyShot(m.x, m.y, base, 245 + S.stage * 10, 6, m.dmg * 0.48, m.color, 2.6, "远程割肉", "paper");
        if (spread) {
          spawnEnemyShot(m.x, m.y, base - spread, 225 + S.stage * 8, 5, m.dmg * 0.34, m.color, 2.4, "远程割肉", "paper");
          spawnEnemyShot(m.x, m.y, base + spread, 225 + S.stage * 8, 5, m.dmg * 0.34, m.color, 2.4, "远程割肉", "paper");
        }
        m.shootCd = Math.max(1.05, 2.35 - S.stage * 0.12 - S.p.lv * 0.018);
      }
      return true;
    }

    if (m.aiType === "charger") {
      m.chargeCd = Math.max(0, (m.chargeCd || 0) - dt);
      if (m.chargeWarn > 0) {
        m.chargeWarn = Math.max(0, m.chargeWarn - dt);
        if (m.chargeWarn <= 0) {
          const a = m.chargeAim ?? Math.atan2(dy, dx);
          const speed = 410 + S.stage * 18 + S.p.lv * 5;
          m.chargeVx = Math.cos(a) * speed;
          m.chargeVy = Math.sin(a) * speed;
          m.charge = 0.48;
          m.chargeCd = Math.max(1.65, 3.2 - S.stage * 0.12);
          particles(m.x, m.y, 16, "#ff986b", 210);
        }
        return true;
      }
      if (m.chargeCd <= 0 && d < 520) {
        m.chargeAim = Math.atan2(dy, dx);
        m.chargeWarn = 0.48;
        float(m.x, m.y - m.r - 18, "冲锋预警", "#ff986b", 0.5);
        return true;
      }
    }

    return false;
  }

  function monsters(dt) {
    const p = S.p;
    for (const m of S.monsters) {
      if (m.dead) continue;
      m.rc = Math.max(0, m.rc - dt);
      m.sc = Math.max(0, m.sc - dt);
      m.touch = Math.max(0, m.touch - dt);
      m.specialCd = Math.max(0, (m.specialCd || 0) - dt);
      m.taunt = Math.max(0, (m.taunt || 0) - dt);
      if (m.elite) m.eliteCd = Math.max(0, m.eliteCd - dt);
      m.flash = Math.max(0, m.flash - dt);
      m.stun = Math.max(0, m.stun - dt);
      m.slow = Math.max(0, m.slow - dt);
      tickElementFx(m, dt);
      if (m.burnT > 0) {
        damage(m, m.burn * dt, "burn");
        m.burnT -= dt;
        if (m.dead) continue;
      }
      if (m.elite && m.eliteCd <= 0) {
        castEliteSkill(m);
        m.eliteCd = Math.max(2.1, 4.5 - S.stage * 0.18);
      }
      if (!m.boss && m.specialCd <= 0) {
        castMonsterSkill(m);
        m.specialCd = Math.max(1.6, 4.6 - S.stage * 0.16 - S.p.lv * 0.025);
      }
      const specialMoved = specialMonsterUpdate(m, dt);
      if (m.dead) continue;
      if (m.charge > 0) {
        m.x = clamp(m.x + m.chargeVx * dt, m.r, w - m.r);
        m.y = clamp(m.y + m.chargeVy * dt, m.r, h - m.r);
        m.charge = Math.max(0, m.charge - dt);
      } else
      if (!specialMoved && m.stun <= 0) {
        const dx = p.x - m.x, dy = p.y - m.y, l = Math.max(0.001, Math.hypot(dx, dy));
        const wob = Math.sin(S.t * 4 + m.wobble) * 0.35;
        const slowRate = m.slow > 0 ? 0.42 : 1;
        m.x += (dx / l - dy / l * wob) * m.speed * slowRate * dt;
        m.y += (dy / l + dx / l * wob) * m.speed * slowRate * dt;
      }
      if (dist(p, m) < p.r + m.r && m.touch <= 0) {
        hitPlayer(m);
        m.touch = m.boss ? 0.55 : 0.72;
      }
    }
    S.monsters = S.monsters.filter((m) => !m.dead);
  }

  function skills(dt) {
    const p = S.p;
    const o = orbitStats();
    const sw = swordStats();
    S.angle += o.speed * dt;
    S.swordAngle -= (sw.speed || 0) * dt;

    if (o.mode !== "orbit") {
      p.fireCd -= dt;
      if (p.fireCd <= 0) {
        castRoleAttack(o);
        p.fireCd = o.cooldown;
      }
    } else {
      for (let i = 0; i < o.count; i++) {
        const a = S.angle + i / o.count * Math.PI * 2;
        const wpn = { x: p.x + Math.cos(a) * o.orbit, y: p.y + Math.sin(a) * o.orbit, r: o.radius };
        for (const m of S.monsters) {
          if (!m.dead && m.rc <= 0 && dist(wpn, m) < wpn.r + m.r) {
            m.rc = 0.18 * p.mods.hitCd;
            damage(m, roleHit(m, o.dmg));
          }
        }
      }
    }

    if (sw.on) {
      for (let i = 0; i < sw.count; i++) {
        const a = S.swordAngle + i / sw.count * Math.PI * 2;
        const b = { x: p.x + Math.cos(a) * sw.orbit, y: p.y + Math.sin(a) * sw.orbit, r: 24 };
        for (const m of S.monsters) {
          if (!m.dead && m.sc <= 0 && dist(b, m) < b.r + m.r) {
            m.sc = 0.34;
            damage(m, sw.dmg, "sword");
            swordComboHit(m, sw);
          }
        }
      }
    }
    evolutionAuras(dt);
  }

  function castRoleAttack(o) {
    if (o.mode === "flame") {
      castFlame(o);
    } else if (o.mode === "pulse") {
      castPulse(o);
    } else if (o.mode === "beam") {
      castBeam(o);
    } else {
      fireProjectiles(o);
    }
  }

  function nearestEnemy(maxRange = 980) {
    let best = null;
    let bestD = maxRange;
    for (const m of S.monsters) {
      if (m.dead) continue;
      const d = dist(S.p, m);
      if (d < bestD) {
        best = m;
        bestD = d;
      }
    }
    return best;
  }

  function lineDistance(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy || 1;
    const t = clamp(((px - x1) * dx + (py - y1) * dy) / len2, 0, 1);
    const x = x1 + dx * t;
    const y = y1 + dy * t;
    return Math.hypot(px - x, py - y);
  }

  function castFlame(o) {
    const p = S.p;
    const target = nearestEnemy(o.range);
    const a = target ? Math.atan2(target.y - p.y, target.x - p.x) : Math.atan2(S.lastMove.y, S.lastMove.x);
    const range = o.range;
    const spread = o.spread + Math.min(0.26, (o.count - 1) * 0.045);
    const dmgBoost = 1 + Math.max(0, o.count - 1) * 0.1;
    let hits = 0;
    for (const m of S.monsters) {
      if (m.dead) continue;
      const dx = m.x - p.x;
      const dy = m.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d > range + m.r) continue;
      if (Math.abs(angleDiff(Math.atan2(dy, dx), a)) > spread / 2) continue;
      const falloff = 1 - Math.min(0.35, d / range * 0.28);
      if (o.burn) {
        m.burn = Math.max(m.burn, 8 + p.lv * 1.7);
        m.burnT = Math.max(m.burnT, 1.5);
      }
      damage(m, roleHit(m, o.dmg * falloff * dmgBoost), "shot");
      hits++;
    }
    for (let i = 0; i < 12; i++) {
      const fa = a + rnd(-spread / 2, spread / 2);
      const fd = rnd(35, range * 0.75);
      particles(p.x + Math.cos(fa) * fd, p.y + Math.sin(fa) * fd, 1, o.color, 95);
    }
    zap(p.x, p.y, p.x + Math.cos(a) * range * 0.72, p.y + Math.sin(a) * range * 0.72, o.color, 0.08, 5);
    if (hits) S.shake = Math.max(S.shake, 0.08);
  }

  function castPulse(o) {
    const p = S.p;
    const range = o.range + Math.max(0, o.count - 1) * 10 * p.mods.range;
    const dmgBoost = 1 + Math.max(0, o.count - 1) * 0.08;
    let hits = 0;
    for (const m of S.monsters) {
      if (m.dead) continue;
      const dx = m.x - p.x;
      const dy = m.y - p.y;
      const d = Math.max(1, Math.hypot(dx, dy));
      if (d > range + m.r) continue;
      m.x += dx / d * (m.boss ? 5 : 18);
      m.y += dy / d * (m.boss ? 5 : 18);
      m.slow = Math.max(m.slow, m.boss ? 0.24 : 0.75);
      damage(m, roleHit(m, o.dmg * dmgBoost * (1 - Math.min(0.3, d / range * 0.22))), "shot");
      hits++;
    }
    particles(p.x, p.y, 34, o.color, 220);
    float(p.x, p.y - 54, o.label, o.color, 0.55);
    if (hits) S.shake = Math.max(S.shake, 0.14);
  }

  function castBeam(o) {
    const p = S.p;
    const target = nearestEnemy(o.range);
    if (!target) return;
    const a = Math.atan2(target.y - p.y, target.x - p.x);
    const x2 = p.x + Math.cos(a) * o.range;
    const y2 = p.y + Math.sin(a) * o.range;
    const beamWidth = (18 + Math.max(0, o.count - 1) * 3) * p.mods.range;
    const dmgBoost = 1 + Math.max(0, o.count - 1) * 0.08;
    let hits = 0;
    for (const m of S.monsters) {
      if (m.dead) continue;
      const along = (m.x - p.x) * Math.cos(a) + (m.y - p.y) * Math.sin(a);
      if (along < -m.r || along > o.range + m.r) continue;
      if (lineDistance(m.x, m.y, p.x, p.y, x2, y2) <= m.r + beamWidth) {
        damage(m, roleHit(m, o.dmg * dmgBoost * (hits === 0 ? 1 : 0.78)), "shot");
        hits++;
        if (hits >= o.pierce) break;
      }
    }
    zap(p.x, p.y, x2, y2, o.color, 0.14, 4);
    if (hits) S.shake = Math.max(S.shake, 0.1);
  }

  function fireProjectiles(o) {
    const p = S.p;
    if (o.mode === "mine") {
      for (let i = 0; i < Math.max(1, Math.min(4, o.count)); i++) {
        const a = S.t * 1.7 + i / Math.max(1, o.count) * Math.PI * 2;
        const offset = i === 0 ? 0 : 26 + i * 8;
        S.shots.push({
          x: clamp(p.x - Math.cos(a) * offset, 18, w - 18),
          y: clamp(p.y - Math.sin(a) * offset, 18, h - 18),
          vx: 0,
          vy: 0,
          r: o.radius + 3,
          dmg: o.dmg,
          color: o.color,
          shape: o.shape,
          mode: o.mode,
          pierce: 1,
          splash: o.splash || 76,
          slow: o.slow,
          burn: o.burn,
          life: 5.2,
          arm: 0.32,
          angle: 0,
        });
      }
      return;
    }

    const target = nearestEnemy(o.range || 980);
    if (!target) return;
    const base = Math.atan2(target.y - p.y, target.x - p.x);
    const spread = Math.min(0.55, 0.12 + o.count * 0.06);
    for (let i = 0; i < o.count; i++) {
      const offset = o.count === 1 ? 0 : (i / (o.count - 1) - 0.5) * spread;
      const a = base + offset;
      const life = o.mode === "grenade" ? 1.05 : o.mode === "boomerang" ? 1.55 : o.shape === "laser" ? 0.72 : 1.8;
      S.shots.push({
        x: p.x + Math.cos(a) * (p.r + 8),
        y: p.y + Math.sin(a) * (p.r + 8),
        vx: Math.cos(a) * o.speed,
        vy: Math.sin(a) * o.speed,
        r: o.radius,
        dmg: o.dmg,
        color: o.color,
        shape: o.shape,
        mode: o.mode,
        pierce: o.pierce,
        splash: o.splash,
        slow: o.slow,
        burn: o.burn,
        life,
        maxLife: life,
        age: 0,
        returnAt: o.mode === "boomerang" ? life * 0.46 : 0,
        blastOnExpire: o.mode === "grenade",
        homing: o.mode === "homing",
        hitIds: o.mode === "boomerang" ? new Set() : null,
        angle: a,
      });
    }
  }

  function updatePlayerShot(s, dt) {
    s.age = (s.age || 0) + dt;
    if (s.homing) {
      const target = nearestEnemy(720);
      if (target) {
        const desired = Math.atan2(target.y - s.y, target.x - s.x);
        const current = Math.atan2(s.vy, s.vx);
        const next = current + clamp(angleDiff(desired, current), -4.2 * dt, 4.2 * dt);
        const speed = Math.max(80, Math.hypot(s.vx, s.vy));
        s.vx = Math.cos(next) * speed;
        s.vy = Math.sin(next) * speed;
      }
    }
    if (s.mode === "boomerang" && s.age >= s.returnAt) {
      if (!s.returning) {
        s.returning = true;
        if (s.hitIds) s.hitIds.clear();
      }
      const p = S.p;
      const dx = p.x - s.x;
      const dy = p.y - s.y;
      const len = Math.max(1, Math.hypot(dx, dy));
      const speed = Math.max(360, Math.hypot(s.vx, s.vy) * 0.98);
      s.vx = dx / len * speed;
      s.vy = dy / len * speed;
      if (len < p.r + s.r + 10) s.life = 0;
    }
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.life -= dt;
    if (s.arm > 0) s.arm = Math.max(0, s.arm - dt);
    s.angle = s.mode === "mine" ? S.t * 2.2 : Math.atan2(s.vy, s.vx);
  }

  function explodeShot(s) {
    if (s.exploded || !s.splash) return;
    s.exploded = true;
    particles(s.x, s.y, 30, s.color || "#ff986b", 260);
    for (const m of S.monsters) {
      if (!m.dead && Math.hypot(m.x - s.x, m.y - s.y) < s.splash + m.r) {
        damage(m, roleHit(m, s.dmg), "blast");
      }
    }
  }

  function shots(dt) {
    for (const s of S.shots) {
      updatePlayerShot(s, dt);
      if (s.life <= 0) {
        if (s.blastOnExpire) explodeShot(s);
        continue;
      }
      if (s.arm > 0) continue;

      for (const m of S.monsters) {
        if (m.dead || s.life <= 0) continue;
        if (Math.hypot(m.x - s.x, m.y - s.y) < m.r + s.r) {
          if (s.hitIds) {
            if (s.hitIds.has(m.id)) continue;
            s.hitIds.add(m.id);
          }
          if (s.splash) {
            blast(m.x, m.y, s.splash, roleHit(m, s.dmg));
            s.life = 0;
          } else {
            if (s.slow) {
              m.stun = Math.max(m.stun, 0.12);
              m.slow = Math.max(m.slow, 1.4);
              markElementFx(m, "ice", 1, 1.0);
            }
            if (s.burn) {
              m.burn = Math.max(m.burn, 10 + S.p.lv * 2);
              m.burnT = Math.max(m.burnT, 1.8);
              markElementFx(m, "fire", 1, 1.5);
            }
            damage(m, roleHit(m, s.dmg), "shot");
            s.pierce -= 1;
            if (s.pierce <= 0) s.life = 0;
          }
        }
      }
    }
    S.shots = S.shots.filter((s) => s.life > 0 && s.x > -120 && s.x < w + 120 && s.y > -120 && s.y < h + 120);
  }

  function enemyShots(dt) {
    for (const s of S.enemyShots) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= dt;
      s.angle = Math.atan2(s.vy, s.vx);
      if (s.life <= 0) continue;
      if (Math.hypot(S.p.x - s.x, S.p.y - s.y) < S.p.r + s.r) {
        bossDamage(s.dmg, { x: s.x, y: s.y, color: s.color, boss: false }, s.label, s.shape === "ice");
        s.life = 0;
      }
    }
    S.enemyShots = S.enemyShots.filter((s) => s.life > 0 && s.x > -140 && s.x < w + 140 && s.y > -140 && s.y < h + 140);
  }

  function normalizeUltimateCooldown(p) {
    if (!p || !Number.isFinite(p.ultCd) || p.ultCd < 0.02) {
      if (p) p.ultCd = 0;
      return 0;
    }
    p.ultCd = Math.max(0, p.ultCd);
    return p.ultCd;
  }

  function setUltimateCooldown(p, seconds) {
    if (!p) return;
    p.ultCd = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    normalizeUltimateCooldown(p);
  }

  function shortenUltimateCooldown(p, ratio) {
    if (!p) return;
    p.mods.ult *= ratio;
    if (p.ultCd > 0.5) p.ultCd = Math.max(0.5, p.ultCd * ratio);
    normalizeUltimateCooldown(p);
  }

  function ultimateCooling(p) {
    return normalizeUltimateCooldown(p) > 0;
  }

  function ultimateCooldownLabel(seconds) {
    if (seconds <= 0) return "准备";
    return seconds < 1 ? `${seconds.toFixed(1)}s` : `${Math.ceil(seconds)}s`;
  }

  function ultimateCooldown() {
    return Math.max(7, (18 - S.p.lv * 0.25) * S.p.mods.ult);
  }

  function useUltimate() {
    const p = S.p;
    if (!p || S.mode !== "playing") return;
    if (ultimateCooling(p)) {
      sync();
      return;
    }
    const o = orbitStats();
    setUltimateCooldown(p, ultimateCooldown());
    S.shake = Math.max(S.shake, 0.9);

    if (["shot", "homing", "grenade", "boomerang", "mine"].includes(o.mode)) {
      const count = 18 + Math.floor(p.lv / 2) + p.mods.count * 2;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const life = o.mode === "grenade" ? 1.05 : o.mode === "boomerang" ? 1.45 : 1.35;
        S.shots.push({
          x: p.x + Math.cos(a) * (p.r + 10),
          y: p.y + Math.sin(a) * (p.r + 10),
          vx: o.mode === "mine" ? 0 : Math.cos(a) * (o.speed * 0.92),
          vy: o.mode === "mine" ? 0 : Math.sin(a) * (o.speed * 0.92),
          r: o.radius + 2,
          dmg: o.dmg * 1.25,
          color: o.color,
          shape: o.shape,
          mode: o.mode,
          pierce: Math.max(2, o.pierce),
          splash: o.splash,
          slow: o.slow,
          burn: o.burn,
          life: o.mode === "mine" ? 4.5 : life,
          maxLife: life,
          age: 0,
          returnAt: o.mode === "boomerang" ? life * 0.45 : 0,
          blastOnExpire: o.mode === "grenade",
          homing: o.mode === "homing",
          hitIds: o.mode === "boomerang" ? new Set() : null,
          arm: o.mode === "mine" ? 0.18 : 0,
          angle: a,
        });
      }
      particles(p.x, p.y, 80, o.color, 360);
      say(`${o.label}·全屏爆发`);
      return;
    }

    const radius = 180 * p.mods.range + p.lv * 5;
    for (const m of S.monsters) {
      if (!m.dead && Math.hypot(m.x - p.x, m.y - p.y) < radius + m.r) {
        m.stun = Math.max(m.stun, 0.55);
        damage(m, roleHit(m, p.atk * 4.2 + p.lv * 12), "ultimate");
      }
    }
    particles(p.x, p.y, 100, o.color, 420);
    float(p.x, p.y - 70, `${o.label}·清场`, "#ffdc72", 1.2);
    say(`${o.label}·清场`);
  }

  function updateFx(dt) {
    S.shake = Math.max(0, S.shake - dt * 1.75);
    S.pulse = Math.max(0, S.pulse - dt * 0.9);
    S.streakFlash = Math.max(0, S.streakFlash - dt);
    if (S.banner) {
      S.banner.time -= dt;
      if (S.banner.time <= 0) S.banner = null;
    }
    for (const p of S.parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.94; p.vy *= 0.94; p.life -= dt; }
    S.parts = S.parts.filter((p) => p.life > 0);
    for (const b of S.beams) b.life -= dt;
    S.beams = S.beams.filter((b) => b.life > 0);
    for (const f of S.texts) { f.y += f.vy * dt; f.life -= dt; }
    S.texts = S.texts.filter((f) => f.life > 0);
    if (toastTime > 0) {
      toastTime -= dt;
      if (toastTime <= 0) toast.classList.remove("show");
    }
  }

  function attackSummary(o) {
    if (o.mode === "orbit") return `${o.count} 个环绕体，伤害 ${Math.round(o.dmg)}。${o.text}`;
    if (o.mode === "flame") return `扇形喷火，范围 ${Math.round(o.range)}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
    if (o.mode === "pulse") return `范围脉冲，半径 ${Math.round(o.range)}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
    if (o.mode === "beam") return `穿透光束，距离 ${Math.round(o.range)}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
    if (o.mode === "grenade") return `${o.count} 枚榴弹，爆炸 ${Math.round(o.splash)}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
    if (o.mode === "boomerang") return `${o.count} 个回旋武器，穿透 ${o.pierce}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
    if (o.mode === "mine") return `${o.count} 个陷阱，爆炸 ${Math.round(o.splash)}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
    if (o.mode === "homing") return `${o.count} 发追踪弹，伤害 ${Math.round(o.dmg)}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
    return `${o.count} 发连射，伤害 ${Math.round(o.dmg)}，冷却 ${o.cooldown.toFixed(2)} 秒。${o.text}`;
  }

  function sync() {
    const p = S.p;
    if (!p) return;
    const o = orbitStats();
    const sw = swordStats();
    const boss = bosses[(S.stage - 1) % bosses.length] || [`牛熊轮回 ${S.stage}`, "轮", "#ffb23f", "", "牛熊轮回"];
    ui.avatar.src = src(p.role);
    ui.role.textContent = p.role.name;
    ui.cls.textContent = `${p.role.destiny.name} · 护盾 ${Math.floor(p.shield)} · 压力 x${difficultyScale().hp.toFixed(1)}`;
    ui.hp.style.width = `${clamp(p.hp / p.maxHp * 100, 0, 100)}%`;
    ui.xp.style.width = `${clamp(p.xp / p.next * 100, 0, 100)}%`;
    ui.lv.textContent = p.lv;
    ui.st.textContent = S.stage;
    ui.xpText.textContent = `${Math.floor(p.xp)}/${p.next}`;
    if (ui.gold) ui.gold.textContent = p.gold || 0;
    ui.kills.textContent = S.kills;
    ui.skillIcon.textContent = p.role.badge;
    ui.skillTitle.textContent = `${o.label} Lv.${p.lv}`;
    ui.skillInfo.textContent = `${attackSummary(o)} 玩法：${p.role.guide}`;
    const elements = [
      p.mods.fire ? `火${p.mods.fire}` : "",
      p.mods.ice ? `冰${p.mods.ice}` : "",
      p.mods.lightning ? `雷${p.mods.lightning}` : "",
      p.mods.storm ? `风${p.mods.storm}` : "",
      p.mods.rain ? `雨${p.mods.rain}` : "",
      p.mods.sword ? `剑${p.mods.sword}` : "",
    ].filter(Boolean).join(" / ");
    const flowText = flowSummary(p, elements);
    ui.swordTitle.textContent = sw.on ? `副武器飞剑 Lv.${sw.lv}` : "技能树：元素分支";
    ui.swordInfo.textContent = sw.on
      ? `${sw.count} 把飞剑，外圈自动斩击。${flowText}`
      : `每 ${SKILL_INTERVAL} 级选择火、冰、雷、风、雨或飞剑分支；金币可刷新三选一。${flowText}`;
    ui.bossTitle.textContent = `第 ${S.stage} 关 Boss：${boss[0]}`;
    const latestBossSkill = p.bossSkills.length ? `已获得：${p.bossSkills[p.bossSkills.length - 1]}。` : "";
    if (S.event) {
      ui.bossInfo.textContent = `市场事件：${S.event.title}（${Math.ceil(S.event.time)}s）${S.event.text}`;
    } else {
      ui.bossInfo.textContent = S.bossActive ? `${boss[4]} 进行中，注意走位。` : `升到 ${targetLv()} 级触发 Boss 战。${latestBossSkill}`;
    }
    if (S.mode === "playing") {
      ui.status.textContent = S.event ? `${S.event.short} ${Math.ceil(S.event.time)}s` : S.bossActive ? "Boss战" : p.streak >= 12 ? `连杀 ${p.streak}` : "战斗中";
    }
    const ultCooling = ultimateCooling(p);
    if (ultBtn) ultBtn.disabled = S.mode !== "playing" || ultCooling;
    if (ultCooling) {
      ultBtn.classList.add("is-cooling");
      ui.ultText.textContent = ultimateCooldownLabel(p.ultCd);
    } else {
      ultBtn.classList.remove("is-cooling");
      ui.ultText.textContent = "准备";
    }
    if (dodgeBtn && dodgeText) {
      if (p.dodgeCd > 0) {
        dodgeBtn.classList.add("is-cooling");
        dodgeText.textContent = `${Math.ceil(p.dodgeCd)}s`;
      } else {
        dodgeBtn.classList.remove("is-cooling");
        dodgeText.textContent = "准备";
      }
    }
    updateQuickControls();
  }

  function drawBg() {
    const theme = themeFor();
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 30, w * 0.5, h * 0.52, Math.max(w, h) * 0.75);
    g.addColorStop(0, theme.core);
    g.addColorStop(0.55, theme.mid);
    g.addColorStop(1, theme.edge);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalAlpha = 0.22;
    const halo = ctx.createRadialGradient(w * 0.78, h * 0.22, 10, w * 0.78, h * 0.22, Math.max(w, h) * 0.38);
    halo.addColorStop(0, theme.glow);
    halo.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = theme.line;
    const grid = 56, off = S.t * 12 % grid;
    for (let x = -grid + off; x < w + grid; x += grid) { line(x, 0, x - h * 0.32, h); }
    for (let y = -grid; y < h + grid; y += grid) { line(0, y + off, w, y + off - w * 0.28); }
    ctx.restore();

    drawStageBackdrop(theme);

    ctx.save();
    ctx.globalAlpha = 0.18;
    for (let i = 0; i < w / 22 + 3; i++) {
      const x = i * 22 - (S.t * 20 % 22);
      const high = 26 + Math.abs(Math.sin(i * 0.73)) * 88;
      const y = h - 92 - Math.sin(i * 1.7 + S.t * 0.8) * 28 - high * 0.35;
      ctx.strokeStyle = ctx.fillStyle = Math.sin(i * 2.11) > -0.1 ? theme.accent : "#27d17f";
      line(x + 4, y - high * 0.45, x + 4, y + high * 0.45);
      ctx.fillRect(x, y - high * 0.18, 8, high * 0.36 + 4);
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.34;
    ctx.fillStyle = theme.line;
    ctx.font = "900 22px Georgia, Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.fillText(`第 ${S.stage} 关 · ${theme.name}`, w / 2, h - 32);
    ctx.restore();
  }

  function drawStageBackdrop(theme) {
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = theme.line;
    ctx.fillStyle = theme.accent;
    const stageType = (S.stage - 1) % stageThemes.length;
    if (stageType === 0) {
      for (let i = 0; i < 5; i++) {
        const x = w * (0.16 + i * 0.17);
        const y = h * 0.22 + Math.sin(S.t + i) * 12;
        ctx.beginPath();
        ctx.arc(x, y, 34 + i * 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (stageType === 1) {
      for (let i = 0; i < 12; i++) {
        const x = (i * 130 + S.t * 18) % (w + 160) - 80;
        const y = h * (0.18 + (i % 5) * 0.11);
        ctx.fillRect(x, y, 58, 28);
        ctx.strokeRect(x, y, 58, 28);
      }
    } else if (stageType === 2) {
      for (let i = 0; i < 9; i++) {
        const x = i * w / 8;
        ctx.beginPath();
        ctx.moveTo(x, h * 0.18);
        ctx.lineTo(x + 70, h * 0.44);
        ctx.lineTo(x - 70, h * 0.44);
        ctx.closePath();
        ctx.stroke();
      }
    } else if (stageType === 3) {
      for (let i = 0; i < 7; i++) {
        const x = w * (0.1 + i * 0.14);
        ctx.beginPath();
        ctx.moveTo(x, h * 0.16);
        ctx.lineTo(x + Math.sin(S.t * 2 + i) * 38, h * 0.72);
        ctx.stroke();
      }
    } else if (stageType === 4) {
      for (let i = 0; i < 26; i++) {
        const x = (i * 97 + S.t * 26) % (w + 120) - 60;
        const y = (i * 53 + S.t * 18) % (h * 0.75);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 18, y + 28);
        ctx.lineTo(x - 5, y + 23);
        ctx.closePath();
        ctx.stroke();
      }
    } else {
      const size = 74;
      for (let x = -size; x < w + size; x += size) {
        for (let y = -size; y < h + size; y += size) {
          ctx.strokeRect(x + (S.t * 12 % size), y, size * 0.52, size * 0.52);
        }
      }
    }
    ctx.restore();
  }

  function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawWeapons() {
    const p = S.p;
    if (!p) return;
    const o = orbitStats();
    const sw = swordStats();
    drawElementAura(p);
    if (o.mode === "orbit") {
      ctx.save();
      ctx.setLineDash([8, 12]);
      ctx.strokeStyle = "rgba(255,178,63,.18)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, o.orbit, 0, Math.PI * 2);
      ctx.stroke();
      if (sw.on) {
        ctx.strokeStyle = "rgba(114,240,206,.16)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, sw.orbit, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      for (let i = 0; i < o.count; i++) {
        const a = S.angle + i / o.count * Math.PI * 2;
        drawOrb(p.x + Math.cos(a) * o.orbit, p.y + Math.sin(a) * o.orbit, o, a);
      }
    } else {
      drawMuzzleAura(o);
    }
    if (sw.on) {
      for (let i = 0; i < sw.count; i++) {
        const a = S.swordAngle + i / sw.count * Math.PI * 2;
        drawSword(p.x + Math.cos(a) * sw.orbit, p.y + Math.sin(a) * sw.orbit, a);
      }
    }
  }

  function drawElementAura(p) {
    const branches = ["fire", "ice", "lightning", "storm", "rain"].filter((key) => p.mods[key] > 0);
    if (!branches.length) return;
    ctx.save();
    ctx.translate(p.x, p.y);
    branches.forEach((key, i) => {
      const branch = elementBranches[key];
      const lv = p.mods[key];
      const radius = p.r + 19 + i * 7 + Math.sin(S.t * (2.2 + i * 0.25)) * 2;
      ctx.globalAlpha = 0.2 + Math.min(0.22, lv * 0.035);
      ctx.strokeStyle = branch.color;
      ctx.lineWidth = 2;
      ctx.setLineDash(key === "lightning" ? [4, 7] : key === "rain" ? [2, 9] : []);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      if (key === "fire") {
        ctx.fillStyle = branch.color;
        for (let j = 0; j < Math.min(5, lv + 1); j++) {
          const a = S.t * 2.4 + j / (lv + 1) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * radius, Math.sin(a) * radius, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (key === "storm") {
        ctx.strokeStyle = branch.color;
        ctx.beginPath();
        ctx.arc(0, 0, radius + 5, S.t * 1.8, S.t * 1.8 + Math.PI * 0.9);
        ctx.stroke();
      }
    });
    branches.filter((key) => p.evolved?.[`${key}5`]).forEach((key, i) => {
      const branch = elementBranches[key];
      const radius = 118 + i * 18 + Math.sin(S.t * 2.2 + i) * 5;
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = branch.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = branch.color;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.82, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawMuzzleAura(o) {
    const p = S.p;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.strokeStyle = o.color;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 9]);
    ctx.beginPath();
    ctx.arc(0, 0, p.r + 15 + Math.sin(S.t * 8) * 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = o.color;
    ctx.font = "900 16px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(o.icon, 0, -p.r - 22);
    ctx.restore();
  }

  function drawOrb(x, y, o, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a + Math.PI / 2);
    ctx.shadowColor = o.color;
    ctx.shadowBlur = 18;
    if (o.shape === "blade" || o.shape === "dagger") {
      ctx.fillStyle = "#fff7dc"; ctx.strokeStyle = o.color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -o.radius - 13); ctx.lineTo(o.radius * .65, 4); ctx.lineTo(0, o.radius + 8); ctx.lineTo(-o.radius * .65, 4); ctx.closePath(); ctx.fill(); ctx.stroke();
    } else if (o.shape === "fire") {
      const g = ctx.createRadialGradient(0, 0, 2, 0, 0, o.radius * 3.8);
      g.addColorStop(0, "#fff6aa"); g.addColorStop(.32, "#ff6b32"); g.addColorStop(1, "rgba(255,80,30,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, o.radius * 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ff6b32"; ctx.beginPath(); ctx.moveTo(0, -o.radius - 9); ctx.bezierCurveTo(o.radius, -3, o.radius * .8, o.radius, 0, o.radius); ctx.bezierCurveTo(-o.radius, o.radius * .65, -o.radius, -4, 0, -o.radius - 9); ctx.fill();
    } else if (o.shape === "plate" || o.shape === "square" || o.shape === "shield") {
      ctx.fillStyle = o.color; ctx.fillRect(-o.radius, -o.radius, o.radius * 2, o.radius * 2);
    } else if (o.shape === "coin") {
      ctx.fillStyle = "#ffd95f"; ctx.beginPath(); ctx.arc(0, 0, o.radius * 1.05, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#fff7c8"; ctx.lineWidth = 2; ctx.stroke();
    } else if (o.shape === "wave") {
      ctx.strokeStyle = o.color; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, o.radius, .15 * Math.PI, 1.65 * Math.PI); ctx.stroke();
    } else if (o.shape === "claw") {
      ctx.strokeStyle = o.color; ctx.lineWidth = 4;
      for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 6, -o.radius); ctx.quadraticCurveTo(i * 9 + 4, 0, i * 4, o.radius); ctx.stroke(); }
    } else if (o.shape === "horn") {
      ctx.fillStyle = "#fff0b0"; ctx.beginPath(); ctx.moveTo(0, -o.radius - 12); ctx.quadraticCurveTo(o.radius * 1.3, 0, 0, o.radius + 8); ctx.quadraticCurveTo(-o.radius * .45, 0, 0, -o.radius - 12); ctx.fill();
    } else {
      const g = ctx.createRadialGradient(0, 0, 2, 0, 0, o.radius * 3.2);
      g.addColorStop(0, "#fff6dc"); g.addColorStop(.28, o.color); g.addColorStop(1, "rgba(255,178,63,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, o.radius * 3.1, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = o.color; ctx.beginPath(); ctx.arc(0, 0, o.radius, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.rotate(-(a + Math.PI / 2));
    ctx.fillStyle = "#111821";
    ctx.font = "900 13px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(o.icon, 0, 1);
    ctx.restore();
  }

  function drawSword(x, y, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a + Math.PI / 2);
    ctx.shadowColor = "#72f0ce";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#e9fff9";
    ctx.strokeStyle = "#72f0ce";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -28); ctx.lineTo(8, 5); ctx.lineTo(0, 17); ctx.lineTo(-8, 5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffdc72";
    ctx.fillRect(-11, 10, 22, 4);
    ctx.restore();
  }

  function drawShots() {
    for (const s of S.shots) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle);
      ctx.shadowColor = s.color;
      ctx.shadowBlur = s.shape === "laser" ? 22 : 14;
      ctx.fillStyle = s.color;
      ctx.strokeStyle = "#fff7dc";
      ctx.lineWidth = 2;

      if (s.shape === "ice") {
        ctx.fillStyle = "#bdf7ff";
        ctx.beginPath();
        ctx.moveTo(16, 0); ctx.lineTo(3, 9); ctx.lineTo(-12, 0); ctx.lineTo(3, -9); ctx.closePath();
        ctx.fill(); ctx.stroke();
      } else if (s.shape === "bullet" || s.shape === "sniper") {
        ctx.beginPath();
        ctx.ellipse(0, 0, s.shape === "sniper" ? 18 : 11, s.shape === "sniper" ? 5 : 4, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.shape === "laser") {
        ctx.fillStyle = s.color;
        ctx.fillRect(-18, -3, 36, 6);
        ctx.fillStyle = "#fff7dc";
        ctx.fillRect(5, -1, 14, 2);
      } else if (s.shape === "cannon") {
        ctx.fillStyle = "#ff986b";
        ctx.beginPath(); ctx.arc(0, 0, s.r + 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffdc72"; ctx.beginPath(); ctx.arc(3, -3, s.r * .45, 0, Math.PI * 2); ctx.fill();
      } else if (s.shape === "grenade") {
        ctx.fillStyle = "#2a2118";
        ctx.beginPath(); ctx.arc(0, 0, s.r + 3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#ff986b";
        ctx.fillRect(-3, -s.r - 8, 8, 7);
      } else if (s.shape === "mine") {
        const armed = !(s.arm > 0);
        ctx.fillStyle = armed ? "#62dbff" : "rgba(98,219,255,.45)";
        ctx.beginPath(); ctx.rect(-s.r, -s.r, s.r * 2, s.r * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#071018";
        ctx.font = "900 10px Microsoft YaHei";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("格", 0, 1);
      } else if (s.shape === "boomerang") {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, s.r + 9, -0.85 * Math.PI, 0.35 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#fff7dc";
        ctx.beginPath(); ctx.arc(s.r + 3, 0, 3, 0, Math.PI * 2); ctx.fill();
      } else if (s.shape === "dart" || s.shape === "shuriken") {
        ctx.fillStyle = "#e9fff9";
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const a = i * Math.PI / 2;
          ctx.lineTo(Math.cos(a) * 15, Math.sin(a) * 15);
          ctx.lineTo(Math.cos(a + Math.PI / 4) * 5, Math.sin(a + Math.PI / 4) * 5);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
      } else if (s.shape === "dragon") {
        ctx.fillStyle = "#ff6b32";
        ctx.beginPath(); ctx.moveTo(18, 0); ctx.quadraticCurveTo(0, -14, -18, -2); ctx.quadraticCurveTo(0, 14, 18, 0); ctx.fill();
      } else if (s.shape === "feather") {
        ctx.fillStyle = "#d9fff0";
        ctx.beginPath(); ctx.ellipse(0, 0, 17, 6, 0, 0, Math.PI * 2); ctx.fill();
      } else if (s.shape === "koi") {
        ctx.fillStyle = "#ff8fc2";
        ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(-8, 10); ctx.lineTo(-3, 0); ctx.lineTo(-8, -10); ctx.closePath(); ctx.fill();
      } else if (s.shape === "chip") {
        ctx.fillStyle = "#72f0ce";
        ctx.strokeStyle = "#e9fff9";
        ctx.fillRect(-12, -9, 24, 18);
        ctx.strokeRect(-12, -9, 24, 18);
        ctx.strokeStyle = "#0b2b27";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-7, -3); ctx.lineTo(-1, -3); ctx.lineTo(-1, 4); ctx.lineTo(7, 4);
        ctx.moveTo(3, -7); ctx.lineTo(3, -1); ctx.lineTo(9, -1);
        ctx.stroke();
      } else if (s.shape === "plate" || s.shape === "claw") {
        ctx.fillStyle = s.shape === "plate" ? s.color : "#fff7dc";
        if (s.shape === "plate") {
          ctx.fillRect(-s.r, -s.r * 0.65, s.r * 2, s.r * 1.3);
          ctx.strokeRect(-s.r, -s.r * 0.65, s.r * 2, s.r * 1.3);
        } else {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 4;
          for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(-s.r, i * 5); ctx.quadraticCurveTo(0, i * 8 - 8, s.r, i * 4); ctx.stroke(); }
        }
      } else {
        ctx.beginPath(); ctx.arc(0, 0, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawEnemyShots() {
    for (const s of S.enemyShots) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle);
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 16;
      ctx.fillStyle = s.color;
      ctx.strokeStyle = "rgba(255,255,255,.75)";
      ctx.lineWidth = 2;
      if (s.shape === "paper") {
        ctx.fillRect(-10, -7, 20, 14);
        ctx.strokeRect(-10, -7, 20, 14);
        ctx.fillStyle = "#201018";
        ctx.font = "900 9px Microsoft YaHei";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("文", 0, 1);
      } else if (s.shape === "laser") {
        ctx.fillRect(-16, -3, 32, 6);
        ctx.fillStyle = "#fff7dc";
        ctx.fillRect(4, -1, 12, 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  function drawDrops() {
    for (const d of S.drops) {
      const pulse = 1 + Math.sin(S.t * 8 + d.x * 0.01) * 0.12;
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.shadowColor = d.color;
      ctx.shadowBlur = 18;
      ctx.fillStyle = d.color;
      ctx.globalAlpha = clamp(d.life / 1.2, 0.35, 1);
      ctx.beginPath();
      ctx.arc(0, 0, d.r * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#081018";
      ctx.font = `900 ${d.type === "exp" ? 10 : 13}px Microsoft YaHei`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(d.icon, 0, 1);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function drawPlayer() {
    const p = S.p;
    if (!p) return;
    const im = img(p.role);
    ctx.save();
    ctx.translate(p.x, p.y);
    const pulse = 1 + S.pulse * .55;
    const g = ctx.createRadialGradient(0, 0, 4, 0, 0, 70 * pulse);
    g.addColorStop(0, "rgba(255,214,111,.32)");
    g.addColorStop(.55, "rgba(255,95,49,.12)");
    g.addColorStop(1, "rgba(255,95,49,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, 70 * pulse, 0, Math.PI * 2);
    ctx.fill();
    if (p.shield > 1) {
      ctx.strokeStyle = "rgba(114,240,206,.72)";
      ctx.lineWidth = 2 + Math.min(5, p.shield / 60);
      ctx.beginPath();
      ctx.arc(0, 0, p.r + 9 + Math.sin(S.t * 6) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = "#101923";
    ctx.strokeStyle = p.hurt > 0 ? "#ff415f" : p.role.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, p.r + 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, p.r, 0, Math.PI * 2);
    ctx.clip();
    if (im.complete && im.naturalWidth) ctx.drawImage(im, -p.r, -p.r, p.r * 2, p.r * 2);
    else { ctx.fillStyle = p.role.color; ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2); }
    ctx.restore();
    ctx.restore();
  }

  function drawMonster(m) {
    const p = S.p;
    const a = Math.atan2(p.y - m.y, p.x - m.x);
    ctx.save();
    ctx.translate(m.x, m.y);
    ctx.rotate(a);
    if (m.elite) {
      ctx.save();
      ctx.rotate(-a);
      ctx.strokeStyle = m.color;
      ctx.globalAlpha = 0.62;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, m.r * 1.65 + Math.sin(S.t * 6) * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    if (!m.boss) drawMonsterTrait(m);
    ctx.shadowColor = m.flash > 0 ? "#fff2d6" : m.color;
    ctx.shadowBlur = m.flash > 0 ? 26 : m.boss ? 30 : 14;
    const body = ctx.createRadialGradient(-m.r * 0.35, -m.r * 0.35, 2, 0, 0, m.r * 1.6);
    body.addColorStop(0, m.flash > 0 ? "#fff2d6" : "#fff2d6");
    body.addColorStop(0.18, m.flash > 0 ? "#fff2d6" : m.color);
    body.addColorStop(1, "#0b0d12");
    ctx.fillStyle = body;
    ctx.strokeStyle = m.boss ? "rgba(255,214,111,.86)" : "rgba(0,0,0,.58)";
    ctx.lineWidth = m.boss ? 4 : 2;
    if (m.boss) {
      ctx.beginPath();
      const points = 14;
      for (let i = 0; i < points; i++) {
        const aa = i / points * Math.PI * 2, rr = m.r * (i % 2 ? 1.0 : 1.28 + Math.sin(S.t * 4 + i) * 0.04);
        const x = Math.cos(aa) * rr, y = Math.sin(aa) * rr;
        if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, m.r * 0.72, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      if (m.badge === "空") {
        ctx.beginPath();
        ctx.moveTo(-m.r * 1.35, -m.r * 0.15);
        ctx.quadraticCurveTo(-m.r * 0.45, -m.r * 1.05, 0, -m.r * 0.2);
        ctx.quadraticCurveTo(m.r * 0.45, -m.r * 1.05, m.r * 1.35, -m.r * 0.15);
        ctx.quadraticCurveTo(m.r * 0.45, m.r * 0.55, 0, m.r * 0.34);
        ctx.quadraticCurveTo(-m.r * 0.45, m.r * 0.55, -m.r * 1.35, -m.r * 0.15);
        ctx.fill(); ctx.stroke();
      } else if (m.badge === "杠") {
        roundedMonsterRect(-m.r * 1.25, -m.r * 0.75, m.r * 2.5, m.r * 1.5, m.r * 0.32);
        ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,.2)";
        ctx.beginPath();
        ctx.moveTo(-m.r * 1.55, -m.r * 0.95); ctx.lineTo(-m.r * 0.85, -m.r * 0.35);
        ctx.moveTo(-m.r * 1.55, m.r * 0.95); ctx.lineTo(-m.r * 0.85, m.r * 0.35);
        ctx.stroke();
      } else if (m.badge === "牢") {
        roundedMonsterRect(-m.r, -m.r, m.r * 2, m.r * 2, m.r * 0.18);
        ctx.fill(); ctx.stroke();
      } else if (m.badge === "冲") {
        ctx.beginPath();
        ctx.moveTo(m.r * 1.35, 0);
        ctx.lineTo(-m.r * 0.95, -m.r * 0.9);
        ctx.lineTo(-m.r * 0.55, 0);
        ctx.lineTo(-m.r * 0.95, m.r * 0.9);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,.22)";
        ctx.beginPath();
        ctx.moveTo(m.r * 0.2, -m.r * 0.45); ctx.lineTo(m.r * 1.18, 0);
        ctx.moveTo(m.r * 0.2, m.r * 0.45); ctx.lineTo(m.r * 1.18, 0);
        ctx.stroke();
      } else if (m.badge === "效") {
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const aa = i / 8 * Math.PI * 2;
          const rr = i % 2 ? m.r * 0.72 : m.r * 1.18;
          const x = Math.cos(aa) * rr;
          const y = Math.sin(aa) * rr;
          if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
      } else if (m.badge === "愈") {
        ctx.beginPath();
        ctx.arc(0, 0, m.r * 1.06, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "rgba(114,240,206,.58)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-m.r * 0.48, 0); ctx.lineTo(m.r * 0.48, 0);
        ctx.moveTo(0, -m.r * 0.48); ctx.lineTo(0, m.r * 0.48);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, m.r * 1.18, m.r * .92, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
      }

      ctx.fillStyle = "rgba(0,0,0,.32)";
      if (["追", "套", "震"].includes(m.badge)) {
        ctx.beginPath();
        ctx.moveTo(-m.r * 0.65, -m.r * 0.75);
        ctx.lineTo(-m.r * 0.98, -m.r * 1.32);
        ctx.lineTo(-m.r * 0.18, -m.r * 0.86);
        ctx.moveTo(m.r * 0.65, -m.r * 0.75);
        ctx.lineTo(m.r * 0.98, -m.r * 1.32);
        ctx.lineTo(m.r * 0.18, -m.r * 0.86);
        ctx.fill();
      }
    }

    drawMonsterFace(m);
    ctx.restore();
    drawMonsterElementFx(m);
    drawMonsterSpecialCue(m);
    ctx.fillStyle = m.boss ? "#111821" : "#fff2d6";
    ctx.font = `900 ${m.boss ? 22 : 14}px Microsoft YaHei`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(m.badge, m.x, m.y + 1);
    const hpw = m.boss ? 112 : m.r * 2.4, y = m.y - m.r - (m.boss ? 24 : 14);
    ctx.fillStyle = "rgba(0,0,0,.48)"; ctx.fillRect(m.x - hpw / 2, y, hpw, m.boss ? 7 : 4);
    ctx.fillStyle = m.boss ? "#ffdc72" : m.elite ? "#d9a7ff" : "#ff415f"; ctx.fillRect(m.x - hpw / 2, y, hpw * clamp(m.hp / m.maxHp, 0, 1), m.boss ? 7 : 4);
    if (m.boss && m.barrier > 0) {
      ctx.fillStyle = "#72f0ce";
      ctx.fillRect(m.x - hpw / 2, y + 9, hpw * clamp(m.barrier / (m.barrierMax || m.maxHp * 0.2), 0, 1), 4);
    }
    if (m.boss) { ctx.fillStyle = "#fff2d6"; ctx.font = "900 13px Microsoft YaHei"; ctx.fillText(m.name, m.x, y - 11); }
    if (m.elite || m.typeLabel) {
      ctx.fillStyle = m.aiType === "gold" ? "#f7d66f" : m.elite ? "#ffdc72" : "#fff2d6";
      ctx.font = "900 11px Microsoft YaHei";
      ctx.fillText(m.elite ? "精英" : m.typeLabel, m.x, y - 8);
    }
  }

  function drawMonsterSpecialCue(m) {
    if (!m.aiType || m.boss) return;
    ctx.save();
    ctx.translate(m.x, m.y);
    if (m.aiType === "charger" && m.chargeWarn > 0) {
      ctx.rotate(m.chargeAim || 0);
      ctx.globalAlpha = 0.35 + Math.sin(S.t * 32) * 0.18;
      ctx.fillStyle = "#ff986b";
      ctx.fillRect(m.r, -4, 220, 8);
      ctx.strokeStyle = "#fff2d6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.r + 220, 0);
      ctx.lineTo(m.r + 196, -14);
      ctx.lineTo(m.r + 196, 14);
      ctx.closePath();
      ctx.stroke();
    } else if (m.aiType === "bomber" && m.explodeArmed) {
      ctx.globalAlpha = 0.18 + Math.sin(S.t * 8 + m.wobble) * 0.06;
      ctx.strokeStyle = "#ff415f";
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 7]);
      ctx.beginPath();
      ctx.arc(0, 0, m.explodeRadius || 86, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (m.aiType === "gold") {
      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = "#f7d66f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, m.r * 1.75 + Math.sin(S.t * 6) * 3, 0, Math.PI * 2);
      ctx.stroke();
    } else if (m.aiType === "shield") {
      ctx.globalAlpha = 0.34;
      ctx.strokeStyle = "#7aa8ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, m.r * 1.52, -0.72, 0.72);
      ctx.stroke();
    }
    ctx.restore();
  }

  function getFx(m, type) {
    return m.fx && m.fx[type] && m.fx[type].t > 0 ? m.fx[type] : null;
  }

  function drawMonsterElementFx(m) {
    const fire = m.burnT > 0 || getFx(m, "fire");
    const ice = getFx(m, "ice");
    const lightning = getFx(m, "lightning");
    const storm = getFx(m, "storm");
    const rain = getFx(m, "rain");
    const iceLightning = getFx(m, "iceLightning");
    const rainFreeze = getFx(m, "rainFreeze");
    const fireStorm = getFx(m, "fireStorm");
    if (!fire && !ice && !lightning && !storm && !rain && !iceLightning && !rainFreeze && !fireStorm) return;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (fire) {
      const fx = getFx(m, "fire");
      const lv = fx ? fx.lv : 1;
      const glow = ctx.createRadialGradient(m.x, m.y, m.r * 0.3, m.x, m.y, m.r * (2.5 + lv * 0.12));
      glow.addColorStop(0, "rgba(255,230,120,.38)");
      glow.addColorStop(0.45, "rgba(255,92,38,.24)");
      glow.addColorStop(1, "rgba(255,70,20,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * (2.4 + lv * 0.12), 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < Math.min(9, 4 + lv); i++) {
        const a = S.t * 4.2 + i * Math.PI * 2 / Math.min(9, 4 + lv) + (m.fx?.fire?.seed || 0);
        const x = m.x + Math.cos(a) * m.r * 0.75;
        const y = m.y + Math.sin(a) * m.r * 0.42;
        const h = m.r * (0.55 + 0.18 * Math.sin(S.t * 7 + i));
        ctx.fillStyle = i % 2 ? "#ff6b32" : "#ffdc72";
        ctx.beginPath();
        ctx.moveTo(x, y - h);
        ctx.bezierCurveTo(x + 8, y - h * 0.45, x + 7, y + h * 0.15, x, y + h * 0.26);
        ctx.bezierCurveTo(x - 8, y + h * 0.02, x - 6, y - h * 0.46, x, y - h);
        ctx.fill();
      }
    }

    if (ice) {
      const lv = ice.lv;
      ctx.globalAlpha = 0.65;
      ctx.strokeStyle = "#9ee8ff";
      ctx.fillStyle = "rgba(158,232,255,.18)";
      ctx.lineWidth = 3;
      const r = m.r * (1.28 + Math.min(0.28, lv * 0.05));
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 3 + Math.sin(S.t * 2 + ice.seed) * 0.05;
        const x = m.x + Math.cos(a) * r;
        const y = m.y + Math.sin(a) * r;
        if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3 + S.t * 0.2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + Math.cos(a) * r * 1.25, m.y + Math.sin(a) * r * 1.25);
        ctx.stroke();
      }
    }

    if (lightning) {
      const lv = lightning.lv;
      ctx.strokeStyle = "#f7d66f";
      ctx.lineWidth = 2.2 + lv * 0.22;
      ctx.shadowColor = "#f7d66f";
      ctx.shadowBlur = 14;
      const arcs = Math.min(6, 2 + lv);
      for (let i = 0; i < arcs; i++) {
        const a1 = S.t * 7 + i * Math.PI * 2 / arcs + lightning.seed;
        const a2 = a1 + 0.9 + Math.sin(S.t * 5 + i) * 0.35;
        jaggedLine(
          m.x + Math.cos(a1) * m.r * 1.45,
          m.y + Math.sin(a1) * m.r * 1.45,
          m.x + Math.cos(a2) * m.r * 1.45,
          m.y + Math.sin(a2) * m.r * 1.45,
          4,
          7 + lv * 1.2,
        );
      }
      ctx.shadowBlur = 0;
    }

    if (storm) {
      const lv = storm.lv;
      ctx.strokeStyle = "#b8f7ff";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      const r = m.r * (1.55 + lv * 0.08);
      for (let i = 0; i < 3; i++) {
        const start = S.t * (2.8 + i * 0.45) + i * 2.1 + storm.seed;
        ctx.beginPath();
        ctx.arc(m.x, m.y, r + i * 8, start, start + Math.PI * 1.08);
        ctx.stroke();
      }
      for (let i = 0; i < 4; i++) {
        const y = m.y - m.r + i * m.r * 0.62;
        const off = Math.sin(S.t * 5 + i + storm.seed) * 8;
        ctx.beginPath();
        ctx.moveTo(m.x - r - 10, y + off);
        ctx.quadraticCurveTo(m.x, y - 14 - off, m.x + r + 10, y + off * 0.4);
        ctx.stroke();
      }
    }

    if (rain) {
      const lv = rain.lv;
      ctx.strokeStyle = "#62dbff";
      ctx.fillStyle = "rgba(98,219,255,.18)";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.72;
      for (let i = 0; i < Math.min(9, 3 + lv); i++) {
        const x = m.x - m.r * 1.35 + i * (m.r * 2.7 / Math.max(1, Math.min(8, 2 + lv)));
        const fall = (S.t * 90 + i * 19 + rain.seed) % (m.r * 2.4);
        ctx.beginPath();
        ctx.moveTo(x, m.y - m.r * 1.8 + fall);
        ctx.lineTo(x - 5, m.y - m.r * 1.45 + fall + 12);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(m.x, m.y + m.r * 0.85, m.r * 1.35, m.r * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    if (iceLightning) {
      const lv = iceLightning.lv;
      const r = m.r * (1.85 + Math.min(0.45, lv * 0.04));
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = "#f7d66f";
      ctx.shadowBlur = 22;
      ctx.strokeStyle = "#f7d66f";
      ctx.lineWidth = 3 + Math.min(2, lv * 0.18);
      for (let i = 0; i < 4; i++) {
        const a = S.t * 8 + i * Math.PI / 2 + iceLightning.seed;
        jaggedLine(
          m.x + Math.cos(a) * r,
          m.y + Math.sin(a) * r,
          m.x + Math.cos(a + Math.PI) * r * 0.72,
          m.y + Math.sin(a + Math.PI) * r * 0.72,
          5,
          9 + lv,
        );
      }
      ctx.shadowColor = "#9ee8ff";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = "#9ee8ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(m.x, m.y, r * 0.82 + Math.sin(S.t * 9) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    if (rainFreeze) {
      const lv = rainFreeze.lv;
      const r = m.r * (1.9 + Math.min(0.35, lv * 0.035));
      ctx.globalAlpha = 0.78;
      ctx.fillStyle = "rgba(158,232,255,.12)";
      ctx.strokeStyle = "#bdf7ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#62dbff";
      for (let i = 0; i < 10; i++) {
        const a = i * Math.PI * 2 / 10 + Math.sin(S.t * 2 + rainFreeze.seed) * 0.08;
        const inner = r * 0.45;
        const outer = r * (0.85 + 0.12 * Math.sin(S.t * 6 + i));
        ctx.beginPath();
        ctx.moveTo(m.x + Math.cos(a) * inner, m.y + Math.sin(a) * inner);
        ctx.lineTo(m.x + Math.cos(a) * outer, m.y + Math.sin(a) * outer);
        ctx.stroke();
      }
      ctx.fillStyle = "#9ee8ff";
      ctx.font = `900 ${Math.max(14, m.r * 0.72)}px Microsoft YaHei`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("冻", m.x, m.y - r - 10);
    }

    if (fireStorm) {
      const lv = fireStorm.lv;
      const r = m.r * (1.85 + Math.min(0.48, lv * 0.04));
      ctx.globalAlpha = 0.86;
      ctx.shadowColor = "#ff6b32";
      ctx.shadowBlur = 24;
      for (let i = 0; i < 4; i++) {
        const start = -S.t * (3.2 + i * 0.4) + i * 1.4 + fireStorm.seed;
        const grad = ctx.createLinearGradient(m.x - r, m.y - r, m.x + r, m.y + r);
        grad.addColorStop(0, "#ffdc72");
        grad.addColorStop(1, "#ff415f");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4 - i * 0.35;
        ctx.beginPath();
        ctx.arc(m.x, m.y, r - i * 6, start, start + Math.PI * 1.2);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(255,108,50,.18)";
      ctx.beginPath();
      ctx.ellipse(m.x, m.y + m.r * 0.65, r * 0.95, r * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
    drawElementBadges(m, { fire, ice, lightning, storm, rain, iceLightning, rainFreeze, fireStorm });
  }

  function drawElementBadges(m, active) {
    const icons = [
      active.fire && ["火", "#ff6b32"],
      active.ice && ["冰", "#9ee8ff"],
      active.lightning && ["雷", "#f7d66f"],
      active.storm && ["风", "#b8f7ff"],
      active.rain && ["雨", "#62dbff"],
      active.iceLightning && ["导", "#f7d66f"],
      active.rainFreeze && ["寒", "#9ee8ff"],
      active.fireStorm && ["焚", "#ff986b"],
    ].filter(Boolean);
    if (!icons.length) return;
    const y = m.y - m.r - (m.boss ? 48 : 35);
    const size = 14;
    const start = m.x - (icons.length - 1) * size * 0.58;
    ctx.save();
    ctx.font = "900 11px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < icons.length; i++) {
      const [txt, color] = icons[i];
      const x = start + i * size * 1.15;
      ctx.fillStyle = "rgba(5,9,15,.78)";
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fillText(txt, x, y + 0.5);
    }
    ctx.restore();
  }

  function jaggedLine(x1, y1, x2, y2, segments, jitter) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / len;
    const ny = dx / len;
    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const wave = (Math.random() - 0.5) * jitter;
      ctx.lineTo(x1 + dx * t + nx * wave, y1 + dy * t + ny * wave);
    }
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawMonsterTrait(m) {
    ctx.save();
    ctx.globalAlpha = 0.2 + Math.sin(S.t * 5 + m.wobble) * 0.05;
    ctx.strokeStyle = m.color;
    ctx.fillStyle = m.color;
    if (m.tag === "冲刺面") {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-m.r * 1.7, -m.r * 0.72);
      ctx.lineTo(-m.r * 2.55, 0);
      ctx.lineTo(-m.r * 1.7, m.r * 0.72);
      ctx.stroke();
      if (m.charge > 0) {
        ctx.globalAlpha = 0.46;
        ctx.fillRect(-m.r * 2.8, -m.r * 0.32, m.r * 1.5, m.r * 0.64);
      }
    } else if (m.tag === "特效面") {
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, m.r * 1.58 + Math.sin(S.t * 7) * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      for (let i = 0; i < 4; i++) {
        const a = S.t * 2.4 + i * Math.PI / 2;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * m.r * 1.45, Math.sin(a) * m.r * 1.45, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (m.tag === "恢复面") {
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, m.r * 1.72, -S.t * 1.8, -S.t * 1.8 + Math.PI * 1.35);
      ctx.stroke();
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.arc(0, 0, 170, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function roundedMonsterRect(x, y, ww, hh, rr) {
    rr = Math.min(rr, Math.abs(ww) / 2, Math.abs(hh) / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + ww - rr, y);
    ctx.quadraticCurveTo(x + ww, y, x + ww, y + rr);
    ctx.lineTo(x + ww, y + hh - rr);
    ctx.quadraticCurveTo(x + ww, y + hh, x + ww - rr, y + hh);
    ctx.lineTo(x + rr, y + hh);
    ctx.quadraticCurveTo(x, y + hh, x, y + hh - rr);
    ctx.lineTo(x, y + rr);
    ctx.quadraticCurveTo(x, y, x + rr, y);
  }

  function drawMonsterFace(m) {
    const eyeColor = m.boss ? "#ffdc72" : "#fff2d6";
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(0,0,0,.5)";
    ctx.beginPath();
    ctx.arc(m.r * 0.36, -m.r * 0.28, Math.max(2.4, m.r * 0.17), 0, Math.PI * 2);
    ctx.arc(m.r * 0.36, m.r * 0.28, Math.max(2.4, m.r * 0.17), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(m.r * 0.4, -m.r * 0.28, Math.max(1.8, m.r * 0.1), 0, Math.PI * 2);
    ctx.arc(m.r * 0.4, m.r * 0.28, Math.max(1.8, m.r * 0.1), 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(m.r * 0.42, 0, m.r * 0.32, -0.25 * Math.PI, 0.25 * Math.PI);
    ctx.stroke();
  }

  function drawHazards() {
    for (const h of S.hazards) {
      const warning = h.warn > 0;
      const t = warning ? 1 - clamp(h.warn / h.maxWarn, 0, 1) : clamp(h.life / h.maxLife, 0, 1);
      const pulse = 0.55 + Math.sin(S.t * 18 + h.id) * 0.18;
      ctx.save();
      ctx.globalAlpha = warning ? 0.18 + t * 0.24 + pulse * 0.12 : 0.32 * t;
      ctx.strokeStyle = h.color;
      ctx.fillStyle = h.color;
      ctx.lineWidth = warning ? 3 + t * 2 : 5;
      if (warning) ctx.setLineDash([10, 8]);

      if (h.type === "line") {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.angle);
        ctx.fillRect(0, -h.width, h.length, h.width * 2);
        ctx.strokeRect(0, -h.width, h.length, h.width * 2);
        if (warning) {
          ctx.setLineDash([]);
          ctx.globalAlpha = 0.72;
          ctx.fillStyle = "#fff2d6";
          ctx.beginPath();
          ctx.moveTo(h.length, 0);
          ctx.lineTo(h.length - 24, -h.width * 0.9);
          ctx.lineTo(h.length - 24, h.width * 0.9);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      } else if (h.type === "cone") {
        ctx.beginPath();
        ctx.moveTo(h.x, h.y);
        ctx.arc(h.x, h.y, h.r, h.angle - h.spread / 2, h.angle + h.spread / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (h.type === "ring") {
        const ringWidth = Math.max(12, h.r - h.inner);
        ctx.lineWidth = ringWidth;
        ctx.beginPath();
        ctx.arc(h.x, h.y, (h.r + h.inner) / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      if (warning) {
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "#fff2d6";
        ctx.font = "900 13px Microsoft YaHei";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const labelX = h.type === "line" ? h.x + Math.cos(h.angle) * Math.min(h.length * 0.52, 150) : h.x;
        const labelY = h.type === "line" ? h.y + Math.sin(h.angle) * Math.min(h.length * 0.52, 150) : h.y;
        ctx.fillText("危险", labelX, labelY);
      }
      ctx.restore();
    }
  }

  function drawFx() {
    for (const b of S.beams) {
      const alpha = clamp(b.life / b.max, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = b.color;
      ctx.lineWidth = b.width;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 18;
      jaggedLine(b.x1, b.y1, b.x2, b.y2, 7, 12 + b.width * 2);
      ctx.lineWidth = Math.max(1, b.width * 0.45);
      ctx.strokeStyle = "#fff7dc";
      jaggedLine(b.x1, b.y1, b.x2, b.y2, 5, 7 + b.width);
      ctx.restore();
    }
    for (const p of S.parts) {
      ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * ctx.globalAlpha, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.font = "900 15px Microsoft YaHei";
    for (const f of S.texts) {
      ctx.globalAlpha = clamp(f.life / f.max, 0, 1);
      ctx.fillStyle = f.color;
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.globalAlpha = 1;
  }

  function drawStageTransition() {
    if (!S.transition) return;
    const tr = S.transition;
    const t = clamp(tr.time / tr.duration, 0, 1);
    const alpha = t < 0.5 ? t * 1.7 : (1 - t) * 1.7;
    const sweep = Math.sin(t * Math.PI);
    ctx.save();
    ctx.globalAlpha = clamp(alpha, 0, 0.92);
    ctx.fillStyle = "rgba(2,4,8,.82)";
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = 1;
    ctx.translate(w / 2, h / 2);
    ctx.rotate((t - 0.5) * 0.18);
    ctx.strokeStyle = tr.theme.line;
    ctx.lineWidth = 4;
    for (let i = 0; i < 5; i++) {
      ctx.globalAlpha = 0.18 + i * 0.09;
      ctx.beginPath();
      ctx.arc(0, 0, sweep * (90 + i * 58), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = tr.theme.glow;
    ctx.font = "900 18px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.fillText(`第 ${tr.from} 关突破`, 0, -72);
    ctx.font = "900 58px Georgia, Microsoft YaHei";
    ctx.fillText(`进入第 ${tr.to} 关`, 0, 0);
    ctx.font = "900 22px Microsoft YaHei";
    ctx.fillStyle = "#fff2d6";
    ctx.fillText(tr.theme.name, 0, 44);
    ctx.font = "700 15px Microsoft YaHei";
    ctx.fillStyle = "#bcae91";
    ctx.fillText(`获得 Boss 技能：${tr.rewardName}`, 0, 78);
    ctx.font = "700 13px Microsoft YaHei";
    ctx.fillStyle = "#8fd6c4";
    ctx.fillText(`累计击杀 ${S.kills}｜最高连杀 ${S.bestStreak}｜市场事件 ${S.eventCount}`, 0, 104);
    ctx.restore();
  }

  function fitCanvasText(text, maxWidth) {
    maxWidth = Math.max(20, maxWidth);
    if (ctx.measureText(text).width <= maxWidth) return text;
    let end = text.length;
    while (end > 1 && ctx.measureText(`${text.slice(0, end)}…`).width > maxWidth) end--;
    return `${text.slice(0, Math.max(1, end))}…`;
  }

  function drawMarketEventBanner() {
    if (!S.event || S.mode !== "playing" || S.transition) return;
    const e = S.event;
    const compact = w < 820 || h < 430;
    const uiScale = viewScale;
    const rightReserve = marketEventRightReserveCss(compact) * uiScale;
    const maxWidth = Math.min((compact ? 210 : 280) * uiScale, w - rightReserve - 18 * uiScale);
    const x = w - rightReserve;
    const y = marketBannerTopCss(compact) * uiScale;
    const pct = clamp(e.time / e.duration, 0, 1);
    const title = fitCanvasText(`${e.title} ${Math.ceil(e.time)}s`, maxWidth);
    const lineW = Math.min(maxWidth, (compact ? 104 : 138) * uiScale);

    ctx.save();
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
    ctx.font = `900 ${(compact ? 13 : 15) * uiScale}px Microsoft YaHei`;
    ctx.lineWidth = 4 * uiScale;
    ctx.strokeStyle = "rgba(0,0,0,.72)";
    ctx.shadowColor = "rgba(0,0,0,.88)";
    ctx.shadowBlur = 6 * uiScale;
    ctx.strokeText(title, x, y);
    ctx.fillStyle = e.color;
    ctx.fillText(title, x, y);

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "rgba(255,255,255,.13)";
    ctx.fillRect(x - lineW, y + (compact ? 18 : 22) * uiScale, lineW, 2 * uiScale);
    ctx.fillStyle = e.color;
    ctx.fillRect(x - lineW * pct, y + (compact ? 18 : 22) * uiScale, lineW * pct, 2 * uiScale);
    ctx.restore();
  }

  function mobileQuickControlsVisible() {
    const landscape = screenW > screenH;
    return screenW <= 800 || (landscape && screenW <= 1180 && screenH <= 520);
  }

  function marketBannerTopCss(compact) {
    const normalTop = compact ? 12 : 18;
    if (!mobileQuickControlsVisible()) return normalTop;
    if (screenW >= 760) return normalTop;
    const quickControlsBottom = compact ? 48 : 56;
    return quickControlsBottom + (compact ? 5 : 8);
  }

  function marketEventRightReserveCss(compact) {
    if (document.body.classList.contains("ui-hidden")) return compact ? 14 : 22;
    if (mobileQuickControlsVisible()) return compact ? 76 : 96;
    return 378;
  }

  function marketBannerHeightCss(compact) {
    return compact ? 22 : 28;
  }

  function topHintStackCss(compact) {
    let top = marketBannerTopCss(compact);
    if (S.event) top += marketBannerHeightCss(compact) + (compact ? 6 : 8);
    return top;
  }

  function bottomHintTop(compact, bh) {
    const uiScale = viewScale;
    const bottomGap = (mobileQuickControlsVisible() ? (compact ? 12 : 16) : 22) * uiScale;
    return h - bottomGap - bh;
  }

  function drawStreakBanner() {
    const p = S.p;
    if (!p || S.mode !== "playing" || S.transition || (p.streak < 12 && S.streakFlash <= 0)) return;
    const compact = w < 820 || h < 430;
    const uiScale = viewScale;
    const bw = Math.min(w - 28 * uiScale, (compact ? 220 : 300) * uiScale);
    const bh = (compact ? 30 : 36) * uiScale;
    const x = w / 2 - bw / 2;
    const y = bottomHintTop(compact, bh);
    const alpha = p.streak >= 12 ? 0.88 : clamp(S.streakFlash / 1.6, 0, 0.88);
    const next = Math.max(0, S.nextStreakReward - p.streak);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = "#ffdc72";
    ctx.shadowBlur = 14 * uiScale;
    ctx.fillStyle = "rgba(32,18,10,.78)";
    roundedMonsterRect(x, y, bw, bh, 15 * uiScale);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#ffdc72";
    ctx.lineWidth = 1.5 * uiScale;
    ctx.stroke();

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffdc72";
    ctx.font = `900 ${(compact ? 14 : 16) * uiScale}px Microsoft YaHei`;
    ctx.fillText(`连杀 x${p.streak}`, x + bw * 0.28, y + bh / 2);
    ctx.fillStyle = "#fff2d6";
    ctx.font = `700 ${(compact ? 10 : 11) * uiScale}px Microsoft YaHei`;
    ctx.fillText(next ? `再 ${next} 击领奖励` : "奖励触发", x + bw * 0.68, y + bh / 2);
    ctx.restore();
  }

  function drawRunBanner() {
    if (!S.banner) return;
    const b = S.banner;
    const compact = w < 820 || h < 430;
    const uiScale = viewScale;
    const bw = Math.min(w - 32 * uiScale, (compact ? Math.min(screenW * 0.7, 420) : 520) * uiScale);
    const bh = (compact ? 48 : 62) * uiScale;
    const x = w / 2 - bw / 2;
    const y = topHintStackCss(compact) * uiScale;
    const life = clamp(b.time / b.duration, 0, 1);
    const alpha = Math.min(1, life * 3, (1 - life) * 4 + 0.16);

    ctx.save();
    ctx.globalAlpha = clamp(alpha, 0, 0.9);
    ctx.shadowColor = b.color;
    ctx.shadowBlur = (compact ? 14 : 20) * uiScale;
    ctx.fillStyle = "rgba(6,8,13,.76)";
    roundedMonsterRect(x, y, bw, bh, 18 * uiScale);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = b.color;
    ctx.lineWidth = 2 * uiScale;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = b.color;
    ctx.font = `900 ${(compact ? 15 : 20) * uiScale}px Microsoft YaHei`;
    ctx.fillText(fitCanvasText(b.title, bw - 30 * uiScale), w / 2, y + (compact ? 18 : 23) * uiScale);
    if (b.sub) {
      ctx.fillStyle = "#fff2d6";
      ctx.font = `700 ${(compact ? 10 : 12) * uiScale}px Microsoft YaHei`;
      ctx.fillText(fitCanvasText(b.sub, bw - 34 * uiScale), w / 2, y + (compact ? 36 : 45) * uiScale);
    }
    ctx.restore();
  }

  function render() {
    drawBg();
    const sx = S.shake ? rnd(-8, 8) * S.shake : 0;
    const sy = S.shake ? rnd(-8, 8) * S.shake : 0;
    ctx.save();
    ctx.translate(sx, sy);
    drawWeapons();
    drawShots();
    drawEnemyShots();
    drawHazards();
    drawDrops();
    S.monsters.forEach(drawMonster);
    drawPlayer();
    drawFx();
    ctx.restore();
    drawStageTransition();
    drawMarketEventBanner();
    drawStreakBanner();
    drawRunBanner();
  }

  function loop(ts) {
    if (!last) last = ts;
    const dt = Math.min((ts - last) / 1000, 0.033);
    last = ts;
    update(dt);
    render();
    requestAnimationFrame(loop);
  }

  function resize() {
    const oldW = w;
    const oldH = h;
    dpr = Math.min(devicePixelRatio || 1, 2);
    screenW = Math.max(1, innerWidth);
    screenH = Math.max(1, innerHeight);
    viewScale = mobileArenaScale(screenW, screenH);
    w = Math.floor(screenW * viewScale);
    h = Math.floor(screenH * viewScale);
    canvas.width = Math.floor(screenW * dpr);
    canvas.height = Math.floor(screenH * dpr);
    ctx.setTransform(canvas.width / w, 0, 0, canvas.height / h, 0, 0);
    if (oldW && oldH && (oldW !== w || oldH !== h)) scaleWorld(w / oldW, h / oldH);
    if (S.p) { S.p.x = clamp(S.p.x, 35, w - 35); S.p.y = clamp(S.p.y, 35, h - 35); }
    S.pointer.active = false;
    resetJoystick();
  }

  function bindInstantAction(el, handler) {
    if (!el) return;
    const run = (e) => {
      if (el.disabled) return;
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      handler();
    };
    el.addEventListener("pointerdown", run, { passive: false });
    el.addEventListener("touchstart", run, { passive: false });
    el.addEventListener("click", run, { passive: false });
  }

  addEventListener("keydown", (e) => {
    keys.add(e.code);
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
    if (e.code === "Space") useUltimate();
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") dodge();
    if (e.code === "Enter" && (S.mode === "menu" || S.mode === "gameover")) start();
    if (e.code === "KeyP") pause();
    if (e.code === "KeyR") start();
  });
  addEventListener("keyup", (e) => keys.delete(e.code));
  addEventListener("resize", resize);
  addEventListener("orientationchange", () => setTimeout(resize, 240));
  ["fullscreenchange", "webkitfullscreenchange", "msfullscreenchange"].forEach((eventName) => {
    document.addEventListener(eventName, updateFullscreenLabel);
  });
  canvas.addEventListener("pointerdown", (e) => {
    if (S.mode !== "playing") return;
    S.pointer.active = true;
    setPointerFromEvent(e);
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!S.pointer.active) return;
    setPointerFromEvent(e);
  });
  canvas.addEventListener("pointerup", (e) => {
    S.pointer.active = false;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointercancel", () => { S.pointer.active = false; });
  bindInstantAction(ultBtn, useUltimate);
  bindInstantAction(dodgeBtn, dodge);
  if (fullscreenBtn) fullscreenBtn.addEventListener("click", toggleFullscreen);
  if (pauseBtn) pauseBtn.addEventListener("click", pause);
  if (restartBtn) restartBtn.addEventListener("click", start);
  if (uiToggleBtn) uiToggleBtn.addEventListener("click", toggleGameUi);
  if (joystick) {
    joystick.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      S.joystick.active = true;
      S.joystick.pointerId = e.pointerId;
      joystick.setPointerCapture(e.pointerId);
      updateJoystick(e);
    });
    joystick.addEventListener("pointermove", (e) => {
      if (!S.joystick.active || S.joystick.pointerId !== e.pointerId) return;
      e.preventDefault();
      updateJoystick(e);
    });
    const endJoystick = (e) => {
      if (S.joystick.pointerId !== e.pointerId) return;
      if (joystick.hasPointerCapture(e.pointerId)) joystick.releasePointerCapture(e.pointerId);
      resetJoystick();
    };
    joystick.addEventListener("pointerup", endJoystick);
    joystick.addEventListener("pointercancel", endJoystick);
  }
  upgradeChoices.addEventListener("click", (e) => {
    const shopButton = e.target.closest("[data-shop]");
    if (shopButton) {
      buyShopOffer(Number(shopButton.dataset.shop));
      return;
    }
    const button = e.target.closest("[data-upgrade]");
    if (!button) return;
    chooseUpgrade(Number(button.dataset.upgrade));
  });
  if (refreshSkillsBtn) refreshSkillsBtn.addEventListener("click", refreshUpgrades);
  startBtn.addEventListener("click", () => S.mode === "paused" ? pause() : S.mode === "shop" ? closeShop() : start());
  rerollBtn.addEventListener("click", reroll);
  howBtn.addEventListener("click", () => show("玩法提示", "移动和走位即可：怪物从四周追来，角色专属技能会自动攻击；每 2 级可选择一次火、冰、雷、风、雨、飞剑等技能树，击杀怪物获得金币，金币可刷新技能三选一。每杀 1 只普通怪获得经验，升到 10 级打第一关 Boss，之后每 10 级一关。", "操作说明", true, S.mode === "paused" ? "继续游戏" : "开始游戏"));

  resize();
  updateFullscreenLabel();
  updateQuickControls();
  reroll();
  requestAnimationFrame(loop);
})();
