/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Security Intelligence & Interactive Hint System
 */

class HintSystem {
  constructor() {
    this.currentHints = [];
    this.activeHintIndex = 0;
  }

  setHints(hintsList) {
    this.currentHints = Array.isArray(hintsList) ? hintsList : [hintsList];
    this.activeHintIndex = 0;
  }

  openHintModal() {
    window.cyberAudio?.playAlert();
    const modal = document.getElementById('modal-hint-box');
    const content = document.getElementById('modal-hint-content');
    if (!modal || !content) return;

    if (!this.currentHints || this.currentHints.length === 0) {
      content.innerHTML = `
        <div style="text-align:center; padding: 20px;">
          <p style="color: var(--text-muted);">Tidak ada intelijen tambahan yang aktif pada skenario ini. Amati setiap indikator secara seksama.</p>
        </div>
      `;
    } else {
      let itemsHtml = this.currentHints.map((hint, idx) => `
        <div style="background: rgba(5,5,10,0.7); border-left: 3px solid var(--neon-amber); padding: 12px 16px; margin-bottom: 10px; border-radius: 4px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-amber); margin-bottom: 4px; font-weight: 700;">
            INTEL DEKRIPSI #${idx + 1}
          </div>
          <div style="font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
            ${hint}
          </div>
        </div>
      `).join('');

      content.innerHTML = `
        <div>
          <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 16px; color: var(--neon-amber);">
            <span style="font-size: 1.4rem;">💡</span>
            <h3 style="font-size: 1.15rem; letter-spacing: 1px;">INTELIJEN ANCAMAN & PETUNJUK FORENSIK</h3>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">
            Gunakan petunjuk taktis ini untuk menganalisis manipulasi psikologis, anomali URL, dan indikator teknis:
          </p>
          ${itemsHtml}
        </div>
      `;
    }

    modal.classList.add('active');
  }

  closeHintModal() {
    window.cyberAudio?.playClick();
    const modal = document.getElementById('modal-hint-box');
    if (modal) modal.classList.remove('active');
  }
}

window.hintSystem = new HintSystem();

