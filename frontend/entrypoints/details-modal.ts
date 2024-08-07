import { trapFocus } from "./global";

export class DetailsModal extends HTMLElement {
  detailsContainer: HTMLDetailsElement | null;

  summaryToggle: HTMLElement | null;

  onBodyClickEvent?: (arg0: MouseEvent) => void;

  constructor() {
    super();
    this.detailsContainer = this.querySelector('details');
    this.summaryToggle = this.querySelector('summary');

    if (!this.detailsContainer || !this.summaryToggle) {
      return;
    }

    this.detailsContainer.addEventListener('keyup', (event) => event.code.toUpperCase() === 'ESCAPE' && this.close());
    this.summaryToggle.addEventListener('click', this.onSummaryClick.bind(this));

    const closeButton = this.querySelector('button[type="button"]') as HTMLButtonElement | null;

    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this));
    }

    this.summaryToggle.setAttribute('role', 'button');
  }

  isOpen(): boolean {

    if (!this.detailsContainer) {
      return false;
    }

    return this.detailsContainer.hasAttribute('open');
  }

  onSummaryClick(event: MouseEvent): void {
    event.preventDefault();
    const target = event.target as HTMLElement | null;


    if (!target) {
      return;
    }

    const details = target.closest('details');

    if (!details) {
      return;
    }

    details.hasAttribute('open') ? this.close() : this.open(event);
  }

  onBodyClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    if (!target) {
      return;
    }

    if (!this.contains(target) || target.classList.contains('modal-overlay')) {
      this.close(false);
    }
  }

  open(event: MouseEvent) {
    this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this);

    const target = event.target as HTMLElement | null;

    if (!target) {
      return;
    }

    const detailsElement = target.closest('details');

    if (detailsElement) {
      detailsElement.setAttribute('open', String(true));
    }

    document.body.addEventListener('click', this.onBodyClickEvent);
    document.body.classList.add('overflow-hidden');

    if (!this.detailsContainer) {
      return;
    }

    const focusContainer = this.detailsContainer.querySelector('[tabindex="-1"]');
    const elementToFocus = this.detailsContainer.querySelector('input:not([type="hidden"])');


    if (focusContainer && elementToFocus) {
      trapFocus(
        focusContainer,
        elementToFocus,
      );
    }
  }

  close(focusToggle = true): void {
    removeTrapFocus(focusToggle ? this.summaryToggle : null);

    this.detailsContainer?.removeAttribute('open');

    document.body.removeEventListener('click', this.onBodyClickEvent);
    document.body.classList.remove('overflow-hidden');
  }
}

customElements.get('details-modal') || customElements.define('details-modal', DetailsModal);
