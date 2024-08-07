import 'requestidlecallback-polyfill';

type ClientState = 'load' | 'idle' | 'visible' | 'media';

// eslint-disable-next-line import/prefer-default-export
export class Island extends HTMLElement {
  client: ClientState;

  media?: string;

  assetUrl: string;

  elementName: string;

  constructor() {
    super();
    this.client = this.getClientState();
    this.assetUrl = this.getAssetUrl();
    this.elementName = this.getElementName();
  }

  public getElementName(): string {
    if (this.hasAttribute('element-name') !== true) {
      throw Error('Island tried to initialize without a valid element-name attribute');
    }

    const elementName = this.getAttribute('element-name');

    if (typeof elementName !== 'string') {
      throw Error('No element name passed to Island element-name');
    }

    return elementName;
  }

  public getAssetUrl(): string {
    if (this.hasAttribute('asset-url') !== true) {
      throw Error('Island tried to initialize without a valid asset url to load');
    }

    const assetUrl = this.getAttribute('asset-url');

    if (typeof assetUrl !== 'string') {
      throw Error('No url passed to Island asset-url');
    }

    return assetUrl?.startsWith('//') ? `https://${assetUrl}` : assetUrl;
  }

  public getClientState(): ClientState {
    if (this.hasAttribute('client') !== true) {
      throw Error('Island tried to load without a state');
    }

    const clientState = this.getAttribute('client');
    const possibleStates = ['load', 'idle', 'visible', 'media'];

    if (typeof clientState !== 'string') {
      throw Error('Loaded island state is not a string');
    }

    if (!possibleStates.includes(clientState)) {
      throw Error('Invalid state for island');
    }

    return clientState as ClientState;
  }

  public importIslandAsset(): void {
    requestAnimationFrame(() => {
      this.outerHTML = this.innerHTML;
      const doesExist = window.customElements.get(this.elementName);

      if (doesExist !== undefined) {
        throw Error(`${this.elementName} already registered to a customElements`);
      }

      import(/* @vite-ignore */ this.assetUrl);
    });
  }

  private intersectionObserverCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      this.importIslandAsset();
      observer.disconnect();
    });
  }

  public mediaObserver(event: Event): void {
    event.preventDefault();

    if (this.media && window.matchMedia(this.media).matches) {
      this.importIslandAsset();

      window.removeEventListener('resize', this.mediaObserver);
    }
  }

  public connectedCallback(): void {
    switch (this.client) {
      case 'load':
        console.log(true);
        this.importIslandAsset();
        break;
      case 'idle':
        window.requestIdleCallback(() => this.importIslandAsset());
        break;
      case 'media':
        if (this.media === undefined) {
          this.importIslandAsset();
          break;
        }

        if (window.matchMedia(this.media).matches) {
          this.importIslandAsset();
          break;
        }

        window.addEventListener('resize', this.mediaObserver);
        break;
      case 'visible':
        // eslint-disable-next-line no-case-declarations
        const intersectionObserver = new IntersectionObserver(this.intersectionObserverCallback, {
          root: document,
          threshold: 1.0,
          rootMargin: '0px',
        });

        intersectionObserver.observe(this);
        break;
      default:
        this.importIslandAsset();
        break;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
window.customElements.get('island-element') || window.customElements.define('island-element', Island);
