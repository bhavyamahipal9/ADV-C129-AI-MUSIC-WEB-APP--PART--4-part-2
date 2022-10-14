scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
songStatus = " ";
song2Status = " ";
song2 = " ";
song = " ";

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(500, 275);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet model is Loaded!!:)");
}

function gotPoses(results){
    if(results.length > 0){
    console.log(results);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;

    console.log("Score of Left Wrist = " + scoreLeftWrist);
    console.log("Score of Right Wrist = " + scoreRightWrist);
    console.log("X coordinates of left Wrist = " + leftWristX + ", Y coordinates of left Wrist = " + leftWristY);
    console.log("X coordinates of right Wrist = " + rightWristX + ", Y coordinates of right Wrist = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 500, 400);

    songStatus = song.isPlaying();
    song2Status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);

        song.stop();

        if(song2Status == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "SONG NAME - Peter Piper";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        song2.stop();

        if(songStatus == false){
            song.play();
            document.getElementById("song_name").innerHTML = "SONG NAME - Pop Music";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
