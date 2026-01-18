class TypingPractice {
    constructor() {
        this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.words = ['CAT', 'DOG', 'BIRD', 'FISH', 'TREE', 'BOOK', 'HOUSE', 'WATER', 'MUSIC', 'TIME'];
        this.currentMode = 'practice';
        this.practiceMode = 'letters';
        this.currentTarget = '';
        this.currentIndex = 0;
        this.correct = 0;
        this.wrong = 0;
        this.soundEnabled = true;
        this.audioContext = null;
        this.isStarted = false;
        this.timer = null;
        this.timeLeft = 60;
        this.startTime = null;
        
        this.gameDistance = 0;
        this.gamePixelsPerMeter = 10;
        
        this.selectedLetters = new Set(this.letters);

        this.init();
    }

    init() {
        this.bindEvents();
        this.initAudio();
        this.loadLeaderboard();
        this.updateProgressBar(100);
        this.newTarget();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playSound(type) {
        if (!this.soundEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        if (type === 'correct') {
            oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(659.25, this.audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        } else {
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.15);
        }
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });

        document.querySelectorAll('.practice-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchPracticeMode(btn.dataset.practice));
        });

        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('soundBtn').addEventListener('click', () => this.toggleSound());
        
        // 字母选择器事件
        this.bindLetterSelectorEvents();
    }

    switchMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        const gameArea = document.getElementById('gameArea');
        const statsArea = document.getElementById('statsArea');
        const leaderboardTitle = document.getElementById('leaderboardTitle');
        
        if (mode === 'game') {
            gameArea.classList.remove('hidden');
            gameArea.classList.add('show');
            statsArea.classList.add('hidden');
            leaderboardTitle.textContent = '游戏排行榜';
            this.loadGameLeaderboard();
        } else {
            gameArea.classList.remove('show');
            gameArea.classList.add('hidden');
            statsArea.classList.remove('hidden');
            leaderboardTitle.textContent = '练习排行榜';
            this.loadLeaderboard();
        }
        
        this.reset();
    }

    switchPracticeMode(mode) {
        this.practiceMode = mode;
        document.querySelectorAll('.practice-mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.practice === mode);
        });
        
        const letterSelector = document.getElementById('letter-selector');
        if (mode === 'letters') {
            letterSelector.classList.remove('hidden');
            letterSelector.classList.add('show');
        } else {
            letterSelector.classList.remove('show');
            letterSelector.classList.add('hidden');
        }
        
        this.reset();
    }

    newTarget() {
        if (this.practiceMode === 'letters') {
            const availableLetters = Array.from(this.selectedLetters);
            if (availableLetters.length === 0) {
                this.selectedLetters = new Set(this.letters);
                this.updateSelectedLetters();
                availableLetters.push(...this.letters);
            }
            this.currentTarget = availableLetters[Math.floor(Math.random() * availableLetters.length)];
            const hint = this.currentMode === 'game' ? '按对字母加速前进！' : '按下显示的字母键';
            document.querySelector('.hint').textContent = hint;
        } else {
            this.currentTarget = this.words[Math.floor(Math.random() * this.words.length)];
            this.currentIndex = 0;
            const hint = this.currentMode === 'game' ? '按对单词加速前进！' : '依次输入单词的每个字母';
            document.querySelector('.hint').textContent = hint;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        const displayId = this.currentMode === 'game' ? 'gameChar' : 'currentChar';
        const display = document.getElementById(displayId);
        if (this.practiceMode === 'letters') {
            display.textContent = this.currentTarget;
        } else {
            const completed = this.currentTarget.substring(0, this.currentIndex);
            const current = this.currentTarget[this.currentIndex] || '';
            const remaining = this.currentTarget.substring(this.currentIndex + 1);
            display.innerHTML = `<span class="completed">${completed}</span><span class="current">${current}</span><span class="remaining">${remaining}</span>`;
        }
    }

    handleKeyPress(e) {
        if (!this.isStarted && this.currentMode !== 'game') {
            return;
        }
        if (!this.isStarted && this.currentMode === 'game') {
            return;
        }

        const key = e.key.toUpperCase();
        
        if (this.practiceMode === 'letters') {
            if (key === this.currentTarget) {
                this.handleCorrect();
            } else if (/^[A-Z]$/.test(key)) {
                this.handleWrong();
            }
        } else {
            if (this.currentIndex < this.currentTarget.length) {
                if (key === this.currentTarget[this.currentIndex]) {
                    this.handleCorrect();
                    this.currentIndex++;
                    this.updateDisplay();
                    if (this.currentIndex >= this.currentTarget.length) {
                        setTimeout(() => this.newTarget(), 500);
                    }
                } else if (/^[A-Z]$/.test(key)) {
                    this.handleWrong();
                }
            }
        }
    }

    handleCorrect() {
        this.correct++;
        this.playSound('correct');
        this.showFeedback('正确！', 'correct');
        this.updateStats();
        
        if (this.currentMode === 'game') {
            this.moveCarForward();
        }
        
        if (this.practiceMode === 'letters') {
            this.newTarget();
        }
    }

    handleWrong() {
        this.wrong++;
        this.playSound('wrong');
        this.showFeedback('再试一次', 'wrong');
        this.updateStats();
    }

    moveCarForward() {
        if (this.currentMode !== 'game') return;
        
        this.gameDistance += this.gamePixelsPerMeter;
        const maxDistance = 1000;
        const trackWidth = 80;
        const carPosition = Math.min((this.gameDistance / maxDistance) * trackWidth, trackWidth);
        
        document.getElementById('car').style.left = `${carPosition}%`;
        document.getElementById('distance').textContent = this.gameDistance;
        
        if (this.gameDistance >= maxDistance) {
            this.gameDistance = 0;
            document.getElementById('car').style.left = '5%';
        }
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = 'feedback';
        }, 1000);
    }

    updateStats() {
        document.getElementById('correct').textContent = this.correct;
        document.getElementById('wrong').textContent = this.wrong;
        
        const total = this.correct + this.wrong;
        const accuracy = total > 0 ? Math.round((this.correct / total) * 100) : 100;
        document.getElementById('accuracy').textContent = accuracy + '%';

        const speed = this.calculateSpeed();
        document.getElementById('speed').textContent = speed;
        
        if (this.currentMode === 'game') {
            document.getElementById('distance').textContent = this.gameDistance;
        }
    }

    calculateSpeed() {
        if (this.currentMode === 'timed' && this.startTime) {
            const elapsed = (Date.now() - this.startTime) / 1000;
            const minutes = elapsed / 60;
            return minutes > 0 ? Math.round(this.correct / minutes) : 0;
        } else {
            return 0;
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        document.getElementById('soundBtn').textContent = `音效: ${this.soundEnabled ? '开' : '关'}`;
    }

    updateProgressBar(progress) {
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${progress}%`;
        
        progressFill.classList.remove('warning', 'danger');
        if (progress <= 20) {
            progressFill.classList.add('danger');
        } else if (progress <= 40) {
            progressFill.classList.add('warning');
        }
    }

    reset() {
        this.isStarted = false;
        this.correct = 0;
        this.wrong = 0;
        this.timeLeft = 60;
        this.startTime = null;
        this.gameDistance = 0;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        document.getElementById('timer').textContent = '60';
        const timerDisplay = document.getElementById('timerDisplay');
        timerDisplay.classList.remove('show');
        timerDisplay.classList.add('hidden');
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').textContent = this.currentMode === 'game' ? '开始游戏' : '开始练习';
        this.updateProgressBar(100);
        
        document.getElementById('car').style.left = '5%';
        document.getElementById('distance').textContent = '0';
        
        this.updateStats();
        this.newTarget();
    }

    bindLetterSelectorEvents() {
        // 字母项目点击事件
        document.querySelectorAll('.letter-item').forEach(item => {
            item.addEventListener('click', () => {
                const letter = item.dataset.letter;
                if (this.selectedLetters.has(letter)) {
                    this.selectedLetters.delete(letter);
                    item.classList.remove('selected');
                } else {
                    this.selectedLetters.add(letter);
                    item.classList.add('selected');
                }
                this.updateSelectedCount();
            });
        });

        // 全选按钮
        document.querySelector('.selector-btn.select-all').addEventListener('click', () => {
            this.selectAllLetters();
        });

        // 清空按钮
        document.querySelector('.selector-btn.clear-all').addEventListener('click', () => {
            this.clearAllLetters();
        });
    }

    selectAllLetters() {
        this.selectedLetters = new Set(this.letters);
        document.querySelectorAll('.letter-item').forEach(item => {
            item.classList.add('selected');
        });
        this.updateSelectedCount();
    }

    clearAllLetters() {
        this.selectedLetters.clear();
        document.querySelectorAll('.letter-item').forEach(item => {
            item.classList.remove('selected');
        });
        this.updateSelectedCount();
    }

    updateSelectedCount() {
        const count = this.selectedLetters.size;
        document.getElementById('selectedCount').textContent = count;
    }

    updateSelectedLetters() {
        document.querySelectorAll('.letter-item').forEach(item => {
            const letter = item.dataset.letter;
            if (this.selectedLetters.has(letter)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
        this.updateSelectedCount();
    }

    start() {
        if (this.currentMode === 'game') {
            this.isStarted = true;
            this.startTime = Date.now();
            this.timeLeft = 60;
            this.gameDistance = 0;
            
            const timerDisplay = document.getElementById('timerDisplay');
            timerDisplay.classList.remove('hidden');
            timerDisplay.classList.add('show');
            document.getElementById('startBtn').disabled = true;
            document.getElementById('startBtn').textContent = '游戏中...';
            
            document.getElementById('car').style.left = '5%';
            document.getElementById('distance').textContent = '0';
            
            this.updateProgressBar(100);
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                document.getElementById('timer').textContent = this.timeLeft;
                
                const progress = (this.timeLeft / 60) * 100;
                this.updateProgressBar(progress);
                
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            }, 1000);
        } else if (this.currentMode === 'timed') {
            this.isStarted = true;
            this.startTime = Date.now();
            this.timeLeft = 60;
            
            const timerDisplay = document.getElementById('timerDisplay');
            timerDisplay.classList.remove('hidden');
            timerDisplay.classList.add('show');
            document.getElementById('startBtn').disabled = true;
            document.getElementById('startBtn').textContent = '练习中...';
            
            this.updateProgressBar(100);
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                document.getElementById('timer').textContent = this.timeLeft;
                
                const progress = (this.timeLeft / 60) * 100;
                this.updateProgressBar(progress);
                
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            }, 1000);
        } else {
            this.isStarted = true;
            this.startTime = Date.now();
            document.getElementById('startBtn').disabled = true;
            document.getElementById('startBtn').textContent = '练习中...';
        }
    }

    endGame() {
        clearInterval(this.timer);
        this.timer = null;
        this.isStarted = false;
        
        if (this.currentMode === 'game') {
            const score = this.gameDistance;
            const accuracy = this.correct + this.wrong > 0 ? Math.round((this.correct / (this.correct + this.wrong)) * 100) : 0;
            
            this.saveGameScore(score, accuracy);
            
            alert(`时间到！\n行驶距离: ${score}米\n正确: ${this.correct}\n错误: ${this.wrong}\n准确率: ${accuracy}%`);
            
            this.reset();
        } else {
            const score = this.correct;
            const accuracy = this.correct + this.wrong > 0 ? Math.round((this.correct / (this.correct + this.wrong)) * 100) : 0;
            
            this.saveScore(score, accuracy);
            
            alert(`时间到！\n正确: ${this.correct}\n错误: ${this.wrong}\n准确率: ${accuracy}%\n速度: ${score} CPM`);
            
            this.reset();
        }
    }

    loadLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('typingScores') || '[]');
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (scores.length === 0) {
            leaderboardList.innerHTML = '<p class="empty-leaderboard">暂无记录</p>';
            return;
        }

        scores.sort((a, b) => b.score - a.score);
        const topScores = scores.slice(0, 10);

        leaderboardList.innerHTML = topScores.map((score, index) => {
            const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
            const modeText = score.practiceMode === 'letters' ? '字母' : '单词';
            const timeText = score.mode === 'timed' ? '限时' : '自由';
            
            return `
                <div class="leaderboard-item ${rankClass}">
                    <span class="leaderboard-rank">${index + 1}</span>
                    <div class="leaderboard-info">
                        <div class="leaderboard-mode">${modeText} / ${timeText}</div>
                    </div>
                    <div class="leaderboard-score">${score.score} CPM</div>
                </div>
            `;
        }).join('');
    }

    loadGameLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('gameScores') || '[]');
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (scores.length === 0) {
            leaderboardList.innerHTML = '<p class="empty-leaderboard">暂无记录</p>';
            return;
        }

        scores.sort((a, b) => b.score - a.score);
        const topScores = scores.slice(0, 10);

        leaderboardList.innerHTML = topScores.map((score, index) => {
            const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
            const modeText = score.practiceMode === 'letters' ? '字母' : '单词';
            
            return `
                <div class="leaderboard-item ${rankClass}">
                    <span class="leaderboard-rank">${index + 1}</span>
                    <div class="leaderboard-info">
                        <div class="leaderboard-mode">${modeText} / 赛车游戏</div>
                    </div>
                    <div class="leaderboard-score">${score.score} 米</div>
                </div>
            `;
        }).join('');
    }

    saveScore(score, accuracy) {
        const scores = JSON.parse(localStorage.getItem('typingScores') || '[]');
        
        scores.push({
            score: score,
            accuracy: accuracy,
            practiceMode: this.practiceMode,
            mode: this.currentMode,
            date: new Date().toISOString()
        });

        localStorage.setItem('typingScores', JSON.stringify(scores));
        this.loadLeaderboard();
    }

    saveGameScore(score, accuracy) {
        const scores = JSON.parse(localStorage.getItem('gameScores') || '[]');
        
        scores.push({
            score: score,
            accuracy: accuracy,
            practiceMode: this.practiceMode,
            mode: 'game',
            date: new Date().toISOString()
        });

        localStorage.setItem('gameScores', JSON.stringify(scores));
        this.loadGameLeaderboard();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TypingPractice();
});