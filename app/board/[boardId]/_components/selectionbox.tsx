"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";

interface SelectionBoxProps {
    onResizePointerDown: (corner: Side, initialBounds: XYWH) => void;
    camera: { x: number; y: number };
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({ onResizePointerDown, camera }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) => {
        return me.presence.selectedLayer.length === 1 ? me.presence.selectedLayer[0] : null;
    });

    const isShowingHandles = useStorage((root) => {
        return soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path;
    });

    const bounds = useSelectionBounds();
    if (!bounds) return null;

    return (
        <>
            <rect
                className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
                style={{
                    transform: `translate(${bounds.x + camera.x}px, ${bounds.y + camera.y}px)`,
                }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />
            {isShowingHandles && (
                <>
                    {/* Top Left */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + camera.x}px, ${bounds.y - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Top + Side.Left, bounds);
                        }}
                    />
                    {/* Top */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2 + camera.x}px, ${bounds.y - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Top, bounds);
                        }}
                    />
                    {/* Top Right */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width + camera.x}px, ${bounds.y - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Top + Side.Right, bounds);
                        }}
                    />
                    {/* Right */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2 + camera.x}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Right, bounds);
                        }}
                    />
                    {/* Bottom Right */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2 + camera.x}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Bottom + Side.Right, bounds);
                        }}
                    />
                    {/* Bottom */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2 + camera.x}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Bottom, bounds);
                        }}
                    />
                    {/* Bottom Left */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + camera.x}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Bottom + Side.Left, bounds);
                        }}
                    />
                    {/* Left */}
                    <rect
                        className="fill-white stroke-1 stroke-blue-500"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + camera.x}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2 + camera.y}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizePointerDown(Side.Left, bounds);
                        }}
                    />
                </>
            )}
        </>
    );
});

SelectionBox.displayName = "SelectionBox";

export default SelectionBox;
