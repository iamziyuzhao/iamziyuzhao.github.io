/** Interpolate the existing hand-aligned morph frames and paint a brief cloud
 * veil. Everything is a function of progress, so reversing never restarts the
 * effects. At rest the real <img> is visible and no canvas loop runs. */
export function createAvatarRenderer(button: HTMLButtonElement, canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const strip = new Image();
  const frames = Number(button.dataset.morphFrames);
  const size = 480;
  let loaded = false;
  strip.src = button.dataset.morphSrc ?? "";

  const images = Array.from(button.querySelectorAll("img"));
  let timeout = 0;
  const ready = Promise.race([
    Promise.all([strip.decode(), ...images.map((image) => image.decode())]).then(() =>
      Boolean(context && frames > 1 && strip.naturalWidth === frames * strip.naturalHeight)
    ).catch(() => false),
    new Promise<boolean>((resolve) => { timeout = window.setTimeout(() => resolve(false), 6000); }),
  ]).then((success) => {
    window.clearTimeout(timeout);
    loaded = success;
    return success;
  });

  // Fixed seeds avoid random flickering when the pointer changes direction.
  const motes = Array.from({ length: 22 }, (_, i) => ({
    angle: i * 2.399963,
    radius: 62 + ((i * 37) % 126),
    size: 0.8 + (i % 3) * 0.5,
  }));

  const render = (progress: number, animating: boolean) => {
    const active = Boolean(animating && loaded && context);
    canvas.classList.toggle("is-playing", active);
    if (!active || !context) {
      button.style.setProperty("--aura", "0");
      return;
    }
    const ctx = context;
    const p = Math.max(0, Math.min(1, progress));
    const energy = Math.pow(Math.sin(p * Math.PI), 1.5);
    button.style.setProperty("--aura", (energy * 0.6).toFixed(3));

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    // A very small push-in gives the transformation depth without moving layout.
    const zoom = 1 + 0.025 * energy;
    ctx.translate(size / 2, size / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-size / 2, -size / 2);

    const frame = p * (frames - 1);
    const low = Math.floor(frame);
    const blend = frame - low;
    const frameSize = strip.naturalHeight;
    const drawFrame = (index: number) => {
      ctx.drawImage(strip, index * frameSize, 0, frameSize, frameSize, 0, 0, size, size);
    };
    drawFrame(low);
    if (blend > 0) {
      ctx.globalAlpha = blend;
      drawFrame(Math.min(frames - 1, low + 1));
      ctx.globalAlpha = 1;
    }

    // Warm, soft clouds briefly cover the changing silhouette. The still
    // portraits are never tinted, blurred, or replaced by generated artwork.
    const glow = ctx.createRadialGradient(240, 208, 12, 240, 224, 265);
    glow.addColorStop(0, `rgba(255, 236, 177, ${0.23 * energy})`);
    glow.addColorStop(0.52, `rgba(245, 198, 105, ${0.13 * energy})`);
    glow.addColorStop(1, "rgba(245, 198, 105, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 7; i++) {
      const angle = i * 0.92 + p * 2.1;
      const x = 240 + Math.cos(angle) * (100 + i * 8);
      const y = 245 + Math.sin(angle) * (80 + i * 10) - p * 35;
      const radius = 74 + (i % 3) * 18;
      const cloud = ctx.createRadialGradient(x, y, 0, x, y, radius);
      cloud.addColorStop(0, `rgba(255, 242, 209, ${0.29 * energy})`);
      cloud.addColorStop(0.5, `rgba(242, 211, 155, ${0.13 * energy})`);
      cloud.addColorStop(1, "rgba(242, 211, 155, 0)");
      ctx.fillStyle = cloud;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    // Two wisps echo the curling clouds in the original Wukong illustration.
    ctx.lineCap = "round";
    for (let i = 0; i < 2; i++) {
      ctx.save();
      ctx.translate(240, 240);
      ctx.rotate(p * 1.6 + i * Math.PI);
      ctx.strokeStyle = `rgba(255, 229, 164, ${0.5 * energy})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-215, 58);
      ctx.bezierCurveTo(-122, 115, 164, 134, 173, 24);
      ctx.bezierCurveTo(180, -27, 104, -30, 118, 13);
      ctx.stroke();
      ctx.restore();
    }

    for (const mote of motes) {
      const angle = mote.angle + p * 1.4;
      const radius = mote.radius * (0.82 + p * 0.28);
      const x = 240 + Math.cos(angle) * radius;
      const y = 240 + Math.sin(angle) * radius - 25 * p;
      ctx.fillStyle = `rgba(255, 227, 156, ${0.8 * energy})`;
      ctx.beginPath();
      ctx.arc(x, y, mote.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  return { ready, render };
}
