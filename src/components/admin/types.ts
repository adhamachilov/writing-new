
export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  submenu?: Array<{
    label: string;
    id: string;
  }>;
}
