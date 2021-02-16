import React, { useState } from 'react';
import * as ml5 from 'ml5';

export default function App() {
  const [ imageUrl, setImageUrl ]  = useState('');
  const [ predictionLabel, setPredictionLabel ] = useState('');
  const [ predictionConfidence, setPredictionConfidence ] = useState('');
  const [ predicted, setPredicted ] = useState(false)
  
  const loadImage = (event) => {
    const image = event.target.files[0];
    setImageUrl(window.URL.createObjectURL(image))
    console.log(image)
  }

  const classifyImage = async () => {
    const classifier = await ml5.imageClassifier('MobileNet')
    const image = document.getElementById("image") 
    classifier.predict(image, 5, (err, results) => {
      setPredictionLabel(results[0].label)
      setPredictionConfidence(results[0].confidence)
      setPredicted(true)
    })
  }
    return (
      <div>
        <h1>Do you wanna make me recognise any image and find out how smart am I?</h1>
        <input type="file" accept="image/*" onChange={ loadImage }/>
        { imageUrl &&
          <div>
            <img id="image" src={ imageUrl } alt="to be classified" height={500}/>
            <button onClick={ classifyImage }>Classify</button>
          </div>
        }
        {
          predicted &&
            <p>The app is { predictionConfidence* 100 }% sure that this is { predictionLabel.split(",")[0] } </p>
        }
      </div>
    )
}