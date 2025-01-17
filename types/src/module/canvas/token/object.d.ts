import { TokenDocumentPF2e } from "@module/scene";
import { TokenLayerPF2e } from "..";
import { TokenAuras } from "./auras";
declare class TokenPF2e extends Token<TokenDocumentPF2e> {
    /** Visual representation and proximity-detection facilities for auras */
    auras: TokenAuras;
    /** Used to track conditions and other token effects by game.pf2e.StatusEffects */
    statusEffectChanged: boolean;
    /** The promise returned by the last call to `Token#draw()` */
    private drawLock?;
    /** Is the user currently controlling this token? */
    get isControlled(): boolean;
    /** Is the user currently mouse-hovering this token? */
    get isHovered(): boolean;
    /** Is this token currently moving? */
    get isMoving(): boolean;
    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have low-light vision (inclusive of darkvision)? */
    get hasLowLightVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have darkvision vision? */
    get hasDarkvision(): boolean;
    /** Is this token's dimensions linked to its actor's size category? */
    get linkToActorSize(): boolean;
    /** The ID of the highlight layer for this token */
    get highlightId(): string;
    isAdjacentTo(token: TokenPF2e): boolean;
    /**
     * Determine whether this token can flank another—given that they have a flanking buddy on the opposite side
     * @param flankee       The potentially flanked token
     * @param context.reach An optional reach distance specific to this measurement */
    canFlank(flankee: TokenPF2e, context?: {
        reach?: number;
    }): boolean;
    /** Determine whether this token is in fact flanking another */
    isFlanking(flankee: TokenPF2e, { reach }?: {
        reach?: number;
    }): boolean;
    /** Max the brightness emitted by this token's `PointSource` if any controlled token has low-light vision */
    updateSource({ defer, deleted, skipUpdateFog }?: {
        defer?: boolean | undefined;
        deleted?: boolean | undefined;
        skipUpdateFog?: boolean | undefined;
    }): void;
    /** Make the drawing promise accessible to `#redraw` */
    draw(): Promise<this>;
    /** Draw auras along with effect icons */
    drawEffects(): Promise<void>;
    emitHoverIn(): void;
    emitHoverOut(): void;
    /** If Party Vision is enabled, make all player-owned actors count as vision sources for non-GM users */
    protected _isVisionSource(): boolean;
    /** Include actor overrides in the clone if it is a preview */
    clone(): this;
    /** Emit floaty text from this tokens */
    showFloatyText(params: number | ShowFloatyEffectParams): Promise<void>;
    /**
     * Measure the distance between this token and another object, in grid distance. We measure between the
     * centre of squares, and if either covers more than one square, we want the minimum distance between
     * any two of the squares.
     */
    distanceTo(target: TokenPF2e, { reach }?: {
        reach?: number | null;
    }): number;
    /** Add a callback for when a movement animation finishes */
    animateMovement(ray: Ray): Promise<void>;
    /** Refresh vision and the `EffectsPanel` */
    protected _onControl(options?: {
        releaseOthers?: boolean;
        pan?: boolean;
    }): void;
    /** Refresh vision and the `EffectsPanel` */
    protected _onRelease(options?: Record<string, unknown>): void;
    /** Work around Foundry bug in which unlinked token redrawing performed before data preparation completes */
    _onUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this["document"]>, userId: string): void;
    protected _onDragLeftStart(event: TokenInteractionEvent<this>): void;
    /** If a single token (this one) was dropped, re-establish the hover status */
    protected _onDragLeftDrop(event: TokenInteractionEvent<this>): Promise<this["document"][]>;
    protected _onHoverIn(event: PIXI.InteractionEvent, options?: {
        hoverOutOthers?: boolean;
    }): boolean;
    protected _onHoverOut(event: PIXI.InteractionEvent): boolean;
    _onCreate(data: foundry.data.TokenSource, options: DocumentModificationContext<TokenDocumentPF2e>, userId: string): void;
    /** Destroy auras before removing this token from the canvas */
    _onDelete(options: DocumentModificationContext<TokenDocumentPF2e>, userId: string): void;
    /** A callback for when a movement animation for this token finishes */
    private onFinishMoveAnimation;
}
interface TokenPF2e extends Token<TokenDocumentPF2e> {
    get layer(): TokenLayerPF2e<this>;
    icon?: TokenImage;
}
interface TokenImage extends PIXI.Sprite {
    src?: VideoPath;
}
declare type NumericFloatyEffect = {
    name: string;
    value?: number | null;
};
declare type ShowFloatyEffectParams = number | {
    create: NumericFloatyEffect;
} | {
    update: NumericFloatyEffect;
} | {
    delete: NumericFloatyEffect;
};
export { TokenPF2e };
