/**
 * Functionality for drawing waved circles.
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
import { Circle } from "./Circle";
import { registry } from "../Registry";
import * as $path from "../rendering/Path";
import * as $math from "../utils/Math";
import * as $utils from "../utils/Utils";
import * as $smoothing from "../../core/rendering/Smoothing";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a waved circle.
 *
 * @see {@link IWavedCircleEvents} for a list of available events
 * @see {@link IWavedCircleAdapters} for a list of available Adapters
 */
var WavedCircle = /** @class */ (function (_super) {
    __extends(WavedCircle, _super);
    /**
     * Constructor
     */
    function WavedCircle() {
        var _this = _super.call(this) || this;
        _this.className = "WavedCircle";
        _this.element = _this.paper.add("path");
        _this.waveLength = 16;
        _this.waveHeight = 4;
        _this.fill = undefined;
        _this.fillOpacity = 0;
        _this.tension = 0.8;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the waved line.
     *
     * @ignore Exclude from docs
     */
    WavedCircle.prototype.draw = function () {
        var path = "";
        var radius = this.pixelRadius;
        if (radius > 0) {
            var points = this.getPoints(radius);
            path = $path.moveTo(points[0]) + new $smoothing.Tension(this.tension, this.tension).smooth(points);
        }
        var innerRadius = this.pixelInnerRadius;
        if (innerRadius > 0) {
            var points = this.getPoints(innerRadius);
            points.reverse();
            path += $path.moveTo(points[0]) + new $smoothing.Tension(this.tension, this.tension).smooth(points);
        }
        this.element.attr({ "d": path });
    };
    /**
     * Returns points that circle consists of.
     *
     * @param  {number}    radius  Radius (px)
     * @return {IPoint[]}          Points
     */
    WavedCircle.prototype.getPoints = function (radius) {
        var circleLength = radius * Math.PI * 2;
        var halfWaveHeight = this.waveHeight / 2;
        var waveLength = circleLength / Math.round(circleLength / this.waveLength);
        var halfWaveLength = waveLength / 2;
        var points = [];
        var count = circleLength / waveLength;
        for (var i = 0; i <= count; i++) {
            var angle1 = (i * waveLength) / circleLength * 360;
            var angle2 = (i * waveLength + halfWaveLength) / circleLength * 360;
            points.push({ x: (radius - halfWaveHeight) * $math.cos(angle1), y: (radius - halfWaveHeight) * $math.sin(angle1) });
            points.push({ x: (radius + halfWaveHeight) * $math.cos(angle2), y: (radius + halfWaveHeight) * $math.sin(angle2) });
        }
        points.pop();
        return points;
    };
    Object.defineProperty(WavedCircle.prototype, "innerRadius", {
        /**
         * @return {number} Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the circle in pixels (absolute) or [[Percent]] (relative).
         *
         * @param {number | Percent}  value  Inner radius
         */
        set: function (value) {
            this.setPropertyValue("innerRadius", value, true);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "pixelInnerRadius", {
        /**
         * Calculated inner radius of the circle in pixels.
         *
         * @readonly
         * @return {number} Inner radius (px)
         */
        get: function () {
            return $utils.relativeToValue(this.innerRadius, $math.min(this.innerWidth / 2, this.innerHeight / 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "waveLength", {
        /**
         * @return {number} Wave length (px)
         */
        get: function () {
            return this.getPropertyValue("waveLength");
        },
        /**
         * Wave length in pixels.
         *
         * @default 16
         * @param {number}  value  Wave length (px)
         */
        set: function (value) {
            this.setPropertyValue("waveLength", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "waveHeight", {
        /**
         * @return {number} Wave height (px)
         */
        get: function () {
            return this.getPropertyValue("waveHeight");
        },
        /**
         * Wave height in pixels.
         *
         * @default 4
         * @param {number}  value  Wave height (px)
         */
        set: function (value) {
            this.setPropertyValue("waveHeight", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "tension", {
        /**
         * @return {number} Tension
         */
        get: function () {
            return this.getPropertyValue("tension");
        },
        /**
         * Tension of the wave.
         *
         * @default 0.8
         * @param {number}  value  Tension
         */
        set: function (value) {
            this.setPropertyValue("tension", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    return WavedCircle;
}(Circle));
export { WavedCircle };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["WavedCircle"] = WavedCircle;
//# sourceMappingURL=WavedCircle.js.map