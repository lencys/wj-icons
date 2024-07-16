import { default as WJElement } from "../../node_modules/wj-elements/dist/wje-element.js";
import { getUrl, getSvgContent, iconContent } from "./service/service.js";
import styles from "./styles/styles.css?inline";

/**
 * @summary This element represents an icon. `IconElement` is a custom web component that represents an icon.
 * @documentation https://elements.webjet.sk/components/icon
 * @status stable
 *
 * @extends WJElement
 *
 * @part svg - The SVG part of the icon
 *
 * @cssproperty [--wje-icon-size=1rem] - The size of the icon
 * @cssproperty [--wje-icon-width=var(--wje-icon-size, 100%)] - The width of the icon
 * @cssproperty [--wje-icon-height=var(--wje-icon-size, 100%)] - The height of the icon
 *
 * @tag wje-icon
 */
export default class Icon extends WJElement {
    /**
     * Creates an instance of IconElement.
     *
     * @constructor
     */
    constructor() {
        super();
        debugger
    }

    className = "Icon";

    /**
     * Returns the CSS styles for the component.
     *
     * @static
     * @returns {CSSStyleSheet}
     */
    static get cssStyleSheet() {
        return styles;
    }

    /**
     * Returns the list of attributes to observe for changes.
     *
     * @static
     * @returns {Array<string>}
     */
    static get observedAttributes() {
        return ["name"];
    }

    /**
     * Sets up the attributes for the component.
     */
    setupAttributes() {
        this.isShadowRoot = "open";
    }

    /**
     * Draws the component.
     *
     * @param {Object} context - The context for drawing.
     * @param {Object} store - The store for drawing.
     * @param {Object} params - The parameters for drawing.
     * @returns {DocumentFragment}
     */
    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        this.classList.add("lazy-loaded-image", "lazy");

        let native = document.createElement("div");
        native.setAttribute('part', 'native');
        native.classList.add("native-icon");

        this.url = getUrl(this);

        fragment.appendChild(native);

        this.native = native;

        return fragment;
    }

    /**
     * Called after the component has been drawn.
     */
    afterDraw() {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    getSvgContent(this.url).then((svgContent) => {
                        this.native.innerHTML = iconContent?.get(this.url);
                        this.native.querySelector("svg")?.setAttribute("part", "svg");

                    });

                    this.classList.remove("lazy");
                    lazyImageObserver.unobserve(entry.target);
                }
            });
        });

        lazyImageObserver.observe(this.native);
    }
}