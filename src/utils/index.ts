export const formatDate = (dateString: string) => {
  const dateObject = new Date(dateString);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

type PlatformImageTypeTest = Record<string, string>;

export const platformImages: PlatformImageTypeTest = {
  android: "/images/platforms/android.svg",
  ios: "/images/platforms/ios.svg",
  nintendo: "/images/platforms/nintendo.svg",
  pc: "/images/platforms/pc.svg",
  playstation: "/images/platforms/playstation.svg",
  xbox: "/images/platforms/xbox.svg",
  others: "/images/platforms/others.svg",
};
