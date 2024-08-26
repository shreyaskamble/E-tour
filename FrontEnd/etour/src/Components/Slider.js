import React, { useState } from 'react';
import './Slider.css';
import { Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Slider = () => {
  const { t } = useTranslation();
  const [activeBtn, setActiveBtn] = useState(0);
  const navigate = useNavigate();

  const handleBtnClick = (index) => {
    setActiveBtn(index);
    const videoSrc = `/a${index}.mp4`; // Path to video files in public folder
    document.querySelector('#video-slider').src = videoSrc;
  };

  const handleButtonClick = () => {
    document.querySelector('.ref').scrollIntoView(true);
    navigate(`/Home`);
  };

  return (
    <div>
      <section className="home" id="home">
        <div className="content">
          <h4>{t('Embark on a journey of a lifetime')}</h4>
          <p>{t('Every path leads to new experiences')}</p>

          <Button variant="primary" onClick={handleButtonClick}>{t('discover more')}</Button>
        </div>

        <div className="controls">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`vid-btn ${index === activeBtn ? 'active' : ''}`}
              onClick={() => handleBtnClick(index)}
            ></span>
          ))}
        </div>

        <div className="video-container">
          <video
            src="/a1.mp4" // Default video source, adjust as needed
            id="video-slider"
            loop
            autoPlay
            muted
            controls={false} // Disable default controls
            controlsList="nodownload" // Disable download button
          ></video>
        </div>
      </section>
    </div>
  );
};

export default Slider;
