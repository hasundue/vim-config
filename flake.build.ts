import { $HOME, ClosedGroup } from "dpp_helper";

const PLACEHOLDER = "    /* PLACEHOLDER */";

const TEMPLATE = `{
  description = "hasundue's Vim configuration";

  inputs = {
${PLACEHOLDER}
  };

  outputs = { nixpkgs, ... } @ inputs: {
    formatter.x86_64-linux = nixpkgs.legacyPackages.x86_64-linux.nixpkgs-fmt;
    plugins = inputs;
  };
}`;

async function generateFlake(
  plugins: ClosedGroup,
) {
  const pluginLines = plugins.map((it) => {
    const { name, repo } = it;
    const url = repo.startsWith("~")
      ? `git+file:${repo.replace("~", $HOME)}`
      : `github:${repo}`;
    return `    "${name}" = { url = "${url}"; flake = false; };`;
  });
  await Deno.writeTextFile(
    new URL("./flake.nix", import.meta.url),
    TEMPLATE.replace(PLACEHOLDER, pluginLines.join("\n")),
  );
}

if (import.meta.main) {
  const { PLUGINS } = await import(
    new URL("./rc/dpp/plugins.ts", import.meta.url).href
  );
  await generateFlake(PLUGINS);
}
