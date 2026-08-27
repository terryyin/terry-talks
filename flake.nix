{
  description = "Terry's talks (Slidev) and Remotion videos";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_22
            pkgs.pnpm
          ];

          shellHook = ''
            if [ -f .env ]; then
              set -a
              source .env
              set +a
            fi

            case "$PS1" in
              "(nix) "*) ;;
              *) export PS1="(nix) $PS1" ;;
            esac
          '';
        };
      }
    );
}
