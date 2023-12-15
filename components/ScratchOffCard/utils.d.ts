export declare const getFilledInPixels: (stride: number, ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => number;
export declare const getMouse: (e: MouseEvent | TouchEvent, canvas: any) => {
    x: number;
    y: number;
};
export declare const getDistanceBetween: (point1: {
    x: number;
    y: number;
}, point2: {
    x: number;
    y: number;
}) => number;
export declare const getAngleBetween: (point1: {
    x: number;
    y: number;
}, point2: {
    x: number;
    y: number;
}) => number;
export declare const isTouchEvent: (e: TouchEvent | MouseEvent) => e is TouchEvent;
export declare const isMouseEvent: (e: TouchEvent | MouseEvent) => e is MouseEvent;
