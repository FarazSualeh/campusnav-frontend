import { useEffect, useMemo, useRef, useState } from "react";

const DESKTOP_BREAKPOINT = 1024;
const ROUTE_PADDING = 0.18;
const ROUTE_EXTRA_ZOOM = 0.82;
const START_FOCUS_BIAS = 0.3;
const MIN_ROUTE_VIEW_WIDTH = 400;

export function useRouteViewBox({ routeNodeIds, nodes, width, height }) {
  const fullViewBox = useMemo(() => ({ x: 0, y: 0, width, height }), [width, height]);
  const [viewBox, setViewBox] = useState(fullViewBox);
  const animationFrameRef = useRef(null);
  const previousRouteKeyRef = useRef("");
  const viewBoxRef = useRef(fullViewBox);
  const dragRef = useRef(null);
  const nodeById = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [nodes]);

  useEffect(() => {
    viewBoxRef.current = viewBox;
  }, [viewBox]);

  useEffect(() => {
    const routeKey = routeNodeIds.join("|");
    if (!routeKey) {
      previousRouteKeyRef.current = "";
      if (viewBoxRef.current.width < width) {
        animateViewBox(viewBoxRef.current, fullViewBox, setViewBox, animationFrameRef);
      }
      return;
    }
    if (routeKey === previousRouteKeyRef.current) return;
    previousRouteKeyRef.current = routeKey;

    if (window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`).matches) {
      const routeNodes = routeNodeIds.map((id) => nodeById[id]).filter(Boolean);
      if (routeNodes.length > 0) {
        animateViewBox(viewBoxRef.current, getRouteViewBox(routeNodes, width, height), setViewBox, animationFrameRef);
      }
    }
  }, [routeNodeIds, nodeById, width, height, fullViewBox]);

  useEffect(() => () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const showFullFloor = () => {
    animateViewBox(viewBoxRef.current, fullViewBox, setViewBox, animationFrameRef);
  };

  const focusRoute = () => {
    const routeNodes = routeNodeIds.map((id) => nodeById[id]).filter(Boolean);
    if (routeNodes.length > 0) {
      animateViewBox(viewBoxRef.current, getRouteViewBox(routeNodes, width, height), setViewBox, animationFrameRef);
    }
  };

  const handlePointerDown = (event) => {
    if (viewBoxRef.current.width >= width - 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY, viewBox: viewBoxRef.current };
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = drag.viewBox.x - ((event.clientX - drag.clientX) * drag.viewBox.width) / rect.width;
    const nextY = drag.viewBox.y - ((event.clientY - drag.clientY) * drag.viewBox.height) / rect.height;
    setViewBox({
      ...drag.viewBox,
      x: clamp(nextX, 0, width - drag.viewBox.width),
      y: clamp(nextY, 0, height - drag.viewBox.height),
    });
  };

  const handlePointerEnd = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  return {
    viewBox,
    showFullFloor,
    focusRoute,
    isFramed: viewBox.width < width - 1,
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
}

function getRouteViewBox(routeNodes, width, height) {
  const xs = routeNodes.map((node) => node.x);
  const ys = routeNodes.map((node) => node.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const routeWidth = Math.max(maxX - minX, 40);
  const routeHeight = Math.max(maxY - minY, 40);
  const aspect = width / height;
  let viewWidth = routeWidth * (1 + ROUTE_PADDING * 2);
  let viewHeight = routeHeight * (1 + ROUTE_PADDING * 2);

  if (viewWidth / viewHeight > aspect) viewHeight = viewWidth / aspect;
  else viewWidth = viewHeight * aspect;

  viewWidth = Math.min(Math.max(viewWidth * ROUTE_EXTRA_ZOOM, Math.min(MIN_ROUTE_VIEW_WIDTH, width)), width);
  viewHeight = viewWidth / aspect;

  const routeCenterX = (minX + maxX) / 2;
  const routeCenterY = (minY + maxY) / 2;
  const startNode = routeNodes[0];
  const focusX = routeCenterX + (startNode.x - routeCenterX) * START_FOCUS_BIAS;
  const focusY = routeCenterY + (startNode.y - routeCenterY) * START_FOCUS_BIAS;

  return {
    x: clamp(focusX - viewWidth / 2, 0, width - viewWidth),
    y: clamp(focusY - viewHeight / 2, 0, height - viewHeight),
    width: viewWidth,
    height: viewHeight,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function animateViewBox(from, to, setViewBox, animationFrameRef) {
  if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  const start = performance.now();
  const duration = 450;

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setViewBox({
      x: from.x + (to.x - from.x) * eased,
      y: from.y + (to.y - from.y) * eased,
      width: from.width + (to.width - from.width) * eased,
      height: from.height + (to.height - from.height) * eased,
    });
    if (progress < 1) animationFrameRef.current = requestAnimationFrame(step);
  };

  animationFrameRef.current = requestAnimationFrame(step);
}
