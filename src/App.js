import React, { Component } from 'react';
import * as ml5 from 'ml5';

export default class App extends Component {
  state = {
    buttonText: 'Click',
    imageUrl: '',
    ready: false,
    predictionLabel: '',
    predictionConfidence: '',
    predicted: false
  }
  
  loadImage = (event) => {
    const image = event.target.files[0];
    this.setState({ imageUrl: window.URL.createObjectURL(image)})
    console.log(this.state.image)
  }

  classifyImage = async () => {
    const classifier = await ml5.imageClassifier('MobileNet')
    this.setState({ready: true})
    const image = document.getElementById("image")
    classifier.predict(image, 5, (err, results) => {
      this.setState({
        predictionLabel: results[0].label,
        predictionConfidence: results[0].confidence,
        predicted: true
      })
    })
  }

  render() {
    const {
      state: { imageUrl, predictionConfidence, predicted, predictionLabel },
      classifyImage, classifyImageclassifyImage
    } = this
    return (
      <div>
        <h1>Hello</h1>
        <input type="file" accept="image/*" onChange={ classifyImageclassifyImage }/>
        {imageUrl &&
          <div>
            <img id="image" src={imageUrl} alt="to be classified" height={500}/>
            <button onClick={ classifyImage }>Classify</button>
          </div>
        }
        {
          predicted &&
            <p>The app is {predictionConfidence* 100}% sure that this is { predictionLabel.split(",")[0]} </p>
        }
      </div>
    )
  }
}