import assert from "node:assert/strict";
import test from "node:test";
import { initAvatarMotion } from "../src/scripts/avatar-controller.ts";

// A deterministic browser clock exercises interruption and reversal without a
// browser dependency or slow real-time sleeps.
function setup({ reduced = false, initialWukong = true, hidden = false } = {}) {
  let now = 0;
  let nextId = 1;
  const timers = new Map();
  const frames = new Map();
  const view = {
    performance: { now: () => now },
    setTimeout(fn, delay) {
      const id = nextId++;
      timers.set(id, { fn, due: now + delay });
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    requestAnimationFrame(fn) {
      const id = nextId++;
      frames.set(id, fn);
      return id;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  const document = Object.assign(new EventTarget(), { defaultView: view, hidden });
  const button = Object.assign(new EventTarget(), {
    ownerDocument: document,
    focusVisible: false,
    matches: () => button.focusVisible,
  });
  const reduceMotion = Object.assign(new EventTarget(), { matches: reduced });
  let resolveReady;
  let rejectReady;
  const ready = new Promise((resolve, reject) => {
    resolveReady = resolve;
    rejectReady = reject;
  });
  const renders = [];
  const states = [];
  const cleanup = initAvatarMotion({
    button, reduceMotion, ready, initialWukong,
    render: (progress, animating) => renders.push({ progress, animating }),
    setState: (wukong) => states.push(wukong),
  });

  function advance(ms) {
    const end = now + ms;
    while (true) {
      const next = [...timers.entries()].filter(([, t]) => t.due <= end)
        .sort((a, b) => a[1].due - b[1].due)[0];
      if (!next) break;
      now = next[1].due;
      timers.delete(next[0]);
      next[1].fn();
    }
    now = end;
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((fn) => fn(now));
  }

  function fire(type, properties = {}, target = button) {
    const event = new Event(type);
    Object.assign(event, properties);
    target.dispatchEvent(event);
  }

  return {
    button, document, reduceMotion, renders, states, timers, frames,
    cleanup, advance, fire,
    ready: async (success = true) => { resolveReady(success); await Promise.resolve(); },
    failReady: async () => { rejectReady(new Error("Image failed")); await Promise.resolve(); },
    last: () => renders.at(-1),
    state: () => states.at(-1),
  };
}

test("opening waits for assets, holds Wukong, and settles on the portrait", async () => {
  const h = setup();
  h.advance(5000);
  assert.equal(h.last().progress, 0);
  assert.equal(h.timers.size, 0);
  await h.ready();
  h.advance(849);
  assert.equal(h.last().progress, 0);
  h.advance(1);
  assert.equal(h.state(), false);
  assert.equal(h.last().animating, true);
  h.advance(850);
  assert.equal(h.last().progress, 0.5);
  h.advance(850);
  assert.deepEqual(h.last(), { progress: 1, animating: false });
  assert.equal(h.frames.size, 0);
});

test("hover reverses from the current frame and repeated entry does not restart", async () => {
  const h = setup({ initialWukong: false });
  await h.ready();
  h.fire("pointerenter", { pointerType: "mouse" });
  h.advance(400);
  const middle = h.last().progress;
  assert.ok(middle > 0 && middle < 1);
  h.fire("pointerenter", { pointerType: "mouse" });
  h.advance(100);
  assert.equal(h.last().progress, 0.5);
  h.fire("pointerleave", { pointerType: "mouse" });
  assert.equal(h.last().progress, 0.5);
  assert.equal(h.state(), false);
  h.advance(650);
  assert.deepEqual(h.last(), { progress: 1, animating: false });
});

test("interaction before readiness permanently cancels the opening", async () => {
  const h = setup();
  h.fire("pointerenter", { pointerType: "mouse" });
  h.fire("pointerleave", { pointerType: "mouse" });
  assert.equal(h.last().progress, 1);
  await h.ready();
  h.advance(10000);
  assert.equal(h.last().progress, 1);
  assert.equal(h.timers.size, 0);
});

test("mouse click cannot stick the hover state; touch and keyboard can toggle", async () => {
  const h = setup({ initialWukong: false });
  await h.ready();
  h.fire("pointerenter", { pointerType: "mouse" });
  h.advance(1000);
  h.fire("pointerdown", { pointerType: "mouse" });
  h.fire("focus");
  h.fire("click", { detail: 1, pointerType: "mouse" });
  assert.equal(h.state(), true);
  h.fire("pointerleave", { pointerType: "mouse" });
  h.advance(1300);
  assert.equal(h.last().progress, 1);

  h.fire("pointerenter", { pointerType: "touch" });
  assert.equal(h.state(), false);
  h.fire("pointerdown", { pointerType: "touch" });
  h.fire("click", { detail: 1 });
  h.advance(1000);
  assert.equal(h.last().progress, 0);
  h.fire("click", { detail: 0 });
  h.advance(1300);
  assert.equal(h.last().progress, 1);
});

test("keyboard-visible focus reveals Wukong, activation toggles, and blur restores", async () => {
  const h = setup({ initialWukong: false });
  await h.ready();
  h.button.focusVisible = true;
  h.fire("focus");
  h.advance(1000);
  assert.equal(h.last().progress, 0);
  h.fire("click", { detail: 0 });
  h.advance(1300);
  assert.equal(h.last().progress, 1);
  h.fire("click", { detail: 0 });
  h.advance(1000);
  h.fire("blur");
  h.advance(1300);
  assert.equal(h.last().progress, 1);
});

test("reduced motion skips opening and transitions but preserves interaction", async () => {
  const h = setup({ reduced: true });
  assert.equal(h.last().progress, 1);
  await h.ready();
  assert.equal(h.timers.size, 0);
  h.fire("pointerenter", { pointerType: "mouse" });
  assert.deepEqual(h.last(), { progress: 0, animating: false });
  assert.equal(h.frames.size, 0);
  h.fire("pointerleave", { pointerType: "mouse" });
  assert.equal(h.last().progress, 1);
});

test("enabling reduced motion midway settles the selected target and clears frames", async () => {
  const h = setup({ initialWukong: false });
  await h.ready();
  h.fire("pointerenter", { pointerType: "mouse" });
  h.advance(300);
  h.reduceMotion.matches = true;
  h.fire("change", {}, h.reduceMotion);
  assert.deepEqual(h.last(), { progress: 0, animating: false });
  assert.equal(h.frames.size, 0);
  h.reduceMotion.matches = false;
  h.fire("change", {}, h.reduceMotion);
  h.fire("pointerleave", { pointerType: "mouse" });
  assert.equal(h.last().animating, true);
  h.advance(1300);
  assert.equal(h.last().progress, 1);
});

test("asset failure and rejection settle on the portrait with working static toggles", async () => {
  for (const reject of [false, true]) {
    const h = setup();
    if (reject) await h.failReady();
    else await h.ready(false);
    assert.deepEqual(h.last(), { progress: 1, animating: false });
    h.fire("pointerenter", { pointerType: "mouse" });
    assert.deepEqual(h.last(), { progress: 0, animating: false });
    h.fire("pointerleave", { pointerType: "mouse" });
    assert.equal(h.last().progress, 1);
    assert.equal(h.frames.size, 0);
  }
});

test("hidden tabs settle the opening or selected target without orphan frames", async () => {
  const h = setup();
  await h.ready();
  h.document.hidden = true;
  h.fire("visibilitychange", {}, h.document);
  assert.deepEqual(h.last(), { progress: 1, animating: false });
  assert.equal(h.timers.size, 0);
  h.document.hidden = false;
  h.fire("visibilitychange", {}, h.document);
  h.fire("pointerenter", { pointerType: "mouse" });
  h.advance(500);
  h.document.hidden = true;
  h.fire("visibilitychange", {}, h.document);
  assert.deepEqual(h.last(), { progress: 0, animating: false });
  assert.equal(h.frames.size, 0);
});

test("cleanup removes handlers, timers, frames, and pending readiness callbacks", async () => {
  const h = setup();
  h.cleanup();
  const renderCount = h.renders.length;
  await h.ready();
  h.fire("pointerenter", { pointerType: "mouse" });
  h.fire("click", { detail: 0 });
  h.advance(10000);
  assert.equal(h.renders.length, renderCount);
  assert.equal(h.timers.size, 0);
  assert.equal(h.frames.size, 0);

  const active = setup({ initialWukong: false });
  await active.ready();
  active.fire("pointerenter", { pointerType: "mouse" });
  assert.equal(active.frames.size, 1);
  active.cleanup();
  active.cleanup();
  assert.equal(active.frames.size, 0);
});
