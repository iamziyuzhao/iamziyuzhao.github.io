export interface AvatarMotionOptions {
  button: HTMLButtonElement;
  reduceMotion: MediaQueryList;
  ready: Promise<boolean>;
  initialWukong: boolean;
  /** 0 is Wukong; 1 is the portrait. Intermediate values belong to the renderer. */
  render: (progress: number, animating: boolean) => void;
  /** Reports the current target, so the button's accessible state stays in sync. */
  setState: (wukong: boolean) => void;
}

/** Connects the avatar renderer to pointer, keyboard, and touch interactions. */
export function initAvatarMotion(options: AvatarMotionOptions): () => void {
  const { button, reduceMotion, ready, render, setState } = options;
  const document = button.ownerDocument;
  const view = document.defaultView;
  let disposed = false;
  let assetsReady = false;
  let animatedAssets = false;
  let interacted = false;
  let hoverActive = false;
  let keyboardFocused = false;
  let keyboardWukong = true;
  let lastPointerType = "mouse";
  let targetWukong = options.initialWukong && !reduceMotion.matches && !document.hidden;
  let progress = targetWukong ? 0 : 1;
  let frame: number | undefined;
  let introTimer: number | undefined;

  // The first pause gives visitors time to recognize Wukong. The longer opening
  // transition introduces the effect; later hover transitions respond more quickly.
  const INTRO_HOLD_MS = 850;
  const INTRO_TRANSITION_MS = 1700;
  const TO_WUKONG_MS = 1000;
  const TO_PORTRAIT_MS = 1300;

  function cancelIntro() {
    if (introTimer !== undefined) view?.clearTimeout(introTimer);
    introTimer = undefined;
  }

  function cancelFrame() {
    if (frame !== undefined) view?.cancelAnimationFrame(frame);
    frame = undefined;
  }

  function markInteraction() {
    interacted = true;
    cancelIntro();
  }

  function moveTo(wukong: boolean, fullDuration: number, forceStatic = false) {
    if (disposed) return;
    const destination = wukong ? 0 : 1;
    const canAnimate = assetsReady && animatedAssets && !reduceMotion.matches &&
      !document.hidden && !!view && !forceStatic;

    // Repeated focus/pointer events should not restart an in-flight transition.
    if (wukong === targetWukong && frame !== undefined && canAnimate) return;

    cancelFrame();
    if (targetWukong !== wukong) {
      targetWukong = wukong;
      setState(wukong);
    }

    const distance = Math.abs(destination - progress);
    if (!canAnimate || distance < 0.0001) {
      progress = destination;
      render(progress, false);
      return;
    }

    // Start from the last drawn frame, including when direction changes midway.
    // Scale duration by the remaining distance so a small reversal is not sluggish.
    const from = progress;
    const duration = fullDuration * distance;
    const started = view.performance.now();
    render(progress, true);

    function tick(now: number) {
      if (disposed) return;
      const elapsed = Math.min(1, Math.max(0, (now - started) / duration));
      const eased = elapsed * elapsed * (3 - 2 * elapsed);
      progress = from + (destination - from) * eased;
      if (elapsed === 1) {
        frame = undefined;
        progress = destination;
        render(progress, false);
      } else {
        render(progress, true);
        frame = view!.requestAnimationFrame(tick);
      }
    }

    frame = view.requestAnimationFrame(tick);
  }

  function interact(wukong: boolean) {
    markInteraction();
    moveTo(wukong, wukong ? TO_WUKONG_MS : TO_PORTRAIT_MS);
  }

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    hoverActive = true;
    interact(true);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    hoverActive = false;
    interact(keyboardFocused ? keyboardWukong : false);
  }

  function onPointerDown(event: PointerEvent) {
    lastPointerType = event.pointerType || "mouse";
    markInteraction();
  }

  function onFocus() {
    markInteraction();
    // Mouse/touch focus must not keep the hover image visible after pointer leave.
    if (!button.matches(":focus-visible")) return;
    keyboardFocused = true;
    keyboardWukong = true;
    moveTo(true, TO_WUKONG_MS);
  }

  function onBlur() {
    if (!keyboardFocused) return;
    keyboardFocused = false;
    interact(hoverActive);
  }

  function onClick(event: MouseEvent) {
    const pointerType = (event as PointerEvent).pointerType || lastPointerType;
    // A native keyboard activation has detail=0. Touch clicks have a remembered
    // pointer type; ordinary mouse clicks leave the hover behavior in control.
    if (event.detail > 0 && pointerType === "mouse") return;
    keyboardWukong = !targetWukong;
    interact(keyboardWukong);
  }

  function onMotionChange() {
    if (!reduceMotion.matches) return;
    cancelIntro();
    // An unattended opening settles on the portrait. User-selected images remain.
    moveTo(interacted ? targetWukong : false, 0, true);
  }

  function onVisibilityChange() {
    if (!document.hidden) return;
    cancelIntro();
    // Browsers throttle hidden-tab frames. Settle immediately instead of leaving
    // a half-finished image that suddenly jumps when the visitor returns.
    moveTo(interacted ? targetWukong : false, 0, true);
  }

  button.addEventListener("pointerenter", onPointerEnter);
  button.addEventListener("pointerleave", onPointerLeave);
  button.addEventListener("pointerdown", onPointerDown);
  button.addEventListener("focus", onFocus);
  button.addEventListener("blur", onBlur);
  button.addEventListener("click", onClick);
  reduceMotion.addEventListener("change", onMotionChange);
  document.addEventListener("visibilitychange", onVisibilityChange);

  setState(targetWukong);
  render(progress, false);

  function onReady(success: boolean) {
    if (disposed) return;
    assetsReady = true;
    animatedAssets = success;
    if (!success) {
      cancelIntro();
      moveTo(false, 0, true);
      return;
    }

    // Repaint even if the scalar has not changed: the renderer now has its assets.
    render(progress, false);
    if (interacted || !targetWukong || reduceMotion.matches || document.hidden || !view) return;
    introTimer = view.setTimeout(() => {
      introTimer = undefined;
      moveTo(false, INTRO_TRANSITION_MS);
    }, INTRO_HOLD_MS);
  }

  Promise.resolve(ready).then(onReady, () => onReady(false));

  return function cleanup() {
    if (disposed) return;
    disposed = true;
    cancelIntro();
    cancelFrame();
    button.removeEventListener("pointerenter", onPointerEnter);
    button.removeEventListener("pointerleave", onPointerLeave);
    button.removeEventListener("pointerdown", onPointerDown);
    button.removeEventListener("focus", onFocus);
    button.removeEventListener("blur", onBlur);
    button.removeEventListener("click", onClick);
    reduceMotion.removeEventListener("change", onMotionChange);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
