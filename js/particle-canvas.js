/**
 * GUARDIANSPACE: ANTI-GRAVITY DEFENSE
 * Zero-Gravity Particle Field & Quantum Flashes Canvas Engine
 * Adaptive Colors for Dark & Light Themes
 */

class ZeroGravityParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 75;
    this.mouse = { x: -1000, y: -1000, radius: 140 };
    this.flashes = [];

    this.init();
    this.bindEvents();
    this.animate();
  }

  isLightTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  init() {
    this.resize();
    this.particles = [];

    const isLight = this.isLightTheme();

    // Dark theme vibrant neon vs Light theme rich contrast colors
    const colors = isLight ? [
      { r: 0, g: 119, b: 182 },   // Deep Vibrant Cyan
      { r: 138, g: 0, b: 194 },   // Deep Vibrant Magenta
      { r: 0, g: 135, b: 90 },    // Deep Emerald
      { r: 30, g: 41, b: 59 }     // Slate Shadow Star
    ] : [
      { r: 0, g: 243, b: 255 },  // Cyan
      { r: 189, g: 0, b: 255 },  // Magenta
      { r: 0, g: 255, b: 157 },  // Green
      { r: 255, g: 255, b: 255 }  // White star
    ];

    for (let i = 0; i < this.numParticles; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2.2 + 0.8,
        color: color,
        vx: (Math.random() - 0.5) * 0.45,
        // Negative vertical velocity for Zero-Gravity upward drift!
        vy: -(Math.random() * 0.45 + 0.15),
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI
      });
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Occasional quantum bursts
    setInterval(() => {
      if (Math.random() > 0.4) {
        this.createFlash();
      }
    }, 4500);
  }

  createFlash() {
    this.flashes.push({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: 0,
      maxRadius: Math.random() * 80 + 40,
      color: Math.random() > 0.5 ? 'rgba(0, 243, 255,' : 'rgba(189, 0, 255,',
      alpha: 0.7
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw quantum flashes
    for (let f = this.flashes.length - 1; f >= 0; f--) {
      const flash = this.flashes[f];
      flash.radius += 2.5;
      flash.alpha -= 0.022;

      if (flash.alpha <= 0) {
        this.flashes.splice(f, 1);
        continue;
      }

      const grad = this.ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, flash.radius);
      grad.addColorStop(0, `${flash.color}${flash.alpha})`);
      grad.addColorStop(1, `${flash.color}0)`);

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 2. Update and render particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Anti-gravity upward movement + subtle wave
      p.pulseVal += p.pulseSpeed;
      p.x += p.vx + Math.sin(p.pulseVal) * 0.2;
      p.y += p.vy;

      // Mouse repulsion (Zero-Gravity displacement)
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius && dist > 0) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p.x += (dx / dist) * force * 4.5;
        p.y += (dy / dist) * force * 4.5;
      }

      // Screen wrap around (re-enter from bottom for endless upward float)
      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;

      // Pulsing alpha
      const currentAlpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.2;
      const safeAlpha = Math.max(0.05, Math.min(0.9, currentAlpha));

      // Draw particle glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${safeAlpha})`;
      this.ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();

      // Constellation lines to nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const lineDx = p.x - p2.x;
        const lineDy = p.y - p2.y;
        const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

        if (lineDist < 100) {
          const lineAlpha = (1 - lineDist / 100) * (this.isLightTheme() ? 0.22 : 0.16);
          const lineColor = this.isLightTheme() ? '0, 119, 182' : '0, 243, 255';
          this.ctx.strokeStyle = `rgba(${lineColor}, ${lineAlpha})`;
          this.ctx.lineWidth = 0.7;
          this.ctx.shadowBlur = 0;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }
}

// Auto instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.particleEngine = new ZeroGravityParticleEngine('canvas-particles');
});

