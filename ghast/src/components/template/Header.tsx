interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  return (
    <header className="hidden  justify-center px-4 py-2 border-b bg-white dark:dc-main w-full md:flex z-10 ${className}">
      <div className="text-xl font-bold font-audiowide">GHAST CONSULTORIA</div>
    </header>
  );
}
