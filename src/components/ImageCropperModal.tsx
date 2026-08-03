import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, ZoomIn, ZoomOut, RotateCw, Check, Move, Crop } from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedBase64: string) => void;
  aspectRatio?: number; // e.g. 1 for 1:1 square/circle, 1.777 for 16:9
  title?: string;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  onClose,
  onCropComplete,
  aspectRatio = 1,
  title = 'Crop & Resize Photo'
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setImageSrc(null);
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!imageSrc) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !imageSrc) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleCropAndSave = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const targetWidth = 600;
      const targetHeight = Math.round(targetWidth / aspectRatio);

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Fill background
      ctx.fillStyle = '#080b14';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      ctx.save();
      // Move origin to canvas center
      ctx.translate(targetWidth / 2, targetHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);

      // Apply offset relative to crop box
      ctx.drawImage(
        img,
        -img.width / 2 + position.x,
        -img.height / 2 + position.y,
        img.width,
        img.height
      );

      ctx.restore();

      const croppedBase64 = canvas.toDataURL('image/jpeg', 0.92);
      onCropComplete(croppedBase64);
      onClose();
    };
  };

  return (
    <div className="fixed inset-0 z-[100010] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-950 border border-blue-500/40 rounded-3xl p-5 shadow-[0_0_50px_rgba(59,130,246,0.4)] flex flex-col gap-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload File Input / Drop Area */}
        {!imageSrc ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-blue-500/40 hover:border-blue-400 bg-blue-950/20 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-blue-950/30 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-white mb-1">Click to Select Photo from Device</p>
              <p className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP files</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Interactive Crop Viewport Canvas Area */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              className="relative w-full h-64 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
            >
              {/* Image Transform Layer */}
              <div
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
                className="absolute shrink-0"
              >
                <img
                  src={imageSrc}
                  alt="To crop"
                  className="max-w-none pointer-events-none"
                  style={{ maxHeight: '300px' }}
                />
              </div>

              {/* Crop Frame Box Overlay */}
              <div className="absolute inset-0 border-[3px] border-blue-400/80 rounded-2xl pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] flex items-center justify-center">
                <div className="text-[10px] font-bold text-blue-300/80 bg-black/60 px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Move className="w-3 h-3" />
                  <span>Drag & Zoom to Crop</span>
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-3 bg-slate-900/80 border border-white/10 p-3 rounded-2xl">
              <div className="flex items-center gap-2 flex-1">
                <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              <button
                type="button"
                onClick={handleRotate}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Rotate 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer shrink-0"
              >
                Change Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Submit Actions */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCropAndSave}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-extrabold text-white flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <Check className="w-4 h-4" />
                <span>Crop & Apply Photo</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
