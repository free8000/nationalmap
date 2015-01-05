'use strict';

/*global require*/
var fs = require('fs');

var defaultValue = require('../../third_party/cesium/Source/Core/defaultValue');
var knockout = require('../../third_party/cesium/Source/ThirdParty/knockout');

var createFragmentFromTemplate = require('../Core/createFragmentFromTemplate');
var svgMenu = require('../SvgPaths/svgMenu');

var html = fs.readFileSync(__dirname + '/../Views/BrandBar.html', 'utf8');

var BrandBarViewModel = function(options) {
    this.svgMenu = svgMenu;

    this.name = options.name;
    this.leftLogo = options.leftLogo;
    this.explorerPanelIsOpen = true;

    knockout.track(this, ['name', 'leftLogo', 'explorerPanelIsOpen']);
};

BrandBarViewModel.create = function(container, options) {
    container = defaultValue(container, document.body);

    var fragment = createFragmentFromTemplate(html);
    var element = fragment.childNodes[0];
    container.appendChild(element);

    var viewModel = new BrandBarViewModel(options);
    knockout.applyBindings(viewModel, element);

    return viewModel;
};

BrandBarViewModel.prototype.toggleExplorerPanelOpen = function() {
    this.explorerPanelIsOpen = !this.explorerPanelIsOpen;
};

module.exports = BrandBarViewModel;