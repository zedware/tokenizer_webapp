/**
 * Generate a consistent color for a token based on its ID.
 * Returns a hex color string and a text color (light or dark) for readability.
 */
export function getTokenColor(tokenId: number): {
  bg: string;
  text: string;
} {
  // Color palette inspired by tiktokenizer - varied pastel and bright colors
  const colors = [
    { bg: '#FF6B6B', text: '#fff' },      // Red
    { bg: '#4ECDC4', text: '#fff' },      // Teal
    { bg: '#FFE66D', text: '#000' },      // Yellow
    { bg: '#95E1D3', text: '#000' },      // Mint
    { bg: '#F38181', text: '#fff' },      // Light Red
    { bg: '#AA96DA', text: '#fff' },      // Purple
    { bg: '#FCBAD3', text: '#000' },      // Pink
    { bg: '#A8D8EA', text: '#000' },      // Light Blue
    { bg: '#FFB4B4', text: '#000' },      // Light Coral
    { bg: '#CAFFBF', text: '#000' },      // Light Green
    { bg: '#FFD6A5', text: '#000' },      // Light Orange
    { bg: '#FFC6FF', text: '#000' },      // Light Magenta
    { bg: '#B4A7D6', text: '#fff' },      // Lavender
    { bg: '#F7DC6F', text: '#000' },      // Golden
    { bg: '#85C1E2', text: '#fff' },      // Sky Blue
    { bg: '#F8B88B', text: '#000' },      // Peach
  ];

  return colors[tokenId % colors.length];
}

/**
 * Get a contrasting text color based on background brightness.
 */
export function getContrastingTextColor(bgColor: string): string {
  // Simple luminance calculation
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
