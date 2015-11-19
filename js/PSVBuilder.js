/**
 * Photo Sphere Viewer builder.
 * @class
 **/

var PSVBuilder = function() {
    /**
     * Sets the panorama URL or path.
     * @public
     * @param {string} url - The panorama URL or path
     * @return {void}
     **/

    this.setPanoURL = function(url) {
        panorama = url;
        updated();
    };

    /**
     * Generates the PSV code.
     * @public
     * @return {string} The code
     **/

    this.generateCode = function() {
        var lines = [];
        lines.push('var PSV = new PhotoSphereViewer({');

        // Options
        var options = [];

        // Panorama URL or path
        var panorama_value = (panorama === null) ? 'Panorama URL or path' : panorama;
        options.push('panorama: \'' + panorama_value + '\'');

        // Panorama container
        var container_value = (container === null) ? '\'Container ID\'' : container;
        options.push('container: ' + container_value);

        // Add the options to the list of lines to display
        options[0] = "\t" + options[0];
        lines.push(options.join(",\n\t"));

        lines.push('});');

        return lines.join("\n");
    };

    /**
     * Registers a function to execute each time at least one value is changed.
     * @public
     * @param {function} f - The function to execute
     * @return {void}
     **/

    this.onUpdate = function(f) {
        on_update = f;
    };

    /**
     * Executes a callback each time at least one value is changed.
     * @private
     * @return {void}
     **/

    var updated = function() {
        if (on_update !== null)
            on_update();
    };

    // Function to call every time a value is changed
    var on_update = null;

    // Panorama URL or path (null to display a comment)
    var panorama = null;

    // Viewer container (null to display a comment)
    var container = null;
};
