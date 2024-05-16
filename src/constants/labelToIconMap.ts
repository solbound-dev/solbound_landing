import DiscordSvg from 'public/assets/icon/discord.svg';
import LinkedInSvg from 'public/assets/icon/linkedin.svg';
import XSvg from 'public/assets/icon/x.svg';

export type Icon = 'discord' | 'x' | 'linkedIn';

export const LabelToIconMap: { [key in Icon]: any } = {
  discord: DiscordSvg,
  linkedIn: LinkedInSvg,
  x: XSvg,
};
