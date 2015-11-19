/**
 * Link between the user interface and the builder.
 * @class
 **/

var PSVBuilderInterface = function() {
    /**
     * Attaches the right events to the right elements.
     * @private
     * @return {void}
     **/

    var attachEvents = function() {
        // Code changed
        builder.onUpdate(displayCode);

        // Panorama URL or path
        document.getElementById('pano-url').addEventListener('input', panoURLChanged);
        document.getElementById('load-pano-button').addEventListener('click', updatePSVURL);
    };

    /**
     * The user wants to change the panorama URL or path.
     * @private
     * @return {void}
     **/

    var panoURLChanged = function() {
        updatePanoURL(document.getElementById('pano-url').value.trim());
    };

    /**
     * Updates the panorama URL or path.
     * @private
     * @param {string} url - The panorama URL or path
     * @return {void}
     **/

    var updatePanoURL = function(url) {
        builder.setPanoURL((!!url.length) ? url : null);
    };

    /**
     * Updates all the values.
     * @private
     * @return {void}
     **/

    var updateAll = function() {
        panoURLChanged();
    };

    /**
     * Updates the panorama URL or path in Photo Sphere Viewer.
     * @private
     * @return {void}
     **/

    var updatePSVURL = function() {
        var pano_url = document.getElementById('pano-url').value.trim();

        var loader = document.createElement('div');
        loader.className = 'loader';

        PSV = new PhotoSphereViewer({
            panorama: pano_url,
            container: 'viewer-container',

            size: {
                width: '90%',
                height: 480
            },

            loading_html: loader,

            navbar: true,

            time_anim: false
        });
    };

    /**
     * Displays the code.
     * @private
     * @return {void}
     **/

    var displayCode = function() {
        code_textarea.textContent = builder.generateCode();
    };

    // Builder
    var builder = new PSVBuilder();

    // Photo Sphere Viewer storage
    var PSV = null;

    // UI elements
    var code_textarea = document.getElementById('psv-code');

    // Initialization
    attachEvents();
    updateAll();

    // First display
    displayCode();
};
