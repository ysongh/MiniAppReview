export const getPlaceholderProfileImg = (address?: string) => {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`
}
