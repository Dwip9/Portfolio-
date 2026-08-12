export function compressImageBase64(base64: string, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve) => {
    if (!base64 || typeof base64 !== 'string' || !base64.startsWith('data:image')) {
      resolve(base64);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // If image is already smaller than maxWidth and < 300KB, no need to compress
      if (width <= maxWidth && height <= maxWidth && base64.length < 300000) {
        resolve(base64);
        return;
      }

      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/jpeg', quality);
      resolve(compressed);
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
}
