/**
 * Preloader module.
 *
 * Preloader is a progress indicator.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../Container";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { Slice } from "./Slice";
import { Label } from "./Label";
import { registry } from "../Registry";
import { percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A class used to draw and display progress indicator.
 *
 * @see {@link IPreloaderEvents} for a list of available events
 * @see {@link IPreloaderAdapters} for a list of available Adapters
 */
var Preloader = /** @class */ (function (_super) {
    __extends(Preloader, _super);
    /**
     * Constructor
     */
    function Preloader() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "Preloader";
        // Set dimensions
        _this.width = percent(100);
        _this.height = percent(100);
        var interfaceColors = new InterfaceColorSet();
        // Create main container
        var sliceContainer = _this.createChild(Container);
        sliceContainer.shouldClone = false;
        // Add background (100%) slice
        var backgroundSlice = sliceContainer.createChild(Slice);
        backgroundSlice.shouldClone = false;
        backgroundSlice.radius = 53;
        backgroundSlice.arc = 360;
        backgroundSlice.fill = interfaceColors.getFor("fill");
        backgroundSlice.fillOpacity = 0.8;
        backgroundSlice.innerRadius = 42;
        backgroundSlice.isMeasured = false;
        _this.backgroundSlice = backgroundSlice;
        // Add progress slice
        var progressSlice = sliceContainer.createChild(Slice);
        progressSlice.shouldClone = false;
        progressSlice.radius = 50;
        progressSlice.innerRadius = 45;
        progressSlice.fill = interfaceColors.getFor("alternativeBackground");
        progressSlice.fillOpacity = 0.2;
        progressSlice.isMeasured = false;
        _this.progressSlice = progressSlice;
        // Add text label element
        var label = sliceContainer.createChild(Label);
        label.shouldClone = false;
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.isMeasured = false;
        label.fill = interfaceColors.getFor("text");
        label.align = "center";
        label.valign = "middle";
        label.fillOpacity = 0.4;
        _this.label = label;
        // Set defaults
        _this.background.opacity = 1;
        _this.background.fill = interfaceColors.getFor("background");
        _this.contentAlign = "center";
        _this.contentValign = "middle";
        _this.delay = 500;
        // Create hidden state
        var hiddenState = _this.states.create("hidden");
        hiddenState.transitionDuration = 2000;
        hiddenState.properties.opacity = 0;
        // Hide by default
        _this.visible = false;
        _this.hide(0);
        // Make it disposable
        // @todo Maybe it's enough to just dispose `sliceContainer`?
        _this._disposers.push(_this.backgroundSlice);
        _this._disposers.push(_this.progressSlice);
        _this._disposers.push(_this.label);
        _this._disposers.push(sliceContainer);
        return _this;
    }
    Object.defineProperty(Preloader.prototype, "progress", {
        /**
         * @return {number} Progress (0-1)
         */
        get: function () {
            return this.getPropertyValue("progress");
        },
        /**
         * Current preload progress. (0-1)
         *
         * * 0 - 0%
         * * 0.5 - 50%
         * * 1 - 100%
         *
         * Setting this to a value less than 1, will automatically reveal the
         * preloader, while setting it to 1 (100%) will hide it.
         *
         * @param {number} value Progress (0-1)
         */
        set: function (value) {
            var _this = this;
            this.setPropertyValue("progress", value);
            /*if (!this.visible && value == 1) {
                return;
            }*/
            this.progressSlice.arc = 360 * value;
            if (this.label) {
                this.label.text = Math.round(value * 100) + "%";
            }
            if (value >= 1) {
                // Cancel the timeout
                if (this._started) {
                    this._started = undefined;
                }
                // TODO remove closure ?
                registry.events.once("enterframe", function () {
                    _this.hide();
                });
                this.interactionsEnabled = false;
            }
            else if (value > 0) {
                if (this.delay) {
                    if (!this._started) {
                        this._started = new Date().getTime();
                    }
                    else if ((this._started + this.delay) >= new Date().getTime()) {
                        this.show();
                        this.interactionsEnabled = true;
                    }
                }
                else {
                    this.show();
                    this.interactionsEnabled = true;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Preloader.prototype, "delay", {
        /**
         * @return {number} Delay (ms)
         */
        get: function () {
            return this.getPropertyValue("delay");
        },
        /**
         * Delay display of preloader by X milliseconds.
         *
         * When loading starts (`progress` is set to <1) and finishes (`progress` is
         * set to 1) before `delay` ms, the loader is never shown.
         *
         * This is used to avoid brief flashing of the preload for very quick loads.
         *
         * @default 1000
         * @param {number}  value  Delay (ms)
         */
        set: function (value) {
            this.setPropertyValue("delay", value);
        },
        enumerable: true,
        configurable: true
    });
    return Preloader;
}(Container));
export { Preloader };
//# sourceMappingURL=Preloader.js.map