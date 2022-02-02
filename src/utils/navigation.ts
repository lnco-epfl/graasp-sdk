type RedirectOptions = {
  openInNewTab?: boolean;
  name?: string;
};

export const redirect = (url: string, options?: RedirectOptions) => {
  const { openInNewTab = false, name = '_blank' } = options ?? {};

  if (openInNewTab) {
    window.open(url, name);
  } else {
    window.location.assign(url);
  }
};
