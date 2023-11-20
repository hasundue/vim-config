{
  description = "hasundue's Vim plugins (auto-generated)";

  inputs = {
    "dpp.vim" = { url = "github:Shougo/dpp.vim"; flake = false; };
    "dpp-ext-lazy" = { url = "github:Shougo/dpp-ext-lazy"; flake = false; };
    "denops.vim" = { url = "github:vim-denops/denops.vim"; flake = false; };
    "vim-floaterm" = { url = "github:voldikss/vim-floaterm"; flake = false; };
  };

  outputs = { nixpkgs, ... } @ inputs: {
    formatter.x86_64-linux = nixpkgs.legacyPackages.x86_64-linux.nixpkgs-fmt;
    plugins = inputs;
  };
}
