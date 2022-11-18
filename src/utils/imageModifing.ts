type resizeImageProps = {
  filename: string
  width: number
  height: number
}
export function modifiedImagePath(
  filename: string,
  width: number,
  height: number
): string {
  return `src/thumb/${filename}_thumb${width}x${height}.jpg`
}
