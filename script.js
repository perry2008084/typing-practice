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

        this.init();
    }

    init() {
        this.bindEvents();
        this.initAudio();
        this.loadLeaderboard();
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
    }

    switchMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        this.reset();
    }

    switchPracticeMode(mode) {
        this.practiceMode = mode;
        document.querySelectorAll('.practice-mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.practice === mode);
        });
        this.reset();
    }

    newTarget() {
        if (this.practiceMode === 'letters') {
            this.currentTarget = this.letters[Math.floor(Math.random() * this.letters.length)];
            document.querySelector('.hint').textContent = '按下显示的字母键';
        } else {
            this.currentTarget = this.words[Math.floor(Math.random() * this.words.length)];
            this.currentIndex = 0;
            document.querySelector('.hint').textContent = '依次输入单词的每个字母';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        const display = document.getElementById('currentChar');
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
        if (!this.isStarted && this.currentMode === 'timed') {
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

    reset() {
        this.isStarted = false;
        this.correct = 0;
        this.wrong = 0;
        this.timeLeft = 60;
        this.startTime = null;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        document.getElementById('timer').textContent = '60';
        document.getElementById('timerDisplay').classList.remove('show');
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').textContent = '开始练习';
        
        this.updateStats();
        this.newTarget();
    }

    start() {
        if (this.currentMode === 'timed') {
            this.isStarted = true;
            this.startTime = Date.now();
            this.timeLeft = 60;
            
            document.getElementById('timerDisplay').classList.add('show');
            document.getElementById('startBtn').disabled = true;
            document.getElementById('startBtn').textContent = '练习中...';
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                document.getElementById('timer').textContent = this.timeLeft;
                
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
        
        const score = this.correct;
        const accuracy = this.correct + this.wrong > 0 ? Math.round((this.correct / (this.correct + this.wrong)) * 100) : 0;
        
        this.saveScore(score, accuracy);
        
        alert(`时间到！\n正确: ${this.correct}\n错误: ${this.wrong}\n准确率: ${accuracy}%\n速度: ${score} CPM`);
        
        this.reset();
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
}

document.addEventListener('DOMContentLoaded', () => {
    new TypingPractice();
});