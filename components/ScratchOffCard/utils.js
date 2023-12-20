export const getFilledInPixels = (stride, ctx, canvasWidth, canvasHeight) => {
    const newStride = !stride || stride < 1 ? 1 : stride;
    const pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pdata = pixels?.data ?? [];
    const l = pdata?.length ?? 0;
    const total = l / newStride;
    let count = 0;
    for (let i = 0; i < l; i += newStride) {
        if (+pdata[i] === 0) {
            count += 1;
        }
    }
    return Math.round((count / total) * 100);
};
export const getMouse = (e, canvas) => {
    let offsetX = 0;
    let offsetY = 0;
    let mx = 0;
    let my = 0;
    if (canvas.offsetParent) {
        // eslint-disable-next-line no-cond-assign, no-param-reassign
        while ((canvas = canvas.offsetParent)) {
            offsetX += canvas.offsetLeft;
            offsetY += canvas.offsetTop;
        }
    }
    if (isMouseEvent(e)) {
        mx = e.pageX - offsetX;
        my = e.pageY - offsetY;
    }
    if (isTouchEvent(e)) {
        mx = e.touches[0].clientX - offsetX + window.scrollX;
        my = e.touches[0].clientY - offsetY + window.scrollY;
    }
    return { x: mx, y: my };
};
export const getDistanceBetween = (point1, point2) => Math.sqrt(
// eslint-disable-next-line no-restricted-properties
(point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
export const getAngleBetween = (point1, point2) => Math.atan2(point2.x - point1.x, point2.y - point1.y);
export const isTouchEvent = (e) => e && 'touches' in e;
export const isMouseEvent = (e) => e && 'screenX' in e;
//# sourceMappingURL=utils.js.map