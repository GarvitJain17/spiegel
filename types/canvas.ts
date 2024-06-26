export type Color ={
    r:number;
    g:number;
    b:number;
}

export type Camera ={
    x:number;
    y:number;

}

export enum LayerType {
    Rectangle,
    Ellipse,
    Path,
    Text,
    Note,
};

export type RectangleLayer ={
    type:LayerType.Rectangle;
    x:number;
    y:number;
    width:number;
    height:number;
    value?:string
    fill:Color
}
export type PathLayer ={
    type:LayerType.Path;
    x:number;
    y:number;
    width:number;
    height:number;
    points:number[][];
    fill:Color;
    value?:string,
}

export type EllipseLayer ={
    type:LayerType.Ellipse;
    x:number;
    y:number;
    width:number;
    height:number;
    value?:string
    fill:Color
}
export type TextLayer ={
    type:LayerType.Text;
    x:number;
    y:number;
    width:number;
    height:number;
    value?:string;
    fill:Color
}
export type NoteLayer ={
    type:LayerType.Note;
    x:number;
    y:number;
    width:number;
    height:number;
    value?:string;
    fill:Color
}

export type Point ={
    [x: string]: number;
    x:number;
    y:number;
}

export type XYWH={
    x:number;
    y:number;
    width:number;
    height:number;
}
export enum Side {
    Top=1,
    Right=2,
    Bottom=4,
    Left=8,

}
export type CanvasState = |{
    mode:CanvasMode.None
} | {
    mode:CanvasMode.Pressing
    origin:Point
} | {
    mode:CanvasMode.SelectionNet,
    origin:Point,
    current?:Point
} | {
    mode:CanvasMode.Translating
    current:Point
} | {
    mode:CanvasMode.Inserting
    LayerType:LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note
} | {
    mode:CanvasMode.Pencil
} | {
    mode:CanvasMode.Resizing
    initialBounds:XYWH,
    corner:Side
}

// ������������
export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Pencil,
    Resizing
}

export type Layer = RectangleLayer | EllipseLayer |PathLayer | TextLayer | NoteLayer
