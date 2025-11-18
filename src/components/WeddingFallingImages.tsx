import React, { useEffect, useRef } from "react";
import { IMAGE_FLOWER } from "../constants/common";

type Props = {
  images: string[];            // particle images (hearts/flowers...)
  doveImage?: string;          // image for dove
  musicUrl?: string | null;    // optional music file to sync bass
  enableGlitter?: boolean;
  enableFireworks?: boolean;
  enableDoves?: boolean;
  enableBokeh?: boolean;
  enableSync?: boolean;
  slowMotion?: boolean;
  zIndex?: number;
};

type Particle = {
  imgSrc: string;
  img?: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  speed: number;
  drift: number;
  angle: number;
  rotateSpeed: number;
  opacity: number;
  zRot: number;
  spin3D: number;
  trail: { x: number; y: number; life: number }[]; // for glitter trails
};

type Burst = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  img?: HTMLImageElement;
  size: number;
  life: number;
  angle: number;
  rotateSpeed: number;
};

type Dove = {
  img?: HTMLImageElement;
  t: number; // progress 0..1
  path: { x: number; y: number }[]; // bezier points
  size: number;
  speed: number;
  angle: number;
};

export default function WeddingFallingImages({
  images,
  doveImage,
  musicUrl,
  enableGlitter = true,
  enableFireworks = true,
  enableDoves = true,
  enableBokeh = true,
  enableSync = true,
  slowMotion = false,
  zIndex = 9999,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const bassLevelRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const doc = document;
    const onVis = () => (visibleRef.current = !doc.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // ---------- preload images ----------
    const loadedImgs: Record<string, HTMLImageElement> = {};
    const preload = (src: string) =>
      new Promise<HTMLImageElement>((res) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
          loadedImgs[src] = img;
          res(img);
        };
        img.onerror = () => {
          // fallback: create tiny transparent canvas so drawImage won't crash
          const fallback = document.createElement("canvas");
          fallback.width = fallback.height = 10;
          const fctx = fallback.getContext("2d")!;
          fctx.clearRect(0, 0, 10, 10);
          const el = new Image();
          el.src = fallback.toDataURL();
          loadedImgs[src] = el;
          res(el);
        };
      });

    // preload all images + dove
    const preloadAll = async () => {
      const promises = images.map(preload);
      if (doveImage) promises.push(preload(doveImage));
      await Promise.all(promises);
    };

    // ---------- audio setup (optional) ----------
    const setupAudio = async () => {
      if (!musicUrl || !enableSync) return;
      try {
        const audio = new Audio(musicUrl);
        audio.loop = true;
        audio.crossOrigin = "anonymous";
        await audio.play().catch(() => {
          // autoplay may be blocked; user must start; still create context and analyser
        });
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ac = new AudioCtx();
        audioCtxRef.current = ac;
        const analyser = ac.createAnalyser();
        analyser.fftSize = 512;
        analyserRef.current = analyser;
        const source = ac.createMediaElementSource(audio);
        sourceRef.current = source;
        source.connect(analyser);
        analyser.connect(ac.destination);
        // We intentionally don't call audio.play() here forcibly; if blocked user action required.
      } catch (e) {
        console.warn("Audio setup failed", e);
      }
    };

    // ---------- generator helpers ----------
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    // Create 3 layers
    const createParticle = (depthScale: number, speedScale: number): Particle => {
      const src = images[Math.floor(Math.random() * images.length)];
      const img = loadedImgs[src]; // may be undefined until preloaded
      const size = rand(18, 44) * depthScale;
      return {
        imgSrc: src,
        img,
        x: Math.random() * W,
        y: rand(-H, 0),
        vx: rand(-0.3, 0.3),
        vy: rand(0.3, 1.2) * speedScale,
        size,
        speed: rand(0.4, 1.0) * speedScale,
        drift: rand(0.2, 1.2),
        angle: Math.random() * Math.PI * 2,
        rotateSpeed: rand(0.002, 0.02) * depthScale,
        opacity: rand(0.6, 1),
        zRot: Math.random() * Math.PI,
        spin3D: rand(0.002, 0.03),
        trail: [],
      };
    };

    // initial populations (caps for performance)
    // back: mostly sparkles (if exist)
    const backCount = 12;
    const midCount = 28;   // flowers
    const frontCount = 10; // hearts (fewer)
    const layerBack: Particle[] = Array.from({ length: backCount }, () => createParticle(0.55, 0.35));
    const layerMid: Particle[] = Array.from({ length: midCount }, () => createParticle(1.0, 1.0));
    const layerFront: Particle[] = Array.from({ length: frontCount }, () => createParticle(1.4, 1.4));
    const layers = [layerBack, layerMid, layerFront];

    // bursts & sparkles & doves arrays
    const bursts: Burst[] = [];
    const sparkles: { x: number; y: number; life: number; size: number }[] = [];
    const doves: Dove[] = [];

    // spawn helper (firework burst)
    const spawnBurst = (cx: number, cy: number) => {
      const pieces = 6 + Math.floor(Math.random() * 8);
      for (let i = 0; i < pieces; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(1.2, 3.0);
        bursts.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.5,
          img: loadedImgs[IMAGE_FLOWER] || loadedImgs[images[0]],
          size: rand(18, 42),
          life: 1.0,
          angle: Math.random() * Math.PI * 2,
          rotateSpeed: rand(-0.08, 0.08),
        });
      }
    };

    // spawn dove (Bezier path)
    const spawnDove = () => {
      if (!doveImage || !loadedImgs[doveImage]) return;
      const startX = -100;
      const startY = rand(50, H * 0.3);
      const cp1 = { x: rand(W * 0.2, W * 0.4), y: rand(0, H * 0.3) };
      const cp2 = { x: rand(W * 0.6, W * 0.8), y: rand(H * 0.1, H * 0.4) };
      const end = { x: W + 100, y: rand(0, H * 0.2) };
      const path = [
        { x: startX, y: startY },
        cp1,
        cp2,
        end,
      ];
      doves.push({
        img: loadedImgs[doveImage],
        t: 0,
        path,
        size: rand(48, 86),
        speed: rand(0.0008, 0.0018), // progress per ms
        angle: 0,
      });
    };

    // glitter spawn
    const spawnGlitter = (x: number, y: number) => {
      sparkles.push({ x, y, life: 1, size: rand(1.5, 4) });
    };

    // time tracking
    let last = performance.now();

    // setup audio analyser polling
    let analyserData = new Uint8Array(128);
    const updateAudio = () => {
      const analyser = analyserRef.current;
      if (!analyser) {
        bassLevelRef.current = 0;
        return;
      }
      analyser.getByteFrequencyData(analyserData);
      // take low-frequency bin average (e.g., bins 2..8)
      let sum = 0;
      const lowCount = 6;
      for (let i = 2; i < 2 + lowCount; i++) sum += analyserData[i] ?? 0;
      const avg = sum / lowCount / 255; // 0..1
      bassLevelRef.current = avg;
    };

    // periodic spawns influenced by bass
    let burstTimer = 0;
    let doveTimer = 0;

    // helper: cubic bezier evaluate
    const cubicBezier = (t: number, p0: any, p1: any, p2: any, p3: any) => {
      const u = 1 - t;
      return {
        x:
          u * u * u * p0.x +
          3 * u * u * t * p1.x +
          3 * u * t * t * p2.x +
          t * t * t * p3.x,
        y:
          u * u * u * p0.y +
          3 * u * u * t * p1.y +
          3 * u * t * t * p2.y +
          t * t * t * p3.y,
      };
    };

    // visibility pause/resume
    const shouldAnimate = () => visibleRef.current && document.hasFocus();

    // main draw loop
    function draw(now = performance.now()) {
      if (!shouldAnimate()) {
        rafRef.current = requestAnimationFrame(draw);
        last = now;
        return;
      }

      const dt = Math.min(40, now - last); // ms, cap
      last = now;

      // timeScale influenced by slowMotion and bass
      let timeScale = slowMotion ? 0.45 : 1;
      if (enableSync) timeScale *= 1 + bassLevelRef.current * 1.5; // bass boost

      // clear
      ctx.clearRect(0, 0, W, H);

      // bokeh overlay draw (behind everything subtle)
      if (enableBokeh) {
        // draw faint bokeh using radial gradients
        for (let i = 0; i < 6; i++) {
          const gx = (i * 173) % W;
          const gy = (i * 97) % H;
          const r = 120 + (i * 40) % 160;
          const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
          g.addColorStop(0, `rgba(255,255,255,${0.02 + i * 0.01})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, W, H);
        }
      }

      // update audio data
      if (enableSync) updateAudio();

      // render layers
      for (let li = 0; li < layers.length; li++) {
        const depthLayer = layers[li];
        // depth multiplier to make front layer more vivid
        const depthMult = 0.6 + li * 0.7;

        for (const p of depthLayer) {
          // lazy-attach image when preloaded
          if (!p.img) p.img = loadedImgs[p.imgSrc];

          // skip if image not ready
          if (!p.img || !p.img.complete || p.img.naturalWidth === 0) {
            // still update position lightly so it will reappear later
            p.y += (p.speed * 0.15) * timeScale;
            continue;
          }

          // movement influenced by timeScale and bass
          p.y += p.speed * timeScale;
          p.x += Math.sin(p.y * 0.008 * depthMult) * p.drift * timeScale;
          p.angle += p.rotateSpeed * timeScale;
          p.zRot += p.spin3D * timeScale;

          // loop
          if (p.y > H + 80) {
            p.y = -80 - Math.random() * 60;
            p.x = Math.random() * W;
          }

          // update trail
          if (enableGlitter) {
            p.trail.unshift({ x: p.x, y: p.y, life: 1 });
            if (p.trail.length > 8) p.trail.pop();
          }

          // draw trail (glitter)
          if (enableGlitter && p.trail.length) {
            for (let i = 0; i < p.trail.length; i++) {
              const t = p.trail[i];
              ctx.save();
              ctx.globalAlpha = (t.life * 0.08) * (1 - i / p.trail.length);
              ctx.fillStyle = `rgba(255,255,255,${0.9})`;
              ctx.beginPath();
              ctx.arc(t.x, t.y, (p.size * 0.07) * (1 - i / p.trail.length), 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          // draw particle with 3D scale breathing
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle + Math.sin(p.zRot) * 0.05);
          const scale3D = 0.85 + Math.sin(p.zRot * 0.7) * 0.2;
          ctx.globalAlpha = clamp(p.opacity * (0.85 + Math.sin(p.y * 0.01) * 0.12), 0.2, 1);
          ctx.scale(scale3D, scale3D);
          ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();

          // spawn small sparkles occasionally
          if (enableGlitter && Math.random() < 0.007 * depthMult) {
            spawnGlitter(p.x + rand(-6, 6), p.y + rand(-6, 6));
          }
        }
      }

      // draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = s.life;
        ctx.fillStyle = `rgba(255,240,220,${0.9})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        s.life -= 0.02;
        s.y += 0.6 * timeScale;
        if (s.life <= 0) sparkles.splice(i, 1);
      }

      // update bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        if (!b.img) b.img = loadedImgs[images[0]];
        ctx.save();
        ctx.globalAlpha = b.life;
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        ctx.drawImage(b.img!, -b.size / 2, -b.size / 2, b.size, b.size);
        ctx.restore();

        b.x += b.vx * timeScale;
        b.y += b.vy * timeScale;
        b.vy += 0.03 * timeScale; // gravity
        b.angle += b.rotateSpeed * timeScale;
        b.life -= 0.02 * timeScale;
        if (b.life <= 0) bursts.splice(i, 1);
      }

      // update doves
      for (let i = doves.length - 1; i >= 0; i--) {
        const dv = doves[i];
        dv.t += dv.speed * (dt) * (slowMotion ? 0.7 : 1) * (1 + bassLevelRef.current);
        const p = cubicBezier(dv.t, dv.path[0], dv.path[1], dv.path[2], dv.path[3]);
        if (dv.img && dv.img.complete) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(dv.t * Math.PI * 2) * 0.4);
          ctx.globalAlpha = 0.95;
          ctx.drawImage(dv.img, -dv.size / 2, -dv.size / 2, dv.size, dv.size);
          ctx.restore();
        }
        if (dv.t >= 1) doves.splice(i, 1);
      }

      // audio-driven spawns
      burstTimer += dt;
      doveTimer += dt;
      if (enableFireworks && burstTimer > 1800 - bassLevelRef.current * 1200) {
        // spawn burst near top randomly, frequency increases with bass
        spawnBurst(rand(60, W - 60), rand(-30, 40));
        burstTimer = 0;
      }
      if (enableDoves && doveTimer > 12000 - bassLevelRef.current * 6000) {
        spawnDove();
        doveTimer = 0;
      }

      // sometimes spawn additional top bursts when bass peaks
      if (enableSync && bassLevelRef.current > 0.3 && Math.random() < bassLevelRef.current * 0.15) {
        spawnBurst(rand(60, W - 60), rand(-50, 10));
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    // start
    let running = true;
    const startAll = async () => {
      await preloadAll();
      if (musicUrl && enableSync) await setupAudio();
      // schedule initial bursts/doves
      setTimeout(() => spawnBurst(W / 2, -30), 500);
      setTimeout(() => spawnDove(), 1200);
      rafRef.current = requestAnimationFrame(draw);
    };
    startAll();

    // cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // stop audio
      try {
        sourceRef.current?.disconnect();
        analyserRef.current?.disconnect();
        audioCtxRef.current?.close();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, doveImage, musicUrl, enableGlitter, enableFireworks, enableDoves, enableBokeh, enableSync, slowMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex,
      }}
    />
  );
}

/* Helpers (local) */
function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
