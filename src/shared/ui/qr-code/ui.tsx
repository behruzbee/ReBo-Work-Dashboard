import QRCode from 'qrcode';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import s from './styles.module.scss'

interface RQrCodeProps {
    value: string
    id?: string
    className?: string
    width?: string
    height?: string
}

const RQrCode = ({ value, className, ...props }: RQrCodeProps) => {
    const qrCodeRef = useRef<HTMLCanvasElement>(null)

    const generateQRCode = async () => {
        try {
            const $canvas = qrCodeRef.current;
            if (!$canvas) throw 'Canvas not found';

            const ctx = $canvas.getContext("2d");
            if (!ctx) throw 'Context not found';

            ctx.clearRect(0, 0, $canvas.width, $canvas.height);
            if (value) {
                const qrCodeDataUrl = await QRCode.toDataURL(value);
                const img = new Image();
                img.src = qrCodeDataUrl;

                img.onload = () => ctx.drawImage(img, 0, 0, $canvas.width, $canvas.height);
            }
        } catch (error) {
            toast.error("QR code generatsiya paytida xatolik!")
            console.error('Error generating QR code:', error);
        }
    }

    useEffect(() => {
        generateQRCode()
    })

    return (
        <canvas ref={qrCodeRef} className={`${s.qrCodeCanvas} ${className}`} {...props}></canvas>
    )
}

export default RQrCode