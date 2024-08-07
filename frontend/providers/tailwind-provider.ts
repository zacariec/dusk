import 'construct-style-sheets-polyfill';
import { css, CSSResultGroup, LitElement } from 'lit';

export class TailwindProvider extends LitElement {
  static styles = css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  ` as CSSResultGroup;
}
