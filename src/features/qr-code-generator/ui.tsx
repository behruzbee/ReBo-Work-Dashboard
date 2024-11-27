import { useId, useState } from 'react'

import { RInput, RInputProps } from '~shared/ui/input'
import { RQrCode } from '~shared/ui/qr-code'

import s from './styles.module.scss'
import { RButton } from '~shared/ui/button'

interface QrCodeGeneratorWithDownloadProps extends RInputProps {}

const QrCodeGeneratorWithDownload = ({...props}: QrCodeGeneratorWithDownloadProps) => {
  const qrCodeId = useId()
  const [qrCodeText, setQrCodeText] = useState('')

  const downloadHandler = () => {
    const canvas = document.getElementById(qrCodeId) as HTMLCanvasElement;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${qrCodeId}.png`;
    link.click();
  };

  return (
    <div className={s.wrapper}>
      <RInput
        label='QR CODE'
        placeholder='Qr code kiriting!'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQrCodeText(e.target.value)}
        {...props}
      />
      <RQrCode
        id={qrCodeId}
        value={qrCodeText}
        className={s.generatedQrCode}
        width='120px'
        height='120px'
      />
      <RButton
        type='button'
        color='green'
        disabled={!qrCodeText}
        onClick={downloadHandler}
      >
        Yo'klab olish
      </RButton>
    </div>
  )
}

export default QrCodeGeneratorWithDownload