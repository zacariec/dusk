import type { HeaderMenu } from "./frontend/entrypoints/details-disclosure";
import type { DetailsModal } from "./frontend/entrypoints/details-modal";
import type { PredictiveSearch } from "./frontend/entrypoints/predictive-search";

export {};
export interface StickyHeader extends HTMLElement {
  header: HTMLDivElement | null;
  headerIsAlwaysSticky: boolean;
  headerBounds: Record<string, unknown>;
  currentScrollTop: number;
  preventReveal: boolean;
  predictiveSearch: PredictiveSearch | null;
  disclosures: Array<HeaderMenu> | null;
  searchModal: DetailsModal;
  setHeaderHeight: () => void;
  onScrollHandler: (arg0: Event) => void;
  hideHeaderOnScrollUp: () => boolean;
  createObserver: () => void;
  onScroll: () => void;
  hide: () => void;
  reveal: () => void;
  reset: () => void;
  closeMenuDisclosure: () => void;
}

declare global {
  interface HTMLElementTagMap {
    'sticky-header': StickyHeader;
  }
  interface Window {
    Shopify: {
      CountryProvinceSelector: (arg0: number, arg1: number, arg2: object) => unknown;
      PaymentButton: {
        init: () => void;
      };
      PreviewBarInjector?: (arg0: unknown) => unknown;
      addListener: (arg0: string, arg1: string, arg2: Function) => unknown;
      analytics?: {
        replayQueue: Array<unknown>;
        publish: (arg0: unknown, arg1: unknown, arg2: object) => (arg0: unknown, arg1: unknown, arg2: object) => unknown;
        visitor: (arg0: unknown, arg1: unknown) => (arg0: unknown, arg1: unknown) => unknown;
      };
      autoloadFeatures: (arg0: string) => unknown;
      bind: (arg0: Function, arg1: string) => unknown;
      captcha: {
        protect: (arg0: unknown, arg1: unknown) => unknown;
      };
      cdnHost: string;
      ce_forms?: {
        q?: Array<unknown>;
      };
      country: string;
      currency: {
        active: string;
        rate: string;
      };
      customerPrivacy: {
        [key: string]: Function | Record<string, Function>;
      };
      evids?: (...args: unknown[]) => unknown;
      featureAssets?: {
        [key: string]: Record<string, string[]>
      };
      loadFeatures: (arg0: unknown, arg1: unknown) => unknown;
      locale: string;
      modules: boolean;
      postLink?: (arg0: string, arg1?: object) => unknown;
      routes: {
        root: string;
        [key: string]: string;
      };
      setSelectorByValue?: (arg0: string, value: string) => unknown;
      shop: string;
      theme: {
        handle: string;
        id: number;
        name: string;
        role: string;
        style: {
          id: number | null;
          handle: string | null;
        };
        theme_store_id: number | null;
      };
      trackingConsent?: {
        [key: string]: Function | Record<string, Function>;
      }
      designMode?: boolean;
    }
  }
}
