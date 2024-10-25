import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="spinner" style={{ border: '8px solid #eff0f6', borderTop: '8px solid blue', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
            </div>
            <p style={{ marginTop: '20px', fontSize: '20px', color: 'black', lineHeight: '25px', fontWeight: '600'}}>생성중이에요, <br/> 잠시만 기다려주세요 !</p>
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default LoadingSpinner;
