# 打字练习 Web 应用

一个功能完善、对初学者友好的网页版打字练习工具，支持字母和单词练习，包含限时挑战模式和赛车游戏模式，让练习更有趣！

![打字练习](https://img.shields.io/badge/Type-Practice-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![HTML5](https://img.shields.io/badge/HTML5-5.0-orange) ![CSS3](https://img.shields.io/badge/CSS3-3.0-green)

## 项目简介

本项目旨在帮助打字初学者提升打字速度和准确率。通过简洁直观的界面和循序渐进的练习方式，用户可以从字母练习开始，逐步过渡到单词练习，最终通过限时挑战模式和有趣的赛车游戏检验自己的打字水平。

### 核心特点

- 🎯 **循序渐进**：从单个字母到完整单词，难度逐步提升
- ⏱️ **限时挑战**：1分钟倒计时，测试真实打字能力
- 🏎️ **赛车游戏**：趣味游戏模式，正确按键驱动赛车前进
- 🏆 **排行榜系统**：记录最佳成绩，激励持续练习
- 🔊 **音效反馈**：按键音效增强练习体验
- 📊 **实时统计**：准确率和速度数据一目了然
- 🎨 **现代界面**：渐变背景、动画效果、响应式设计
- 💾 **本地存储**：成绩数据持久化，无需后端服务

## 功能详解

### 1. 练习模式

#### 自由练习模式
- 无时间限制，用户可自由练习
- 实时显示速度和准确率
- 适合初学者熟悉键盘布局
- 随时可以重置开始新的练习

#### 限时挑战模式
- 固定1分钟倒计时
- 可视化进度条展示剩余时间
- 倒计时结束自动保存成绩到排行榜
- 测试用户在压力下的打字表现

#### 赛车游戏模式
- 1分钟倒计时，紧张刺激的游戏体验
- 可视化赛道，红色小跑车实时移动
- 正确输入字符/单词，赛车前进10米
- 错误不影响前进，只记录错误数
- 到达终点后循环继续
- 结束后显示总行驶距离并保存到排行榜
- 让打字练习变得更有趣

### 2. 内容类型

#### 字母练习
- 随机显示26个英文字母
- 大字体展示，易于识别
- 正确后自动切换到下一个字母
- 适合零基础初学者

#### 单词练习
- 内置10个常用英文单词：CAT, DOG, BIRD, FISH, TREE, BOOK, HOUSE, WATER, MUSIC, TIME
- 已输入部分高亮显示，当前输入字符加粗，未输入部分淡化
- 完成整个单词后自动切换
- 培养连续打字能力

### 3. 实时统计

| 统计项 | 说明 | 计算方式 |
|--------|------|----------|
| 正确数 | 正确输入的字符/单词数 | 每次正确按键+1 |
| 错误数 | 错误输入的字符数 | 每次错误按键+1 |
| 准确率 | 打字准确程度 | (正确数 / 总按键数) × 100% |
| 速度 | 每分钟字符数 | 正确数 / 已用时间（分钟） |

### 4. 视觉反馈系统

#### 倒计时显示
- 大号数字显示剩余秒数
- 60秒开始倒计时到0秒
- 仅在限时挑战模式下显示

#### 进度条提示
- 圆角进度条，平滑动画
- **金色状态**（>40秒）：时间充裕，轻松练习
- **橙色状态**（≤40秒）：时间过半，注意节奏
- **红色状态**（≤20秒）：时间紧迫，加快速度

#### 输入反馈
- ✅ **正确反馈**：绿色"正确！"文字提示
- ❌ **错误反馈**：红色"再试一次"文字提示
- 反馈持续1秒后自动消失

### 5. 音效系统

使用 Web Audio API 生成实时音效，无需外部音频文件：

| 音效类型 | 频率范围 | 音效特点 |
|----------|----------|----------|
| 正确音效 | 523Hz → 659Hz | 清脆上扬，持续0.2秒 |
| 错误音效 | 200Hz → 150Hz | 低沉下落，持续0.15秒 |

- 音效开关按钮：可随时开启/关闭
- 首次按键后激活音频上下文

### 6. 排行榜系统

#### 数据存储
- 使用浏览器 `localStorage` 存储
- 练习成绩键名：`typingScores`
- 游戏成绩键名：`gameScores`
- 数据格式：JSON数组

#### 排行榜展示
- 显示前10名最佳记录
- 按成绩降序排列
- 自动切换显示：练习排行榜 / 游戏排行榜
- 每条记录包含：排名、练习模式、成绩

#### 练习排行榜
- 成绩单位：CPM（每分钟字符数）
- 包含自由练习和限时挑战模式
- 区分字母和单词练习

#### 游戏排行榜
- 成绩单位：米（行驶距离）
- 记录赛车游戏模式下的最佳成绩
- 区分字母和单词游戏

#### 样式区分
- 🥇 **第一名**：金色边框，金色背景渐变
- 🥈 **第二名**：银色边框，银色背景渐变
- 🥉 **第三名**：铜色边框，铜色背景渐变
- **其他名次**：蓝色边框，白色背景

#### 记录信息
- 练习内容：字母/单词
- 练习模式：限时/自由/游戏
- 成绩：CPM值或米数
- 时间戳：记录保存时间

### 7. 界面设计

#### 色彩方案
- **背景**：紫色渐变（#667eea → #764ba2）
- **主色调**：蓝色（#667eea）
- **成功色**：绿色（#4caf50）
- **错误色**：红色（#f44336）
- **警告色**：橙色（#e67e22）
- **计时器**：金黄色渐变（#ffeaa7 → #fdcb6e）

#### 响应式设计
- **桌面端**（>600px）：4列统计，并排按钮
- **移动端**（≤600px）：单列统计，垂直按钮
- 字体大小自适应调整
- 触控友好的按钮尺寸

#### 动画效果
- 按钮悬停：上移2px + 阴影
- 进度条：0.3秒宽度过渡
- 反馈文字：淡入淡出
- 模式切换：平滑颜色过渡

## 使用指南

### 快速开始（3步即可开始）

```bash
# 1. 克隆或下载项目
git clone <repository-url>

# 2. 打开 index.html
直接双击 index.html 文件

# 3. 开始练习
点击"开始练习"按钮，根据屏幕提示打字
```

### 详细操作步骤

#### 步骤1：选择练习模式
点击上方按钮选择：
- **自由练习**：无压力练习，适合新手
- **限时挑战**：1分钟测试，检验水平
- **赛车游戏**：趣味游戏，边玩边练

#### 步骤2：选择内容类型
点击中间按钮选择：
- **字母**：适合刚接触键盘的用户
- **单词**：适合有一定基础的用户

#### 步骤3：开始练习
- 点击"开始练习"按钮（游戏模式下显示"开始游戏"）
- 自由模式：直接开始打字
- 限时模式/游戏模式：倒计时开始后开始打字

#### 步骤4：打字输入

##### 练习模式（自由/限时）
- **字母练习**：按下屏幕显示的字母键
- **单词练习**：依次输入单词的每个字母
- 错误时会有红色提示，无需重新开始
- 每次正确输入后自动更新统计

##### 游戏模式（赛车游戏）
- **字母游戏**：按对字母，赛车前进10米
- **单词游戏**：按对单词，赛车前进10米
- 错误不影响赛车前进，只记录错误数
- 赛车到达终点后循环，继续累积距离
- 1分钟后显示总行驶距离

#### 步骤5：查看成绩
- 限时模式：时间结束后弹窗显示成绩（CPM）
- 游戏模式：时间结束后弹窗显示行驶距离（米）
- 自动保存到对应排行榜
- 可点击"重置"重新开始

### 控制按钮说明

| 按钮 | 功能 | 说明 |
|------|------|------|
| 开始练习 | 启动练习 | 开始计时或进入练习状态 |
| 开始游戏 | 启动游戏 | 游戏模式下显示，开始1分钟游戏 |
| 重置 | 重新开始 | 清空统计，恢复初始状态 |
| 音效：开/关 | 切换音效 | 开启或关闭按键音效 |

### 游戏模式说明

#### 游戏界面
- **顶部统计**：绿色渐变背景，显示行驶距离
- **赛道区域**：深色赛道，三条虚线车道
- **红色赛车**：可爱的小跑车，平滑动画移动
- **终点线**：黑白格子线，带旗帜表情
- **字符显示**：大号字母或单词，清晰可见

#### 游戏规则
- 每个正确按键前进10米
- 到达1000米后循环，距离继续累积
- 倒计时1分钟，尽可能开得更远
- 距离越长，成绩越好

#### 游戏技巧
1. 保持正确率，避免频繁错误
2. 不要只追求速度，准确性更重要
3. 注意观察剩余时间，合理安排节奏
4. 先从字母模式开始，熟悉游戏后再挑战单词模式

### 技巧提示

1. **正确姿势**：手指放在基准键位（ASDF JKL;）
2. **不要看键盘**：通过肌肉记忆提升速度
3. **保持节奏**：稳定速度比追求速度更重要
4. **定期练习**：每天10-15分钟，持续提升
5. **循序渐进**：先练字母，再练单词
6. **游戏练习**：利用游戏模式让练习更有趣

## 技术架构

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| HTML5 | 5.0 | 页面结构 |
| CSS3 | 3.0 | 样式设计、动画 |
| JavaScript | ES6+ | 核心逻辑 |
| Web Audio API | - | 音效生成 |
| localStorage | - | 数据存储 |

### 代码结构

#### 核心类：TypingPractice

```javascript
class TypingPractice {
    constructor()                    // 初始化
    init()                          // 绑定事件和初始化
    initAudio()                     // 初始化音频上下文
    playSound(type)                 // 播放音效
    bindEvents()                    // 绑定事件监听器
    switchMode(mode)                // 切换练习模式
    switchPracticeMode(mode)        // 切换内容类型
    newTarget()                     // 生成新的目标
    updateDisplay()                 // 更新显示
    handleKeyPress(e)               // 处理按键
    handleCorrect()                 // 处理正确
    handleWrong()                   // 处理错误
    showFeedback(message, type)     // 显示反馈
    updateStats()                   // 更新统计
    calculateSpeed()                // 计算速度
    updateProgressBar(progress)     // 更新进度条
    toggleSound()                   // 切换音效
    start()                         // 开始练习
    reset()                         // 重置
    endGame()                       // 结束游戏
    loadLeaderboard()               // 加载排行榜
    saveScore(score, accuracy)      // 保存成绩
}
```

#### 文件结构

```
demo/
├── index.html          # 主页面
│   ├── 头部区域
│   ├── 模式选择区（自由/限时/游戏）
│   ├── 内容选择区（字母/单词）
│   ├── 计时器显示区
│   ├── 练习统计区（正确/错误/准确率/速度）
│   ├── 练习显示区（字符显示）
│   ├── 游戏显示区（赛道/赛车/距离）
│   ├── 反馈提示区
│   ├── 控制按钮区
│   ├── 键盘提示区
│   └── 排行榜区（练习/游戏）
│
├── style.css           # 样式文件（566行）
│   ├── 全局样式
│   ├── 容器样式
│   ├── 模式按钮样式
│   ├── 统计面板样式
│   ├── 计时器样式
│   ├── 进度条样式
│   ├── 游戏区域样式
│   │   ├── 赛道样式
│   │   ├── 赛车样式
│   │   └── 游戏统计样式
│   ├── 排行榜样式
│   └── 响应式媒体查询
│
├── script.js           # 逻辑文件（470行）
│   ├── TypingPractice 类
│   ├── 状态管理
│   │   ├── 练习模式状态
│   │   └── 游戏模式状态
│   ├── 音效系统
│   ├── 事件处理
│   ├── 统计计算
│   │   ├── 练习统计
│   │   └── 游戏统计
│   ├── 数据持久化
│   │   ├── 练习成绩存储
│   │   └── 游戏成绩存储
│   └── 排行榜管理
│       ├── 练习排行榜
│       └── 游戏排行榜
│
└── README.md           # 说明文档
```

### 数据流程

#### 练习模式数据流程

```
用户按键 
    ↓
handleKeyPress() 
    ↓
判断正确/错误 
    ↓
playSound() + showFeedback() 
    ↓
updateStats() 
    ↓
calculateSpeed() 
    ↓
更新UI显示
```

#### 游戏模式数据流程

```
用户按键 
    ↓
handleKeyPress() 
    ↓
判断正确/错误 
    ↓
playSound() + showFeedback() 
    ↓
正确: moveCarForward() + updateStats() 
    ↓
错误: updateStats() 
    ↓
updateGameDistance() 
    ↓
更新赛车位置 + 距离显示
```

### 生命周期

#### 练习模式生命周期

```
页面加载
    ↓
构造函数初始化
    ↓
bindEvents() + initAudio()
    ↓
newTarget()
    ↓
等待用户操作
    ↓
用户点击开始
    ↓
开始打字 / 倒计时
    ↓
实时更新统计
    ↓
时间到或用户重置
    ↓
endGame() / reset()
    ↓
saveScore() 到排行榜
```

#### 游戏模式生命周期

```
页面加载
    ↓
构造函数初始化
    ↓
bindEvents() + initAudio()
    ↓
newTarget()
    ↓
显示游戏区域（隐藏练习区域）
    ↓
等待用户操作
    ↓
用户点击开始游戏
    ↓
倒计时开始
    ↓
用户打字
    ↓
正确: 赛车前进 + 更新距离
错误: 只更新统计
    ↓
时间到
    ↓
endGame()
    ↓
saveGameScore() 到游戏排行榜
    ↓
reset() 重置游戏状态
```

## 部署方式

### 方式1：直接打开（适合本地测试）

```bash
# Windows
双击 index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 方式2：本地服务器（推荐）

```bash
# Python 2
python -m SimpleHTTPServer 8000

# Python 3
python -m http.server 8000

# Node.js http-server
npx http-server -p 8000

# PHP
php -S localhost:8000
```

访问：`http://localhost:8000`

### 方式3：VS Code Live Server

1. 安装 Live Server 扩展
2. 右键 index.html
3. 选择 "Open with Live Server"
4. 自动在浏览器中打开

### 方式4：在线部署

可部署到：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

示例 GitHub Pages 部署：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main
# 在 GitHub 设置中开启 GitHub Pages
```

## 浏览器兼容性

| 浏览器 | 最低版本 | 说明 |
|--------|----------|------|
| Chrome | 90+ | 完全支持 |
| Edge | 90+ | 完全支持 |
| Firefox | 88+ | 完全支持 |
| Safari | 14+ | 完全支持 |
| Opera | 76+ | 完全支持 |
| IE | - | 不支持 |

**注意**：
- 需要支持 Web Audio API 的浏览器
- 需要支持 ES6+ 的 JavaScript 环境
- 移动端浏览器也可使用

## 数据管理

### LocalStorage 数据结构

#### 练习成绩数据

```json
{
  "typingScores": [
    {
      "score": 120,
      "accuracy": 95,
      "practiceMode": "letters",
      "mode": "timed",
      "date": "2025-01-17T12:00:00.000Z"
    }
  ]
}
```

#### 游戏成绩数据

```json
{
  "gameScores": [
    {
      "score": 850,
      "accuracy": 92,
      "practiceMode": "words",
      "mode": "game",
      "date": "2025-01-17T12:30:00.000Z"
    }
  ]
}
```

**说明**：
- `score`：练习模式下为CPM值，游戏模式下为行驶距离（米）
- `accuracy`：准确率百分比
- `practiceMode`："letters"（字母）或 "words"（单词）
- `mode`："practice"（自由）、"timed"（限时）或 "game"（游戏）
- `date`：ISO格式的时间戳

### 清除数据

方法1：清除练习成绩
```javascript
localStorage.removeItem('typingScores')
```

方法2：清除游戏成绩
```javascript
localStorage.removeItem('gameScores')
```

方法3：清除所有数据
```javascript
localStorage.clear()
```

方法4：通过浏览器界面清除
- Chrome: F12 → Application → Local Storage → Clear
- Firefox: F12 → Storage → Local Storage → 右键删除

方法5：隐私模式浏览（不保存数据）

## 常见问题

### Q1: 为什么音效没有声音？
**A**: Web Audio API 需要用户交互后才能激活。第一次按键后音效会自动开启。

### Q2: 排行榜数据为什么不见了？
**A**: 数据存储在 localStorage 中，清除浏览器缓存或隐私模式浏览会删除数据。

### Q3: 可以练习中文打字吗？
**A**: 当前版本仅支持英文字母和单词，未来版本会添加中文支持。

### Q4: 手机上可以使用吗？
**A**: 可以，项目采用响应式设计，支持移动端浏览器。但建议使用物理键盘练习。

### Q5: 如何重置所有记录？
**A**: 打开浏览器控制台，运行 `localStorage.clear()` 清除所有本地数据。

### Q6: 为什么速度显示为0？
**A**: 自由练习模式不计算实时速度，只有限时挑战模式才会计算CPM。游戏模式下显示的是距离。

### Q7: 游戏模式下赛车为什么不动？
**A**: 请确保点击了"开始游戏"按钮，并且输入正确。只有正确输入才会驱动赛车前进。

### Q8: 游戏模式和练习模式的排行榜是分开的吗？
**A**: 是的，游戏模式和练习模式使用独立的排行榜，互不影响。

### Q9: 游戏模式下的距离是如何计算的？
**A**: 每个正确按键前进10米，到达1000米后循环，距离会继续累积。

### Q10: 如何获得更高的游戏分数？
**A**: 保持高准确率，减少错误，提高打字速度。正确率比速度更重要，因为错误不会让赛车前进。

### Q11: 可以修改单词库吗？
**A**: 可以修改 script.js 中的 `this.words` 数组添加自定义单词。

### Q12: 如何添加更多练习时长？
**A**: 修改 script.js 中的 `this.timeLeft = 60` 可以改变倒计时时长。

## 开发指南

### 添加新单词

编辑 `script.js` 第4行：

```javascript
this.words = ['CAT', 'DOG', 'BIRD', 'FISH', 'TREE', 'BOOK', 'HOUSE', 'WATER', 'MUSIC', 'TIME', 
              'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'LEMON'];
```

### 修改颜色主题

编辑 `style.css`：

```css
/* 修改主色调 */
.mode-btn.active {
    background: #your-color;
}

/* 修改背景渐变 */
body {
    background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### 添加新的统计项

1. 在 HTML 中添加统计元素
2. 在 `updateStats()` 方法中更新数据
3. 添加对应的 CSS 样式

### 修改计时时长

编辑 `script.js` 第15行：

```javascript
this.timeLeft = 120;  // 改为2分钟
```

同时在 `start()` 方法中找到 `this.timeLeft = 60;` 的地方，修改为：

```javascript
this.timeLeft = 120;  // 改为2分钟
```

### 修改游戏距离计算

编辑 `script.js` 中的 `moveCarForward()` 方法：

```javascript
moveCarForward() {
    if (this.currentMode !== 'game') return;
    
    // 修改每次前进的距离（默认10米）
    this.gameDistance += 10;  // 改为你想要的距离
    
    // 修改最大距离（默认1000米）
    const maxDistance = 1000;  // 改为你想要的最大距离
    
    const trackWidth = 80;
    const carPosition = Math.min((this.gameDistance / maxDistance) * trackWidth, trackWidth);
    
    document.getElementById('car').style.left = `${carPosition}%`;
    document.getElementById('distance').textContent = this.gameDistance;
    
    if (this.gameDistance >= maxDistance) {
        this.gameDistance = 0;
        document.getElementById('car').style.left = '5%';
    }
}
```

### 自定义赛车样式

编辑 `style.css` 中的 `.car`、`.car-body`、`.car-top`、`.car-wheel` 等类：

```css
/* 修改赛车颜色 */
.car-body {
    background: linear-gradient(180deg, #your-color 0%, #dark-color 100%);
}

/* 修改赛车大小 */
.car {
    width: 150px;  /* 修改宽度 */
    height: 60px;  /* 修改高度 */
}

/* 修改车轮颜色 */
.car-wheel {
    background: #your-wheel-color;
}
```

## 性能优化

- 使用 `requestAnimationFrame` 优化动画（已实现CSS transition）
- 事件委托减少监听器数量
- localStorage 异步读写
- 音效使用振荡器而非加载音频文件
- 最小化DOM操作频率

## 安全性

- 无后端通信，纯前端应用
- 不收集用户数据
- localStorage 仅存储练习成绩
- 无跨域请求
- 无第三方依赖

## 未来改进方向

### 练习功能
- [ ] 增加更多单词库
- [ ] 支持中文打字练习
- [ ] 添加自定义文本模式
- [ ] 支持多种时长设置（30秒、2分钟、5分钟）
- [ ] 添加历史记录功能
- [ ] 支持多用户切换
- [ ] 添加打字热图分析
- [ ] 支持键盘布局切换（QWERTY、DVORAK等）

### 游戏功能
- [ ] 添加更多游戏模式（如射击游戏、拼图游戏）
- [ ] 支持多车竞速模式
- [ ] 添加障碍物和道具
- [ ] 实现关卡系统
- [ ] 添加成就系统
- [ ] 支持自定义赛车样式
- [ ] 添加背景音乐和音效
- [ ] 实现多人在线对战

### 界面优化
- [ ] 添加主题切换（深色/浅色模式）
- [ ] 支持更多语言界面
- [ ] 添加打字教程
- [ ] 优化移动端体验
- [ ] 添加动画效果
- [ ] 支持自定义界面布局

### 功能增强
- [ ] 添加数据导出功能
- [ ] 支持云存储同步
- [ ] 添加成绩图表统计
- [ ] 实现练习计划功能
- [ ] 添加打字测试功能
- [ ] 支持导入自定义文本

## 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 ES6+ 语法
- 遵循 Google JavaScript 风格指南
- 添加必要的注释
- 保持代码简洁可读

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢

- 感谢所有为此项目做出贡献的开发者
- 感谢使用本工具进行打字练习的用户

## 联系方式

- 项目主页：[GitHub Repository](https://github.com/yourusername/typing-practice)
- 问题反馈：[Issues](https://github.com/yourusername/typing-practice/issues)
- 邮箱：your.email@example.com

---

**开始你的打字练习之旅，提升打字速度和准确率！** 🚀
