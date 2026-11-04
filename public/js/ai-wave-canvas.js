/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Cyber Wave & AI Thinking Nodes Canvas Animation
 */

class AIWaveEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.numNodes = 28;
    this.isRunning = false;
    this.step = 0;

    this.init();
  }

  init() {
    this.resize();
    this.nodes = [];
    for (let i = 0; i < this.numNodes; i++) {
      this.nodes.push({
        x: Math.random() * (this.canvas.width || 400),
        y: Math.random() * (this.canvas.height || 120),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 3 + 2,
        isPulse: Math.random() > 0.6,
        color: Math.random() > 0.4 ? '#00F3FF' : '#BD00FF'
      });
    }
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width || 500;
    this.canvas.height = rect.height || 120;
  }

  start() {
    this.resize();
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.step += 0.05;

    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Draw animated cyber sine waves
    this.ctx.lineWidth = 1.5;
    for (let wave = 0; wave < 3; wave++) {
      this.ctx.beginPath();
      const color = wave === 0 ? 'rgba(0, 243, 255, 0.4)' : wave === 1 ? 'rgba(189, 0, 255, 0.4)' : 'rgba(0, 255, 157, 0.3)';
      this.ctx.strokeStyle = color;

      for (let x = 0; x < w; x += 6) {
        const freq = 0.015 + wave * 0.005;
        const amp = 18 + wave * 6;
        const y = h / 2 + Math.sin(x * freq + this.step + wave * 1.2) * amp * Math.sin(this.step * 0.5);
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
    }

    // 2. Draw neural nodes & synapses
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > w) node.vx *= -1;
      if (node.y < 0 || node.y > h) node.vy *= -1;

      // Draw node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = node.color;
      this.ctx.shadowColor = node.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();

      // Connecting synoptic links
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n2 = this.nodes[j];
        const dx = node.x - n2.x;
        const dy = node.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 75) {
          const alpha = (1 - dist / 75) * 0.45;
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(n2.x, n2.y);
          this.ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();

          // Data packet traveling along line
          if (node.isPulse) {
            const pct = (Math.sin(this.step * 2) + 1) / 2;
            const px = node.x + (n2.x - node.x) * pct;
            const py = node.y + (n2.y - node.y) * pct;
            this.ctx.beginPath();
            this.ctx.arc(px, py, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fill();
          }
        }
      }
    }
  }
}

window.AIWaveEngine = AIWaveEngine;

