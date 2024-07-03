export default interface ZeeveSidebarItemProps {
  icon: React.ReactElement;
  title?: string;
  path: string;
  badge?: React.ReactElement;
  children?: ZeeveSidebarItemProps[];
  className?: string;
  shouldOpenInNewTab?: boolean;
  activePaths?: string[];
}
