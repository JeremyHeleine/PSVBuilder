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
     * Sets the autoload setting.
     * @public
     * @param {boolean} auto - The value
     * @return {void}
     **/

    this.setAutoload = function(auto) {
        autoload = auto;
        updated();
    };

    /**
     * Sets the "read XMP" setting.
     * @public
     * @param {boolean} read - The value
     * @return {void}
     **/

    this.setXMP = function(read) {
        usexmp = read;
        updated();
    };

    /**
     * Sets the "default position" boolean.
     * @public
     * @param {boolean} new_value - The value
     * @return {void}
     **/

    this.setDefaultPositionBoolean = function(new_value) {
        default_position_bool = new_value;
        updated();
    };

    /**
     * Sets the default position.
     * @public
     * @param {object} pos - The new position
     * @return {void}
     **/

    this.setDefaultPosition = function(pos) {
        default_position.long = parseNumber(pos.long);
        default_position.lat = parseNumber(pos.lat);
        updated();
    };

    /**
     * Returns the default position.
     * @public
     * @return {object} The position
     **/

    this.getDefaultPosition = function() {
        return default_position;
    };

    /**
     * Always get a number.
     * @param {mixed} x - The initial value
     * @return {number} The converted value
     **/

    var parseNumber = function(x) {
        x = parseFloat(x);

        if (isNaN(x))
            x = 0;

        return x;
    };

    /**
     * Converts an object to string.
     * @param {object} o - The object
     * @return {string} The result
     **/

    var parseObject = function(o) {
        var props = [];
        var value;
        for (var prop in o) {
            value = (typeof o[prop] == 'string') ? '\'' + o[prop] + '\'' : o[prop];
            props.push(prop + ': ' + value);
        }

        return '{' + props.join(', ') + '}';
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

        // Autoload
        if (autoload)
            options.push('autoload: true');

        // XMP data
        if (!usexmp)
            options.push('usexmpdata: false');

        // Default position
        if (default_position_bool)
            options.push('default_position: ' + parseObject(default_position));

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

    // Simple booleans
    var autoload = false;
    var usexmp = false;

    // Default position
    var default_position_bool = false;
    var default_position = {
        long: 0,
        lat: 0
    };
};
