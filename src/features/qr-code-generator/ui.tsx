import { useId } from 'react'

import { RInputProps } from '~shared/ui/input'
import { RQrCode } from '~shared/ui/qr-code'
import { RButton } from '~shared/ui/button'

import s from './styles.module.scss'

interface QrCodeGeneratorWithDownloadProps extends Omit<RInputProps, 'defaultValue'> {
  workerId: string
}

const QrCodeGeneratorWithDownload = ({ workerId }: QrCodeGeneratorWithDownloadProps) => {
  const qrCodeId = useId()

  const downloadHandler = () => {
    const canvas = document.getElementById(qrCodeId) as HTMLCanvasElement;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${workerId}.png`;
    link.click();
  };

  return (
    <div className={s.wrapper}>
      <RQrCode
        id={qrCodeId}
        value={workerId}
        className={s.generatedQrCode}
        width='120px'
        height='120px'
      />
      <RButton
        type='button'
        color='green'
        disabled={!workerId}
        onClick={downloadHandler}
      >
        Yo'klab olish
      </RButton>
    </div>
  )
}

export default QrCodeGeneratorWithDownload