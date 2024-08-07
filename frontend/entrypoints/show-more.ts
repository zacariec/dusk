export class ShowMoreButton extends HTMLElement {
  constructor() {
    super();
    const button = this.querySelector('button');

    if (!button) {
      return;
    }

    button.addEventListener('click', (event) => {
      this.expandShowMore(event);
      const target = event.target as HTMLElement;
      const closestParentDisplay = target.closest('.parent-display');

      if (!closestParentDisplay) {
        return;
      }

      const nextElementToFocus = closestParentDisplay.querySelector('.show-more-item');
      if (nextElementToFocus && !nextElementToFocus.classList.contains('hidden') && nextElementToFocus.querySelector('input')) {
        nextElementToFocus.querySelector('input')?.focus();
      }
    });
  }

  expandShowMore(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const closestShowMore = target.closest('[id^="Show-More-"]');

    if (!closestShowMore) {
      return;
    }

    const parentDisplay = closestShowMore.closest('.parent-display');

    if (!parentDisplay) {
      return;
    }

    // Not sure why this is still here - not in use?
    // const parentWrap = parentDisplay.querySelector('.parent-wrap');

    this.querySelectorAll('.label-text').forEach((element) => element.classList.toggle('hidden'));

    parentDisplay.querySelectorAll('.show-more-item').forEach((item) => item.classList.toggle('hidden'));

    if (!this.querySelector('.label-show-less')) {
      this.classList.add('hidden');
    }
  }

}

customElements.get('show-more-button') || customElements.define('show-more-button', ShowMoreButton);
