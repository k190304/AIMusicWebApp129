song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

function preload()
{
    song_1 = loadSound("Music1.mp3");
    song_2 = loadSound("Music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function gotPoses(results)
{
    if (results.length > 0)
        {
            console.log(results);
            scoreLeftWrist = results[0].pose.keypoints[9].score;
            console.log("scoreLeftWrist = " + scoreLeftWrist);

            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);            
        }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song1_status = song_1.isPlaying();
    if (scoreLeftWrist < 0.2)
        {
            circle(leftWristX, leftWristY, 20);
            song_2.stop();
        }
    
    if (song1_status == false) 
        {
            song_1.play()
            document.getElementById("song").innerHTML = "Song = " + song_1;
        }   
}

function stop()
{
    song_1.stop();
    song_2.stop();
}