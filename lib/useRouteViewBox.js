import { useEffect, useMemo, useRef, useState } from "react";

const DESKTOP_BREAKPOINT = 1024;
const ROUTE_PADDING = 0.18;
const ROUTE_EXTRA_ZOOM = 0.82;
const START_FOCUS_BIAS = 0.3;
const MIN_ROUTE_VIEW_WIDTH = 400;
const MIN_ZOOM_VIEW_WIDTH = 220;

export function useRouteViewBox({ routeNodeIds, nodes, width, height }) {
  const fullViewBox = useMemo(() => ({ x: 0, y: 0, width, height }), [width, height]);
  const [viewBox, setViewBox] = useState(fullViewBox);
  const animationFrameRef = useRef(null);
  const previousRouteKeyRef = useRef("");
  const viewBoxRef = useRef(fullViewBox);
  const dragRef = useRef(null);
  const zoomFrameRef = useRef(null);
  const dragFrameRef = useRef(null);
  const latestPointerRef = useRef(null);
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
    if (zoomFrameRef.current) cancelAnimationFrame(zoomFrameRef.current);
    if (dragFrameRef.current) cancelAnimationFrame(dragFrameRef.current);
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
    latestPointerRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      rect: event.currentTarget.getBoundingClientRect(),
    };
    if (dragFrameRef.current) return;
    dragFrameRef.current = requestAnimationFrame(() => {
      const pointer = latestPointerRef.current;
      const currentDrag = dragRef.current;
      if (pointer && currentDrag) {
        const nextX =
          currentDrag.viewBox.x -
          ((pointer.clientX - currentDrag.clientX) * currentDrag.viewBox.width) / pointer.rect.width;
        const nextY =
          currentDrag.viewBox.y -
          ((pointer.clientY - currentDrag.clientY) * currentDrag.viewBox.height) / pointer.rect.height;
        const nextViewBox = {
          ...currentDrag.viewBox,
          x: clamp(nextX, 0, width - currentDrag.viewBox.width),
          y: clamp(nextY, 0, height - currentDrag.viewBox.height),
        };
        viewBoxRef.current = nextViewBox;
        setViewBox(nextViewBox);
      }
      dragFrameRef.current = null;
    });
  };

  const handlePointerEnd = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      latestPointerRef.current = null;
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const current = viewBoxRef.current;
    const zoomFactor = event.deltaY < 0 ? 0.9 : 1.1;
    const nextWidth = clamp(current.width * zoomFactor, MIN_ZOOM_VIEW_WIDTH, width);
    const nextHeight = nextWidth * (height / width);
    const pointerX = current.x + ((event.clientX - rect.left) / rect.width) * current.width;
    const pointerY = current.y + ((event.clientY - rect.top) / rect.height) * current.height;
    const nextViewBox = {
      width: nextWidth,
      height: nextHeight,
      x: clamp(pointerX - ((event.clientX - rect.left) / rect.width) * nextWidth, 0, width - nextWidth),
      y: clamp(pointerY - ((event.clientY - rect.top) / rect.height) * nextHeight, 0, height - nextHeight),
    };

    viewBoxRef.current = nextViewBox;
    if (zoomFrameRef.current) cancelAnimationFrame(zoomFrameRef.current);
    zoomFrameRef.current = requestAnimationFrame(() => {
      setViewBox(nextViewBox);
      zoomFrameRef.current = null;
    });
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
      onWheel: handleWheel,
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
