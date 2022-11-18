"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifiedImagePath = void 0;
function modifiedImagePath(filename, width, height) {
    return `src/thumb/${filename}_thumb${width}x${height}.jpg`;
}
exports.modifiedImagePath = modifiedImagePath;
