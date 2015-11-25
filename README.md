# PSVBuilder

PSVBuilder is a web UI allowing everyone to build easily a Photo Sphere Viewer constructor. As there are more and more options available in Photo Sphere Viewer, it's useful to have a tool to easily create an object, with the right options.

## Some Words About the Development

The development of PSVBuilder is continuous. For now it does not implement all the options available in Photo Sphere Viewer, but it will. Then, when a new version of Photo Sphere Viewer will be released, the new options will be implemented in PSVBuilder.

## Usage

A live version of PSVBuilder can be used [right here](http://jeremyheleine.github.io/PSVBuilder/). You can also use it on your computer. To do that, download this repo or, better, clone it on your computer. Then, just open the `index.html` file in a browser (you don't even need a server).

Basically, PSVBuilder will generate a very general Photo Sphere Viewer code. In this code, you will need to indicate the path or the URL of a panorama, and the ID of the container. You can manually copy this code, or you can use the dedicated button to copy it directly into your clipboard, if you have a compatible browser.

On the left of the page, a text input allows you to indicate a panorama's URL or path (if you use PSVBuilder locally). When you use this input, the `panorama` option of the PSV object is automatically updated. You can preview the panorama by hitting the button below this input.

Photo Sphere Viewer options are available on the right. Just check the boxes corresponding with the options you want, and fill the right fields. Note that some options can be automatically updated with the preview, like the default position for example.
