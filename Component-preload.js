jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "src/Component-preload",
	"modules": {
		"src/Component.js": "/*!\n * This file is part of Flocking UI5 Playground\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * You should have received a copy of the GNU General Public License\n * version 3 along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"sap/ui/core/UIComponent\",\"fplay/lib/Router\"],function(t){\"use strict\";var e=t.extend(\"fplay.Component\",{metadata:{manifest:\"json\",properties:{app:{type:\"sap.m.App\",bindable:!1}}},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()},getApp:function(){if(!this.getProperty(\"app\")){var t=this.getRouter()._oConfig.targetParent,e=this.getRouter()._oConfig.controlId;this.setProperty(\"app\",sap.ui.getCore().byId(t).byId(e))}return this.getProperty(\"app\")},getContentDensityClass:function(){return this._sContentDensityClass||(sap.ui.Device.support.touch?this._sContentDensityClass=\"sapUiSizeCozy\":this._sContentDensityClass=\"sapUiSizeCompact\"),this._sContentDensityClass}});return e});",
		"src/controller/App.controller.js": "/*!\n * This file is part of Flocking UI5 Playground\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * You should have received a copy of the GNU General Public License\n * version 3 along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"sap/ui/core/mvc/Controller\"],function(t){\"use strict\";return t.extend(\"fplay.controller.App\",{onInit:function(t){this.getOwnerComponent().setApp(this.byId(\"app\")),this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});",
		"src/controller/Detail.controller.js": "/*!\n * This file is part of Flocking UI5 Playground\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * You should have received a copy of the GNU General Public License\n * version 3 along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"sap/ui/core/mvc/Controller\",\"zlib/Flocking\"],function(e){\"use strict\";var t=flock.synth({synthDef:{ugen:\"flock.ugen.sinOsc\",freq:440,mul:.25}});return e.extend(\"fplay.controller.Detail\",{onInit:function(e){t.pause()},onNavBack:function(e){sap.ui.Device.system.phone?this.getOwnerComponent().getRouter().navToMaster():this.getOwnerComponent().getApp().showMaster()},onHelloWorldPress:function(e){e.getParameter(\"pressed\")?t.play():t.pause()},onTogglePlayback:function(e){var t=!flock.enviro.shared.model.isPlaying;e.getSource().setPressed(t),t?(e.getSource().setIcon(\"sap-icon://stop\"),$(\"<script>\").attr(\"id\",\"codemirrorcontent\").attr(\"type\",\"text/javascript\").text('(function () {\"use strict\";'+this.byId(\"jseditor\").getValue()+\"})();\").appendTo(\"head\"),flock.enviro.shared.play()):(e.getSource().setIcon(\"sap-icon://play\"),flock.enviro.shared.reset(),$(\"#codemirrorcontent\").remove())},onGoFullscreen:function(e){document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement?(document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen(),e.getSource().setPressed(!1)):(document.body.requestFullscreen?document.body.requestFullscreen():document.body.msRequestFullscreen?document.body.msRequestFullscreen():document.body.mozRequestFullScreen?document.body.mozRequestFullScreen():document.body.webkitRequestFullscreen&&document.body.webkitRequestFullscreen(document.body.ALLOW_KEYBOARD_INPUT),e.getSource().setPressed(!0))},formatLoadedExample:function(e){return jQuery.sap.assert(null===e||Array.isArray(e)&&\"string\"==typeof e[0],\"This should be array of strings\"),\"undefined\"==typeof e||null===e?void 0:Array.isArray(e)?e.join(\"\\n\"):\"string\"==typeof e?e:void 0}})});",
		"src/controller/Master.controller.js": "/*!\n * This file is part of Flocking UI5 Playground\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * You should have received a copy of the GNU General Public License\n * version 3 along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/Filter\",\"sap/ui/model/FilterOperator\",\"sap/m/GroupHeaderListItem\"],function(e,t,n,r){\"use strict\";return e.extend(\"fplay.controller.Master\",{onExampleSelected:function(e){var t=e.getParameter(\"listItem\").getBindingContext(\"examples\");t.getModel().aBindings.filter(function(e){return\"code\"===e.getPath()}).forEach(function(e){e.setContext(t)}),this.getOwnerComponent().getRouter().navToDetail()},onExampleSearch:function(e){var r=[],i=e.getSource().getValue();if(i&&i.length>0){var a=new t({path:\"name\",operator:n.Contains,value1:i});r.push(a)}var o=this.getView().byId(\"idExamplesList\");o.getBinding(\"items\").filter(r,\"Application\")},getGroupHeader:function(e){return new r({title:e.key,upperCase:!1})}})});",
		"src/lib/Router.js": "/*!\n * This file is part of Flocking UI5 Playground\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * You should have received a copy of the GNU General Public License\n * version 3 along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"jquery.sap.global\",\"sap/m/routing/Router\",\"sap/ui/core/routing/History\"],function(t,e,i){\"use strict\";var a=e.extend(\"fplay.lib.Router\",{myNavBack:function(t,e){var a=i.getInstance(),o=a.getPreviousHash();if(void 0!==o)window.history.go(-1);else{var r=!0;this.navTo(t,e,r)}},navToMaster:function(){var t=this.getView(\"fplay.view.Master\",\"XML\");this._oOwner.getApp().toMaster(t.getId(),\"show\")},navToDetail:function(){var t=this.getView(\"fplay.view.Detail\",\"XML\");this._oOwner.getApp().toMaster(t.getId(),\"show\")}});return a},!0);",
		"src/model/Examples.js": "/*!\n * This file is part of Flocking UI5 Playground\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * You should have received a copy of the GNU General Public License\n * version 3 along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"sap/ui/model/json/JSONModel\"],function(e){\"use strict\";var t,o=e.extend(\"fplay.model.Examples\",{mockedDataSource:jQuery.sap.getModulePath(\"fplay.model\",\"/examples.json\"),constructor:function(){if(e.prototype.constructor.call(this,this.mockedDataSource),t)throw\"Constructor of singleton cannot be called\";t=this}});return o.getInstance=function(){return t||(t=new o),t},o});",
		"src/test/integration/navigationJourney.js": "sap.ui.require([\"sap/ui/test/opaQunit\"],function(){\"use strict\";QUnit.module(\"Navigation\"),opaTest(\"Should load example\",function(e,a,i){e.iStartMyAppInAFrame(jQuery.sap.getResourcePath(\"fplay\",\"/index.html\")),a.onTheAppPage.iSpendSomeTime().and.iStoreEditorValue().and.iPressExamplesListItem(),i.onTheAppPage.iShouldSeeEditorChange().and.iTeardownMyAppFrame()})});",
		"src/test/integration/pages/App.js": "sap.ui.require([\"sap/ui/test/Opa5\"],function(e){\"use strict\";var t;e.createPageObjects({onTheAppPage:{actions:{iSpendSomeTime:function(){return this.waitFor({controlType:\"sap.m.SplitApp\",success:function(e){},errorMessage:\"Did not fint the application (sap.m.SplitApp)\"})},iPressExamplesListItem:function(){return this.waitFor({controlType:\"sap.m.List\",success:function(e){e[0].getItems()[1].$().trigger(\"tap\")},errorMessage:\"Did not find the examples list in master view\"})},iStoreEditorValue:function(){return this.waitFor({controlType:\"zlib.Codemirror\",success:function(e){t=e[0].getValue()},errorMessage:\"Did not find the text editor\"})}},assertions:{iShouldSeeEditorChange:function(){return this.waitFor({controlType:\"zlib.Codemirror\",success:function(i){e.assert.ok(t!==i[0].getValue(),\"The dialog is open\")},errorMessage:\"Did not find the dialog control\"})}}}})});",
		"src/test/unit/model/formatter.js": "sap.ui.require([\"fplay/controller/Detail.controller\"],function(t){\"use strict\";QUnit.module(\"Formatting functions\",{}),QUnit.test(\"Should return concatenated text\",function(a){var o=t.prototype.formatLoadedExample;a.strictEqual(o([\"a\",\"b\",\"c\"]),\"a\\nb\\nc\",\"Array should be concatenated\"),a.strictEqual(o(void 0),void 0),a.strictEqual(o(null),void 0),a.strictEqual(o(\"abc\"),\"abc\")})});",
		"src/zlib/Codemirror.js": "/*!\n * OpenUI5 wrapper for CodeMirror\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * This module is licensed under GNU General Public License version 3.\n * You should have received a copy of the License along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"sap/m/TextArea\",\"zlib/CodeMirror/native/lib/codemirror\"],function(e){\"use strict\";jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath(\"zlib.CodeMirror.native.lib.codemirror\",\".css\")),jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath(\"zlib.Codemirror\",\".css\"));var r=e.extend(\"zlib.Codemirror\",{metadata:{properties:{height:{type:\"sap.ui.core.CSSSize\",group:\"Dimension\",defaultValue:\"auto\"},mode:{type:\"string\",group:\"CodemirrorConfig\",defaultValue:void 0},theme:{type:\"string\",group:\"CodemirrorConfig\",defaultValue:void 0},lineNumbers:{type:\"boolean\",group:\"CodemirrorConfig\",defaultValue:!0},lineWrapping:{type:\"boolean\",group:\"CodemirrorConfig\",defaultValue:!0},readOnly:{type:\"boolean\",group:\"CodemirrorConfig\",defaultValue:!1},autoCloseBrackets:{type:\"boolean\",group:\"CodemirrorConfig\",defaultValue:!0},matchBrackets:{type:\"boolean\",group:\"CodemirrorConfig\",defaultValue:!0},highlightSelectionMatches:{type:\"object\",group:\"CodemirrorConfig\",defaultValue:{showToken:/\\w/,annotateScrollbar:!1}}},aggregations:{},events:{liveChange:{parameters:{value:\"string\"}}}},_editor:null,dfdAfterRendering:null,constructor:function(){this.dfdAfterRendering=jQuery.Deferred(),e.apply(this,arguments)},focus:function(){this._editor.focus()},onAfterRendering:function(e){this._editor||(this._editor=CodeMirror.fromTextArea(this._getCodemirrorDomRef(),{mode:this.getMode(),theme:this.getTheme(),lineNumbers:this.getLineNumbers(),lineWrapping:this.getLineWrapping(),readOnly:this.getReadOnly(),autoCloseBrackets:this.getAutoCloseBrackets(),matchBrackets:this.getMatchBrackets(),highlightSelectionMatches:this.getHighlightSelectionMatches()}),this._editor.on(\"changes\",this._setValue.bind(this))),this.dfdAfterRendering.resolve()},setValue:function(e){jQuery.when(this.dfdAfterRendering).then(function(){e&&(this.setProperty(\"value\",e),this._editor.setValue(e))}.bind(this))},_setValue:function(e){var r=e.getValue();this.setProperty(\"value\",r),this.fireLiveChange({id:\"\",formula:r})},setVisible:function(e){this.setProperty(\"visible\",e),this.rerender()},setTheme:function(e){this.setProperty(\"theme\",e),jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath(\"zlib.CodeMirror.native.theme.\"+e,\".css\"))},setMode:function(e){this.setProperty(\"mode\",e),jQuery.sap.require(\"zlib.CodeMirror.native.mode.\"+e+\".\"+e)},setAutoCloseBrackets:function(e){this.setProperty(\"autoCloseBrackets\",e),jQuery.sap.require(\"zlib.CodeMirror.native.addon.edit.closebrackets\")},setMatchBrackets:function(e){this.setProperty(\"matchBrackets\",e),jQuery.sap.require(\"zlib.CodeMirror.native.addon.edit.matchbrackets\")},setHighlightSelectionMatches:function(e){this.setProperty(\"highlightSelectionMatches\",e),jQuery.sap.require(\"zlib.CodeMirror.native.addon.scroll.annotatescrollbar\"),jQuery.sap.require(\"zlib.CodeMirror.native.addon.scroll.matchesonscrollbar\"),jQuery.sap.require(\"zlib.CodeMirror.native.addon.scroll.searchcursor\"),jQuery.sap.require(\"zlib.CodeMirror.native.addon.scroll.match-highlighter\")},insertTextInCurrentCursorPosition:function(e){try{this._editor.replaceRange(e,this._editor.getCursor())}catch(r){jQuery.sap.log.error(this.getMetadata().getName(),\"Unable to insert string into CodeMirror\",r)}},_getCodemirrorDomRef:function(){return this.getDomRef().children[0]},renderer:{render:function(e,r){e.write(\"<div\"),e.writeControlData(r),e.addClass(\"zCodemirror\"),e.writeClasses(),e.write(\">\"),e.write(\"<textarea\"),e.writeAttribute(\"id\",r.getId()+\"--cm\"),e.writeAttribute(\"name\",\"codemirror\"),e.write(\"></textarea>\"),e.write(\"</div>\")},updateVisibility:function(e,r){jQuery(r._getCodemirrorDomRef().nextSibling).css(\"display\",r.getVisible()?\"\":\"none\")}},rerender:function(){var e=sap.ui.getCore().getRenderManager();this.getRenderer().updateVisibility(e,this),this._editor.refresh()}});return r});",
		"src/zlib/Flocking.js": "/*!\n * OpenUI5 wrapper for Flocking\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * This module is licensed under GNU General Public License version 3.\n * You should have received a copy of the License along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([\"sap/ui/base/ManagedObject\",\"zlib/Flocking/native/dist/flocking-no-jquery\"],function(e){\"use strict\";var i=e.extend(\"zlib.Flocking\",{metadata:{properties:{},aggregations:{},events:{}}});return i});",
		"src/zlib/library.js": "/*!\n * This file is part of Flocking UI5 Playground\n * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>\n *\n * You should have received a copy of the GNU General Public License\n * version 3 along with this program.\n * If not, see <http://www.gnu.org/licenses/>.\n */\nsap.ui.define([],function(){\"use strict\";return sap.ui.getCore().initLibrary({name:\"zlib\",version:\"0.0.1\",dependencies:[\"sap.m\"],noLibraryCSS:!0}),zlib},!0);",
		"src/view/App.view.xml": "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><core:View\n    controllerName=\"fplay.controller.App\"\n    displayBlock=\"true\"\n    xmlns=\"sap.m\"\n\n    xmlns:core=\"sap.ui.core\"\n    xmlns:mvc=\"sap.ui.core.mvc\"\n><SplitApp\n      id=\"app\"\n  /></core:View>\n",
		"src/view/Detail.view.xml": "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><core:View\n    controllerName=\"fplay.controller.Detail\"\n    displayBlock=\"true\"\n    class=\"DetailView\"\n    xmlns=\"sap.m\"\n    xmlns:core=\"sap.ui.core\"\n    xmlns:zlib=\"zlib\"\n><Page\n      title=\"{i18n>detailPageTitle}\"\n      showNavButton=\"true\"\n      navButtonPress=\"onNavBack\"\n      enableScrolling=\"true\"\n  ><content><Toolbar><ToggleButton\n            icon=\"sap-icon://hello-world\"\n            press=\"onHelloWorldPress\"\n        /><ToggleButton\n            icon=\"sap-icon://full-screen\"\n            press=\"onGoFullscreen\"\n        /><ToolbarSpacer /><ToggleButton\n            icon=\"sap-icon://play\"\n            press=\"onTogglePlayback\"\n        /></Toolbar><zlib:Codemirror\n          id=\"jseditor\"\n          theme=\"solarized\"\n          mode=\"javascript\"\n          value=\"{\n            path: 'examples>code',\n            formatter: '.formatLoadedExample'\n          }\"\n      /></content></Page></core:View>\n",
		"src/view/Master.view.xml": "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><core:View\n    controllerName=\"fplay.controller.Master\"\n    displayBlock=\"true\"\n    class=\"MasterView\"\n    xmlns=\"sap.m\"\n    xmlns:core=\"sap.ui.core\"\n    xmlns:zlib=\"zlib\"\n><Page\n      title=\"{i18n>examplesPageTitle}\"\n  ><subHeader><Toolbar\n          class=\"DetailView__Toolbar\"\n          design=\"Solid\"\n      ><SearchField\n            liveChange=\"onExampleSearch\"\n            width=\"100%\"\n        /></Toolbar></subHeader><List\n        id=\"idExamplesList\"\n        mode=\"SingleSelectMaster\"\n        noDataText=\"{i18n>examplesListNoDataText}\"\n        selectionChange=\"onExampleSelected\"\n        items=\"{\n          path: 'examples>/',\n          sorter: {\n            path: 'group',\n            descending: false,\n            group: true\n          },\n          groupHeaderFactory: '.getGroupHeader'\n        }\"\n    ><StandardListItem\n          title=\"{examples>name}\"\n          description=\"{examples>desc}\"\n      /></List></Page></core:View>\n",
		"src/i18n/i18n.properties": "# manifest\nappTitle=Flocking playground with OpenUI5 interface and CodeMirror\nappDescription=Flocking playground with OpenUI5 interface and CodeMirror\n\n# page views\nexamplesPageTitle=Examples\nexamplesListNoDataText=Examples not loaded\ndetailPageTitle=Flocking Interactive Playground\n",
		"src/i18n/i18n_en.properties": "# manifest\nappTitle=Flocking playground with OpenUI5 interface and CodeMirror\nappDescription=Flocking playground with OpenUI5 interface and CodeMirror\n\n# page views\nexamplesPageTitle=Examples\nexamplesListNoDataText=Examples not loaded\ndetailPageTitle=Flocking Interactive Playground\n",
		"src/i18n/i18n_en_US.properties": "# manifest\nappTitle=Flocking playground with OpenUI5 interface and CodeMirror\nappDescription=Flocking playground with OpenUI5 interface and CodeMirror\n\n# page views\nexamplesPageTitle=Examples\nexamplesListNoDataText=Examples not loaded\ndetailPageTitle=Flocking Interactive Playground\n"
	}
});