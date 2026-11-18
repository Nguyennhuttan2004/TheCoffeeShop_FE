import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import vietnamFlag from "@/assets/flag-vietnam.png";
import unitedKingdomFlag from "@/assets/flag-united-kingdom.png";

function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Chọn ngôn ngữ"
          className={`h-10 w-14 rounded-full border border-[#A67C6D]/40 bg-white px-2 text-xl shadow-sm dark:bg-gray-800 ${className}`}
        >
          <img
            src={language === "vi" ? vietnamFlag : unitedKingdomFlag}
            alt={language === "vi" ? "Tiếng Việt" : "English"}
            className="h-6 w-10 rounded-sm object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 p-1">
        <DropdownMenuItem
          onSelect={() => setLanguage("vi")}
          className="cursor-pointer gap-3 rounded-md px-3 py-2"
        >
          <img
            src={vietnamFlag}
            alt="Việt Nam"
            className="h-5 w-8 rounded-sm object-cover"
          />
          <span className="font-semibold">Tiếng Việt</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setLanguage("en")}
          className="cursor-pointer gap-3 rounded-md px-3 py-2"
        >
          <img
            src={unitedKingdomFlag}
            alt="United Kingdom"
            className="h-5 w-8 rounded-sm object-cover"
          />
          <span className="font-semibold">English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
