interface VisibleProps {
  children: React.ReactNode;
  when: boolean;
  fallback?: React.ReactNode;
}

export const Visible = ({ children, when, fallback }: VisibleProps) => {
  if (!when) return fallback;
  return children;
};
