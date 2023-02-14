img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

 function modelLoaded()
{
    console.log("Model Loaded !")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
    
}

function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
}

function draw()
{
    image(img, 0, 0, 640, 420);
        if(status != "")
        {
            for(i = 0; i < objects.length; i++)
            {
                document.getElementById("status").innerHTML = "Status : Object Detected";

                fill('#FF0000');
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects.x + 15, objects.y + 15);
                onFill();
                stroke("#FF0000")
                rect(objects[i].x, objects[i].y, objects[i].widht, objects[i].height);
            }
        }
    fill("#FF0000");
    text("Dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);

    fill("#FF0000");
    text("Cat", 320, 120);
    noFill();
    stroke("#FF0000");
    rect(3000, 90, 270, 320);
    objectDetector = ml5.objectDetector('cocossed', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting Objects";
}