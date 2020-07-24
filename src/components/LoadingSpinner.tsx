import React from 'react';
import './LoadingSpinner.css';
import { IonSpinner, IonText } from '@ionic/react';

interface OwnProps {
  message?: string;
}

const LoadingSpinner: React.FC<OwnProps> = (props) => {
  return (
    <React.Fragment>
        <div className="spinner-container">        
            <div className="full-width">
                <IonSpinner className='spinner' name="lines"></IonSpinner>
            </div>
            <div className="full-width">
                <IonText>
                    {props.message}
                </IonText>
            </div>
        </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
