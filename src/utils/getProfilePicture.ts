// Utility function to generate profile picture URL
export const getProfilePicture = (
  firstName: string,
  lastName: string,
  gender: string | undefined,
  profileUrl?: string
): string => {
  if (profileUrl) return profileUrl;

  const userName = `${firstName}${lastName}`;
  const randomProfileUrl = `https://avatar.iran.liara.run/username?username=${userName}`;
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

  // eslint-disable-next-line no-nested-ternary
  return gender === 'female' ? girlProfilePic : gender === 'male' ? boyProfilePic : randomProfileUrl;
};
