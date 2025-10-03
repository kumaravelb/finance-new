export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container flex h-14 items-center justify-between px-6 text-sm text-muted-foreground">
        <p>© 2025 FinanceHub. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
