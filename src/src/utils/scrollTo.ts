export const scrollToSection = (id: string, headerSelector = '.header', sectionSelector = 'section') => {
  const element = document.getElementById(id);
  const header = document.querySelector<HTMLElement>(headerSelector);
  const section = document.querySelector<HTMLElement>(sectionSelector);
  const headerHeight = header ? header.offsetHeight : 0;

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - headerHeight - 50;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};