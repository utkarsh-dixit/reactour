export type StyleFn = (
  props: { [key: string]: any },
  state?: { [key: string]: any }
) => React.CSSProperties

export type Styles = {
  maskWrapper: StyleFn
  svgWrapper: StyleFn
  maskArea: StyleFn
  maskRect: StyleFn
  clickArea: StyleFn
  highlightedArea: StyleFn
}

export type StylesObj = Partial<Styles>

export type StyleKey = keyof Styles

/**
 * @deprecated Use `StyleKey` alias instead.
 */
export type StylesKeys = StyleKey

export const defaultStyles: Styles = {
  maskWrapper: () => ({
    opacity: 0.7,
    left: 0,
    top: 0,
    position: 'fixed',
    zIndex: 99999,
    pointerEvents: 'none',
    color: '#000',
  }),
  svgWrapper: ({ windowWidth, windowHeight, wpx, wpy }) => ({
    width: windowWidth,
    height: windowHeight,
    left: Number(wpx) / 2,
    top: Number(wpy) / 2,
    position: 'fixed',
  }),
  maskArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    fill: 'black',
    rx: 0,
  }),
  maskRect: ({ windowWidth, windowHeight, maskID }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: 'currentColor',
    mask: `url(#${maskID})`,
  }),
  clickArea: ({ windowWidth, windowHeight, clipID }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: 'currentcolor',
    pointerEvents: 'auto',
    clipPath: `url(#${clipID})`,
  }),
  highlightedArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    pointerEvents: 'auto',
    fill: 'transparent',
    display: 'none',
  }),
}

export type getStylesType = (key: StylesKeys, extra?: any) => {}

export function stylesMatcher(styles: StylesObj) {
  return (key: StyleKey, state: {}): any => {
    const base = defaultStyles[key](state)
    const custom = styles[key]
    return custom ? custom(base, state) : base
  }
}
