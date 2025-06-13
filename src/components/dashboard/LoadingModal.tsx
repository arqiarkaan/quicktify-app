import React from 'react';

interface LoadingModalProps {
  loadingStep: 'idle' | 'fetching-reviews' | 'analyzing' | 'success' | 'error';
  loadingMessage: string;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  loadingStep,
  loadingMessage,
}) => {
  if (loadingStep === 'idle') return null;

  // Tampilkan animasi hanya saat loading utama
  const showBouncing =
    loadingStep === 'fetching-reviews' || loadingStep === 'analyzing';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-black/80 rounded-xl shadow-xl px-8 py-8 flex flex-col items-center gap-4 min-w-[320px]">
        {showBouncing && (
          <div
            style={{ display: 'flex', gap: 8, height: 40, alignItems: 'end' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #a78bfa 60%, #7c3aed 100%)',
                animation: 'bounce 1.4s cubic-bezier(0.45,0,0.55,1) infinite',
                animationDelay: '0s',
              }}
            />
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #a78bfa 60%, #7c3aed 100%)',
                animation: 'bounce 1.4s cubic-bezier(0.45,0,0.55,1) infinite',
                animationDelay: '0.2s',
              }}
            />
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #a78bfa 60%, #7c3aed 100%)',
                animation: 'bounce 1.4s cubic-bezier(0.45,0,0.55,1) infinite',
                animationDelay: '0.4s',
              }}
            />
          </div>
        )}
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-16px); }
          }
        `}</style>
        <div className="text-lg font-semibold text-center">
          {loadingMessage}
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
