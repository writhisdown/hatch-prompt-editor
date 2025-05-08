import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full border-b px-6 py-4 flex justify-between items-center">
      <img
        src="https://www.usehatchapp.com/hubfs/Hatch-Logo-Black-400.png"
        alt="Hatch Logo"
        className="h-8"
      />
      <div className="text-lg font-medium text-gray-600">
        Conversational AI over SMS, email, and live call
      </div>
      <Button asChild size="sm">
        <a
          href="https://www.usehatchapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          See our website
        </a>
      </Button>
    </header>
  );
}
