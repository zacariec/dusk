export class DetailsDisclosure extends HTMLElement {
  mainDetailsToggle: HTMLDetailsElement | null;

  content?: HTMLElement | null;

  summary?: HTMLElement | null;

  animations?: Array<unknown>

  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');

    if (!this.mainDetailsToggle) {
      return;
    }

    this.summary = this.mainDetailsToggle.querySelector<HTMLElement>('summary');

    if (!this.summary) {
      return;
    }

    this.content = this.summary.nextElementSibling as HTMLElement | null;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut(): void {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.close();
      }
    });
  }

  onToggle(): void {
    if (!this.animations) {
      this.animations = this.content.getAnimations();
    }

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close(): void {
    this.mainDetailsToggle?.removeAttribute('open');
    this.summary?.setAttribute('aria-expanded', String(false));
  }
}

customElements.get('details-disclosure') || customElements.define('details-disclosure', DetailsDisclosure);

export class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define('header-menu', HeaderMenu);
