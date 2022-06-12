
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'human-model/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
  	cnv_width = (document.getElementById('cnv-width').offsetWidth)-32;
  	cnv_height = ((260/300)*cnv_width)-32;
  	vid_height = ((240/260)*cnv_height)-32;
    var canvas = createCanvas(cnv_width, cnv_height);
     // canvas.style('display', 'none');
    canvas.parent('video-holder');
    // Create the video
    video = createCapture(VIDEO);
    video.size(cnv_width, vid_height);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;

    green_Audio = document.getElementById("greensound");
    yellow_Audio = document.getElementById("yellowsound");
    red_Audio = document.getElementById("redsound");



    if (label=="초록색") {

      if (green_Audio.paused) {
         green_Audio.currentTime = 0;
         green_Audio.play();
      }

      document.getElementById("status").innerHTML = `<h3 style="color: green;"><i class="fa fa-exclamation-triangle"></i></h3>
      <h3 style="color: green;">초록불입니다. 현재속도를 유지하셔도 괜찮습니다.</h3>
      <h3 style="color: green;">Green Light</h3>
      `;

    }
    if (label=="노란색") {

      if (yellow_Audio.paused) {
        yellow_Audio.currentTime = 0;
        yellow_Audio.play();
        }
  
      document.getElementById("status").innerHTML = `<h3 style="color: yellow;"><i class="fa fa-exclamation-triangle"></i></h3>
      <h3 style="color: yellow;">노란불입니다. 속도를 천천히 줄여주세요.</h3>
      <h3 style="color: yellow;">Yellow Light</h3>
      `;
    }
    if (label=="빨간색") {

      if (red_Audio.paused) {
        red_Audio.currentTime = 0;
        red_Audio.play();
      }
      
      document.getElementById("status").innerHTML = `<h3 style="color: red;"><i class="fa fa-exclamation-triangle"></i></h3>
      <h3 style="color: red;">빨간불입니다. 속도를 줄여서 정차해주세요.</h3>
      <h3 style="color: red;">Red Light</h3>
      `;
    }else{
    	document.getElementById("status").innerHTML = `<h3 style="color: #085129;"><i class="fa fa-check-square"></i></h3>
    	<h3 style="color: #085129;">Everything is OK</h3>`;
    }


    // Classifiy again!
    classifyVideo();
  }