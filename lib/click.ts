/**
 * A short synthesized click. Uses the Web Audio API rather than an audio
 * file: no network request, and the envelope can be tuned to stay soft.
 *
 * The AudioContext is created lazily on first use, because browsers refuse
 * to start one before a user gesture.
 */

let ctx: AudioContext | null = null;

export function click(volume = 0.02) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // A narrow pitch drop over 35ms at very low gain: present enough to
    // register as feedback, quiet enough not to carry across a room.
    osc.type = "sine";
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.021);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.045);
  } catch {
    // Audio is a nicety; never let it break an interaction.
  }
}
