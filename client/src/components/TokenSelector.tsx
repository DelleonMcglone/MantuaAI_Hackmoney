import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { ALL_TOKENS, type Token } from "../config/tokens";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

interface TokenSelectorProps {
  selectedToken?: Token;
  onSelect: (token: Token) => void;
  excludeToken?: Token;
  label?: string;
}

export function TokenSelector({
  selectedToken,
  onSelect,
  excludeToken,
  label = "Select token",
}: TokenSelectorProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter tokens based on search and exclude
  const filteredTokens = ALL_TOKENS.filter((token) => {
    // Exclude the specified token
    if (excludeToken && token.address.toLowerCase() === excludeToken.address.toLowerCase()) {
      return false;
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        token.symbol.toLowerCase().includes(searchLower) ||
        token.name.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  const handleSelect = (token: Token) => {
    onSelect(token);
    setOpen(false);
    setSearch("");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedToken ? (
            <div className="flex items-center gap-2">
              <img
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
                className="w-5 h-5 rounded-full"
              />
              <span>{selectedToken.symbol}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{label}</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] p-0">
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search tokens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredTokens.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No tokens found
            </div>
          ) : (
            filteredTokens.map((token) => (
              <DropdownMenuItem
                key={token.address}
                className="p-3 cursor-pointer"
                onSelect={() => handleSelect(token)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {token.symbol}
                        {token.isMock && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
                            Mock
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{token.name}</div>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
