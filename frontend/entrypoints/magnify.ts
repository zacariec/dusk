// create a container and set the full-size image as its background
export function createOverlay(image: HTMLImageElement): HTMLDivElement  {
  const overlay = document.createElement('div');
  const overlayImage = document.createElement('img');

  overlayImage.setAttribute('src', `${image.src}`);
  prepareOverlay(overlay, overlayImage);

  image.style.opacity = '50%';
  toggleLoadingSpinner(image);

  overlayImage.onload = () => {
    toggleLoadingSpinner(image);

    if (image.parentElement) {
      image.parentElement.insertBefore(overlay, image);
    }

    image.style.opacity = '100%';
  };

  return overlay;
}

export function prepareOverlay(container: HTMLElement, image: HTMLImageElement): void {
  container.setAttribute('class', 'image-magnify-full-size');
  container.setAttribute('aria-hidden', 'true');

  container.style.backgroundImage = `url('${image.src}')`;
  container.style.backgroundColor = 'var(--gradient-background)';
}

export function toggleLoadingSpinner(image: HTMLImageElement): void {
  const loadingSpinner = image.parentElement.parentElement.querySelector(`.loading__spinner`);
  loadingSpinner.classList.toggle('hidden');
}

export function moveWithHover(image: HTMLImageElement, event: MouseEvent, zoomRatio: number) {
  // calculate mouse position
  const target = event.target as HTMLElement | null;

  if (!target) {
    return;
  }

  const ratio = image.height / image.width;
  const container = target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (image.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((image.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  // TODO: Fix this global issue of overlay???
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
}

export function magnify(image: HTMLImageElement, zoomRatio: number) {
  const overlay = createOverlay(image);

  overlay.onclick = () => overlay.remove();
  overlay.onmousemove = (event: MouseEvent) => moveWithHover(image, event, zoomRatio);
  overlay.onmouseleave = () => overlay.remove();
}

export function enableZoomOnHover(zoomRatio: number) {
  const images = document.querySelectorAll('.image-magnify-hover') as Array<HTMLImageElement>;
  images.forEach((image) => {
    image.onclick = (event) => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };
  });
}

enableZoomOnHover(2);
