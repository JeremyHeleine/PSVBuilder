/**
 * Link between the user interface and the builder.
 * @class
 **/

var PSVBuilderInterface = function() {
    /**
     * Displays / Hides the right options panels.
     * @return {void}
     **/

    var togglePanels = function() {
        $('#options-panels-list li a').each(function() {
            var a = $(this);
            var panel = $(a.attr('href'));

            if (a.hasClass('active'))
                panel.slideDown();

            else
                panel.slideUp();
        });
    };

    /**
     * Shows the right panel.
     * @param {Event} evt - The click event
     * @return {void}
     **/

    var changeActivePanel = function(evt) {
        $('#options-panels-list li a').removeClass('active');
        $(evt.target).addClass('active');

        togglePanels();

        return false;
    };

    /**
     * Attaches the right events to the right elements.
     * @private
     * @return {void}
     **/

    var attachEvents = function() {
        // Panels links
        $('#options-panels-list li a').click(changeActivePanel);

        // Code changed
        builder.onUpdate(displayCode);

        // Panorama URL or path
        $('#pano-url').bind('input', panoURLChanged);
        $('#load-pano-button').click(updatePSVURL);

        // Booleans
        $('#autoload').change(autoloadBooleanChanged);

        // Default position
        $('#default-position').change(defaultPositionChanged);
        $('#default-position-coords input').bind('input', defaultPositionValuesUpdated);
    };

    /**
     * The user wants to change the panorama URL or path.
     * @private
     * @return {void}
     **/

    var panoURLChanged = function() {
        updatePanoURL($('#pano-url').val().trim());
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
     * Updates the "autoload" setting.
     * @private
     * @return {void}
     **/

    var autoloadBooleanChanged = function() {
        builder.setAutoload($('#autoload').is(':checked'));
    };

    /**
     * Updates the "default position" setting.
     * @private
     * @return {void}
     **/

    var defaultPositionChanged = function() {
        var default_position_bool = $('#default-position').is(':checked');
        builder.setDefaultPositionBoolean(default_position_bool);

        var default_position_inputs = $('#default-position-coords');

        if (default_position_bool)
            default_position_inputs.slideDown();

        else
            default_position_inputs.slideUp();
    };

    /**
     * The user updated the default position.
     * @private
     * @return {void}
     **/

    var defaultPositionValuesUpdated = function() {
        defaultPositionUpdated();

        if (PSV !== null) {
            var pos = builder.getDefaultPosition();
            PSV.moveTo(pos.long, pos.lat);
        }
    };

    /**
     * Updates the default position.
     * @private
     * @return {void}
     **/

    var defaultPositionUpdated = function() {
        builder.setDefaultPosition({
            long: $('#default-longitude').val(),
            lat: $('#default-latitude').val()
        });
    };

    /**
     * Updates the default position using Photo Sphere Viewer.
     * @private
     * @param {object} pos - The new position
     * @return {void}
     **/

    var updatePositionFromPSV = function(pos) {
        $('#default-longitude').val(pos.longitude);
        $('#default-latitude').val(pos.latitude);
        defaultPositionUpdated();
    };

    /**
     * Updates all the values.
     * @private
     * @return {void}
     **/

    var updateAll = function() {
        panoURLChanged();
        autoloadBooleanChanged();
        defaultPositionChanged();
        defaultPositionUpdated();
    };

    /**
     * Updates the panorama URL or path in Photo Sphere Viewer.
     * @private
     * @return {void}
     **/

    var updatePSVURL = function() {
        var pano_url = $('#pano-url').val().trim();

        var loader = document.createElement('div');
        loader.className = 'loader';

        PSV = new PhotoSphereViewer({
            panorama: pano_url,
            container: 'viewer-container',

            size: {
                width: '90%',
                height: 480
            },

            default_position: builder.getDefaultPosition(),

            loading_html: loader,

            navbar: true,

            time_anim: false
        });

        PSV.addAction('position-updated', updatePositionFromPSV);
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
    togglePanels();
    updateAll();

    // First display
    displayCode();
};
