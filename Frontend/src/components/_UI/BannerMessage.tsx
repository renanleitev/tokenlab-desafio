import { useEffect, useState } from 'react';

type BannerMessageProps = {
  message: string;
  intent?: 'SUCCESS' | 'ERROR';
  isBannerDisplayed: boolean;
  showCloseButton?: boolean;
};

const BannerMessage = ({
  message,
  intent = 'ERROR',
  isBannerDisplayed,
  showCloseButton = false,
}: BannerMessageProps) => {
  const [color, setColor] = useState('');
  const [showBanner, setShowBanner] = useState(isBannerDisplayed);

  useEffect(() => {
    if (isBannerDisplayed) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [isBannerDisplayed]);

  useEffect(() => {
    switch (intent) {
      case 'SUCCESS':
        setColor('alert-success');
        break;
      case 'ERROR':
      default:
        setColor('alert-danger');
        break;
    }
  }, [intent]);

  if (message && showBanner) {
    return (
      <div className={`d-flex w-100 alert ${color} mt-3`}>
        {message}
        {showCloseButton && (
          <button
            type="button"
            className="btn-close"
            style={{ marginLeft: 'auto' }}
            aria-label="Close"
            onClick={() => setShowBanner(false)}
          ></button>
        )}
      </div>
    );
  }

  return null;
};

export default BannerMessage;
